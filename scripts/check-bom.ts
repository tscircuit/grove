import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const distRoot = join(import.meta.dir, "..", "dist", "boards")
const errors: string[] = []
let circuitCount = 0

const isReferenceLike = (component: any, mpn: string) => {
  const name = String(component.name ?? "").trim().toUpperCase()
  const value = mpn.trim().toUpperCase()
  if (!value || value === name) return true
  // Eagle references are not purchasable manufacturer identifiers. Keep the
  // check narrow so valid device names such as P9813 and U.FL are accepted.
  if (/^(?:R|C|L|D|Q|U|J|CON|IC|LED|SW)\d+$/.test(value)) return true
  if (/^(?:GENERIC|UNKNOWN|PLACEHOLDER)(?:[-_ ]|$)/.test(value)) return true
  return false
}

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
      const mpn = component.manufacturer_part_number?.trim()
      if (!mpn) {
        errors.push(`${path}: ${component.name ?? "unnamed"} (${component.ftype ?? "component"}) has no manufacturer part number`)
      }
      if (mpn && isReferenceLike(component, mpn)) {
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

console.log(`BOM check passed: ${circuitCount} boards with manufacturer part numbers on every source component`)
