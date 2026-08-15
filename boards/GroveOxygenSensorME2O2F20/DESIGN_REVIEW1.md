# DESIGN_REVIEW1 — Grove Oxygen Sensor ME2 O2 f20

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveOxygenSensorME2O2F20`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog interface · sensor · 5V · primary model `ME2-O2` · declared MPN `ME2-O2`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Oxygen-Sensor-ME2-O2-f20.html)

This review is specific to the checked-in [board source](./GroveOxygenSensorME2O2F20.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveOxygenSensorME2O2F20.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveOxygenSensorME2O2F20.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — 1 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 60mm × 38mm |
| Source components | 5 |
| Source nets | 9 |
| Source traces | 14 |
| Schematic traces | 4 |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | ME2-O2 | ME2-O2 | SIG, VCC, GND, AUX |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 10kΩ | RC0603FR-0710KL | pin1, pin2 |
| R_HEAT | simple_resistor | 33Ω | RC1206JR-0733RL | pin1, pin2 |

### Trace sample

- `.U1 > .SIG to net.SIG`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `U1.VCC to C1.pin1`
- `C1.pin2 to U1.GND`
- `.R1 > .pin1 to net.SIG`
- `.R1 > .pin2 to net.GND`
- `J1.SIG to U1.SIG`
- `J1.SIG to R1.pin1`
- `R1.pin2 to J1.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `sot23`, `0603`, `1206`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 5 disconnected-port error(s), 5 missing-PCB-trace error(s), 1 source-pin-missing-trace warning(s), 9 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#86240(from:.U1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86241(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86242(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86243(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86244(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86245(from:.R1 > .pin1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86246(from:.R1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#86247(from:.R_HEAT > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
