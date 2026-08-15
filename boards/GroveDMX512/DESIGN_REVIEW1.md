# DESIGN_REVIEW1 — Grove - DMX512

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveDMX512`
**Implementation class:** board-local Eagle geometry materialization
**Catalogue declaration:** uart interface · communications · 5V · primary model `SN75176` · declared MPN `SN75176`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_network_module_intro/)

This review is specific to the checked-in [board source](./GroveDMX512.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveDMX512.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveDMX512.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.
- P1 — This source embeds custom pad/graphic geometry; compare every pad number, polarity marker, courtyard, drill, and assembly origin to the supplier drawing.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 42.2mm × 22.5mm |
| Source components | 5 |
| Source nets | 6 |
| Source traces | 24 |
| Schematic traces | 7 |
| PCB traces | 0 |
| Routing disabled | yes |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| SIG | signal |
| VCC | power |
| GND | ground |
| N_1 | signal |
| N_2 | signal |
| N_3 | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | SN75176 | SN75176 | P1, P2, P3, P4, P5, P6, P7, P8 |
| R1 | simple_resistor | 100_1% | R-R0603-100_1% | pin1, pin2 |
| C1 | simple_capacitor | 100nf | CC0603KRX7R9BB104 | pin1, pin2 |
| J2 | simple_chip | HEADER-1X3 | HEADER-1X3 | P1, P2, P3 |

### Trace sample

- `.J1 > .pin1 to net.SIG`
- `.J1 > .pin3 to net.VCC`
- `.J1 > .pin4 to net.GND`
- `.U1 > .P4 to net.SIG`
- `.U1 > .P8 to net.VCC`
- `.U1 > .P3 to net.VCC`
- `.U1 > .P5 to net.GND`
- `.U1 > .P2 to net.GND`
- `.U1 > .P1 to net.N_1`
- `.U1 > .P6 to net.N_2`
- `.U1 > .P7 to net.N_3`
- `.R1 > .pin1 to net.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: none.
- Embedded custom pad/graphic footprint data: yes — compare the local pad geometry against the supplier drawing.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 18 unnamed-trace warning(s), 1 refdes warning(s), 1 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- The "J" prefix is being used with a <chip />, try using it with a <connector /> or <jumper />
- <trace#39850(from:.J1 > .pin1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39851(from:.J1 > .pin3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39852(from:.J1 > .pin4 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39853(from:.U1 > .P4 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39854(from:.U1 > .P8 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39855(from:.U1 > .P3 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#39856(from:.U1 > .P5 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
