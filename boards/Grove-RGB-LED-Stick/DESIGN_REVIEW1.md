# DESIGN_REVIEW1 — Grove - RGB LED Stick (10 WS2813 Mini)

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-RGB-LED-Stick`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital interface · actuator · 5V · primary model `WS2813` · declared MPN `WS2813`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/)

This review is specific to the checked-in [board source](./Grove-RGB-LED-Stick.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-RGB-LED-Stick.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-RGB-LED-Stick.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 79 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 13 reference-designator convention warning(s) require cleanup before release.
- P1 — No mounting-hole/mechanical datum declaration is visible; verify panel fit, fastener clearance, and board orientation before fabrication.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 80mm × 10mm |
| Source components | 34 |
| Source nets | 12 |
| Source traces | 97 |
| Schematic traces | 59 |
| PCB traces | 85 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | missing |

### Nets

| Net | Role |
| --- | --- |
| VCC_RGB | power |
| GND | ground |
| LED1_VCC | signal |
| LED2_VCC | signal |
| LED3_VCC | signal |
| LED4_VCC | signal |
| LED5_VCC | signal |
| LED6_VCC | signal |
| LED7_VCC | signal |
| LED8_VCC | signal |
| LED9_VCC | signal |
| LED10_VCC | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SIG, NC, VCC, GND |
| LED1 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED2 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED3 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED4 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED5 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED6 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED7 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED8 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED9 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| LED10 | simple_chip | WS2813-MINI | WS2813-MINI | VDD, DO, GND, DIN, BIN, VCC |
| C1 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C2 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C3 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C4 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C5 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C6 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C7 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C8 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C9 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| C10 | simple_capacitor | 100nF | CC0402KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R2 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R3 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R4 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R5 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R6 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R7 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R8 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R9 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| R10 | simple_resistor | 200Ω | RC0402JR-07200RL | pin1, pin2 |
| RIN | simple_resistor | 220Ω | RC0402JR-07220RL | pin1, pin2 |
| CIN | simple_capacitor | 10uF | CC0805ZRY5V8BB106 | pin1, pin2 |
| CBULK | simple_capacitor | 220uF | EEH-ZA1E221P | pin1, pin2 |

### Trace sample

- `.LED1 > .VDD to net.VCC_RGB`
- `.LED1 > .VCC to net.LED1_VCC`
- `.LED1 > .GND to net.GND`
- `.LED2 > .VDD to net.VCC_RGB`
- `.LED2 > .VCC to net.LED2_VCC`
- `.LED2 > .GND to net.GND`
- `.LED3 > .VDD to net.VCC_RGB`
- `.LED3 > .VCC to net.LED3_VCC`
- `.LED3 > .GND to net.GND`
- `.LED4 > .VDD to net.VCC_RGB`
- `.LED4 > .VCC to net.LED4_VCC`
- `.LED4 > .GND to net.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `0402`, `0805`, `1206`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 79 unnamed-trace warning(s), 13 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- The "L" prefix is being used with a <chip />, try using it with an <inductor />

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
