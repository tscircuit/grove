# DESIGN_REVIEW1 — Grove 3 Axis Digital Accelerometer 16g

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove3AxisDigitalAccelerometer16g`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** analog interface · sensor · 5V · primary model `ADXL345` · declared MPN `ADXL345`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-16g.html)

This review is specific to the checked-in [board source](./Grove3AxisDigitalAccelerometer16g.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove3AxisDigitalAccelerometer16g.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove3AxisDigitalAccelerometer16g.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 42 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 22mm × 22.5mm |
| Source components | 11 |
| Source nets | 7 |
| Source traces | 42 |
| Schematic traces | 18 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| GND | ground |
| SDA | signal |
| SCL | signal |
| VCC | power |
| SCL1 | signal |
| SDA1 | signal |
| N_V5 | power |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U1 | simple_chip | ADXL345 | ADXL345 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14 |
| U5 | simple_chip | XC6206P252MR-G | XC6206P252MR-G | P1, P2, P3 |
| Q1 | simple_chip | 2N7002 | 2N7002 | P1, P2, P3 |
| Q2 | simple_chip | 2N7002 | 2N7002 | P1, P2, P3 |
| R2 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| R3 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| R4 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| R5 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| C5 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| C6 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |

### Trace sample

- `.J1 > .pin4 to net.GND`
- `.J1 > .pin2 to net.SDA`
- `.J1 > .pin1 to net.SCL`
- `.J1 > .pin3 to net.VCC`
- `.U1 > .P5 to net.GND`
- `.U1 > .P4 to net.GND`
- `.U1 > .P2 to net.GND`
- `.U1 > .P12 to net.GND`
- `.U1 > .P10 to net.GND`
- `.U1 > .P14 to net.SCL1`
- `.U1 > .P13 to net.SDA1`
- `.U1 > .P1 to net.N_V5`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 35 unnamed-trace warning(s), 2 refdes warning(s), 3 power metadata warning(s), and 2 ground metadata warning(s).

### Diagnostic sample

- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- <trace#16754(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#16755(from:.J1 > .pin2 to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#16756(from:.J1 > .pin1 to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#16757(from:.J1 > .pin3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#16758(from:.U1 > .P5 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#16759(from:.U1 > .P4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
