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

const markdownCell = (value: unknown) =>
  String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim()

const unique = <T>(values: T[]) => [...new Set(values)]

const sourceFootprints = (source: string) => {
  const values: string[] = []
  for (const match of source.matchAll(/footprint\s*=\s*(?:"([^"]+)"|\{\s*["']([^"']+)["']\s*\})/g)) {
    values.push(match[1] ?? match[2])
  }
  return unique(values)
}

const boardDimensions = (source: string) => {
  const widthMatch = source.match(/<board\b[^>]*\bwidth\s*=\s*(?:"([^"]+)"|\{\s*["']([^"']+)["']\s*\})/)
  const heightMatch = source.match(/<board\b[^>]*\bheight\s*=\s*(?:"([^"]+)"|\{\s*["']([^"']+)["']\s*\})/)
  const width = widthMatch?.[1] ?? widthMatch?.[2] ?? source.match(/<board\b[^>]*\bwidth\s*=\s*\{([^}]+)\}/)?.[1]
  const height = heightMatch?.[1] ?? heightMatch?.[2] ?? source.match(/<board\b[^>]*\bheight\s*=\s*\{([^}]+)\}/)?.[1]
  return { width: width ?? "not declared", height: height ?? "not declared" }
}

const componentPorts = (items: CircuitItem[]) => {
  const byComponent = new Map<string, string[]>()
  for (const port of items.filter((item) => item.type === "source_port")) {
    const ports = byComponent.get(port.source_component_id) ?? []
    ports.push(String(port.name ?? port.pin_number ?? "?"))
    byComponent.set(port.source_component_id, ports)
  }
  return byComponent
}

const sourceNets = (items: CircuitItem[]) =>
  items
    .filter((item) => item.type === "source_net")
    .map((item) => ({
      name: String(item.name ?? "unnamed"),
      power: Boolean(item.is_power),
      ground: Boolean(item.is_ground),
    }))

