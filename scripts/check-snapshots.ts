import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const repoRoot = join(import.meta.dir, "..")

const snapshotEntries = [
  ...groveCatalogueManifest.map((board) => ({
    directory: `boards/${board.directory}`,
    basename: board.directory,
  })),
  { directory: "examples", basename: "snapshot-fixture" },
]

const snapshotPaths = snapshotEntries.flatMap(({ directory, basename }) => {
  return [
    `${directory}/__snapshots__/${basename}.circuit-pcb.snap.svg`,
    `${directory}/__snapshots__/${basename}.circuit-schematic.snap.svg`,
  ]
})

const missing: string[] = []
for (const relativePath of snapshotPaths) {
  try {
    const source = await readFile(join(repoRoot, relativePath), "utf8")
    if (!source.trimStart().startsWith("<svg")) {
      missing.push(`${relativePath} is not an SVG snapshot`)
    }
  } catch {
    missing.push(relativePath)
  }
}

if (missing.length > 0) {
  console.error(`Missing or invalid snapshot files (${missing.length}):`)
  for (const path of missing) console.error(`- ${path}`)
  process.exit(1)
}

const schematicPaths = snapshotPaths.filter((path) =>
  path.endsWith("-schematic.snap.svg"),
)
const diff = Bun.spawn(["git", "diff", "--exit-code", "--", ...schematicPaths], {
  cwd: repoRoot,
  stdout: "pipe",
  stderr: "pipe",
})
const diffOutput = await Promise.all([
  new Response(diff.stdout).text(),
  new Response(diff.stderr).text(),
])
const diffExitCode = await diff.exited

if (diffExitCode !== 0) {
  console.error(
    "Schematic snapshots differ from the committed files; run 'bun run snapshot:update' and commit them.",
  )
  const diagnostic = `${diffOutput[0]}\n${diffOutput[1]}`.trim()
  if (diagnostic) console.error(diagnostic.slice(0, 4000))
  process.exit(1)
}

console.log(
  `Snapshot validation passed: ${groveCatalogueManifest.length} boards plus the example, ${snapshotPaths.length} PCB/schematic SVGs present, and all schematic snapshots are current.`,
)
