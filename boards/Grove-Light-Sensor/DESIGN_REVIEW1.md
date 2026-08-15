# DESIGN_REVIEW1 — Grove - Light Sensor v1.2

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-Light-Sensor`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** analog interface · sensor · 5V · primary model `GL5528` · declared MPN `GL5528`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-Light_Sensor/)

This review is specific to the checked-in [board source](./Grove-Light-Sensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-Light-Sensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-Light-Sensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — 3 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — The source uses direct component-to-component traces without emitted named nets; reconcile the intended net classes and power domains before ERC/DRC sign-off.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 20mm × 20mm |
| Source components | 4 |
| Source nets | 0 |
| Source traces | 8 |
| Schematic traces | 4 |
| PCB traces | 8 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| — | no emitted nets |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| LIGHT | simple_resistor | GL5528 photoresistor | GL5528 | pin1, pin2 |
| R1 | simple_resistor | 10kΩ | RC0603FR-0710KL | pin1, pin2 |
| U1 | simple_op_amp | LM358 | LM358 | pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8 |

### Trace sample

- `J1.VCC to LIGHT.pin2`
- `LIGHT.pin1 to R1.pin2`
- `R1.pin1 to J1.GND`
- `LIGHT.pin1 to U1.non_inverting_input`
- `U1.output to U1.inverting_input`
- `U1.output to J1.SIG`
- `U1.positive_supply to J1.VCC`
- `U1.negative_supply to J1.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `0603`, `soic8`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 3 source-pin-missing-trace warning(s), 8 unnamed-trace warning(s), 1 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- Component LIGHT has ftype="simple_resistor" but reference designator should start with R
- <trace#2944(from:J1.VCC to:LIGHT.pin2) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2945(from:LIGHT.pin1 to:R1.pin2) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2946(from:R1.pin1 to:J1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2947(from:LIGHT.pin1 to:U1.non_inverting_input) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2948(from:U1.output to:U1.inverting_input) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2949(from:U1.output to:J1.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#2950(from:U1.positive_supply to:J1.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
