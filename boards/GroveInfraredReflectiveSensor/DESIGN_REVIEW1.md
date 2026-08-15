# DESIGN_REVIEW1 — Grove - Infrared Reflective Sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveInfraredReflectiveSensor`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** digital interface · sensor · 5V · primary model `LM393` · declared MPN `LM393`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./GroveInfraredReflectiveSensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveInfraredReflectiveSensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveInfraredReflectiveSensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 20.006mm × 15.807mm |
| Source components | 8 |
| Source nets | 7 |
| Source traces | 26 |
| Schematic traces | 12 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| SIG | signal |
| VCC | power |
| N_1 | signal |
| GND | ground |
| N_12 | signal |
| N_5 | signal |
| N_2 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | 002-LMV358 | 002-LMV358 | P1, P2, P3, P4, P5, P6, P7, P8 |
| D1 | simple_led | red | red | anode, cathode |
| R1 | simple_resistor | 1M | RC0603FR-071ML | pin1, pin2 |
| R2 | simple_resistor | 270R | R-0603_S-270R | pin1, pin2 |
| R3 | simple_resistor | 4.7k | RC0603FR-074K7L | pin1, pin2 |
| S1 | simple_chip | RPR220 | RPR220 | P1, P2, P3, P4 |
| C1 | simple_capacitor | 1nF | C-0603-1NF | pin1, pin2 |

### Trace sample

- `.J1 > .pin1 to net.SIG`
- `.J1 > .pin3 to net.VCC`
- `.J1 > .pin4 to net.GND`
- `.U1 > .P1 to net.SIG`
- `.U1 > .P8 to net.VCC`
- `.U1 > .P2 to net.N_1`
- `.U1 > .P4 to net.GND`
- `.U1 > .P3 to net.N_2`
- `.D1 > .cathode to net.SIG`
- `.D1 > .anode to net.N_12`
- `.R1 > .pin2 to net.VCC`
- `.R1 > .pin1 to net.N_2`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 22 unnamed-trace warning(s), 1 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- Could not create resistor "R4". Invalid props for resistor "R4": connections ({"_errors":[],"pin3":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin3'"]}}) Details: Props: {   "name": "R4",   "displayName": "10K",   "manufacturerPartNumber": "RC0603FR-0710KL",   "footprint": {     "$$typeof": "Symbol(react.transitional.element)",     "type": "[Function HandAuthoredFootprint]",     "key": null,     "props": {       "name": "R4",       "pads": [         {           "name": "1",           "kind": "smd",           "x": -1.275,           "y": -1.45,           "width": 1.3,           "height": 1.6,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "3",           "kind": "smd",           "x": 1.275,           "y": -1.45,           "width": 1.3,           "height": 1.6,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "2",           "kind": "smd",           "x": 0,           "y": 1.45,           "width": 2,           "height": 1.6,           "shape": "rect",           "rotation": 0,           "layer": "top"         }       ],       "graphics": [         {           "kind": "line",           "x1": -2.3,           "y1": -1.85,           "x2": -2.3,           "y2": 1.85         },         {           "kind": "line",           "x1": -2.3,           "y1": 1.85,           "x2": -1.3,           "y2": 1.85         },         {           "kind": "line",           "x1": 2.3,           "y1": -1.85,           "x2": 2.3,           "y2": 1.85         },         {           "kind": "line",           "x1": 2.3,           "y1": 1.85,           "x2": 1.3,           "y2": 1.85         },         {           "kind": "line",           "x1": -0.4,           "y1": -1.85,           "x2": 0.4,           "y2": -1.85         }       ]     },     "_owner": {       "tag": 0,       "key": null,       "elementType": "[Function GroveInfraredReflectiveSensor]",       "type": "[Function GroveInfraredReflectiveSensor]",       "stateNode": null,       "return": {         "tag": 3,         "key": null,         "elementType": null,         "type": n…
- The "S" prefix is being used with a <chip />, try using it with a <switch /> or <pushbutton />
- <trace#63578(from:.J1 > .pin1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#63579(from:.J1 > .pin3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#63580(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#63581(from:.U1 > .P1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#63582(from:.U1 > .P8 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#63583(from:.U1 > .P2 to:net.N_1) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
