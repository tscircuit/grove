import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const repoRoot = join(import.meta.dir, "..")
const distRoot = join(repoRoot, "dist", "boards")
const errors: string[] = []
let circuitCount = 0
let sourceComponentCount = 0
let selectedComponentCount = 0
let fullySelectedBoardCount = 0

const isJlcPartNumber = (value: unknown): value is string =>
  typeof value === "string" && /^C\d+$/.test(value.trim())

const walk = async (directory: string) => {
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry)
    if ((await stat(path)).isDirectory()) {
      await walk(path)
      continue
    }
    if (entry !== "circuit.json") continue

    circuitCount += 1
    const circuit = JSON.parse(await readFile(path, "utf8")) as any[]
    const components = circuit.filter((item) => item.type === "source_component")
    let boardFullySelected = true

    for (const component of components) {
      sourceComponentCount += 1
      const selected = component.supplier_part_numbers?.jlcpcb
      const ids = Array.isArray(selected) ? selected.filter((id) => typeof id === "string" && id.trim()) : []
      const invalid = ids.filter((id) => !isJlcPartNumber(id))
      if (ids.length === 0) {
        boardFullySelected = false
        errors.push(`${path}: ${component.name ?? "unnamed"} has no JLCPCB supplier selection`)
        continue
      }
      if (invalid.length > 0) {
        boardFullySelected = false
        errors.push(`${path}: ${component.name ?? "unnamed"} has invalid JLCPCB part number(s): ${invalid.join(", ")}`)
        continue
      }
      selectedComponentCount += 1
    }

    if (boardFullySelected) fullySelectedBoardCount += 1
  }
}

try {
  await walk(distRoot)
} catch {
  errors.push(`Missing generated circuit output at ${distRoot}; run tsci build or tsci snapshot first`)
}

if (circuitCount !== groveCatalogueManifest.length) {
  errors.push(`Expected ${groveCatalogueManifest.length} board circuit.json files, found ${circuitCount}`)
}

const boardCoverage = circuitCount === 0 ? 0 : fullySelectedBoardCount / circuitCount
const componentCoverage = sourceComponentCount === 0 ? 0 : selectedComponentCount / sourceComponentCount
console.log(`JLCPCB BOM coverage: ${fullySelectedBoardCount}/${circuitCount} boards (${(boardCoverage * 100).toFixed(1)}%) have selections for every source component`)
console.log(`JLCPCB component coverage: ${selectedComponentCount}/${sourceComponentCount} source components (${(componentCoverage * 100).toFixed(1)}%) have valid C-number selections`)

if (boardCoverage <= 0.9) {
  errors.push(`JLCPCB board coverage must be greater than 90%; found ${(boardCoverage * 100).toFixed(1)}%`)
}

if (errors.length) {
  for (const error of errors) console.error(`JLCPCB: ${error}`)
  process.exit(1)
}

console.log("JLCPCB coverage check passed: every board is fully selected for assembly review.")