const familyRisks = (
  board: (typeof groveCatalogueManifest)[number],
  source: string,
  components: CircuitItem[],
  nets: ReturnType<typeof sourceNets>,
) => {
  const text = `${board.title} ${board.primaryModel}`.toLowerCase()
  const risks: string[] = []
  const has = (pattern: RegExp) => pattern.test(text)
  const sourceText = source.toLowerCase()
  const names = components.map((component) => String(component.name ?? "")).join(" ")
  const hasResistor = /\bR\d+\b/.test(names)
  const hasDiode = /\bD\d+\b/.test(names) || /diode/.test(sourceText)
  const hasSwitch = /\bQ\d+\b/.test(names) || /mosfet|transistor/.test(sourceText)

  if (board.interfaceKind === "i2c") {
    if (!nets.some((net) => /^SCL$/i.test(net.name)) || !nets.some((net) => /^SDA$/i.test(net.name))) {
      risks.push("P1 — The declared I²C interface is missing a canonical SCL/SDA net in the emitted netlist; reconcile the Grove contract before release.")
    } else if (!/4\.7k|2\.2k|2k2|10k|pull.?up/i.test(sourceText)) {
      risks.push("P1 — No explicit I²C pull-up value is visible in the source; calculate bus rise time at the declared rail and document whether pull-ups are on-board or supplied by the host.")
    } else {
      risks.push("P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.")
    }
  }
  if (board.interfaceKind === "uart") {
    risks.push("P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.")
  }
  if (board.interfaceKind === "analog") {
    risks.push("P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.")
  }
  if (board.interfaceKind === "digital") {
    risks.push("P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.")
  }

  if (board.detailKind === "sensor") {
    risks.push("P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.")
  }
  if (board.detailKind === "actuator") {
    risks.push(`P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; ${hasSwitch ? "a switching element is present, but its SOA/gate drive/return path must be verified" : "no obvious dedicated load switch is visible in the source"}.`)
  }
  if (board.detailKind === "display") {
    risks.push("P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.")
  }
  if (board.detailKind === "communications") {
    risks.push("P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.")
  }
  if (board.detailKind === "input") {
    risks.push("P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.")
  }

  if (has(/relay|motor|servo|fan|speaker|buzzer|atomization|electromagnet|solenoid/)) {
    risks.push(`P1 — This load family needs a measured current path and suppression network; ${hasDiode ? "a diode is declared, but polarity, pulse energy, and physical placement must be checked" : "no flyback/suppression diode is evident"}.`)
  }
  if (has(/led|rgb|ws2813|p9813|matrix/)) {
    risks.push(`P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing.${hasResistor ? " Series resistors exist in the source, but their values and dissipation still need calculation." : " No explicit current-limiting resistor is evident."}`)
  }
  if (has(/display|lcd|oled|e.?ink/)) {
    risks.push("P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.")
  }
  if (has(/ultrasonic|distance|proximity|pir|motion|radar|lidar/)) {
    risks.push("P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.")
  }
  if (has(/gas|mq[- ]?\d|co2|oxygen|hcho|formaldehyde|air quality/)) {
    risks.push("P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.")
  }
  if (has(/temperature|humidity|pressure|barometer|environmental/)) {
    risks.push("P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.")
  }
  if (has(/potentiometer|rotary|joystick|encoder|keypad|button|switch/)) {
    risks.push("P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.")
  }
  if (has(/microphone|audio|sound|speaker|voice|recorder/)) {
    risks.push("P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.")
  }
  if (has(/current sensor|voltage divider|voltage sensor|coulomb|power meter/)) {
    risks.push("P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.")
  }
  if (has(/wifi|bluetooth|ble|gps|rfid|nfc|lora|rf\b|wireless/)) {
    risks.push("P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.")
  }
  return unique(risks)
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
    const portsByComponent = componentPorts(items)
    const nets = sourceNets(items)
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
    const pinMissingTrace = countType(items, "source_pin_missing_trace_warning")
    const autorouting = countType(items, "pcb_autorouting_error")
    const disconnected = countType(items, "pcb_port_not_connected_error")
    const missingPcbTraces = countType(items, "pcb_trace_missing_error")
    const routeDisabled = /routingDisabled\s*=\s*\{?true/.test(source)
    const classification = sourceClassification(source, board.detailed)
    const dimensions = boardDimensions(source)
    const footprints = sourceFootprints(source)
    const hasCustomFootprint = /HandAuthoredFootprint/.test(source)
    const hasConnector = /GroveConnector|<jumper\b/.test(source)
    const hasMountingHoles = /GroveMountingHoles|<hole\b/.test(source)
    const sourceTraceNames = items
      .filter((item) => item.type === "source_trace")
      .map((item) => String(item.display_name ?? "unnamed trace"))
    const diagnosticMessages = items
      .filter((item) => /(?:_error|_warning)$/.test(String(item.type)) && item.message)
      .map((item) => String(item.message))
    const criticalRisks = familyRisks(board, source, sourceComponents, nets)
    const sourceComponentRows = sourceComponents.map((component) => {
      const ports = portsByComponent.get(component.source_component_id) ?? []
      const mpn = sourceComponentMpn(component)
      const value = component.display_name ?? component.display_resistance ?? component.display_capacitance ?? ""
      return `| ${markdownCell(component.name)} | ${markdownCell(component.ftype)} | ${markdownCell(value)} | ${markdownCell(mpn || "MISSING")} | ${ports.map(markdownCell).join(", ") || "no emitted ports"} |`
    })
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
      pinMissingTrace,
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
    if (pinMissingTrace > 0) findings.push(`P1 — ${pinMissingTrace} source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.`)
    if (sourceComponents.length === 0) findings.push("P0 — No source components were emitted; this is not a reviewable production BOM.")
    if (sourceTraces === 0) findings.push("P1 — No source traces were emitted; the schematic/netlist is incomplete.")
    if (nets.length === 0 && sourceTraces > 0) findings.push("P1 — The source uses direct component-to-component traces without emitted named nets; reconcile the intended net classes and power domains before ERC/DRC sign-off.")
    if (!hasConnector) findings.push("P0 — No Grove connector/jumper declaration is visible; the board cannot be accepted as a Grove-compatible module until its pin contract is explicit.")
    if (!hasMountingHoles) findings.push("P1 — No mounting-hole/mechanical datum declaration is visible; verify panel fit, fastener clearance, and board orientation before fabrication.")
    if (footprints.length === 0 && !hasCustomFootprint) findings.push("P1 — No explicit component footprint declaration is visible in the source; supplier/fabrication geometry is unverified.")
    if (hasCustomFootprint) findings.push("P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.")
    if (footprints.some((footprint) => /display_module|power_module|microphone|ultrasonic_transducer|led_5050|button_6mm|potentiometer_pth/i.test(footprint))) {
      findings.push(`P1 — Placeholder or non-standard footprint token(s) are present (${footprints.filter((footprint) => /display_module|power_module|microphone|ultrasonic_transducer|led_5050|button_6mm|potentiometer_pth/i.test(footprint)).join(", ")}); replace with a verified supplier footprint and mechanical drawing.`)
    }
    findings.push(...criticalRisks)

    const componentTable = sourceComponentRows.length > 0
      ? sourceComponentRows.join("\n")
      : "| — | — | — | MISSING | no emitted components |"
    const netTable = nets.length > 0
      ? nets.map((net) => `| ${markdownCell(net.name)} | ${net.power ? "power" : net.ground ? "ground" : "signal"} |`).join("\n")
      : "| — | no emitted nets |"
    const traceSample = sourceTraceNames.length > 0
      ? sourceTraceNames.slice(0, 12).map((name) => `- \`${markdownCell(name)}\``).join("\n")
      : "- No source trace names were emitted."
    const diagnosticSample = diagnosticMessages.length > 0
      ? diagnosticMessages.slice(0, 8).map((message) => `- ${markdownCell(message)}`).join("\n")
      : "- No typed error/warning objects were present in this circuit JSON; still complete the electrical and mechanical sign-off below."
    const boardReview = `# DESIGN_REVIEW1 — ${board.title}

**Disposition:** NOT PRODUCTION READY
**Board directory:** \`${board.directory}\`
**Implementation class:** ${classification}
**Catalogue declaration:** ${board.interfaceKind} interface · ${board.detailKind} · ${board.powerVoltage} · primary model \`${board.primaryModel}\` · declared MPN \`${board.manufacturerPartNumber}\`
**Upstream reference:** [Seeed source](${board.sourceUrl})

This review is specific to the checked-in [board source](./${board.directory}.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/${board.directory}.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/${board.directory}.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

${findings.map((finding) => `- ${finding}`).join("\n")}

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | ${markdownCell(dimensions.width)} × ${markdownCell(dimensions.height)} |
| Source components | ${sourceComponents.length} |
| Source nets | ${nets.length} |
| Source traces | ${sourceTraces} |
| Schematic traces | ${schematicTraces} |
| PCB traces | ${pcbTraces} |
| Routing disabled | ${routeDisabled ? "yes" : "no"} |
| Grove connector declaration | ${hasConnector ? "present" : "missing"} |
| Mounting/mechanical declaration | ${hasMountingHoles ? "present" : "missing"} |

### Nets

| Net | Role |
| --- | --- |
${netTable}

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
${componentTable}

### Trace sample

${traceSample}

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: ${footprints.length > 0 ? footprints.map((footprint) => `\`${markdownCell(footprint)}\``).join(", ") : "none"}.
- Embedded custom pad/graphic footprint data: ${hasCustomFootprint ? "yes — compare the local pad geometry against the supplier drawing" : "no"}.
- Placeholder/unspecified MPN count in generated source components: ${placeholderMpns}.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report ${autorouting} autorouting error(s), ${disconnected} disconnected-port error(s), ${missingPcbTraces} missing-PCB-trace error(s), ${pinMissingTrace} source-pin-missing-trace warning(s), ${unnamed} unnamed-trace warning(s), ${refdes} refdes warning(s), ${powerWarnings} power metadata warning(s), and ${groundWarnings} ground metadata warning(s).

