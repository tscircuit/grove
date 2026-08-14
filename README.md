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
`tscircuit Snapshot` workflow regenerates snapshots with `tsci snapshot` on
pushes and pull requests, canonicalizes sub-pixel renderer precision, and
checks that every board has both a PCB and schematic SVG. Schematic SVGs are
compared exactly. PCB SVGs remain committed review artifacts, but their
autorouted path geometry can vary across renderer platforms, so CI reports
route-only PCB differences without rejecting an otherwise complete snapshot
set.

`examples/snapshot-fixture.circuit.tsx` is a small smoke test for the snapshot
pipeline. It is not a Grove board recreation.

## Included boards

- [Grove - Button v1.0](boards/Grove-Button/)
- [Grove - Relay v1.2](boards/Grove-Relay/)
- [Grove - Ultrasonic Ranger v2.0](boards/Grove-Ultrasonic-Ranger/)
- [Grove - Temperature & Humidity Sensor DHT20 v2.1](boards/Grove-DHT20/)
- [Grove - Light Sensor v1.2](boards/Grove-Light-Sensor/)
- [Grove - Digital PIR Motion Sensor v1.0](boards/Grove-Digital-PIR/)
- [Grove - Capacitive Moisture Sensor (Corrosion Resistant)](boards/Grove-Capacitive-Moisture/)
- [Grove - Rotary Angle Sensor v1.2](boards/Grove-Rotary-Angle-Sensor/)
- [Grove - Buzzer v1.1b](boards/Grove-Buzzer/)
- [Grove - OLED Display 0.96 inch (SSD1315) v1.0](boards/Grove-OLED-SSD1315/)
- [Grove - RGB LED Stick (10 WS2813 Mini)](boards/Grove-RGB-LED-Stick/)
- [Grove - LCD RGB Backlight v5.0](boards/Grove-LCD-RGB-Backlight/)

Each board README records its source URL, interface, primary device model,
manufacturer part number, power rail, explicit footprints, routed nets, and
decoupling components. A passing snapshot is a review artifact; fabrication
readiness is additionally gated by the catalogue-wide tscircuit checks below.

## Grove catalogue

`boards/catalogue-manifest.ts` records 394 unique entries collected from
Seeed's official [Grove sensor guide](https://wiki.seeedstudio.com/Grove_Sensor_Intro/),
[network-module guide](https://wiki.seeedstudio.com/Grove_network_module_intro/),
[accessories guide](https://wiki.seeedstudio.com/Grove_Accessories_Intro/), and
official product sitemap. Every manifest entry has its own board directory,
default-exported TSX circuit, README with source attribution, and independent
PCB and schematic SVG snapshots. All 394 entries are defined with the
profile-driven `GroveDetailedModule`: each has a named primary model/MPN,
interface-specific signal conditioning, explicit component footprints, power
decoupling, no-connect declarations, and routed nets. The 12 entries listed
above additionally preserve their source-backed, board-specific
reverse-engineered geometry.

Refresh the catalogue from those official sources with:

```sh
bun run catalogue:generate
bun run snapshot:update
bun run validate:catalogue
```

The generator is intentionally deterministic for a given upstream catalogue;
it regenerates the 382 profile-driven catalogue entries while preserving the
12 source-backed board-specific directories.

## Project scope

This is an independent recreation project and is not affiliated with or
endorsed by Seeed Studio. Contributors are responsible for preserving source
attribution and complying with the license of each upstream hardware design.
