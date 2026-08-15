# DESIGN_REVIEW1 — Grove - RGB LED Stick (10 WS2813 Mini)

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-RGB-LED-Stick`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital interface · actuator · 5V · primary model `WS2813` · declared MPN `WS2813`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/)

This review is specific to the checked-in [board source](./Grove-RGB-LED-Stick.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-RGB-LED-Stick.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-RGB-LED-Stick.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 89mm × 20mm |
| Source components | 21 |
| Source nets | 12 |
| Source traces | 47 |
| Schematic traces | 38 |
| PCB traces | 41 |
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
| PIX1 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX2 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C2 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX3 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C3 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX4 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C4 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX5 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C5 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX6 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C6 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX7 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C7 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX8 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C8 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX9 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C9 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| PIX10 | simple_chip | WS2813 | WS2813 | BI, VCC, DOUT, DIN, GND, BO |
| C10 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |

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

- Footprint strings declared in source: `jlcpcb:C965558`, `jlcpcb:C131334`, `jlcpcb:C14663`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- JLCPCB footprint import reference: present in the board-local source; compare the imported supplier geometry and courtyard against the retained local pad geometry before release.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 44 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#710(from:.J1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#711(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#712(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#713(from:.PIX1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#714(from:.PIX1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#715(from:.PIX1 > .DIN to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#716(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#717(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
