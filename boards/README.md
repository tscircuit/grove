# Board directories

Add one directory per Grove board. Follow the layout and snapshot requirements
in the repository README. Do not add a board without both its PCB and schematic
snapshot SVGs.

The repository currently tracks the full 394-entry manifest in
`boards/catalogue-manifest.ts`. The first 12 commonly used Grove modules have
source-backed board-specific recreations. Their individual READMEs identify
the upstream Seeed revision and public source package, explain the design
choices, and record the license status of the source material.

Every other entry is also a complete, fabrication-oriented TSX board model,
not an interface-only placeholder. The deterministic profile generator gives
each board a primary model/MPN, an interface-appropriate Grove pinout,
explicit footprints, power decoupling, passive signal conditioning,
no-connects, routed nets, and independent PCB and schematic snapshots. Run
`bun run validate:catalogue` before review to apply the same tscircuit gates to
every directory.
