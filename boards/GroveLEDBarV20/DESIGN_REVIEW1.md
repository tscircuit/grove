# DESIGN_REVIEW1 — Grove LED Bar v2 0

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveLEDBarV20`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog interface · actuator · 5V · primary model `MY9221` · declared MPN `MY9221`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-LED-Bar-v2-0.html)

This review is specific to the checked-in [board source](./GroveLEDBarV20.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveLEDBarV20.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveLEDBarV20.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 80mm × 20mm |
| Source components | 5 |
| Source nets | 12 |
| Source traces | 15 |
| Schematic traces | 6 |
| PCB traces | 9 |
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
| PIX1 | simple_chip | MY9221 | MY9221 | BI, VCC, DOUT, DIN, GND, BO |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX2 | simple_chip | MY9221 | MY9221 | BI, VCC, DOUT, DIN, GND, BO |
| C2 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

### Trace sample

- `.J1 > .SIG to net.SIG`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.PIX1 > .VCC to net.VCC`
- `.PIX1 > .GND to net.GND`
- `.PIX1 > .DIN to net.SIG`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `.PIX2 > .VCC to net.VCC`
- `.PIX2 > .GND to net.GND`
- `.C2 > .pin1 to net.VCC`
- `.C2 > .pin2 to net.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers. The JLCPCB coverage gate also records a valid C-number supplier selection for each emitted source component; that selection is an assembly candidate, not a claim that the Grove module's electrical or mechanical identity has been independently approved. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `jlcpcb:C117051`, `jlcpcb:C131334`, `jlcpcb:C14663`, `jlcpcb:C7394039`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- JLCPCB footprint import reference: present in the board-local source; compare the imported supplier geometry and courtyard against the retained local pad geometry before release.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 12 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#9384(from:.J1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9385(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9386(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9387(from:.PIX1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9388(from:.PIX1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9389(from:.PIX1 > .DIN to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9390(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#9391(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
