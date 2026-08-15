# DESIGN_REVIEW1 — Grove - Digital Light Sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveDigitalLightSensor`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** analog interface · sensor · 5V · primary model `TSL2561` · declared MPN `TSL2561`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./GroveDigitalLightSensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveDigitalLightSensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveDigitalLightSensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 22mm × 26.2mm |
| Source components | 12 |
| Source nets | 7 |
| Source traces | 39 |
| Schematic traces | 15 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| N_V | power |
| GND | ground |
| SDA | signal |
| SCL | signal |
| N__3V | signal |
| T_SDA | signal |
| T_SCL | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, 5V, GND |
| U1 | simple_chip | TSL2561 | TSL2561 | P1, P2, P3, P4, P5, P6 |
| U3 | simple_chip | XC6206MR | XC6206MR | P1, P2, P3 |
| C1 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C3 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| R2 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| R3 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| R4 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| Q1 | simple_chip | BSN20 | BSN20 | P1, P2, P3 |
| Q2 | simple_chip | BSN20 | BSN20 | P1, P2, P3 |

### Trace sample

- `.J1 > .pin3 to net.N_V`
- `.J1 > .pin4 to net.GND`
- `.J1 > .pin2 to net.SDA`
- `.J1 > .pin1 to net.SCL`
- `.U1 > .P3 to net.GND`
- `.U1 > .P2 to net.GND`
- `.U1 > .P1 to net.N__3V`
- `.U1 > .P6 to net.T_SDA`
- `.U1 > .P4 to net.T_SCL`
- `.U3 > .P1 to net.N_V`
- `.U3 > .P3 to net.GND`
- `.U3 > .P2 to net.N__3V`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 32 unnamed-trace warning(s), 2 refdes warning(s), 3 power metadata warning(s), and 2 ground metadata warning(s).

### Diagnostic sample

- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- <trace#37880(from:.J1 > .pin3 to:net.N_V) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#37881(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#37882(from:.J1 > .pin2 to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#37883(from:.J1 > .pin1 to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#37884(from:.U1 > .P3 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#37885(from:.U1 > .P2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
