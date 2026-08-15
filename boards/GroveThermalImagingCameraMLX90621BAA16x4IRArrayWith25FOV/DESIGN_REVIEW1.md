# DESIGN_REVIEW1 — Grove Thermal Imaging Camera MLX90621 BAA 16x4 IR Array with 25 FOV

**Disposition:** NOT PRODUCTION READY
**Board directory:** `GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV`
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c interface · communications · 5V · primary model `MLX9062x` · declared MPN `MLX9062x`
**Upstream reference:** [Seeed source](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAA-16x4-IR-Array-with-25-FOV-p-4655.html)

This review is specific to the checked-in [board source](./GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit.tsx), its current generated circuit JSON, and its committed [PCB snapshot](./__snapshots__/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit-pcb.snap.svg) / [schematic snapshot](./__snapshots__/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit-schematic.snap.svg). A renderable snapshot is not fabrication approval.

## Critical design review

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

## Electrical and netlist evidence

| Item | Observed value |
| --- | --- |
| Declared board size | 52mm × 30mm |
| Source components | 7 |
| Source nets | 10 |
| Source traces | 26 |
| Schematic traces | 9 |
| PCB traces | 0 |
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
| SIG | signal |
| STATUS | signal |
| EMITTER | signal |

### Emitted source components and ports

| Refdes | tscircuit type | Value/display | Manufacturer part number | Emitted ports |
| --- | --- | --- | --- | --- |
| J1 | simple_chip | Grove 4-pin | B4B-PH-K-S | SCL, SDA, VCC, GND |
| U1 | simple_chip | MLX9062x | MLX9062x | SDA, SCL, VDD, GND, ADDR, INT, pin7, pin8 |
| U2 | simple_chip | XC6206P332MR-G | XC6206P332MR-G | GND, VOUT, VIN |
| C2 | simple_capacitor | 1uF | CC0603ZRY5V8BB105 | pin1, pin2 |
| C1 | simple_capacitor | 100nF | CC0603KRX7R9BB104 | pin1, pin2 |
| R1 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |
| R2 | simple_resistor | 4.7kΩ | RC0603FR-074K7L | pin1, pin2 |

### Trace sample

- `.U1 > .SDA to net.SDA`
- `.U1 > .SCL to net.SCL`
- `.U1 > .VDD to net.VDD`
- `.U1 > .GND to net.GND`
- `.U2 > .GND to net.GND`
- `.U2 > .VOUT to net.VDD`
- `.U2 > .VIN to net.VCC`
- `.C2 > .pin1 to net.VCC`
- `.C2 > .pin2 to net.GND`
- `J1.VCC to U2.VIN`
- `U2.GND to J1.GND`
- `U2.VOUT to U1.VDD`

## BOM and footprint review

The BOM check confirms that source components carry non-empty manufacturer part numbers, but that is only a syntactic gate. For this board, independently verify lifecycle/orderability, exact package revision, tolerances/ratings, pin-1 polarity, assembly side, approved alternates, and whether the declared part is actually the part named by the upstream Grove revision.

- Footprint strings declared in source: `soic8`, `sot23`, `0603`.
- Embedded custom pad/graphic footprint data: no.
- Placeholder/unspecified MPN count in generated source components: 0.
- Supplier-backed footprint and courtyard approval: **not evidenced by the current source or snapshots**.

## Routing, placement, and snapshot diagnostics

The latest generated artifacts report 2 autorouting error(s), 11 disconnected-port error(s), 11 missing-PCB-trace error(s), 0 source-pin-missing-trace warning(s), 15 unnamed-trace warning(s), 0 refdes warning(s), 0 power metadata warning(s), and 0 ground metadata warning(s).

### Diagnostic sample

- <trace#109823(from:.U1 > .SDA to:net.SDA) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109824(from:.U1 > .SCL to:net.SCL) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109825(from:.U1 > .VDD to:net.VDD) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109826(from:.U1 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109827(from:.U2 > .GND to:net.GND) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109828(from:.U2 > .VOUT to:net.VDD) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109829(from:.U2 > .VIN to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.
- <trace#109830(from:.C2 > .pin1 to:net.VCC) /> is missing a name. Add a name prop to make the trace easier to identify.

## Required release gates

1. Reconcile every component and port above with the exact Seeed schematic, PCB revision, datasheets, and approved BOM; resolve all placeholder or alternate-part assumptions.
2. Prove Grove connector pin order, voltage domain, signal direction, pull states, protection, and return-current path at the host interface.
3. Approve every footprint, courtyard, polarity marker, mounting hole, board outline, keepout, connector orientation, and assembly origin against mechanical drawings.
4. Complete routed copper and run ERC/DRC with no autorouting, disconnected-port, missing-trace, clearance, or unconnected-power exceptions; the current snapshot is only a visual artifact.
5. Build and bench-test a revision-controlled prototype for startup, worst-case current/thermal behavior, signal integrity, calibration, and the board-specific risks listed above.

**Review conclusion:** hold this board from fabrication until the P0/P1 findings and all release gates above are closed and re-reviewed.