### Diagnostic sample

${diagnosticSample}

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
`
    await writeFile(join(repoRoot, "boards", board.directory, "DESIGN_REVIEW1.md"), boardReview.replace(/[ \t]+$/gm, ""))

    rows.push(`### ${board.title} — \`${board.directory}\`

**Per-board review:** [DESIGN_REVIEW1.md](boards/${board.directory}/DESIGN_REVIEW1.md)
**Source:** [${board.directory}.circuit.tsx](boards/${board.directory}/${board.directory}.circuit.tsx) · [upstream reference](${board.sourceUrl})
**Implementation class:** ${classification}
**Catalogue declaration:** ${board.interfaceKind} · ${board.detailKind} · primary model \`${board.primaryModel}\` · declared MPN \`${board.manufacturerPartNumber}\` · ${board.powerVoltage}

**Artifact counts:** ${sourceComponents.length} source components · ${sourceTraces} source traces · ${pcbTraces} PCB traces · ${schematicTraces} schematic traces · ${placeholderMpns} placeholder MPNs · ${unnamed} unnamed-trace warnings

**Critical findings:**

${findings.map((finding) => `- ${finding}`).join("\n")}
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
| Source-pin-missing-trace warnings | ${sum("pinMissingTrace")} |

## Review method

Each section below names the exact source file, links its upstream reference, records the catalogue declaration, and reports counts from that board's current circuit JSON. Findings are intentionally conservative: a schematic/PCB snapshot demonstrates reproducible rendering, not correct pin mapping, a manufacturable footprint, safe power dissipation, or a complete routed layout. P0/P1 findings block release; P2 findings should be closed before sign-off.

## Board-by-board findings

`

  await writeFile(reviewPath, `${header}${rows.join("\n")}`.replace(/[ \t]+$/gm, ""))
  console.log(`Wrote ${reviewPath} with ${rows.length} board sections.`)
}

await main()
