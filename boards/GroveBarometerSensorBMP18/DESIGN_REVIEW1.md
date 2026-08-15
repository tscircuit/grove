# DESIGN_REVIEW1 — Grove Barometer Sensor BMP18

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveBarometerSensorBMP18`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** i2c interface · sensor · 5V · primary model `BMP180` · declared MPN `BMP180`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Barometer-Sensor-BMP18-p-1840.html)

This review is specific to the checked-in [board source](./GroveBarometerSensorBMP18.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveBarometerSensorBMP18.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveBarometerSensorBMP18.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 32 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 30 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 26.2mm × 22mm |
| Source components | 8 |
| Source nets | 8 |
| Source traces | 32 |
| Schematic traces | 14 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| GND | ground |
| VCC | power |
| N_3 | signal |
| V25 | signal |
| SCL | signal |
| SDA | signal |
| SDA1 | signal |
| SCL1 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U1 | simple_chip | BMP085 | BMP085 | P1, P2, P3, P4, P5, P6, P7, P8 |
| U3 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | P1, P2, P3, P4, P5 |
| U4 | simple_chip | BMP180 | BMP180 | P1, P2, P3, P4, P5, P6, P7, P8 |
| C1 | simple_capacitor | 10u | C-0603-10U | pin1, pin2 |
| C2 | simple_capacitor | 470p | C-0603-470P | pin1, pin2 |
| C3 | simple_capacitor | 100n | C-0603-100N | pin1, pin2 |
| C4 | simple_capacitor | 10u | C-0603-10U | pin1, pin2 |

### Trace sample

- `.J1 > .pin4 to net.GND`
- `.J1 > .pin3 to net.VCC`
- `.J1 > .pin1 to net.SCL`
- `.J1 > .pin2 to net.SDA`
- `.U1 > .P1 to net.GND`
- `.U1 > .P4 to net.V25`
- `.U1 > .P3 to net.V25`
- `.U1 > .P7 to net.SDA1`
- `.U1 > .P6 to net.SCL1`
- `.U3 > .P2 to net.GND`
- `.U3 > .P3 to net.VCC`
- `.U3 > .P1 to net.VCC`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 30 unnamed-trace warning(s), 0 refdes warning(s), 2 power metadata warning(s), and 1 ground metadata warning(s).

### Diagnostic sample

- Could not create resistor "R1". Invalid props for resistor "R1": connections ({"_errors":[],"pin5":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin5'"]},"pin6":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin6'"]},"pin8":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin8'"]},"pin4":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin4'"]},"pin3":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin3'"]},"pin7":{"_errors":["Invalid enum value. Expected 'pin1' \| 'pin2' \| 'pos' \| 'neg', received 'pin7'"]}}) Details: Props: {   "name": "R1",   "displayName": "10k",   "manufacturerPartNumber": "RC0603FR-0710KL",   "footprint": {     "$$typeof": "Symbol(react.transitional.element)",     "type": "[Function HandAuthoredFootprint]",     "key": null,     "props": {       "name": "R1",       "pads": [         {           "name": "1",           "kind": "smd",           "x": -1.2065,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "2",           "kind": "smd",           "x": -0.381,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "3",           "kind": "smd",           "x": 0.381,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "4",           "kind": "smd",           "x": 1.2065,           "y": -0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "5",           "kind": "smd",           "x": 1.2065,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "6",           "kind": "smd",           "x": 0.381,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },         {           "name": "7",           "kind": "smd",           "x": -0.381,           "y": 0.6985,           "width": 0.508,           "height": 0.635,           "shape": "rect",           "rotation": 0,           "layer": "top"         },       …
- <trace#30000(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30001(from:.J1 > .pin3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30002(from:.J1 > .pin1 to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30003(from:.J1 > .pin2 to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30004(from:.U1 > .P1 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30005(from:.U1 > .P4 to:net.V25) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30006(from:.U1 > .P3 to:net.V25) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
