# DESIGN_REVIEW1 — Grove mini PIR motion sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveMiniPIRMotionSensor`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** analog interface · sensor · 5V · primary model `BISS0001` · declared MPN `BISS0001`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-mini-PIR-motion-sensor-p-2930.html)

This review is specific to the checked-in [board source](./GroveMiniPIRMotionSensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveMiniPIRMotionSensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveMiniPIRMotionSensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 40.56mm × 22.511mm |
| Source components | 35 |
| Source nets | 22 |
| Source traces | 108 |
| Schematic traces | 34 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| GND | ground |
| D1 | signal |
| N_1 | signal |
| N_2 | signal |
| VCC5 | power |
| N_5 | signal |
| N_6 | signal |
| N_7 | signal |
| N_11 | signal |
| N_12 | signal |
| N_8 | signal |
| N_9 | signal |
| N_10 | signal |
| N_13 | signal |
| N_14 | signal |
| N_15 | signal |
| N_17 | signal |
| N_4 | signal |
| N_16 | signal |
| N_19 | signal |
| VDD | power |
| N_20 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | no emitted ports |
| R1 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| C3 | simple_capacitor | 10nF_X7R | C-C0603-10NF_X7R | pin1, pin2 |
| C1 | simple_capacitor | 10nF_X7R | C-C0603-10NF_X7R | pin1, pin2 |
| R3 | simple_resistor | 4.7M | R-R0603-4.7M | pin1, pin2 |
| R4 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| R5 | simple_resistor | 1M_1% | R-R0603-1M_1% | pin1, pin2 |
| C8 | simple_capacitor | 22nF_X7R | C-C0603-22NF_X7R | pin1, pin2 |
| R7 | simple_resistor | 1K | RC0603FR-071KL | pin1, pin2 |
| C9 | simple_capacitor | 10nF_X7R | C-C0603-10NF_X7R | pin1, pin2 |
| R8 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| C10 | simple_capacitor | 22nF_X7R | C-C0603-22NF_X7R | pin1, pin2 |
| R9 | simple_resistor | 1M_1% | R-R0603-1M_1% | pin1, pin2 |
| R10 | simple_resistor | 3.3K_1% | R-R0603-3.3K_1% | pin1, pin2 |
| C2 | simple_capacitor | 10nF_X7R | C-C0603-10NF_X7R | pin1, pin2 |
| U3 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | P1, P2, P3 |
| C7 | simple_capacitor | 6.3V 47uF | C-AVX-A-6.3V47UF | pin1, pin2 |
| C5 | simple_capacitor | 6.3V 47uF | C-AVX-A-6.3V47UF | pin1, pin2 |
| R11 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| R13 | simple_resistor | 2M_1% | R-R0603-2M_1% | pin1, pin2 |
| R14 | simple_resistor | 10K | RC0603FR-0710KL | pin1, pin2 |
| J2 | simple_chip | HEADER-1X3 | HEADER-1X3 | P1, P2, P3 |
| D3 | simple_diode | CESD5V0D1 | CESD5V0D1 | anode, cathode |
| D4 | simple_diode | CESD5V0D1 | CESD5V0D1 | anode, cathode |
| C6 | simple_capacitor | 10uF_X7R_thin | C-C0805-10UF_X7R_THIN | pin1, pin2 |
| C4 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R16 | simple_resistor | 0R | RC0603JR-070RL | pin1, pin2 |
| D5 | simple_diode | CESD5V0D1 | CESD5V0D1 | anode, cathode |
| R17 | simple_resistor | 1M_1% | R-R0603-1M_1% | pin1, pin2 |
| R15 | simple_resistor | 100K | R-R0603-100K | pin1, pin2 |
| U2 | simple_chip | LHI778 | LHI778 | P1, P2, P3 |
| U1 | simple_chip | TM2291 | TM2291 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16 |
| R18 | simple_resistor | 13R | R-R1206-13R | pin1, pin2 |
| J3 | simple_chip | B4B-PH-K-S | B4B-PH-K-S | P1, P2, P3, P4 |
| C11 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.R1 > .pin1 to net.D1`
- `.R1 > .pin2 to net.N_5`
- `.C3 > .pin2 to net.GND`
- `.C3 > .pin1 to net.N_7`
- `.C1 > .pin2 to net.GND`
- `.C1 > .pin1 to net.N_2`
- `.R3 > .pin2 to net.N_6`
- `.R3 > .pin1 to net.N_7`
- `.R4 > .pin2 to net.N_8`
- `.R4 > .pin1 to net.VDD`
- `.R5 > .pin1 to net.GND`
- `.R5 > .pin2 to net.N_9`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 86 unnamed-trace warning(s), 2 refdes warning(s), 1 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- The "J" prefix is being used with a <chip />, try using it with a <connector /> or <jumper />
- The "J" prefix is being used with a <chip />, try using it with a <connector /> or <jumper />
- <trace#75113(from:.R1 > .pin1 to:net.D1) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#75114(from:.R1 > .pin2 to:net.N_5) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#75115(from:.C3 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#75116(from:.C3 > .pin1 to:net.N_7) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#75117(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#75118(from:.C1 > .pin1 to:net.N_2) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
