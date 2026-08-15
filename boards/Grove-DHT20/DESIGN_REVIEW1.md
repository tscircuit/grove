# DESIGN_REVIEW1 — Grove - Temperature & Humidity Sensor DHT20 v2.1

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-DHT20`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c interface · sensor · 5V · primary model `DHT20` · declared MPN `DHT20`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/)

This review is specific to the checked-in [board source](./Grove-DHT20.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-DHT20.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-DHT20.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 25 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — The source uses direct component-to-component traces without emitted named nets; reconcile the intended net classes and power domains before ERC/DRC sign-off.
- P1 — The declared I²C interface is missing a canonical SCL/SDA net in the emitted netlist; reconcile the Grove contract before release.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 40mm × 20mm |
| Source components | 13 |
| Source nets | 0 |
| Source traces | 25 |
| Schematic traces | 11 |
| PCB traces | 25 |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U2 | simple_chip | DHT20 | DHT20 | SDA, GND, VDD, SCL |
| U1 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | GND, VOUT, VIN |
| Q1 | simple_mosfet | 2N7002 | 2N7002 | pin1, pin2, pin3 |
| Q2 | simple_mosfet | 2N7002 | 2N7002 | pin1, pin2, pin3 |
| R1 | simple_resistor | 10kΩ | RC0402FR-0710KL | pin1, pin2 |
| R2 | simple_resistor | 10kΩ | RC0402FR-0710KL | pin1, pin2 |
| R3 | simple_resistor | 10kΩ | RC0402FR-0710KL | pin1, pin2 |
| R4 | simple_resistor | 10kΩ | RC0402FR-0710KL | pin1, pin2 |
| R5 | simple_resistor | 390Ω | RC0402JR-07390RL | pin1, pin2 |
| C1 | simple_capacitor | 1uF | CC0402ZRY5V8BB105 | pin1, pin2 |
| C2 | simple_capacitor | 1uF | CC0402ZRY5V8BB105 | pin1, pin2 |
| C3 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `J1.VCC to U1.VIN`
- `J1.VCC to R1.pin1`
- `J1.VCC to R3.pin1`
- `J1.VCC to C1.pin1`
- `C1.pin2 to J1.GND`
- `U1.GND to J1.GND`
- `U1.VOUT to C2.pin1`
- `C2.pin2 to U1.GND`
- `U1.VOUT to Q1.gate`
- `U1.VOUT to Q2.gate`
- `U1.VOUT to R2.pin1`
- `U1.VOUT to R4.pin1`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `sot23`, `0402`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 25 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#893(from:J1.VCC to:U1.VIN) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#894(from:J1.VCC to:R1.pin1) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#895(from:J1.VCC to:R3.pin1) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#896(from:J1.VCC to:C1.pin1) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#897(from:C1.pin2 to:J1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#898(from:U1.GND to:J1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#899(from:U1.VOUT to:C2.pin1) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#900(from:C2.pin2 to:U1.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
