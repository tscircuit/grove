# DESIGN_REVIEW1 — Grove - 125KHz RFID Reader

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove125KHzRFIDReader`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart interface · communications · 5V · primary model `EM4100` · declared MPN `EM4100`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_network_module_intro/)

This review is specific to the checked-in [board source](./Grove125KHzRFIDReader.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove125KHzRFIDReader.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove125KHzRFIDReader.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 52mm × 30mm |
| Source components | 5 |
| Source nets | 12 |
| Source traces | 20 |
| Schematic traces | 3 |
| PCB traces | 8 |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | RX, TX, VCC, GND |
| U1 | simple_chip | EM4100 | EM4100 | RX, TX, VCC, GND, CTS, RTS |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |
| R2 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |

### Trace sample

- `.J1 > .RX to net.RX`
- `.J1 > .TX to net.TX`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.U1 > .RX to net.RX_MCU`
- `.U1 > .TX to net.TX_MCU`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `.R1 > .pin1 to net.RX`
- `.R1 > .pin2 to net.RX_MCU`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 14 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#880(from:.J1 > .RX to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#881(from:.J1 > .TX to:net.TX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#882(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#883(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#884(from:.U1 > .RX to:net.RX_MCU) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#885(from:.U1 > .TX to:net.TX_MCU) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#886(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#887(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
