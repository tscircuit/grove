# DESIGN_REVIEW1 — Grove - Capacitive Moisture Sensor (Corrosion Resistant)

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-Capacitive-Moisture`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** analog interface · sensor · 5V · primary model `NE555DR` · declared MPN `NE555DR`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/)

This review is specific to the checked-in [board source](./Grove-Capacitive-Moisture.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-Capacitive-Moisture.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-Capacitive-Moisture.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 29 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — 3 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — The source uses direct component-to-component traces without emitted named nets; reconcile the intended net classes and power domains before ERC/DRC sign-off.
- P1 — No mounting-hole/mechanical datum declaration is visible; verify panel fit, fastener clearance, and board orientation before fabrication.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 23.5mm × 92.1mm |
| Source components | 15 |
| Source nets | 0 |
| Source traces | 29 |
| Schematic traces | 12 |
| PCB traces | 29 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | missing |

### Nets

| Net | Role |
| --- | --- |
| — | no emitted nets |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| CSENSE | simple_capacitor | Capacitive soil probe | CC0603JRNPO9BN101 | pin1, pin2 |
| U1 | simple_chip | NE555DR | NE555DR | GND, TRIG, OUT, RESET, CTRL, THRESH, DISCH, VCC |
| U2 | simple_op_amp | LMV358ID | LMV358ID | pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8 |
| R1 | simple_resistor | 1.5kΩ | RC0603FR-071K5L | pin1, pin2 |
| R2 | simple_resistor | 2.4kΩ | RC0603FR-072K4L | pin1, pin2 |
| R3 | simple_resistor | 10kΩ | RC0603FR-0710KL | pin1, pin2 |
| R4 | simple_resistor | 0Ω | RC0603JR-070RL | pin1, pin2 |
| R5 | simple_resistor | 1MΩ | RC0603FR-071ML | pin1, pin2 |
| R6 | simple_resistor | 100Ω | RC0603JR-07100RL | pin1, pin2 |
| C1 | simple_capacitor | 470pF | CC0603JRNPO9BN471 | pin1, pin2 |
| C2 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| C3 | simple_capacitor | 10nF | CC0603KRX7R9BB103 | pin1, pin2 |
| C4 | simple_capacitor | 4.7uF | CC0603ZRY5V8BB475 | pin1, pin2 |
| D1 | simple_diode | 1N4148 | 1N4148 | pin1, pin2 |

### Trace sample

- `J1.VCC to U1.VCC`
- `J1.VCC to U1.RESET`
- `J1.VCC to U2.positive_supply`
- `J1.VCC to R1.pin2`
- `J1.VCC to C2.pin2`
- `C2.pin1 to J1.GND`
- `U1.GND to J1.GND`
- `U2.negative_supply to J1.GND`
- `R1.pin1 to R2.pin2`
- `R1.pin1 to U1.DISCH`
- `R2.pin1 to U1.TRIG`
- `R2.pin1 to U1.THRESH`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `soic8`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 3 source-pin-missing-trace warning(s), 29 unnamed-trace warning(s), 1 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- Component CSENSE has ftype="simple_capacitor" but reference designator should start with C
- <trace#370(from:J1.VCC to:U1.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#371(from:J1.VCC to:U1.RESET) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#372(from:J1.VCC to:U2.positive_supply) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#373(from:J1.VCC to:R1.pin2) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#374(from:J1.VCC to:C2.pin2) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#375(from:C2.pin1 to:J1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#376(from:U1.GND to:J1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
