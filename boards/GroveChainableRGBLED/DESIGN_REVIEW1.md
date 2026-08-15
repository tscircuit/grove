# DESIGN_REVIEW1 — Grove Chainable RGB LED

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveChainableRGBLED`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital interface · actuator · 5V · primary model `P9813` · declared MPN `P9813`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Chainable-RGB-LED.html)

This review is specific to the checked-in [board source](./GroveChainableRGBLED.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveChainableRGBLED.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveChainableRGBLED.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — 1 source pin(s) are marked as requiring connectivity but have no trace evidence; resolve or intentionally no-connect them in the schematic.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 40mm × 20mm |
| Source components | 4 |
| Source nets | 9 |
| Source traces | 12 |
| Schematic traces | 3 |
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
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| U1 | simple_chip | P9813 | P9813 | SIG, VCC, GND, AUX |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 1kΩ | RC0603FR-071KL | pin1, pin2 |

### Trace sample

- `.U1 > .SIG to net.SIG`
- `.U1 > .VCC to net.VCC`
- `.U1 > .GND to net.GND`
- `.C1 > .pin1 to net.VCC`
- `.C1 > .pin2 to net.GND`
- `U1.VCC to C1.pin1`
- `C1.pin2 to U1.GND`
- `.R1 > .pin1 to net.SIG`
- `.R1 > .pin2 to net.GND`
- `J1.SIG to U1.SIG`
- `J1.SIG to R1.pin1`
- `R1.pin2 to J1.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `sot23`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 1 autorouting error(s), 5 disconnected-port error(s), 5 missing-PCB-trace error(s), 1 source-pin-missing-trace warning(s), 7 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#34310(from:.U1 > .SIG to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34311(from:.U1 > .VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34312(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34313(from:.C1 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34314(from:.C1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34315(from:.R1 > .pin1 to:net.SIG) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#34316(from:.R1 > .pin2 to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- Port VCC on J1 is missing a trace

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
