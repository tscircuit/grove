# DESIGN_REVIEW1 — Grove - UART Wifi V2

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveUARTWifiV2`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart interface · communications · 5V · primary model `ESP8285` · declared MPN `ESP8285`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_network_module_intro/)

This review is specific to the checked-in [board source](./GroveUARTWifiV2.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveUARTWifiV2.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveUARTWifiV2.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — 2 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 52mm × 30mm |
| Source components | 5 |
| Source nets | 9 |
| Source traces | 16 |
| Schematic traces | 7 |
| PCB traces | 0 |
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
| SIG | signal |
| STATUS | signal |
| EMITTER | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | RX, TX, VCC, GND |
| U1 | simple_chip | ESP8285 | ESP8285 | RX, TX, VCC, GND, CTS, RTS, pin7, pin8 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |
| R2 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |

### Trace sample

- `.U1 > .RX to net.RX`
- `.U1 > .TX to net.TX`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `U1.VCC to C1.pin1`
- `C1.pin2 to U1.GND`
- `.R1 > .pin1 to net.RX`
- `.R1 > .pin2 to net.RX`
- `.R2 > .pin1 to net.TX`
- `.R2 > .pin2 to net.TX`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `soic8`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 6 disconnected-port error(s), 6 missing-PCB-trace error(s), 2 source-pin-missing-trace warning(s), 10 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#113915(from:.U1 > .RX to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113916(from:.U1 > .TX to:net.TX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113917(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113918(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113919(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113920(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113921(from:.R1 > .pin1 to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#113922(from:.R1 > .pin2 to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
