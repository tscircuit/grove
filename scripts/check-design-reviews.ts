import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

const repoRoot = join(import.meta.dir, "..")
const requiredSections = [
  "## Critical design review",
  "## Electrical and netlist evidence",
  "## BOM and footprint review",
  "## Routing, placement, and snapshot diagnostics",
  "## Required release gates",
]

const failures: string[] = []

for (const board of groveCatalogueManifest) {
  const relative = `boards/${board.directory}/DESIGN_REVIEW1.md`
  try {
    const review = await readFile(join(repoRoot, relative), "utf8")
    if (!review.startsWith("# DESIGN_REVIEW1 — ")) failures.push(`${relative}: missing board review title`)
    if (!review.includes(`# DESIGN_REVIEW1 — ${board.title}`)) failures.push(`${relative}: title is not board-specific`)
    if (!review.includes(`**Board directory:** \`${board.directory}\``)) failures.push(`${relative}: wrong board directory`)
    if (!review.includes(`./${board.directory}.circuit.tsx`)) failures.push(`${relative}: missing board source link`)
    if (!review.includes(board.sourceUrl)) failures.push(`${relative}: missing upstream source URL`)
    if (!review.includes("**Disposition:** NOT PRODUCTION READY")) failures.push(`${relative}: missing disposition`)
    for (const section of requiredSections) {
      if (!review.includes(section)) failures.push(`${relative}: missing ${section}`)
    }
    if (!review.includes("## Diagnostic sample")) failures.push(`${relative}: missing diagnostic evidence`)
    if (!review.includes("| Source components |")) failures.push(`${relative}: missing source component metrics`)
    if (!/^1\. /m.test(review) || !/^5\. /m.test(review)) failures.push(`${relative}: missing complete release-gate list`)
    if (review.length < 1500) failures.push(`${relative}: review is too short to be a critical review (${review.length} bytes)`)
  } catch {
    failures.push(`${relative}: missing review file`)
  }
}

const boardReviewFiles: string[] = []
for await (const path of new Bun.Glob("boards/*/DESIGN_REVIEW1.md").scan({ cwd: repoRoot, onlyFiles: true })) {
  boardReviewFiles.push(path)
}
if (boardReviewFiles.length !== groveCatalogueManifest.length) {
  failures.push(`expected ${groveCatalogueManifest.length} board review files, found ${boardReviewFiles.length}`)
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure)
  console.error(`Design review coverage failed: ${failures.length} issue(s)`)
  process.exit(1)
}

console.log(`Design review coverage passed: ${groveCatalogueManifest.length} boards have individualized critical reviews.`)
