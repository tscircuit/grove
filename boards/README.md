# Board directories

Add one directory per Grove board. Follow the layout and snapshot requirements
in the repository README. Do not add a board without both its PCB and schematic
snapshot SVGs.

The repository currently tracks the full 394-entry manifest in
`boards/catalogue-manifest.ts`. The first 12 commonly used Grove modules have
source-backed board-specific recreations. Their individual READMEs identify
the upstream Seeed revision and public source package, explain the design
choices, and record the license status of the source material.

All 394 entries are now board-local TSX sources; there are no profile-wrapper
imports. Some files preserve source Eagle pad/net data, while others are
explicit engineering drafts with provisional parts and footprints. A passing
tscircuit build or snapshot proves that the source renders, not that it is
ready to fabricate. Run `bun run validate:catalogue` before review and consult
`DESIGN_REVIEW1.md` for the board-by-board production-readiness findings.
