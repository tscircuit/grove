# DESIGN_REVIEW1 — Grove Serial LCD

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveSerialLCD`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c interface · display · 5V · primary model `ST7066U` · declared MPN `ST7066U`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Serial-LCD-p-773.html)

This review is specific to the checked-in [board source](./GroveSerialLCD.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveSerialLCD.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveSerialLCD.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — No explicit I²C pull-up value is visible in the source; calculate bus rise time at the declared rail and document whether pull-ups are on-board or supplied by the host.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 80mm × 36mm |
| Source components | 6 |
| Source nets | 12 |
| Source traces | 23 |
| Schematic traces | 6 |
| PCB traces | 11 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| GND | ground |
| SCL | signal |
| SDA | signal |
| RX | signal |
| TX | signal |
| RX_MCU | signal |
| TX_MCU | signal |
| SIG | signal |
| STATUS | signal |
| EMITTER | signal |
| LOAD_NEG | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | RX, TX, VCC, GND |
| U1 | simple_chip | ST7066U | ST7066U | RX, TX, VCC, GND, CTS, RTS |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |
| R2 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |
| U3 | simple_chip | ST7066U display panel | ST7066U | VCC, GND, DATA |

### Trace sample

- `.J1 > .RX to net.RX`
- `.J1 > .TX to net.TX`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.U1 > .RX to net.RX_MCU`
- `.U1 > .TX to net.TX_MCU`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `.R1 > .pin1 to net.RX`
- `.R1 > .pin2 to net.RX_MCU`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 17 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#15360(from:.J1 > .RX to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15361(from:.J1 > .TX to:net.TX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15362(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15363(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15364(from:.U1 > .RX to:net.RX_MCU) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15365(from:.U1 > .TX to:net.TX_MCU) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15366(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15367(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
