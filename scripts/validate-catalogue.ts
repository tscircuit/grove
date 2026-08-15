import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const repoRoot = join(import.meta.dir, "..")
const tsci = join(repoRoot, "node_modules/.bin/tsci")
const checks = [
  "netlist",
  "pin_specification",
  "placement",
  "schematic-placement",
  "shorts",
  "source",
] as const

type CheckName = (typeof checks)[number]
type CheckResult = {
  board: string
  check: CheckName
  exitCode: number
  errors: number
  warnings: number
  schematicIssues: boolean
  output: string
}

const count = (output: string, label: string) =>
  Number(output.match(new RegExp(`${label}:\\s*(\\d+)`))?.[1] ?? 0)

const runCheck = async (
  board: (typeof groveCatalogueManifest)[number],
  check: CheckName,
): Promise<CheckResult> => {
  const file = join(
    repoRoot,
    "boards",
    board.directory,
    `${board.directory}.circuit.tsx`,
  )
  const proc = Bun.spawn([tsci, "check", check, file], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  const output = `${stdout}\n${stderr}`
  return {
    board: board.directory,
    check,
    exitCode: await proc.exited,
    errors: count(output, "Errors"),
    warnings: count(output, "Warnings"),
    schematicIssues:
      check === "schematic-placement" && /<SchematicPlacementIssues>[\s\S]*message=/.test(output),
    output,
  }
}

const validateStaticCatalogue = async () => {
  const failures: string[] = []
  if (groveCatalogueManifest.length !== 394) {
    failures.push(`expected 394 manifest entries, found ${groveCatalogueManifest.length}`)
  }

  for (const board of groveCatalogueManifest) {
    const boardDir = join(repoRoot, "boards", board.directory)
    const circuitPath = join(boardDir, `${board.directory}.circuit.tsx`)
    const readmePath = join(boardDir, "README.md")
    const pcbSnapshot = join(
      boardDir,
      "__snapshots__",
      `${board.directory}.circuit-pcb.snap.svg`,
    )
    const schematicSnapshot = join(
      boardDir,
      "__snapshots__",
      `${board.directory}.circuit-schematic.snap.svg`,
    )
    for (const path of [circuitPath, readmePath, pcbSnapshot, schematicSnapshot]) {
      try {
        await readFile(path)
      } catch {
        failures.push(`${board.directory}: missing ${path.slice(repoRoot.length + 1)}`)
      }
    }
    try {
      const source = await readFile(circuitPath, "utf8")
      if (!/export default\s+\w+/.test(source)) {
        failures.push(`${board.directory}: circuit has no default export`)
      }
      if (/placementDrcChecksDisabled|GroveCatalogueModule|EagleBoardModule|from \"\.\.\/\_shared\/[^\"]*Module/.test(source)) {
        failures.push(`${board.directory}: contains a placement bypass or shared/profile board wrapper`)
      }
      if (!/<board\b/.test(source) || !/<trace\b/.test(source)) {
        failures.push(`${board.directory}: board-local source is missing a board or trace declaration`)
      }
    } catch {
      // Missing circuit files are already reported above.
    }
  }
  return failures
}

const runChecks = async () => {
  const work = groveCatalogueManifest.flatMap((board) =>
    checks.map((check) => ({ board, check })),
  )
  const failures: CheckResult[] = []
  let cursor = 0
  const worker = async () => {
    while (cursor < work.length) {
      const item = work[cursor++]
      const result = await runCheck(item.board, item.check)
      if (
        result.exitCode !== 0 ||
        result.errors !== 0 ||
        result.warnings !== 0 ||
        result.schematicIssues
      ) {
        failures.push(result)
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, () => worker()))
  return failures
}

const main = async () => {
  const staticFailures = await validateStaticCatalogue()
  const checkFailures = await runChecks()
  if (staticFailures.length > 0 || checkFailures.length > 0) {
    for (const failure of staticFailures) console.error(`STATIC: ${failure}`)
    for (const failure of checkFailures) {
      console.error(
        `CHECK: ${failure.board} ${failure.check} exit=${failure.exitCode} errors=${failure.errors} warnings=${failure.warnings}`,
      )
      console.error(failure.output.split("\n").slice(0, 24).join("\n"))
    }
    console.error(
      `Catalogue validation failed: ${staticFailures.length} static, ${checkFailures.length} check failures`,
    )
    process.exit(1)
  }
  console.log(
    `Catalogue validation passed: ${groveCatalogueManifest.length} boards × ${checks.length} tscircuit checks`,
  )
}

await main()
