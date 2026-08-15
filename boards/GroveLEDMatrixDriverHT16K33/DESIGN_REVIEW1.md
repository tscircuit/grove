# DESIGN_REVIEW1 — Grove - LED Matrix Driver (HT16K33)

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveLEDMatrixDriverHT16K33`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital interface · display · 5V · primary model `HT16K33` · declared MPN `HT16K33`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)

This review is specific to the checked-in [board source](./GroveLEDMatrixDriverHT16K33.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveLEDMatrixDriverHT16K33.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveLEDMatrixDriverHT16K33.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 11 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 40mm × 20mm |
| Source components | 4 |
| Source nets | 12 |
| Source traces | 14 |
| Schematic traces | 5 |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | HT16K33 | HT16K33 | SIG, VCC, GND, AUX |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| U3 | simple_chip | HT16K33 display panel | HT16K33 | VCC, GND, DATA |

### Trace sample

- `.J1 > .SIG to net.SIG`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.U1 > .SIG to net.SIG`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `.U3 > .VCC to net.VCC`
- `.U3 > .GND to net.GND`
- `.U3 > .DATA to net.SIG`
- `J1.VCC to U1.VCC`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers. The JLCPCB coverage gate also records a valid C-number supplier selection for each emitted source component; that selection is an assembly candidate, not a claim that the Grove module's electrical or mechanical identity has been independently approved. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `jlcpcb:C117051`, `jlcpcb:C131334`, `jlcpcb:C14663`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- JLCPCB footprint import reference: present in the board-local source; compare the imported supplier geometry and courtyard against the retained local pad geometry before release.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 11 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#9819(from:.J1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9820(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9821(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9822(from:.U1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9823(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9824(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9825(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9826(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
