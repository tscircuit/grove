# DESIGN_REVIEW1 — Grove - BLE v1

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveBLEV1`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** uart interface · communications · 5V · primary model `HM-11` · declared MPN `HM-11`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_network_module_intro/)

This review is specific to the checked-in [board source](./GroveBLEV1.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveBLEV1.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveBLEV1.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 64 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 52 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 39.846mm × 19.78mm |
| Source components | 22 |
| Source nets | 12 |
| Source traces | 64 |
| Schematic traces | 22 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| GND | ground |
| LED | signal |
| N_7 | signal |
| BT_RX | signal |
| BT_TX | signal |
| VCC_3V3 | power |
| TXD | signal |
| RXD | signal |
| VCC | power |
| N_13 | signal |
| N_18 | signal |
| N__3V | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | no emitted ports |
| U2 | simple_chip | HM-11 | HM-11 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16 |
| C4 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R3 | simple_resistor | 1k | RC0603FR-071KL | pin1, pin2 |
| D1 | simple_led | Green | Green | anode, cathode |
| Q1 | simple_chip | 2n7002 | 2n7002 | P1, P2, P3 |
| Q2 | simple_chip | 2n7002 | 2n7002 | P1, P2, P3 |
| U1 | simple_chip | TD6810 | TD6810 | P1, P2, P3, P4, P5 |
| R1 | simple_resistor | 680k_1% | R-0603@1-680K_1% | pin1, pin2 |
| R2 | simple_resistor | 150k_1% | R-0603@1-150K_1% | pin1, pin2 |
| C1 | simple_capacitor | 22pF | CC0603JRNPO9BN220 | pin1, pin2 |
| C2 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| C3 | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| R4 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R5 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R7 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| R6 | simple_resistor | 10k | RC0603FR-0710KL | pin1, pin2 |
| C6 | simple_capacitor | 47uF/10v | C-AVX-B-47UF/10V | pin1, pin2 |
| L2 | simple_inductor | 470R 2A | L-L0805-470R2A | pin1, pin2 |
| J2 | simple_chip | B4B-PH-K-S | B4B-PH-K-S | P1, P2, P3, P4 |
| L1 | simple_inductor | 10uH | LQH3NPN100M53L | pin1, pin2 |
| D2 | simple_diode | 6.2v-250mW | 6.2v-250mW | anode, cathode |

### Trace sample

- `.U2 > .P12 to net.GND`
- `.U2 > .P15 to net.LED`
- `.U2 > .P9 to net.VCC_3V3`
- `.U2 > .P2 to net.TXD`
- `.U2 > .P4 to net.RXD`
- `.C4 > .pin1 to net.GND`
- `.C4 > .pin2 to net.VCC_3V3`
- `.R3 > .pin1 to net.LED`
- `.R3 > .pin2 to net.N_7`
- `.D1 > .cathode to net.GND`
- `.D1 > .anode to net.N_7`
- `.Q1 > .P1 to net.BT_RX`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 52 unnamed-trace warning(s), 3 refdes warning(s), 0 power metadata warning(s), and 2 ground metadata warning(s).

### Diagnostic sample

- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "Q" prefix is being used with a <chip />, try using it with a <transistor />
- The "J" prefix is being used with a <chip />, try using it with a <connector /> or <jumper />
- <trace#31378(from:.U2 > .P12 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#31379(from:.U2 > .P15 to:net.LED) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#31380(from:.U2 > .P9 to:net.VCC_3V3) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#31381(from:.U2 > .P2 to:net.TXD) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#31382(from:.U2 > .P4 to:net.RXD) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
