# DESIGN_REVIEW1 — Grove - Touch Sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveTouchSensor`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** analog interface · input · 5V · primary model `AT42QT1070` · declared MPN `AT42QT1070`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./GroveTouchSensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveTouchSensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveTouchSensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 39 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — 7 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 31.146mm × 15mm |
| Source components | 16 |
| Source nets | 13 |
| Source traces | 52 |
| Schematic traces | 11 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| N_V3 | power |
| GND | ground |
| SDA | signal |
| SCL | signal |
| N_10 | signal |
| N_2 | signal |
| N_4 | signal |
| N_5 | signal |
| N_6 | signal |
| N_7 | signal |
| N_8 | signal |
| N_9 | signal |
| N_1 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, 3V3, GND |
| U1 | simple_chip | AT42QT1070-SSU | AT42QT1070-SSU | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14 |
| C1 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C3 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R3 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R5 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R1 | simple_resistor | 0R | RC0603JR-070RL | pin1, pin2 |
| R4 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R6 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R7 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R8 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R9 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R10 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R11 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R12 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |

### Trace sample

- `.J1 > .pin3 to net.N_V3`
- `.J1 > .pin4 to net.GND`
- `.J1 > .pin2 to net.SDA`
- `.J1 > .pin1 to net.SCL`
- `.U1 > .P1 to net.N_V3`
- `.U1 > .P4 to net.N_V3`
- `.U1 > .P14 to net.GND`
- `.U1 > .P3 to net.SDA`
- `.U1 > .P6 to net.SCL`
- `.U1 > .P5 to net.N_10`
- `.U1 > .P7 to net.N_2`
- `.U1 > .P8 to net.N_4`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 7 source-pin-missing-trace warning(s), 39 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#112316(from:.J1 > .pin3 to:net.N_V3) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112317(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112318(from:.J1 > .pin2 to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112319(from:.J1 > .pin1 to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112320(from:.U1 > .P1 to:net.N_V3) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112321(from:.U1 > .P4 to:net.N_V3) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112322(from:.U1 > .P14 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#112323(from:.U1 > .P3 to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
