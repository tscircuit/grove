# DESIGN_REVIEW1 — Grove - Rotary Angle Sensor

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveRotaryAngleSensor2`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** analog interface · input · 5V · primary model `WH09-2-103` · declared MPN `WH09-2-103`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)

This review is specific to the checked-in [board source](./GroveRotaryAngleSensor2.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveRotaryAngleSensor2.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveRotaryAngleSensor2.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 3 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P2 — 3 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 22mm × 22.5mm |
| Source components | 1 |
| Source nets | 3 |
| Source traces | 3 |
| Schematic traces | 2 |
| PCB traces | 0 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| GND | ground |
| N_2 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| ROTATION | simple_chip | WH09-2-103 | WH09-2-103 | P1, P2, P3, P4, P5 |

### Trace sample

- `.ROTATION > .P1 to net.VCC`
- `.ROTATION > .P3 to net.GND`
- `.ROTATION > .P2 to net.N_2`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 3 unnamed-trace warning(s), 1 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- Could not create jumper "J1". No pin labels provided and pin number or label is not a number: "N$2". Details: Props: {   "name": "J1",   "displayName": "Grove 4-pin",   "manufacturerPartNumber": "B4B-PH-K-S",   "pinLabels": {     "pin1": "N$2",     "pin2": "NC",     "pin3": "VCC",     "pin4": "GND"   },   "pinAttributes": {     "N$2": {       "mustBeConnected": true,       "isGpio": true     },     "NC": {       "doNotConnect": true     },     "VCC": {       "requiresPower": true,       "requiresVoltage": "5V",       "mustBeConnected": true     },     "GND": {       "requiresGround": true,       "mustBeConnected": true     }   },   "connections": {     "pin3": "net.VCC",     "pin4": "net.GND",     "pin1": "net.N_2"   },   "footprint": {     "$$typeof": "Symbol(react.transitional.element)",     "type": "[Function HandAuthoredFootprint]",     "key": null,     "props": {       "name": "J1",       "pads": [         {           "name": "1",           "kind": "platedhole",           "x": -3,           "y": 0,           "drill": 0.8,           "diameter": 1.27,           "shape": "square",           "rotation": 0         },         {           "name": "2",           "kind": "platedhole",           "x": -1,           "y": 0,           "drill": 0.8,           "diameter": 1.27,           "shape": "round",           "rotation": 0         },         {           "name": "3",           "kind": "platedhole",           "x": 1,           "y": 0,           "drill": 0.8,           "diameter": 1.27,           "shape": "round",           "rotation": 0         },         {           "name": "4",           "kind": "platedhole",           "x": 3,           "y": 0,           "drill": 0.8,           "diameter": 1.27,           "shape": "round",           "rotation": 0         }       ],       "excludePadNames": [         "SS1",         "SS2"       ]     },     "_owner": {       "tag": 0,       "key": null,       "elementType": "[Function GroveRotaryAngleSensor2]",       "type": "[Function GroveRotaryAngleSensor2]",       "stateNode": null,       "return": {         "tag": 3,         "key": null,         "e…
- The "R" prefix is being used with a <chip />, try using it with a <resistor />
- <trace#93353(from:.ROTATION > .P1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#93354(from:.ROTATION > .P3 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#93355(from:.ROTATION > .P2 to:net.N_2) /> is missing a name. Add a name prop to make the trace easier to identify.
- Could not find port for selector "J1.pin3". Component "J1" found, but does not have pin "pin3". It has no ports
- Could not find port for selector "J1.pin4". Component "J1" found, but does not have pin "pin4". It has no ports
- Could not find port for selector "J1.pin1". Component "J1" found, but does not have pin "pin1". It has no ports

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
