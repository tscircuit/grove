# DESIGN_REVIEW1 — Grove Qwiic Hub

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveQwiicHub`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital interface · utility · 5V · primary model `TCA9548A` · declared MPN `TCA9548A`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Qwiic-Hub-p-4531.html)

This review is specific to the checked-in [board source](./GroveQwiicHub.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveQwiicHub.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveQwiicHub.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 52mm × 28mm |
| Source components | 7 |
| Source nets | 13 |
| Source traces | 25 |
| Schematic traces | 9 |
| PCB traces | 16 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| VDD | power |
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
| U1 | simple_chip | TCA9548A | TCA9548A | SD0, SC0, SD1, SC1, SD2, SC2, SD3, SC3, GND, SD4, SC4, SD5, SC5, SD6, SC6, SD7, SC7, A2, SCL, SDA, VCC, A0, A1, RESET, EP |
| U2 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | GND, VOUT, VIN |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| R2 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |

### Trace sample

- `.J1 > .SCL to net.SCL`
- `.J1 > .SDA to net.SDA`
- `.J1 > .VCC to net.VCC`
- `.J1 > .GND to net.GND`
- `.U1 > .GND to net.GND`
- `.U1 > .SCL to net.SCL`
- `.U1 > .SDA to net.SDA`
- `.U1 > .VCC to net.VCC`
- `.U1 > .EP to net.GND`
- `.U2 > .GND to net.GND`
- `.U2 > .VOUT to net.VDD`
- `.U2 > .VIN to net.VCC`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers. The JLCPCB coverage gate also records a valid C-number supplier selection for each emitted source component; that selection is an assembly candidate, not a claim that the Grove module's electrical or mechanical identity has been independently approved. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `jlcpcb:C555456`, `jlcpcb:C131334`, `jlcpcb:C14663`, `jlcpcb:C5446`, `jlcpcb:C15849`, `sot23`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- JLCPCB footprint import reference: present in the board-local source; compare the imported supplier geometry and courtyard against the retained local pad geometry before release.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 20 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#11842(from:.J1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11843(from:.J1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11844(from:.J1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11845(from:.J1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11846(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11847(from:.U1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11848(from:.U1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#11849(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
