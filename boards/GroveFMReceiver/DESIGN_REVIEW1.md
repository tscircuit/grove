# DESIGN_REVIEW1 — Grove FM Receiver

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveFMReceiver`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c interface · utility · 5V · primary model `SX6119` · declared MPN `SX6119`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-FM-Receiver.html)

This review is specific to the checked-in [board source](./GroveFMReceiver.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveFMReceiver.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveFMReceiver.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — 2 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 40mm × 20mm |
| Source components | 5 |
| Source nets | 9 |
| Source traces | 16 |
| Schematic traces | 5 |
| PCB traces | 0 |
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
| SIG | signal |
| STATUS | signal |
| EMITTER | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U1 | simple_chip | SX6119 | SX6119 | SDA, SCL, VCC, GND, ADDR, INT, pin7, pin8 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| R2 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |

### Trace sample

- `.U1 > .SDA to net.SDA`
- `.U1 > .SCL to net.SCL`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `U1.VCC to C1.pin1`
- `C1.pin2 to U1.GND`
- `.R1 > .pin1 to net.VCC`
- `.R1 > .pin2 to net.SCL`
- `.R2 > .pin1 to net.VCC`
- `.R2 > .pin2 to net.SDA`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `soic8`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 6 disconnected-port error(s), 6 missing-PCB-trace error(s), 2 source-pin-missing-trace warning(s), 10 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#43856(from:.U1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43857(from:.U1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43858(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43859(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43860(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43861(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43862(from:.R1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#43863(from:.R1 > .pin2 to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
