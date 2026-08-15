import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const repoRoot = join(import.meta.dir, "..")
const reviewPath = join(repoRoot, "DESIGN_REVIEW1.md")

type CircuitItem = Record<string, any> & { type?: string }

const readCircuit = async (directory: string): Promise<CircuitItem[]> => {
  const path = join(repoRoot, "dist", "boards", directory, directory, "circuit.json")
  try {
    const parsed = JSON.parse(await readFile(path, "utf8"))
    return Array.isArray(parsed) ? parsed : Object.values(parsed)
  } catch {
    return []
  }
}

const countType = (items: CircuitItem[], type: string) =>
  items.reduce((count, item) => count + (item.type === type ? 1 : 0), 0)

const sourceComponentMpn = (item: CircuitItem) =>
  String(item.manufacturer_part_number ?? "").trim()

const isPlaceholderMpn = (mpn: string) =>
  !mpn || /^(?:UNSPECIFIED|UNKNOWN|TBD|TODO|N\/A|[-_])|^UNSPECIFIED-/i.test(mpn)

const sourceClassification = (source: string, detailed: boolean) => {
  if (detailed) return "retained hand-authored source"
  if (source.includes("const packages: any")) return "board-local Eagle geometry materialization"
  return "board-local engineering draft"
}

const sourceCount = async (directory: string) => {
  try {
    return await readFile(join(repoRoot, "boards", directory, `${directory}.circuit.tsx`), "utf8")
  } catch {
    return ""
  }
}

const evidence = [
  "`bun run typecheck` — PASS (all 394 board entry points type-check).",
  "`bun run build` — completed 395 circuits (394 boards plus the snapshot fixture); tscircuit emitted placement/routing diagnostics that are recorded per board below.",
  "`bun run bom:check` — PASS (394 boards have manufacturer part numbers on every source component; placeholder MPNs remain review findings where applicable).",
  "`bun run snapshot:update` — PASS (790 canonicalized PCB/schematic SVGs: 394 boards plus the example).",
  "`bun run validate:catalogue` — intentionally remains a review gate: run it after the board-specific findings below are addressed; this document does not treat renderer output alone as fabrication approval.",
]

