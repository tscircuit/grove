# DESIGN_REVIEW1 — Grove - Temperature & Humidity Sensor DHT20 v2.1

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-DHT20`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c interface · sensor · 5V · primary model `DHT20` · declared MPN `DHT20`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/)

This review is specific to the checked-in [board source](./Grove-DHT20.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-DHT20.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-DHT20.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 30mm × 24mm |
| Source components | 6 |
| Source nets | 12 |
| Source traces | 20 |
| Schematic traces | 6 |
| PCB traces | 12 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| GND | ground |
| SCL | signal |
| SDA | signal |
| RX | signal |
| TX | signal |
| RX_MCU | signal |
| TX_MCU | signal |
| SIG | signal |
| STATUS | signal |
| EMITTER | signal |
| LOAD_NEG | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U1 | simple_chip | DHT20 | DHT20 | VDD, SDA, GND, SCL |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| R2 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| C_ENVIRONMENTAL | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.J1 > .SCL to net.SCL`
- `.J1 > .SDA to net.SDA`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.U1 > .VDD to net.VCC`
- `.U1 > .SDA to net.SDA`
- `.U1 > .GND to net.GND`
- `.U1 > .SCL to net.SCL`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `.R1 > .pin1 to net.VCC`
- `.R1 > .pin2 to net.SCL`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 16 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#128(from:.J1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#129(from:.J1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#130(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#131(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#132(from:.U1 > .VDD to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#133(from:.U1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#134(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#135(from:.U1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
