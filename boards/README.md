# Board directories

Add one directory per Grove board. Follow the layout and snapshot requirements
in the repository README. Do not add a board without both its PCB and schematic
snapshot SVGs.

The repository currently tracks the full 394-entry manifest in
`boards/catalogue-manifest.ts`. The first 12 commonly used Grove modules have
source-backed detailed recreations. Their individual READMEs identify the
upstream Seeed revision and public source package, explain where a design is
functional rather than an exact CAD conversion, and record the license status
of the source material.

The remaining catalogue entries are independently defined, compact
interface-level TSX modules generated from Seeed's official Grove guides and
product sitemap. They still have a complete Grove four-pin connector, a
reviewable module footprint, and their own PCB and schematic snapshots. They
are intentionally labeled as catalogue representations until a public Eagle,
KiCad, schematic, or mechanical archive is available for a detailed clone.