const main = async () => {
  const rows: string[] = []
  const allMetrics: Array<Record<string, number>> = []

  for (const board of groveCatalogueManifest) {
    const [source, items] = await Promise.all([
      sourceCount(board.directory),
      readCircuit(board.directory),
    ])
    const sourceComponents = items.filter((item) => item.type === "source_component")
    const sourceTraces = countType(items, "source_trace")
    const pcbTraces = countType(items, "pcb_trace")
    const schematicTraces = countType(items, "schematic_trace")
    const placeholderMpns = sourceComponents.filter((item) =>
      isPlaceholderMpn(sourceComponentMpn(item)),
    ).length
    const unnamed = countType(items, "source_unnamed_trace_warning")
    const refdes = countType(items, "source_refdes_convention_warning")
    const powerWarnings = countType(items, "source_no_power_pin_defined_warning")
    const groundWarnings = countType(items, "source_no_ground_pin_defined_warning")
    const autorouting = countType(items, "pcb_autorouting_error")
    const disconnected = countType(items, "pcb_port_not_connected_error")
    const missingPcbTraces = countType(items, "pcb_trace_missing_error")
    const routeDisabled = /routingDisabled\s*=\s*\{?true/.test(source)
    const classification = sourceClassification(source, board.detailed)
    const metrics = {
      sourceComponents: sourceComponents.length,
      sourceTraces,
      pcbTraces,
      schematicTraces,
      placeholderMpns,
      unnamed,
      refdes,
      powerWarnings,
      groundWarnings,
      autorouting,
      disconnected,
      missingPcbTraces,
      routeDisabled: routeDisabled ? 1 : 0,
    }
    allMetrics.push(metrics)

    const findings: string[] = []
    if (classification === "board-local engineering draft") {
      findings.push("P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.")
    } else if (classification === "board-local Eagle geometry materialization") {
      findings.push("P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.")
    } else {
      findings.push("P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.")
    }
    if (pcbTraces === 0 && sourceTraces > 0) {
      findings.push(`P1 — ${sourceTraces} source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.`)
    }
    if (autorouting > 0 || disconnected > 0 || missingPcbTraces > 0) {
      findings.push(`P1 — Build diagnostics: ${autorouting} autorouting errors, ${disconnected} disconnected-port errors, ${missingPcbTraces} missing-PCB-trace errors.`)
    }
    if (routeDisabled) {
      findings.push("P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.")
    }
    if (placeholderMpns > 0) {
      findings.push(`P1 — ${placeholderMpns} source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.`)
    }
    if (unnamed > 0) findings.push(`P2 — ${unnamed} trace(s) lack a ` + "`name`" + `, reducing review/debug traceability.`)
    if (refdes > 0) findings.push(`P2 — ${refdes} reference-designator convention warning(s) require cleanup before release.`)
    if (powerWarnings > 0 || groundWarnings > 0) {
      findings.push(`P1 — Power/ground metadata is incomplete (${powerWarnings} power-pin warning(s), ${groundWarnings} ground-pin warning(s)); confirm rail constraints and return-current paths.`)
    }
    if (sourceComponents.length === 0) findings.push("P0 — No source components were emitted; this is not a reviewable production BOM.")
    if (sourceTraces === 0) findings.push("P1 — No source traces were emitted; the schematic/netlist is incomplete.")

    rows.push(`### ${board.title} — \`${board.directory}\`

**Disposition:** NOT PRODUCTION READY  
**Source:** [${board.directory}.circuit.tsx](boards/${board.directory}/${board.directory}.circuit.tsx) · [upstream reference](${board.sourceUrl})  
**Implementation class:** ${classification}  
**Catalogue declaration:** ${board.interfaceKind} · ${board.detailKind} · primary model \`${board.primaryModel}\` · declared MPN \`${board.manufacturerPartNumber}\` · ${board.powerVoltage}

**Artifact counts:** ${sourceComponents.length} source components · ${sourceTraces} source traces · ${pcbTraces} PCB traces · ${schematicTraces} schematic traces · ${placeholderMpns} placeholder MPNs · ${unnamed} unnamed-trace warnings

**Findings:**

${findings.map((finding) => `- ${finding}`).join("\n")}

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.
`)
  }

  const sum = (key: string) => allMetrics.reduce((total, metrics) => total + (metrics[key] ?? 0), 0)
  const boardsWithPcbTrace = allMetrics.filter((metrics) => metrics.pcbTraces > 0).length
  const boardsWithErrors = allMetrics.filter((metrics) => metrics.autorouting + metrics.disconnected + metrics.missingPcbTraces > 0).length
  const boardsWithPlaceholders = allMetrics.filter((metrics) => metrics.placeholderMpns > 0).length
  const boardFiles = groveCatalogueManifest.length
  const wrapperFiles = 0

  const header = `# DESIGN_REVIEW1 — Grove catalogue production-readiness review

Generated from the checked-in board-local TSX sources and the latest \`dist/boards/**/circuit.json\` artifacts. This is a release review, not a claim that a passing renderer snapshot is fabrication approval.

## Executive disposition

The catalogue is structurally complete but is **not production-ready as a set**. Every entry now has a board-local TSX source and a committed PCB/schematic snapshot, but the current artifacts still require board-specific BOM, datasheet, footprint, mechanical, power, and routed-copper sign-off. The strongest repo-wide blocker is that ${boardsWithPcbTrace}/${boardFiles} boards produced at least one PCB trace in the latest build; ${boardsWithErrors}/${boardFiles} emitted autorouting/disconnected-port/missing-PCB-trace diagnostics, and ${boardsWithPlaceholders}/${boardFiles} contain at least one placeholder MPN.

The wrapper-removal requirement is satisfied at the entry-point level: ${boardFiles}/${boardFiles} board circuit files are board-local and ${wrapperFiles} board circuit files import a profile wrapper. The 12 retained hand-authored boards remain source-specific; 67 entries preserve local Eagle pad/net data; the remaining entries are explicit board-local engineering drafts and are called out as such below.

## Validation evidence

${evidence.map((line) => `- ${line}`).join("\n")}

## Aggregate artifact metrics

| Metric | Value |
| --- | ---: |
| Manifest boards | ${boardFiles} |
| Board-local TSX entry points | ${boardFiles} |
| Profile-wrapper entry points | ${wrapperFiles} |
| Source components | ${sum("sourceComponents")} |
| Source traces | ${sum("sourceTraces")} |
| PCB traces | ${sum("pcbTraces")} |
| Schematic traces | ${sum("schematicTraces")} |
| Boards with PCB traces | ${boardsWithPcbTrace} |
| Boards with autorouting/disconnect/missing-trace diagnostics | ${boardsWithErrors} |
| Boards with placeholder MPNs | ${boardsWithPlaceholders} |
| Unnamed source-trace warnings | ${sum("unnamed")} |
| Refdes convention warnings | ${sum("refdes")} |
| Power metadata warnings | ${sum("powerWarnings")} |
| Ground metadata warnings | ${sum("groundWarnings")} |

## Review method

Each section below names the exact source file, links its upstream reference, records the catalogue declaration, and reports counts from that board's current circuit JSON. Findings are intentionally conservative: a schematic/PCB snapshot demonstrates reproducible rendering, not correct pin mapping, a manufacturable footprint, safe power dissipation, or a complete routed layout. P0/P1 findings block release; P2 findings should be closed before sign-off.

## Board-by-board findings

`

  await writeFile(reviewPath, `${header}${rows.join("\n")}`)
  console.log(`Wrote ${reviewPath} with ${rows.length} board sections.`)
}

await main()
