# DESIGN_REVIEW1 — Grove - Formaldehyde sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveFormaldehydeSensor`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** digital interface · sensor · 5V · primary model `WSP2110` · declared MPN `WSP2110`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./GroveFormaldehydeSensor.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveFormaldehydeSensor.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveFormaldehydeSensor.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 10 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 1 disconnected-port errors, 1 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 102mm × 106.21mm |
| Source components | 3 |
| Source nets | 3 |
| Source traces | 10 |
| Schematic traces | 5 |
| PCB traces | 0 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| SIG | signal |
| VCC | power |
| GND | ground |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | WSP2110 | WSP2110 | P1, P2, P3, P4 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.J1 > .pin1 to net.SIG`
- `.J1 > .pin3 to net.VCC`
- `.J1 > .pin4 to net.GND`
- `.U1 > .P4 to net.SIG`
- `.U1 > .P1 to net.VCC`
- `.U1 > .P3 to net.VCC`
- `.U1 > .P2 to net.GND`
- `.C1 > .pin2 to net.VCC`
- `.C1 > .pin1 to net.GND`
- `J1.pin3 to U1.P1`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 1 disconnected-port error(s), 1 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 9 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- Could not create resistor "R1". Invalid props for resistor "R1": connections ({"_errors":[],"pin3":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin3'"]}}) Details: Props: {   "name": "R1",   "displayName": "10K",   "manufacturerPartNumber": "RC0603FR-0710KL",   "footprint": {     "$$typeof": "Symbol(react.transitional.element)",     "type": "[Function HandAuthoredFootprint]",     "key": null,     "props": {       "name": "R1",       "pads": [         {           "name": "1",           "kind": "platedhole",           "x": -2.54,           "y": -0.25,           "drill": 0.8,           "diameter": 1.35,           "shape": "round",           "rotation": 0         },         {           "name": "2",           "kind": "platedhole",           "x": 2.54,           "y": -0.25,           "drill": 0.8,           "diameter": 1.35,           "shape": "round",           "rotation": 0         },         {           "name": "3",           "kind": "platedhole",           "x": 0,           "y": 2.25,           "drill": 0.8,           "diameter": 1.35,           "shape": "square",           "rotation": 0         }       ],       "graphics": [         {           "kind": "line",           "x1": -3.4,           "y1": 3.5,           "x2": 3.4,           "y2": 3.5         },         {           "kind": "line",           "x1": 3.4,           "y1": 3.5,           "x2": 3.4,           "y2": -3.5         },         {           "kind": "line",           "x1": 3.4,           "y1": -3.5,           "x2": -3.4,           "y2": -3.5         },         {           "kind": "line",           "x1": -3.4,           "y1": -3.5,           "x2": -3.4,           "y2": 3.5         }       ]     },     "_owner": {       "tag": 0,       "key": null,       "elementType": "[Function GroveFormaldehydeSensor]",       "type": "[Function GroveFormaldehydeSensor]",       "stateNode": null,       "return": {         "tag": 3,         "key": null,         "elementType": null,         "type": null,         "stateNode": {           "tag": 1,           "containerInfo": {             "children": [               {                 "renderPhaseStates": {                   "ReactSubtreesRender"…
- <trace#44141(from:.J1 > .pin1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44142(from:.J1 > .pin3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44143(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44144(from:.U1 > .P4 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44145(from:.U1 > .P1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44146(from:.U1 > .P3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#44147(from:.U1 > .P2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
