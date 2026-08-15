# DESIGN_REVIEW1 — Grove - 3-Axis Analog Accelerometer

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove3AxisAnalogAccelerometer`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog interface · sensor · 5V · primary model `ADXL335` · declared MPN `ADXL335`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./Grove3AxisAnalogAccelerometer.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove3AxisAnalogAccelerometer.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove3AxisAnalogAccelerometer.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 34mm × 28mm |
| Source components | 7 |
| Source nets | 10 |
| Source traces | 24 |
| Schematic traces | 10 |
| PCB traces | 0 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| VDD | power |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | ADXL335 | ADXL335 | SIG, VCC, GND, AUX |
| U2 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | GND, VOUT, VIN |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 10kΩ | RC0603FR-0710KL | pin1, pin2 |
| C_MOTION | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.U1 > .SIG to net.SIG`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.U2 > .GND to net.GND`
- `.U2 > .VOUT to net.VDD`
- `.U2 > .VIN to net.VCC`
- `.C2 > .pin1 to net.VCC`
- `.C2 > .pin2 to net.GND`
- `J1.VCC to U2.VIN`
- `U2.GND to J1.GND`
- `U2.VOUT to U1.VCC`
- `C2.pin1 to U2.VIN`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `sot23`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 10 disconnected-port error(s), 10 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 14 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#15252(from:.U1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15253(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15254(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15255(from:.U2 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15256(from:.U2 > .VOUT to:net.VDD) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15257(from:.U2 > .VIN to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15258(from:.C2 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#15259(from:.C2 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
