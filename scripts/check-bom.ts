import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const distRoot = join(import.meta.dir, "..", "dist", "boards")
const errors: string[] = []
let circuitCount = 0

const isPassive = (component: any) =>
  component.ftype === "simple_resistor" ||
  component.ftype === "simple_capacitor" ||
  component.display_resistance !== undefined ||
  component.display_capacitance !== undefined

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
    for (const component of circuit.filter((item) => item.type === "source_component")) {
      if (component.name === "J1" || isPassive(component)) continue
      const mpn = component.manufacturer_part_number?.trim()
      if (!mpn) {
        errors.push(`${path}: ${component.name ?? "unnamed"} (${component.ftype ?? "component"}) has no manufacturer part number`)
      }
      if (mpn && /(?:generic|unknown|placeholder|controller)$/i.test(mpn)) {
        errors.push(`${path}: ${component.name ?? "unnamed"} uses placeholder manufacturer part number ${mpn}`)
      }
    }
  }
}

try {
  await walk(distRoot)
} catch {
  errors.push(`Missing generated circuit output at ${distRoot}; run tsci build first`)
}

if (circuitCount !== groveCatalogueManifest.length) {
  errors.push(`Expected ${groveCatalogueManifest.length} board circuit.json files, found ${circuitCount}`)
}

if (errors.length) {
  for (const error of errors) console.error(`BOM: ${error}`)
  process.exit(1)
}

console.log(`BOM check passed: ${circuitCount} boards with identified non-passive components`)
