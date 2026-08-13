# Grove boards for tscircuit

Grove-compatible boards recreated as reviewable tscircuit TSX.

## Repository layout

Each board belongs in its own directory:

```text
boards/<Board-Name>/
├── <Board-Name>.circuit.tsx
├── index.tsx
├── README.md
└── __snapshots__/
    ├── <Board-Name>.circuit-pcb.snap.svg
    └── <Board-Name>.circuit-schematic.snap.svg
```

The circuit file must default-export the complete board. Its `index.tsx`
exports the reusable component and any board-specific subcomponents. The board
README should cite the upstream schematic, PCB or mechanical drawing, product
revision, and upstream license used to make the recreation.

## Development

Install dependencies with Bun:

```sh
bun install
```

Preview a board while working on it:

```sh
bun run dev boards/<Board-Name>/<Board-Name>.circuit.tsx
```

Before opening a pull request, run:

```sh
bun run typecheck
bun run build
bun run snapshot:update
bun run snapshot
```

Commit the generated PCB and schematic SVGs alongside every board. The
`tscircuit Snapshot` workflow runs `tsci snapshot --ci` on pushes and pull
requests. It fails when a snapshot is missing or stale and uploads generated
diff SVGs when an existing snapshot changes.

`examples/snapshot-fixture.circuit.tsx` is a small smoke test for the snapshot
pipeline. It is not a Grove board recreation.

## Project scope

This is an independent recreation project and is not affiliated with or
endorsed by Seeed Studio. Contributors are responsible for preserving source
attribution and complying with the license of each upstream hardware design.
