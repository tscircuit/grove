# DESIGN_REVIEW1 — Grove - BLE (dual model) v1.0

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveBLEDualModelV10`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** uart interface · communications · 5V · primary model `HM-13` · declared MPN `HM-13`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_network_module_intro/)

This review is specific to the checked-in [board source](./GroveBLEDualModelV10.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveBLEDualModelV10.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveBLEDualModelV10.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 55 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 45 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 38.83mm × 19.78mm |
| Source components | 17 |
| Source nets | 10 |
| Source traces | 55 |
| Schematic traces | 16 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VIN | power |
| GND | ground |
| N_V3 | power |
| TX | signal |
| RX | signal |
| N_7 | signal |
| N_8 | signal |
| N_11 | signal |
| TX1 | signal |
| RX1 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | RX, TX, VIN, GND |
| U3 | simple_chip | XC6206P302MR | XC6206P302MR | P1, P2, P3 |
| C1 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C3 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| U1 | simple_chip | HM-13 | HM-13 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16 |
| D1 | simple_led | BLUE | BLUE | anode, cathode |
| R1 | simple_resistor | 1K | RC0603FR-071KL | pin1, pin2 |
| R2 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| C4 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| K2 | simple_chip | BUTTON-4P | BUTTON-4P | P1, P2, P3, P4 |
| Q2 | simple_chip | 2N7002 | 2N7002 | P1, P2, P3 |
| R3 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| R4 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| Q1 | simple_chip | 2N7002 | 2N7002 | P1, P2, P3 |
| R5 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |
| R6 | simple_resistor | 4.7K | RC0603FR-074K7L | pin1, pin2 |

### Trace sample

- `.J1 > .pin3 to net.VIN`
- `.J1 > .pin4 to net.GND`
- `.J1 > .pin2 to net.TX`
- `.J1 > .pin1 to net.RX`
- `.U3 > .P1 to net.VIN`
- `.U3 > .P3 to net.GND`
- `.U3 > .P2 to net.N_V3`
- `.C1 > .pin2 to net.VIN`
- `.C1 > .pin1 to net.GND`
- `.C2 > .pin1 to net.GND`
- `.C2 > .pin2 to net.N_V3`
- `.C3 > .pin1 to net.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 45 unnamed-trace warning(s), 2 refdes warning(s), 1 power metadata warning(s), and 2 ground metadata warning(s).

### Diagnostic sample

- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- <trace#30876(from:.J1 > .pin3 to:net.VIN) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30877(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30878(from:.J1 > .pin2 to:net.TX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30879(from:.J1 > .pin1 to:net.RX) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30880(from:.U3 > .P1 to:net.VIN) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#30881(from:.U3 > .P3 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
