# DESIGN_REVIEW1 — Grove - LCD RGB Backlight v5.0

**Disposition:** NOT PRODUCTION READY
**Board directory:** `Grove-LCD-RGB-Backlight`
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c interface · display · 5V · primary model `HD44780` · declared MPN `HD44780`
**Upstream reference:** [Seeed source](https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/)

This review is specific to the checked-in [board source](./Grove-LCD-RGB-Backlight.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/Grove-LCD-RGB-Backlight.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/Grove-LCD-RGB-Backlight.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 4 reference-designator convention warning(s) require cleanup before release.
- P1 — The declared I²C interface is missing a canonical SCL/SDA net in the emitted netlist; reconcile the Grove contract before release.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 80mm × 36mm |
| Source components | 11 |
| Source nets | 2 |
| Source traces | 35 |
| Schematic traces | 14 |
| PCB traces | 33 |
| Routing disabled | no |
| Grove connector declaration | present |
| Mounting/mechanical declaration | present |

### Nets

| Net | Role |
| --- | --- |
| VCC | power |
| GND | ground |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| LCD1 | simple_chip | 16x2 RGB LCD | JHD1313 | GND, VCC, CONTRAST, RS, RW, E, D4, D5, D6, D7, BL_COM, BL_R, BL_G, BL_B |
| U1 | simple_chip | JHD1313 LCD controller | JHD1313 | GND, VCC, SCL, SDA, RS, RW, E, D4, D5, D6, D7, CONTRAST |
| U2 | simple_chip | SGM31323 RGB driver | SGM31323 | GND, VCC, SCL, SDA, R, G, B |
| R1 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| R2 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| RR | simple_resistor | 100Ω | RC0603JR-07100RL | pin1, pin2 |
| RG | simple_resistor | 100Ω | RC0603JR-07100RL | pin1, pin2 |
| RB | simple_resistor | 100Ω | RC0603JR-07100RL | pin1, pin2 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |

### Trace sample

- `J1.VCC to net.VCC`
- `U1.VCC to net.VCC`
- `U2.VCC to net.VCC`
- `LCD1.VCC to net.VCC`
- `LCD1.BL_COM to net.VCC`
- `R1.pin1 to net.VCC`
- `R2.pin1 to net.VCC`
- `C1.pin1 to net.VCC`
- `C2.pin1 to net.VCC`
- `J1.GND to net.GND`
- `U1.GND to net.GND`
- `U2.GND to net.GND`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `soic12`, `qfn16`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 0 autorouting error(s), 0 disconnected-port error(s), 0 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 35 unnamed-trace warning(s), 4 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- The "L" prefix is being used with a <chip />, try using it with an <inductor />
- Component RR has ftype="simple_resistor" but reference designator should start with R
- Component RG has ftype="simple_resistor" but reference designator should start with R
- Component RB has ftype="simple_resistor" but reference designator should start with R
- <trace#1622(from:J1.VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#1623(from:U1.VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#1624(from:U2.VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#1625(from:LCD1.VCC to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
