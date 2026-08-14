const snapshotGlobs = [
  new Bun.Glob("boards/**/__snapshots__/*-pcb.snap.svg"),
  new Bun.Glob("boards/**/__snapshots__/*-schematic.snap.svg"),
  new Bun.Glob("examples/**/__snapshots__/*-pcb.snap.svg"),
  new Bun.Glob("examples/**/__snapshots__/*-schematic.snap.svg"),
]

// PCB SVG coordinates produced by the renderer can vary below a tenth of a
// pixel across JavaScript engines and operating systems. Preserve deliberately
// specified short decimals, but canonicalize over-precise renderer output so
// snapshot checks focus on visible circuit changes.
const overPreciseNumber = /-?(?:\d+\.\d{5,}|\d+(?:\.\d+)?e[+-]?\d+)/gi

const canonicalize = (source: string, roundNumbers: boolean) => {
  const rounded = roundNumbers
    ? source.replace(overPreciseNumber, (rawValue) => {
        const value = Number(rawValue)
        if (!Number.isFinite(value)) return rawValue

        const roundedValue = Math.round(value * 10) / 10
        return Object.is(roundedValue, -0) ? "0" : String(roundedValue)
      })
    : source
  return rounded.replace(/[ \t]+$/gm, "")
}

let normalizedCount = 0

for (const snapshotGlob of snapshotGlobs) {
  for await (const path of snapshotGlob.scan({ cwd: ".", onlyFiles: true })) {
    const file = Bun.file(path)
    const source = await file.text()
    const normalized = canonicalize(source, path.endsWith("-pcb.snap.svg"))

    if (normalized !== source) {
      await Bun.write(path, normalized)
      normalizedCount += 1
    }
  }
}

console.log(`Canonicalized ${normalizedCount} snapshot SVG(s).`)
