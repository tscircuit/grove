# DESIGN_REVIEW1 — Grove - 3-Axis Digitial Compass v2.0

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove3AxisDigitialCompassV20`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** digital interface · sensor · 5V · primary model `HMC5883` · declared MPN `HMC5883`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./Grove3AxisDigitialCompassV20.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove3AxisDigitialCompassV20.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove3AxisDigitialCompassV20.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 37 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 33 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 26.2mm × 22mm |
| Source components | 11 |
| Source nets | 10 |
| Source traces | 37 |
| Schematic traces | 14 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| GND | ground |
| SCL | signal |
| SDA | signal |
| VCC | power |
| HSDA | signal |
| HSCL | signal |
| N_V3 | power |
| N_1 | signal |
| N_2 | signal |
| N_4 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | no emitted ports |
| C1 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| C5 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| U1 | simple_chip | HMC5883HMC5883 | HMC5883HMC5883 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16 |
| C2 | simple_capacitor | 220nF | C-0603_S-220NF | pin1, pin2 |
| C3 | simple_capacitor | 4.7uF | CC0603ZRY5V8BB475 | pin1, pin2 |
| J2 | simple_chip | TWIG_2.0DD'DD' | TWIG_2.0DD'DD' | P1, P2, P3, P4 |
| U3 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | P1, P2, P3 |
| Q1 | simple_chip | BSN20 | BSN20 | P1, P2, P3 |
| Q2 | simple_chip | BSN20 | BSN20 | P1, P2, P3 |
| C6 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.C1 > .pin2 to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C5 > .pin2 to net.GND`
- `.C5 > .pin1 to net.N_V3`
- `.U1 > .P9 to net.GND`
- `.U1 > .P11 to net.GND`
- `.U1 > .P8 to net.SCL`
- `.U1 > .P13 to net.SDA`
- `.U1 > .P15 to net.N_V3`
- `.U1 > .P7 to net.N_V3`
- `.U1 > .P1 to net.N_V3`
- `.U1 > .P5 to net.N_1`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 33 unnamed-trace warning(s), 3 refdes warning(s), 0 power metadata warning(s), and 2 ground metadata warning(s).

### Diagnostic sample

- Could not create resistor "R5". Invalid props for resistor "R5": connections ({"_errors":[],"pin6":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin6'"]},"pin5":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin5'"]},"pin3":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin3'"]},"pin4":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin4'"]},"pin8":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin8'"]},"pin7":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin7'"]}}) Details: Props: {   "name": "R5",   "displayName": "10k",   "manufacturerPartNumber": "RC0603FR-0710KL",   "footprint": {     "$$typeof": "Symbol(react.transitional.element)",     "type": "[Function HandAuthoredFootprint]",     "key": null,     "props": {       "name": "R5",       "pads": [         {           "name": "1",           "kind": "smd",           "x": -1.2065,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "2",           "kind": "smd",           "x": -0.381,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "3",           "kind": "smd",           "x": 0.381,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "4",           "kind": "smd",           "x": 1.2065,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "5",           "kind": "smd",           "x": 1.2065,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "6",           "kind": "smd",           "x": 0.381,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "7",           "kind": "smd",           "x": -0.381,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },       …
- The "J" prefix is being used with a <chip />, try using it with a <connector /> or <jumper />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- <trace#19381(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#19382(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#19383(from:.C5 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#19384(from:.C5 > .pin1 to:net.N_V3) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
