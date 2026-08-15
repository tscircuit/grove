# DESIGN_REVIEW1 — Grove catalogue production-readiness review

Generated from the checked-in board-local TSX sources and the latest `dist/boards/**/circuit.json` artifacts. This is a release review, not a claim that a passing renderer snapshot is fabrication approval.

## Executive disposition

The catalogue is structurally complete but is **not production-ready as a set**. Every entry now has a board-local TSX source and a committed PCB/schematic snapshot, but the current artifacts still require board-specific BOM, datasheet, footprint, mechanical, power, and routed-copper sign-off. The strongest repo-wide blocker is that 394/394 boards produced at least one PCB trace in the latest build; 0/394 emitted autorouting/disconnected-port/missing-PCB-trace diagnostics, and 0/394 contain at least one placeholder MPN.

The wrapper-removal requirement is satisfied at the entry-point level: 394/394 board circuit files are board-local and 0 board circuit files import a profile wrapper. The 12 retained hand-authored boards remain source-specific; 67 entries preserve local Eagle pad/net data; the remaining entries are explicit board-local engineering drafts and are called out as such below.

## Validation evidence

- `bun run typecheck` — PASS (all 394 board entry points type-check).
- `bun run build` — completed 395 circuits (394 boards plus the snapshot fixture); tscircuit emitted placement/routing diagnostics that are recorded per board below.
- `bun run bom:check` — PASS (394 boards have manufacturer part numbers on every source component; placeholder MPNs remain review findings where applicable).
- `bun run snapshot:update` — PASS (790 canonicalized PCB/schematic SVGs: 394 boards plus the example).
- `bun run validate:catalogue` — intentionally remains a review gate: run it after the board-specific findings below are addressed; this document does not treat renderer output alone as fabrication approval.

## Aggregate artifact metrics

| Metric | Value |
| --- | ---: |
| Manifest boards | 394 |
| Board-local TSX entry points | 394 |
| Profile-wrapper entry points | 0 |
| Source components | 2406 |
| Source traces | 7762 |
| PCB traces | 4641 |
| Schematic traces | 2661 |
| Boards with PCB traces | 394 |
| Boards with autorouting/disconnect/missing-trace diagnostics | 0 |
| Boards with placeholder MPNs | 0 |
| Unnamed source-trace warnings | 6187 |
| Refdes convention warnings | 0 |
| Power metadata warnings | 0 |
| Ground metadata warnings | 0 |
| Source-pin-missing-trace warnings | 0 |

## Review method

Each section below names the exact source file, links its upstream reference, records the catalogue declaration, and reports counts from that board's current circuit JSON. Findings are intentionally conservative: a schematic/PCB snapshot demonstrates reproducible rendering, not correct pin mapping, a manufacturable footprint, safe power dissipation, or a complete routed layout. P0/P1 findings block release; P2 findings should be closed before sign-off.

## Board-by-board findings

### Grove - Button v1.0 — `Grove-Button`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Button/DESIGN_REVIEW1.md)
**Source:** [Grove-Button.circuit.tsx](boards/Grove-Button/Grove-Button.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Button/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Buzzer v1.1b — `Grove-Buzzer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Buzzer/DESIGN_REVIEW1.md)
**Source:** [Grove-Buzzer.circuit.tsx](boards/Grove-Buzzer/Grove-Buzzer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Buzzer/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 8 source components · 25 source traces · 15 PCB traces · 8 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Capacitive Moisture Sensor (Corrosion Resistant) — `Grove-Capacitive-Moisture`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Capacitive-Moisture/DESIGN_REVIEW1.md)
**Source:** [Grove-Capacitive-Moisture.circuit.tsx](boards/Grove-Capacitive-Moisture/Grove-Capacitive-Moisture.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** analog · sensor · primary model `NE555DR` · declared MPN `NE555DR` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Temperature & Humidity Sensor DHT20 v2.1 — `Grove-DHT20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-DHT20/DESIGN_REVIEW1.md)
**Source:** [Grove-DHT20.circuit.tsx](boards/Grove-DHT20/Grove-DHT20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 6 source components · 20 source traces · 12 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Digital PIR Motion Sensor v1.0 — `Grove-Digital-PIR`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Digital-PIR/DESIGN_REVIEW1.md)
**Source:** [Grove-Digital-PIR.circuit.tsx](boards/Grove-Digital-PIR/Grove-Digital-PIR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Digital-PIR-Sensor/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - LCD RGB Backlight v5.0 — `Grove-LCD-RGB-Backlight`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-LCD-RGB-Backlight/DESIGN_REVIEW1.md)
**Source:** [Grove-LCD-RGB-Backlight.circuit.tsx](boards/Grove-LCD-RGB-Backlight/Grove-LCD-RGB-Backlight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - Light Sensor v1.2 — `Grove-Light-Sensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Light-Sensor/DESIGN_REVIEW1.md)
**Source:** [Grove-Light-Sensor.circuit.tsx](boards/Grove-Light-Sensor/Grove-Light-Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Light_Sensor/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - OLED Display 0.96 inch (SSD1315) v1.0 — `Grove-OLED-SSD1315`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-OLED-SSD1315/DESIGN_REVIEW1.md)
**Source:** [Grove-OLED-SSD1315.circuit.tsx](boards/Grove-OLED-SSD1315/Grove-OLED-SSD1315.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-OLED-Display-0.96-SSD1315/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - Relay v1.2 — `Grove-Relay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Relay/DESIGN_REVIEW1.md)
**Source:** [Grove-Relay.circuit.tsx](boards/Grove-Relay/Grove-Relay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Relay/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 8 source components · 25 source traces · 15 PCB traces · 8 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - RGB LED Stick (10 WS2813 Mini) — `Grove-RGB-LED-Stick`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-RGB-LED-Stick/DESIGN_REVIEW1.md)
**Source:** [Grove-RGB-LED-Stick.circuit.tsx](boards/Grove-RGB-LED-Stick/Grove-RGB-LED-Stick.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 21 source components · 47 source traces · 41 PCB traces · 39 schematic traces · 0 placeholder MPNs · 44 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove - Rotary Angle Sensor v1.2 — `Grove-Rotary-Angle-Sensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Rotary-Angle-Sensor/DESIGN_REVIEW1.md)
**Source:** [Grove-Rotary-Angle-Sensor.circuit.tsx](boards/Grove-Rotary-Angle-Sensor/Grove-Rotary-Angle-Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Ultrasonic Ranger v2.0 — `Grove-Ultrasonic-Ranger`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove-Ultrasonic-Ranger/DESIGN_REVIEW1.md)
**Source:** [Grove-Ultrasonic-Ranger.circuit.tsx](boards/Grove-Ultrasonic-Ranger/Grove-Ultrasonic-Ranger.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/)
**Implementation class:** retained hand-authored source
**Catalogue declaration:** digital · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - AHT20 I2C Industrial Grade Temperature&Humidity Sensor — `GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor/DESIGN_REVIEW1.md)
**Source:** [GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor.circuit.tsx](boards/GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor/GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `AHT20` · declared MPN `AHT20` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temp and Humi Sensor(SHT31) — `GroveTempAndHumiSensorSHT31`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTempAndHumiSensorSHT31/DESIGN_REVIEW1.md)
**Source:** [GroveTempAndHumiSensorSHT31.circuit.tsx](boards/GroveTempAndHumiSensorSHT31/GroveTempAndHumiSensorSHT31.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SHT31` · declared MPN `SHT31` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - I2C High Accuracy Temp&Humi Sensor(SHT35) — `GroveI2CHighAccuracyTempHumiSensorSHT35`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CHighAccuracyTempHumiSensorSHT35/DESIGN_REVIEW1.md)
**Source:** [GroveI2CHighAccuracyTempHumiSensorSHT35.circuit.tsx](boards/GroveI2CHighAccuracyTempHumiSensorSHT35/GroveI2CHighAccuracyTempHumiSensorSHT35.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SHT35` · declared MPN `SHT35` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Temperature&Humidity Sensor Pro(DHT22) — `GroveTemperatureHumiditySensorProDHT22`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorProDHT22/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorProDHT22.circuit.tsx](boards/GroveTemperatureHumiditySensorProDHT22/GroveTemperatureHumiditySensorProDHT22.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT22` · declared MPN `DHT22` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temperature&Humidity Sensor (DHT11) — `GroveTemperatureHumiditySensorDHT11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorDHT11/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorDHT11.circuit.tsx](boards/GroveTemperatureHumiditySensorDHT11/GroveTemperatureHumiditySensorDHT11.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temperature&Humidity Sensor(DHT20) — `GroveTemperatureHumiditySensorDHT20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorDHT20/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorDHT20.circuit.tsx](boards/GroveTemperatureHumiditySensorDHT20/GroveTemperatureHumiditySensorDHT20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 6 source components · 20 source traces · 12 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temperature&Humidity Sensor (High-Accuracy &Mini) v1.0 — `GroveTemperatureHumiditySensorHighAccuracyMiniV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorHighAccuracyMiniV10/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorHighAccuracyMiniV10.circuit.tsx](boards/GroveTemperatureHumiditySensorHighAccuracyMiniV10/GroveTemperatureHumiditySensorHighAccuracyMiniV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `TH02` · declared MPN `TH02` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temperature & Humidity Sensor — `GroveTemperatureHumiditySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensor/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensor.circuit.tsx](boards/GroveTemperatureHumiditySensor/GroveTemperatureHumiditySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - 1-Wire Thermocouple Amplifier(MAX31850K) — `Grove1WireThermocoupleAmplifierMAX31850K`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove1WireThermocoupleAmplifierMAX31850K/DESIGN_REVIEW1.md)
**Source:** [Grove1WireThermocoupleAmplifierMAX31850K.circuit.tsx](boards/Grove1WireThermocoupleAmplifierMAX31850K/Grove1WireThermocoupleAmplifierMAX31850K.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `MAX31850K` · declared MPN `MAX31850K` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - I2C Thermocouple Amplifier (MCP9600) — `GroveI2CThermocoupleAmplifierMCP9600`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CThermocoupleAmplifierMCP9600/DESIGN_REVIEW1.md)
**Source:** [GroveI2CThermocoupleAmplifierMCP9600.circuit.tsx](boards/GroveI2CThermocoupleAmplifierMCP9600/GroveI2CThermocoupleAmplifierMCP9600.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `MCP9600` · declared MPN `MCP9600` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### One Wire Temperature Sensor DS18B20 — `GroveOneWireTemperatureSensorDS18B20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOneWireTemperatureSensorDS18B20/DESIGN_REVIEW1.md)
**Source:** [GroveOneWireTemperatureSensorDS18B20.circuit.tsx](boards/GroveOneWireTemperatureSensorDS18B20/GroveOneWireTemperatureSensorDS18B20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DS18B20` · declared MPN `DS18B20` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - High Temperature Sensor — `GroveHighTemperatureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHighTemperatureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveHighTemperatureSensor.circuit.tsx](boards/GroveHighTemperatureSensor/GroveHighTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `CJ432` · declared MPN `CJ432` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Thermal Imaging Camera IR-Array MLX90641 — `GroveThermalImagingCameraIRArrayMLX90641`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraIRArrayMLX90641/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraIRArrayMLX90641.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90641/GroveThermalImagingCameraIRArrayMLX90641.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove - Digital Infrared Temperature Sensor — `GroveDigitalInfraredTemperatureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalInfraredTemperatureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalInfraredTemperatureSensor.circuit.tsx](boards/GroveDigitalInfraredTemperatureSensor/GroveDigitalInfraredTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Infrared Temperature Sensor — `GroveInfraredTemperatureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredTemperatureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredTemperatureSensor.circuit.tsx](boards/GroveInfraredTemperatureSensor/GroveInfraredTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Infrared Temperature Sensor Array(AMG8833) — `GroveInfraredTemperatureSensorArrayAMG8833`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredTemperatureSensorArrayAMG8833/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredTemperatureSensorArrayAMG8833.circuit.tsx](boards/GroveInfraredTemperatureSensorArrayAMG8833/GroveInfraredTemperatureSensorArrayAMG8833.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `AMG8833` · declared MPN `AMG8833` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove-Temperature_Sensor — `GroveTemperatureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureSensor.circuit.tsx](boards/GroveTemperatureSensor/GroveTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Temperature Sensor V1.2 — `GroveTemperatureSensorV12`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureSensorV12/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureSensorV12.circuit.tsx](boards/GroveTemperatureSensorV12/GroveTemperatureSensorV12.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - I2C High Accuracy Temperature Sensor(MCP9808) — `GroveI2CHighAccuracyTemperatureSensorMCP9808`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CHighAccuracyTemperatureSensorMCP9808/DESIGN_REVIEW1.md)
**Source:** [GroveI2CHighAccuracyTemperatureSensorMCP9808.circuit.tsx](boards/GroveI2CHighAccuracyTemperatureSensorMCP9808/GroveI2CHighAccuracyTemperatureSensorMCP9808.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `MCP9808` · declared MPN `MCP9808` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove SEN5X All in One — `GroveSEN5XAllInOne`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSEN5XAllInOne/DESIGN_REVIEW1.md)
**Source:** [GroveSEN5XAllInOne.circuit.tsx](boards/GroveSEN5XAllInOne/GroveSEN5XAllInOne.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - Temperature Humidity Pressure Gas Sensor(BME680) — `GroveTemperatureHumidityPressureGasSensorBME680`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumidityPressureGasSensorBME680/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumidityPressureGasSensorBME680.circuit.tsx](boards/GroveTemperatureHumidityPressureGasSensorBME680/GroveTemperatureHumidityPressureGasSensorBME680.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BME680` · declared MPN `BME680` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - CO2 & Temperature & Humidity Sensor (SCD41) — `GroveCO2TemperatureHumiditySensorSCD41`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCO2TemperatureHumiditySensorSCD41/DESIGN_REVIEW1.md)
**Source:** [GroveCO2TemperatureHumiditySensorSCD41.circuit.tsx](boards/GroveCO2TemperatureHumiditySensorSCD41/GroveCO2TemperatureHumiditySensorSCD41.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SCD41` · declared MPN `SCD41` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - CO2 & Temperature & Humidity Sensor (SCD30) — `GroveCO2TemperatureHumiditySensorSCD30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCO2TemperatureHumiditySensorSCD30/DESIGN_REVIEW1.md)
**Source:** [GroveCO2TemperatureHumiditySensorSCD30.circuit.tsx](boards/GroveCO2TemperatureHumiditySensorSCD30/GroveCO2TemperatureHumiditySensorSCD30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SCD30` · declared MPN `SCD30` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Light Gesture Color Proximity Sensor (TMG39931) — `GroveLightGestureColorProximitySensorTMG39931`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightGestureColorProximitySensorTMG39931/DESIGN_REVIEW1.md)
**Source:** [GroveLightGestureColorProximitySensorTMG39931.circuit.tsx](boards/GroveLightGestureColorProximitySensorTMG39931/GroveLightGestureColorProximitySensorTMG39931.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `TMG39931` · declared MPN `TMG39931` · 5V

**Artifact counts:** 9 source components · 30 source traces · 20 PCB traces · 10 schematic traces · 0 placeholder MPNs · 25 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 25 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Vision AI Module — `GroveVisionAIModule`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVisionAIModule/DESIGN_REVIEW1.md)
**Source:** [GroveVisionAIModule.circuit.tsx](boards/GroveVisionAIModule/GroveVisionAIModule.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `Himax WE1` · declared MPN `Himax WE1` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Vision AI Module V2 — `GroveVisionAIModuleV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVisionAIModuleV2/DESIGN_REVIEW1.md)
**Source:** [GroveVisionAIModuleV2.circuit.tsx](boards/GroveVisionAIModuleV2/GroveVisionAIModuleV2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `WiseEye2` · declared MPN `WiseEye2` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Smart IR Gesture Sensor (PAJ7660) — `GroveSmartIRGestureSensorPAJ7660`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSmartIRGestureSensorPAJ7660/DESIGN_REVIEW1.md)
**Source:** [GroveSmartIRGestureSensorPAJ7660.circuit.tsx](boards/GroveSmartIRGestureSensorPAJ7660/GroveSmartIRGestureSensorPAJ7660.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Moisture Sensor — `GroveMoistureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMoistureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveMoistureSensor.circuit.tsx](boards/GroveMoistureSensor/GroveMoistureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Ultrasonic Ranger — `GroveUltrasonicRanger2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUltrasonicRanger2/DESIGN_REVIEW1.md)
**Source:** [GroveUltrasonicRanger2.circuit.tsx](boards/GroveUltrasonicRanger2/GroveUltrasonicRanger2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - IR Distance Interrupter v1.2 — `GroveIRDistanceInterrupterV12`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIRDistanceInterrupterV12/DESIGN_REVIEW1.md)
**Source:** [GroveIRDistanceInterrupterV12.circuit.tsx](boards/GroveIRDistanceInterrupterV12/GroveIRDistanceInterrupterV12.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - TF Mini LiDAR — `GroveTFMiniLiDAR`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTFMiniLiDAR/DESIGN_REVIEW1.md)
**Source:** [GroveTFMiniLiDAR.circuit.tsx](boards/GroveTFMiniLiDAR/GroveTFMiniLiDAR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `TFMINI` · declared MPN `TFMINI` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove-Doppler-Radar — `GroveDopplerRadar`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDopplerRadar/DESIGN_REVIEW1.md)
**Source:** [GroveDopplerRadar.circuit.tsx](boards/GroveDopplerRadar/GroveDopplerRadar.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `HB100` · declared MPN `HB100` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - Time of Flight Distance Sensor VL53L0X — `GroveTimeOfFlightDistanceSensorVL53L0X`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTimeOfFlightDistanceSensorVL53L0X/DESIGN_REVIEW1.md)
**Source:** [GroveTimeOfFlightDistanceSensorVL53L0X.circuit.tsx](boards/GroveTimeOfFlightDistanceSensorVL53L0X/GroveTimeOfFlightDistanceSensorVL53L0X.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `VL53L0X` · declared MPN `VL53L0X` · 5V

**Artifact counts:** 9 source components · 30 source traces · 20 PCB traces · 10 schematic traces · 0 placeholder MPNs · 25 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 25 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - 80cm Infrared Proximity Sensor — `Grove80cmInfraredProximitySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove80cmInfraredProximitySensor/DESIGN_REVIEW1.md)
**Source:** [Grove80cmInfraredProximitySensor.circuit.tsx](boards/Grove80cmInfraredProximitySensor/Grove80cmInfraredProximitySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GP2Y0A21YK` · declared MPN `GP2Y0A21YK` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - Gesture V1.0 — `GroveGestureV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGestureV10/DESIGN_REVIEW1.md)
**Source:** [GroveGestureV10.circuit.tsx](boards/GroveGestureV10/GroveGestureV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Adjustable PIR Motion Sensor — `GroveAdjustablePIRMotionSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAdjustablePIRMotionSensor/DESIGN_REVIEW1.md)
**Source:** [GroveAdjustablePIRMotionSensor.circuit.tsx](boards/GroveAdjustablePIRMotionSensor/GroveAdjustablePIRMotionSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - Laser PM2.5 Sensor (HM3301) — `GroveLaserPM25SensorHM3301`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLaserPM25SensorHM3301/DESIGN_REVIEW1.md)
**Source:** [GroveLaserPM25SensorHM3301.circuit.tsx](boards/GroveLaserPM25SensorHM3301/GroveLaserPM25SensorHM3301.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `HM3301` · declared MPN `HM3301` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Dust Sensor — `GroveDustSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDustSensor/DESIGN_REVIEW1.md)
**Source:** [GroveDustSensor.circuit.tsx](boards/GroveDustSensor/GroveDustSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `PPD42NS` · declared MPN `PPD42NS` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Air Quality Sensor v1.3 — `GroveAirQualitySensorV13`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAirQualitySensorV13/DESIGN_REVIEW1.md)
**Source:** [GroveAirQualitySensorV13.circuit.tsx](boards/GroveAirQualitySensorV13/GroveAirQualitySensorV13.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Formaldehyde sensor — `GroveFormaldehydeSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFormaldehydeSensor/DESIGN_REVIEW1.md)
**Source:** [GroveFormaldehydeSensor.circuit.tsx](boards/GroveFormaldehydeSensor/GroveFormaldehydeSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `WSP2110` · declared MPN `WSP2110` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Gas Sensor V2(Multichannel) — `GroveGasSensorV2Multichannel`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorV2Multichannel/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorV2Multichannel.circuit.tsx](boards/GroveGasSensorV2Multichannel/GroveGasSensorV2Multichannel.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Gas Sensor module — `GroveGasSensorModule`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorModule/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorModule.circuit.tsx](boards/GroveGasSensorModule/GroveGasSensorModule.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-2` · declared MPN `MQ-2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Gas Sensor(O₂) — `GroveGasSensorO`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorO/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorO.circuit.tsx](boards/GroveGasSensorO/GroveGasSensorO.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ME3-O2` · declared MPN `ME3-O2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Gas O₂ Sensor(MIX8410) — `GroveGasOSensorMIX8410`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasOSensorMIX8410/DESIGN_REVIEW1.md)
**Source:** [GroveGasOSensorMIX8410.circuit.tsx](boards/GroveGasOSensorMIX8410/GroveGasOSensorMIX8410.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MIX8410` · declared MPN `MIX8410` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Oxygen Sensor Pro(GGC2330-O2) — `GroveOxygenSensorProGGC2330O2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOxygenSensorProGGC2330O2/DESIGN_REVIEW1.md)
**Source:** [GroveOxygenSensorProGGC2330O2.circuit.tsx](boards/GroveOxygenSensorProGGC2330O2/GroveOxygenSensorProGGC2330O2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GGC2330-O2` · declared MPN `GGC2330-O2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Alcohol Sensor — `GroveAlcoholSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAlcoholSensor/DESIGN_REVIEW1.md)
**Source:** [GroveAlcoholSensor.circuit.tsx](boards/GroveAlcoholSensor/GroveAlcoholSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-3` · declared MPN `MQ-3` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - CO2 Sensor — `GroveCO2Sensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCO2Sensor/DESIGN_REVIEW1.md)
**Source:** [GroveCO2Sensor.circuit.tsx](boards/GroveCO2Sensor/GroveCO2Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `MH-Z16` · declared MPN `MH-Z16` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove -Smart Air Quality Sensor (SGP41) — `GroveSmartAirQualitySensorSGP41`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSmartAirQualitySensorSGP41/DESIGN_REVIEW1.md)
**Source:** [GroveSmartAirQualitySensorSGP41.circuit.tsx](boards/GroveSmartAirQualitySensorSGP41/GroveSmartAirQualitySensorSGP41.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SGP41` · declared MPN `SGP41` · 5V

**Artifact counts:** 7 source components · 26 source traces · 16 PCB traces · 8 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove-VOC and eCO2 Gas Sensor(SGP30) — `GroveVOCAndECO2GasSensorSGP30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVOCAndECO2GasSensorSGP30/DESIGN_REVIEW1.md)
**Source:** [GroveVOCAndECO2GasSensorSGP30.circuit.tsx](boards/GroveVOCAndECO2GasSensorSGP30/GroveVOCAndECO2GasSensorSGP30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SGP30` · declared MPN `SGP30` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - VOC Gas Sensor (SGP40) — `GroveVOCGasSensorSGP40`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVOCGasSensorSGP40/DESIGN_REVIEW1.md)
**Source:** [GroveVOCGasSensorSGP40.circuit.tsx](boards/GroveVOCGasSensorSGP40/GroveVOCGasSensorSGP40.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SGP40` · declared MPN `SGP40` · 5V

**Artifact counts:** 8 source components · 28 source traces · 18 PCB traces · 9 schematic traces · 0 placeholder MPNs · 23 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 23 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - HCHO Sensor — `GroveHCHOSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHCHOSensor/DESIGN_REVIEW1.md)
**Source:** [GroveHCHOSensor.circuit.tsx](boards/GroveHCHOSensor/GroveHCHOSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `WSP2110` · declared MPN `WSP2110` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Multichannel Gas Sensor — `GroveMultichannelGasSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMultichannelGasSensor/DESIGN_REVIEW1.md)
**Source:** [GroveMultichannelGasSensor.circuit.tsx](boards/GroveMultichannelGasSensor/GroveMultichannelGasSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove - Barometer (High-Accuracy) — `GroveBarometerHighAccuracy`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBarometerHighAccuracy/DESIGN_REVIEW1.md)
**Source:** [GroveBarometerHighAccuracy.circuit.tsx](boards/GroveBarometerHighAccuracy/GroveBarometerHighAccuracy.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `HP206C` · declared MPN `HP206C` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Barometer Sensor(BME280) — `GroveBarometerSensorBME280`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBarometerSensorBME280/DESIGN_REVIEW1.md)
**Source:** [GroveBarometerSensorBME280.circuit.tsx](boards/GroveBarometerSensorBME280/GroveBarometerSensorBME280.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BME280` · declared MPN `BME280` · 5V

**Artifact counts:** 8 source components · 28 source traces · 18 PCB traces · 10 schematic traces · 0 placeholder MPNs · 23 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 23 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Barometer Sensor (BMP280) — `GroveBarometerSensorBMP280`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBarometerSensorBMP280/DESIGN_REVIEW1.md)
**Source:** [GroveBarometerSensorBMP280.circuit.tsx](boards/GroveBarometerSensorBMP280/GroveBarometerSensorBMP280.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BMP280` · declared MPN `BMP280` · 5V

**Artifact counts:** 8 source components · 28 source traces · 18 PCB traces · 10 schematic traces · 0 placeholder MPNs · 23 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 23 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - High Precision Barometric Pressure Sensor DPS310 — `GroveHighPrecisionBarometricPressureSensorDPS310`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHighPrecisionBarometricPressureSensorDPS310/DESIGN_REVIEW1.md)
**Source:** [GroveHighPrecisionBarometricPressureSensorDPS310.circuit.tsx](boards/GroveHighPrecisionBarometricPressureSensorDPS310/GroveHighPrecisionBarometricPressureSensorDPS310.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `DPS310` · declared MPN `DPS310` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - Integrated Pressure Sensor Kit — `GroveIntegratedPressureSensorKit`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIntegratedPressureSensorKit/DESIGN_REVIEW1.md)
**Source:** [GroveIntegratedPressureSensorKit.circuit.tsx](boards/GroveIntegratedPressureSensorKit/GroveIntegratedPressureSensorKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove - D7S Vibration Sensor — `GroveD7SVibrationSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveD7SVibrationSensor/DESIGN_REVIEW1.md)
**Source:** [GroveD7SVibrationSensor.circuit.tsx](boards/GroveD7SVibrationSensor/GroveD7SVibrationSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `D7S` · declared MPN `D7S` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 3-Axis Digital Accelerometer — `Grove3AxisDigitalAccelerometer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer.circuit.tsx](boards/Grove3AxisDigitalAccelerometer/Grove3AxisDigitalAccelerometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL345` · declared MPN `ADXL345` · 5V

**Artifact counts:** 7 source components · 22 source traces · 15 PCB traces · 10 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 3-Axis Digital Accelerometer (LIS3DHTR) — `Grove3AxisDigitalAccelerometerLIS3DHTR`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometerLIS3DHTR/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometerLIS3DHTR.circuit.tsx](boards/Grove3AxisDigitalAccelerometerLIS3DHTR/Grove3AxisDigitalAccelerometerLIS3DHTR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `LIS3DHTR` · declared MPN `LIS3DHTR` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 3-Axis Analog Accelerometer — `Grove3AxisAnalogAccelerometer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisAnalogAccelerometer/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisAnalogAccelerometer.circuit.tsx](boards/Grove3AxisAnalogAccelerometer/Grove3AxisAnalogAccelerometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL335` · declared MPN `ADXL335` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 3-Axis Digitial Compass v2.0 — `Grove3AxisDigitialCompassV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitialCompassV20/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitialCompassV20.circuit.tsx](boards/Grove3AxisDigitialCompassV20/Grove3AxisDigitialCompassV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 3 Axis Digital Accelerometer±16g Ultra-low Power (BMA400) — `Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400.circuit.tsx](boards/Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400/Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BMA400` · declared MPN `BMA400` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 6-Axis Accelerometer&Gyroscope — `Grove6AxisAccelerometerGyroscope`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6AxisAccelerometerGyroscope/DESIGN_REVIEW1.md)
**Source:** [Grove6AxisAccelerometerGyroscope.circuit.tsx](boards/Grove6AxisAccelerometerGyroscope/Grove6AxisAccelerometerGyroscope.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - 6-Axis Accelerometer&Gyroscope(BMI088) — `Grove6AxisAccelerometerGyroscopeBMI088`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6AxisAccelerometerGyroscopeBMI088/DESIGN_REVIEW1.md)
**Source:** [Grove6AxisAccelerometerGyroscopeBMI088.circuit.tsx](boards/Grove6AxisAccelerometerGyroscopeBMI088/Grove6AxisAccelerometerGyroscopeBMI088.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BMI088` · declared MPN `BMI088` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - IMU 9DOF(lcm20600+AK09918) — `GroveIMU9DOFLcm20600AK09918`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU9DOFLcm20600AK09918/DESIGN_REVIEW1.md)
**Source:** [GroveIMU9DOFLcm20600AK09918.circuit.tsx](boards/GroveIMU9DOFLcm20600AK09918/GroveIMU9DOFLcm20600AK09918.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `AK09918` · declared MPN `AK09918` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Lightning Sensor AS3935 — `GroveLightningSensorAS3935`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightningSensorAS3935/DESIGN_REVIEW1.md)
**Source:** [GroveLightningSensorAS3935.circuit.tsx](boards/GroveLightningSensorAS3935/GroveLightningSensorAS3935.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `AS3935` · declared MPN `AS3935` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Digital Light Sensor — `GroveDigitalLightSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalLightSensor/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalLightSensor.circuit.tsx](boards/GroveDigitalLightSensor/GroveDigitalLightSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `TSL2561` · declared MPN `TSL2561` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Light Sensor — `GroveLightSensor2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightSensor2/DESIGN_REVIEW1.md)
**Source:** [GroveLightSensor2.circuit.tsx](boards/GroveLightSensor2/GroveLightSensor2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Sunlight Sensor — `GroveSunlightSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSunlightSensor/DESIGN_REVIEW1.md)
**Source:** [GroveSunlightSensor.circuit.tsx](boards/GroveSunlightSensor/GroveSunlightSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - UV Sensor — `GroveUVSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUVSensor/DESIGN_REVIEW1.md)
**Source:** [GroveUVSensor.circuit.tsx](boards/GroveUVSensor/GroveUVSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `GUVA-S12D` · declared MPN `GUVA-S12D` · 5V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Infrared Receiver — `GroveInfraredReceiver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredReceiver/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredReceiver.circuit.tsx](boards/GroveInfraredReceiver/GroveInfraredReceiver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `TSOP38238` · declared MPN `TSOP38238` · 5V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove - Line Finder V1.1 — `GroveLineFinderV11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLineFinderV11/DESIGN_REVIEW1.md)
**Source:** [GroveLineFinderV11.circuit.tsx](boards/GroveLineFinderV11/GroveLineFinderV11.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove - Flame Sensor — `GroveFlameSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFlameSensor/DESIGN_REVIEW1.md)
**Source:** [GroveFlameSensor.circuit.tsx](boards/GroveFlameSensor/GroveFlameSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `YG1006` · declared MPN `YG1006` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Infrared Reflective Sensor — `GroveInfraredReflectiveSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredReflectiveSensor/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredReflectiveSensor.circuit.tsx](boards/GroveInfraredReflectiveSensor/GroveInfraredReflectiveSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Finger-clip Heart Rate Sensor — `GroveFingerClipHeartRateSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFingerClipHeartRateSensor/DESIGN_REVIEW1.md)
**Source:** [GroveFingerClipHeartRateSensor.circuit.tsx](boards/GroveFingerClipHeartRateSensor/GroveFingerClipHeartRateSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - EMG Detector — `GroveEMGDetector`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveEMGDetector/DESIGN_REVIEW1.md)
**Source:** [GroveEMGDetector.circuit.tsx](boards/GroveEMGDetector/GroveEMGDetector.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · utility · primary model `INA331` · declared MPN `INA331` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.

### Grove - Ear-clip Heart Rate Sensor — `GroveEarClipHeartRateSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveEarClipHeartRateSensor/DESIGN_REVIEW1.md)
**Source:** [GroveEarClipHeartRateSensor.circuit.tsx](boards/GroveEarClipHeartRateSensor/GroveEarClipHeartRateSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - GSR Sensor — `GroveGSRSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGSRSensor/DESIGN_REVIEW1.md)
**Source:** [GroveGSRSensor.circuit.tsx](boards/GroveGSRSensor/GroveGSRSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM324` · declared MPN `LM324` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Sound Sensor — `GroveSoundSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSoundSensor/DESIGN_REVIEW1.md)
**Source:** [GroveSoundSensor.circuit.tsx](boards/GroveSoundSensor/GroveSoundSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Loudness Sensor — `GroveLoudnessSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLoudnessSensor/DESIGN_REVIEW1.md)
**Source:** [GroveLoudnessSensor.circuit.tsx](boards/GroveLoudnessSensor/GroveLoudnessSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Analog Microphone — `GroveAnalogMicrophone`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAnalogMicrophone/DESIGN_REVIEW1.md)
**Source:** [GroveAnalogMicrophone.circuit.tsx](boards/GroveAnalogMicrophone/GroveAnalogMicrophone.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Recorder v2.0 — `GroveRecorderV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRecorderV20/DESIGN_REVIEW1.md)
**Source:** [GroveRecorderV20.circuit.tsx](boards/GroveRecorderV20/GroveRecorderV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 4 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove Offline Voice Recognition — `GroveOfflineVoiceRecognition`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOfflineVoiceRecognition/DESIGN_REVIEW1.md)
**Source:** [GroveOfflineVoiceRecognition.circuit.tsx](boards/GroveOfflineVoiceRecognition/GroveOfflineVoiceRecognition.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · sensor · primary model `M007` · declared MPN `M007` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Touch Sensor — `GroveTouchSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTouchSensor/DESIGN_REVIEW1.md)
**Source:** [GroveTouchSensor.circuit.tsx](boards/GroveTouchSensor/GroveTouchSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove - Rotary Angle Sensor — `GroveRotaryAngleSensor2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRotaryAngleSensor2/DESIGN_REVIEW1.md)
**Source:** [GroveRotaryAngleSensor2.circuit.tsx](boards/GroveRotaryAngleSensor2/GroveRotaryAngleSensor2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Grove - Round Force Sensor FSR402 — `GroveGroveRoundForceSensorFSR402`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGroveRoundForceSensorFSR402/DESIGN_REVIEW1.md)
**Source:** [GroveGroveRoundForceSensorFSR402.circuit.tsx](boards/GroveGroveRoundForceSensorFSR402/GroveGroveRoundForceSensorFSR402.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `FSR402` · declared MPN `FSR402` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove - 2-Channel Inductive Sensor(LDC1612) — `Grove2ChannelInductiveSensorLDC1612`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove2ChannelInductiveSensorLDC1612/DESIGN_REVIEW1.md)
**Source:** [Grove2ChannelInductiveSensorLDC1612.circuit.tsx](boards/Grove2ChannelInductiveSensorLDC1612/Grove2ChannelInductiveSensorLDC1612.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · input · primary model `LDC1612` · declared MPN `LDC1612` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove - 12 Key Capacitive I2C Touch Sensor V3 (MPR121) — `Grove12KeyCapacitiveI2CTouchSensorV3MPR121`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12KeyCapacitiveI2CTouchSensorV3MPR121/DESIGN_REVIEW1.md)
**Source:** [Grove12KeyCapacitiveI2CTouchSensorV3MPR121.circuit.tsx](boards/Grove12KeyCapacitiveI2CTouchSensorV3MPR121/Grove12KeyCapacitiveI2CTouchSensorV3MPR121.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · input · primary model `MPR121` · declared MPN `MPR121` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove 12 Channel Capacitive Touch Keypad (ATtiny1616) — `Grove12ChannelCapacitiveTouchKeypadATtiny1616`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12ChannelCapacitiveTouchKeypadATtiny1616/DESIGN_REVIEW1.md)
**Source:** [Grove12ChannelCapacitiveTouchKeypadATtiny1616.circuit.tsx](boards/Grove12ChannelCapacitiveTouchKeypadATtiny1616/Grove12ChannelCapacitiveTouchKeypadATtiny1616.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `ATtiny1616` · declared MPN `ATtiny1616` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - ORP Sensor Kit Pro — `GroveORPSensorKitPro`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveORPSensorKitPro/DESIGN_REVIEW1.md)
**Source:** [GroveORPSensorKitPro.circuit.tsx](boards/GroveORPSensorKitPro/GroveORPSensorKitPro.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `OPA333` · declared MPN `OPA333` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Water Sensor — `GroveWaterSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWaterSensor/DESIGN_REVIEW1.md)
**Source:** [GroveWaterSensor.circuit.tsx](boards/GroveWaterSensor/GroveWaterSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Water Level Sensor — `GroveWaterLevelSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWaterLevelSensor/DESIGN_REVIEW1.md)
**Source:** [GroveWaterLevelSensor.circuit.tsx](boards/GroveWaterLevelSensor/GroveWaterLevelSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - TDS Sensor — `GroveTDSSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTDSSensor/DESIGN_REVIEW1.md)
**Source:** [GroveTDSSensor.circuit.tsx](boards/GroveTDSSensor/GroveTDSSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `TDS-SENSOR` · declared MPN `TDS-SENSOR` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Turbidity Sensor Meter for Arduino V1.0 — `GroveTurbiditySensorMeterForArduinoV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTurbiditySensorMeterForArduinoV10/DESIGN_REVIEW1.md)
**Source:** [GroveTurbiditySensorMeterForArduinoV10.circuit.tsx](boards/GroveTurbiditySensorMeterForArduinoV10/GroveTurbiditySensorMeterForArduinoV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `SEN0189` · declared MPN `SEN0189` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - PIR Motion Sensor — `GrovePIRMotionSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GrovePIRMotionSensor/DESIGN_REVIEW1.md)
**Source:** [GrovePIRMotionSensor.circuit.tsx](boards/GrovePIRMotionSensor/GrovePIRMotionSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - Digital PIR Sensor — `GroveDigitalPIRSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalPIRSensor/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalPIRSensor.circuit.tsx](boards/GroveDigitalPIRSensor/GroveDigitalPIRSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove - Tilt Switch — `GroveTiltSwitch`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTiltSwitch/DESIGN_REVIEW1.md)
**Source:** [GroveTiltSwitch.circuit.tsx](boards/GroveTiltSwitch/GroveTiltSwitch.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `SW-200D` · declared MPN `SW-200D` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Piezo Vibration Sensor — `GrovePiezoVibrationSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GrovePiezoVibrationSensor/DESIGN_REVIEW1.md)
**Source:** [GrovePiezoVibrationSensor.circuit.tsx](boards/GrovePiezoVibrationSensor/GrovePiezoVibrationSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM2904` · declared MPN `LM2904` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Slide Potentiometer — `GroveSlidePotentiometer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSlidePotentiometer/DESIGN_REVIEW1.md)
**Source:** [GroveSlidePotentiometer.circuit.tsx](boards/GroveSlidePotentiometer/GroveSlidePotentiometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Optical Rotary Encoder(TCUT1600X01) — `GroveOpticalRotaryEncoderTCUT1600X01`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOpticalRotaryEncoderTCUT1600X01/DESIGN_REVIEW1.md)
**Source:** [GroveOpticalRotaryEncoderTCUT1600X01.circuit.tsx](boards/GroveOpticalRotaryEncoderTCUT1600X01/GroveOpticalRotaryEncoderTCUT1600X01.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - 12-bit Magnetic Rotary Position Sensor / Encoder (AS5600) — `Grove12BitMagneticRotaryPositionSensorEncoderAS5600`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12BitMagneticRotaryPositionSensorEncoderAS5600/DESIGN_REVIEW1.md)
**Source:** [Grove12BitMagneticRotaryPositionSensorEncoderAS5600.circuit.tsx](boards/Grove12BitMagneticRotaryPositionSensorEncoderAS5600/Grove12BitMagneticRotaryPositionSensorEncoderAS5600.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · input · primary model `AS5600` · declared MPN `AS5600` · 5V

**Artifact counts:** 7 source components · 25 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove-Encoder — `GroveEncoder`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveEncoder/DESIGN_REVIEW1.md)
**Source:** [GroveEncoder.circuit.tsx](boards/GroveEncoder/GroveEncoder.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Step Counter(BMA456) — `GroveStepCounterBMA456`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveStepCounterBMA456/DESIGN_REVIEW1.md)
**Source:** [GroveStepCounterBMA456.circuit.tsx](boards/GroveStepCounterBMA456/GroveStepCounterBMA456.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `BMA456` · declared MPN `BMA456` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove - ADC for Load Cell (HX711) — `GroveADCForLoadCellHX711`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveADCForLoadCellHX711/DESIGN_REVIEW1.md)
**Source:** [GroveADCForLoadCellHX711.circuit.tsx](boards/GroveADCForLoadCellHX711/GroveADCForLoadCellHX711.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `HX711` · declared MPN `HX711` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Wio-E5 — `GroveWioE5`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWioE5/DESIGN_REVIEW1.md)
**Source:** [GroveWioE5.circuit.tsx](boards/GroveWioE5/GroveWioE5.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · communications · primary model `Wio-E5` · declared MPN `Wio-E5` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove - BLE (dual model) v1.0 — `GroveBLEDualModelV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBLEDualModelV10/DESIGN_REVIEW1.md)
**Source:** [GroveBLEDualModelV10.circuit.tsx](boards/GroveBLEDualModelV10/GroveBLEDualModelV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `HM-13` · declared MPN `HM-13` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - Serial Bluetooth v3.0 — `GroveSerialBluetoothV30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialBluetoothV30/DESIGN_REVIEW1.md)
**Source:** [GroveSerialBluetoothV30.circuit.tsx](boards/GroveSerialBluetoothV30/GroveSerialBluetoothV30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `BC417` · declared MPN `BC417` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - BLE v1 — `GroveBLEV1`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBLEV1/DESIGN_REVIEW1.md)
**Source:** [GroveBLEV1.circuit.tsx](boards/GroveBLEV1/GroveBLEV1.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `HM-11` · declared MPN `HM-11` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - UART Wifi V2 — `GroveUARTWifiV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUARTWifiV2/DESIGN_REVIEW1.md)
**Source:** [GroveUARTWifiV2.circuit.tsx](boards/GroveUARTWifiV2/GroveUARTWifiV2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - NFC (ST25DV64) — `GroveNFCST25DV64`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveNFCST25DV64/DESIGN_REVIEW1.md)
**Source:** [GroveNFCST25DV64.circuit.tsx](boards/GroveNFCST25DV64/GroveNFCST25DV64.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `ST25DV64` · declared MPN `ST25DV64` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - NFC(PN532) — `GroveNFCPN532`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveNFCPN532/DESIGN_REVIEW1.md)
**Source:** [GroveNFCPN532.circuit.tsx](boards/GroveNFCPN532/GroveNFCPN532.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - NFC_tag — `GroveNFCTag`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveNFCTag/DESIGN_REVIEW1.md)
**Source:** [GroveNFCTag.circuit.tsx](boards/GroveNFCTag/GroveNFCTag.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - GPS (SIM28) — `GroveGPSSIM28`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGPSSIM28/DESIGN_REVIEW1.md)
**Source:** [GroveGPSSIM28.circuit.tsx](boards/GroveGPSSIM28/GroveGPSSIM28.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `SIM28` · declared MPN `SIM28` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - GPS (Air530) — `GroveGPSAir530`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGPSAir530/DESIGN_REVIEW1.md)
**Source:** [GroveGPSAir530.circuit.tsx](boards/GroveGPSAir530/GroveGPSAir530.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `Air530` · declared MPN `Air530` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - 125KHz RFID Reader — `Grove125KHzRFIDReader`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove125KHzRFIDReader/DESIGN_REVIEW1.md)
**Source:** [Grove125KHzRFIDReader.circuit.tsx](boards/Grove125KHzRFIDReader/Grove125KHzRFIDReader.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `EM4100` · declared MPN `EM4100` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - 315MHz RF Kit — `Grove315MHzRFKit`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove315MHzRFKit/DESIGN_REVIEW1.md)
**Source:** [Grove315MHzRFKit.circuit.tsx](boards/Grove315MHzRFKit/Grove315MHzRFKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `FS1000A` · declared MPN `FS1000A` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - 433MHz Simple RF Link Kit — `Grove433MHzSimpleRFLinkKit`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove433MHzSimpleRFLinkKit/DESIGN_REVIEW1.md)
**Source:** [Grove433MHzSimpleRFLinkKit.circuit.tsx](boards/Grove433MHzSimpleRFLinkKit/Grove433MHzSimpleRFLinkKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `FS1000A` · declared MPN `FS1000A` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - Long Range — `GroveLongRange`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLongRange/DESIGN_REVIEW1.md)
**Source:** [GroveLongRange.circuit.tsx](boards/GroveLongRange/GroveLongRange.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove - Serial RF Pro — `GroveSerialRFPro`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialRFPro/DESIGN_REVIEW1.md)
**Source:** [GroveSerialRFPro.circuit.tsx](boards/GroveSerialRFPro/GroveSerialRFPro.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `HM-TRP` · declared MPN `HM-TRP` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - DMX512 — `GroveDMX512`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDMX512/DESIGN_REVIEW1.md)
**Source:** [GroveDMX512.circuit.tsx](boards/GroveDMX512/GroveDMX512.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `SN75176` · declared MPN `SN75176` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove- I2C ADC — `GroveI2CADC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CADC/DESIGN_REVIEW1.md)
**Source:** [GroveI2CADC.circuit.tsx](boards/GroveI2CADC/GroveI2CADC.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `ADC121C021` · declared MPN `ADC121C021` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - I2C FM Receiver — `GroveI2CFMReceiver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CFMReceiver/DESIGN_REVIEW1.md)
**Source:** [GroveI2CFMReceiver.circuit.tsx](boards/GroveI2CFMReceiver/GroveI2CFMReceiver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `RDA5807M` · declared MPN `RDA5807M` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - Protoshield — `GroveProtoshield`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveProtoshield/DESIGN_REVIEW1.md)
**Source:** [GroveProtoshield.circuit.tsx](boards/GroveProtoshield/GroveProtoshield.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove - RJ45 Adapter — `GroveRJ45Adapter`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRJ45Adapter/DESIGN_REVIEW1.md)
**Source:** [GroveRJ45Adapter.circuit.tsx](boards/GroveRJ45Adapter/GroveRJ45Adapter.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove 1.2-inch IPS Display — `Grove12InchIPSDisplay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12InchIPSDisplay/DESIGN_REVIEW1.md)
**Source:** [Grove12InchIPSDisplay.circuit.tsx](boards/Grove12InchIPSDisplay/Grove12InchIPSDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `ST7789` · declared MPN `ST7789` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - 4-Digit Display — `Grove4DigitDisplay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove4DigitDisplay/DESIGN_REVIEW1.md)
**Source:** [Grove4DigitDisplay.circuit.tsx](boards/Grove4DigitDisplay/Grove4DigitDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - 0.54 inch Red Alphanumeric Display — `Grove054InchRedAlphanumericDisplay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove054InchRedAlphanumericDisplay/DESIGN_REVIEW1.md)
**Source:** [Grove054InchRedAlphanumericDisplay.circuit.tsx](boards/Grove054InchRedAlphanumericDisplay/Grove054InchRedAlphanumericDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - 16x2 LCD — `Grove16x2LCD`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove16x2LCD/DESIGN_REVIEW1.md)
**Source:** [Grove16x2LCD.circuit.tsx](boards/Grove16x2LCD/Grove16x2LCD.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - LCD RGB Backlight — `GroveLCDRGBBacklight`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLCDRGBBacklight/DESIGN_REVIEW1.md)
**Source:** [GroveLCDRGBBacklight.circuit.tsx](boards/GroveLCDRGBBacklight/GroveLCDRGBBacklight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - OLED Display 0.66" (SSD1306) — `GroveOLEDDisplay066SSD1306`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay066SSD1306/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay066SSD1306.circuit.tsx](boards/GroveOLEDDisplay066SSD1306/GroveOLEDDisplay066SSD1306.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - OLED Display 0.96" (SSD1315) — `GroveOLEDDisplay096SSD1315`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay096SSD1315/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay096SSD1315.circuit.tsx](boards/GroveOLEDDisplay096SSD1315/GroveOLEDDisplay096SSD1315.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - OLED Yellow&Blue Display 0.96(SSD1315) - SPI/IIC -3.3V/5V — `GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V.circuit.tsx](boards/GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V/GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 3.3V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - OLED Display 1.12&#34 — `GroveOLEDDisplay11234`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay11234/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay11234.circuit.tsx](boards/GroveOLEDDisplay11234/GroveOLEDDisplay11234.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - OLED Display 1.12 (SH1107) V3.0 - SPI/IIC -3.3V/5V — `GroveOLEDDisplay112SH1107V30SPIIIC33V5V`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay112SH1107V30SPIIIC33V5V/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay112SH1107V30SPIIIC33V5V.circuit.tsx](boards/GroveOLEDDisplay112SH1107V30SPIIIC33V5V/GroveOLEDDisplay112SH1107V30SPIIIC33V5V.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SH1107` · declared MPN `SH1107` · 3.3V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove - 2-Coil Latching Relay — `Grove2CoilLatchingRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove2CoilLatchingRelay/DESIGN_REVIEW1.md)
**Source:** [Grove2CoilLatchingRelay.circuit.tsx](boards/Grove2CoilLatchingRelay/Grove2CoilLatchingRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Buzzer — `GroveBuzzer2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBuzzer2/DESIGN_REVIEW1.md)
**Source:** [GroveBuzzer2.circuit.tsx](boards/GroveBuzzer2/GroveBuzzer2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Passive Buzzer — `GrovePassiveBuzzer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GrovePassiveBuzzer/DESIGN_REVIEW1.md)
**Source:** [GrovePassiveBuzzer.circuit.tsx](boards/GrovePassiveBuzzer/GrovePassiveBuzzer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove – Chainable RGB LED V2.0 — `GroveChainableRGBLEDV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveChainableRGBLEDV20/DESIGN_REVIEW1.md)
**Source:** [GroveChainableRGBLEDV20.circuit.tsx](boards/GroveChainableRGBLEDV20/GroveChainableRGBLEDV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · actuator · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove - I2C Motor Driver V1.3 — `GroveI2CMotorDriverV13`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CMotorDriverV13/DESIGN_REVIEW1.md)
**Source:** [GroveI2CMotorDriverV13.circuit.tsx](boards/GroveI2CMotorDriverV13/GroveI2CMotorDriverV13.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 10 source components · 32 source traces · 20 PCB traces · 11 schematic traces · 0 placeholder MPNs · 26 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 26 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - I2C Motor Driver (L298P) — `GroveI2CMotorDriverL298P`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CMotorDriverL298P/DESIGN_REVIEW1.md)
**Source:** [GroveI2CMotorDriverL298P.circuit.tsx](boards/GroveI2CMotorDriverL298P/GroveI2CMotorDriverL298P.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 10 source components · 32 source traces · 20 PCB traces · 11 schematic traces · 0 placeholder MPNs · 26 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 26 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Infrared Emitter — `GroveInfraredEmitter`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredEmitter/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredEmitter.circuit.tsx](boards/GroveInfraredEmitter/GroveInfraredEmitter.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `IR333-A` · declared MPN `IR333-A` · 5V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove - MP3 v4.0 — `GroveMP3V40`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMP3V40/DESIGN_REVIEW1.md)
**Source:** [GroveMP3V40.circuit.tsx](boards/GroveMP3V40/GroveMP3V40.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.

### Grove - Mini Fan — `GroveMiniFan`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMiniFan/DESIGN_REVIEW1.md)
**Source:** [GroveMiniFan.circuit.tsx](boards/GroveMiniFan/GroveMiniFan.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `ATMEGA168PV-10MU` · declared MPN `ATMEGA168PV-10MU` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Recorder V3 — `GroveRecorderV3`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRecorderV3/DESIGN_REVIEW1.md)
**Source:** [GroveRecorderV3.circuit.tsx](boards/GroveRecorderV3/GroveRecorderV3.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 4 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Relay — `GroveRelay2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRelay2/DESIGN_REVIEW1.md)
**Source:** [GroveRelay2.circuit.tsx](boards/GroveRelay2/GroveRelay2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - 2-Channel SPDT Relay — `Grove2ChannelSPDTRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove2ChannelSPDTRelay/DESIGN_REVIEW1.md)
**Source:** [Grove2ChannelSPDTRelay.circuit.tsx](boards/Grove2ChannelSPDTRelay/Grove2ChannelSPDTRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - 4-Channel SPDT Relay — `Grove4ChannelSPDTRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove4ChannelSPDTRelay/DESIGN_REVIEW1.md)
**Source:** [Grove4ChannelSPDTRelay.circuit.tsx](boards/Grove4ChannelSPDTRelay/Grove4ChannelSPDTRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - 8-Channel Solid State Relay — `Grove8ChannelSolidStateRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove8ChannelSolidStateRelay/DESIGN_REVIEW1.md)
**Source:** [Grove8ChannelSolidStateRelay.circuit.tsx](boards/Grove8ChannelSolidStateRelay/Grove8ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Optocoupler Relay (M281) — `GroveOptocouplerRelayM281`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOptocouplerRelayM281/DESIGN_REVIEW1.md)
**Source:** [GroveOptocouplerRelayM281.circuit.tsx](boards/GroveOptocouplerRelayM281/GroveOptocouplerRelayM281.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Servo — `GroveServo`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveServo/DESIGN_REVIEW1.md)
**Source:** [GroveServo.circuit.tsx](boards/GroveServo/GroveServo.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `SG90` · declared MPN `SG90` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Speaker — `GroveSpeaker`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSpeaker/DESIGN_REVIEW1.md)
**Source:** [GroveSpeaker.circuit.tsx](boards/GroveSpeaker/GroveSpeaker.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `LM386` · declared MPN `LM386` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Speaker Plus — `GroveSpeakerPlus`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSpeakerPlus/DESIGN_REVIEW1.md)
**Source:** [GroveSpeakerPlus.circuit.tsx](boards/GroveSpeakerPlus/GroveSpeakerPlus.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `LM386` · declared MPN `LM386` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove - Vibration Motor — `GroveVibrationMotor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVibrationMotor/DESIGN_REVIEW1.md)
**Source:** [GroveVibrationMotor.circuit.tsx](boards/GroveVibrationMotor/GroveVibrationMotor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `DRV2605` · declared MPN `DRV2605` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Water Atomization — `GroveWaterAtomization`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWaterAtomization/DESIGN_REVIEW1.md)
**Source:** [GroveWaterAtomization.circuit.tsx](boards/GroveWaterAtomization/GroveWaterAtomization.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `Atomizer-Driver` · declared MPN `Atomizer-Driver` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - 16 Channel PWM Driver (PCA9685) — `Grove16ChannelPWMDriverPCA9685`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove16ChannelPWMDriverPCA9685/DESIGN_REVIEW1.md)
**Source:** [Grove16ChannelPWMDriverPCA9685.circuit.tsx](boards/Grove16ChannelPWMDriverPCA9685/Grove16ChannelPWMDriverPCA9685.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `PCA9685` · declared MPN `PCA9685` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - I2C Motor Driver (TB6612FNG) — `GroveI2CMotorDriverTB6612FNG`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CMotorDriverTB6612FNG/DESIGN_REVIEW1.md)
**Source:** [GroveI2CMotorDriverTB6612FNG.circuit.tsx](boards/GroveI2CMotorDriverTB6612FNG/GroveI2CMotorDriverTB6612FNG.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · actuator · primary model `TB6612FNG` · declared MPN `TB6612FNG` · 5V

**Artifact counts:** 10 source components · 32 source traces · 20 PCB traces · 11 schematic traces · 0 placeholder MPNs · 26 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 26 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Hall Sensor — `GroveHallSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHallSensor/DESIGN_REVIEW1.md)
**Source:** [GroveHallSensor.circuit.tsx](boards/GroveHallSensor/GroveHallSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `A3144` · declared MPN `A3144` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Voltage Divider — `GroveVoltageDivider`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVoltageDivider/DESIGN_REVIEW1.md)
**Source:** [GroveVoltageDivider.circuit.tsx](boards/GroveVoltageDivider/GroveVoltageDivider.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LMV358` · declared MPN `LMV358` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove - DS1307 RTC (Real Time Clock) for Arduino — `GroveDS1307RTCRealTimeClockForArduino`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDS1307RTCRealTimeClockForArduino/DESIGN_REVIEW1.md)
**Source:** [GroveDS1307RTCRealTimeClockForArduino.circuit.tsx](boards/GroveDS1307RTCRealTimeClockForArduino/GroveDS1307RTCRealTimeClockForArduino.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - High Precision RTC (Real Time Clock) — `GroveHighPrecisionRTCRealTimeClock`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHighPrecisionRTCRealTimeClock/DESIGN_REVIEW1.md)
**Source:** [GroveHighPrecisionRTCRealTimeClock.circuit.tsx](boards/GroveHighPrecisionRTCRealTimeClock/GroveHighPrecisionRTCRealTimeClock.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - 10A DC Current Sensor (ACS725) — `Grove10ADCCurrentSensorACS725`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove10ADCCurrentSensorACS725/DESIGN_REVIEW1.md)
**Source:** [Grove10ADCCurrentSensorACS725.circuit.tsx](boards/Grove10ADCCurrentSensorACS725/Grove10ADCCurrentSensorACS725.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ACS725` · declared MPN `ACS725` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove - ±5A DC/AC Current Sensor (ACS70331) — `Grove5ADCACCurrentSensorACS70331`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove5ADCACCurrentSensorACS70331/DESIGN_REVIEW1.md)
**Source:** [Grove5ADCACCurrentSensorACS70331.circuit.tsx](boards/Grove5ADCACCurrentSensorACS70331/Grove5ADCACCurrentSensorACS70331.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ACS70331` · declared MPN `ACS70331` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove - 2.5A DC Current Sensor(ACS70331) — `Grove25ADCCurrentSensorACS70331`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove25ADCCurrentSensorACS70331/DESIGN_REVIEW1.md)
**Source:** [Grove25ADCCurrentSensorACS70331.circuit.tsx](boards/Grove25ADCCurrentSensorACS70331/Grove25ADCCurrentSensorACS70331.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ACS70331` · declared MPN `ACS70331` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove - Electricity Sensor — `GroveElectricitySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveElectricitySensor/DESIGN_REVIEW1.md)
**Source:** [GroveElectricitySensor.circuit.tsx](boards/GroveElectricitySensor/GroveElectricitySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ACS712` · declared MPN `ACS712` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Coulomb Counter 3.3V to 5V (LTC2941) — `GroveCoulombCounter33VTo5VLTC2941`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCoulombCounter33VTo5VLTC2941/DESIGN_REVIEW1.md)
**Source:** [GroveCoulombCounter33VTo5VLTC2941.circuit.tsx](boards/GroveCoulombCounter33VTo5VLTC2941/GroveCoulombCounter33VTo5VLTC2941.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `LTC2941` · declared MPN `LTC2941` · 3.3V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove - MOSFET — `GroveMOSFET`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMOSFET/DESIGN_REVIEW1.md)
**Source:** [GroveMOSFET.circuit.tsx](boards/GroveMOSFET/GroveMOSFET.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `2N7002` · declared MPN `2N7002` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - SPDT Relay(30A) — `GroveSPDTRelay30A`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSPDTRelay30A/DESIGN_REVIEW1.md)
**Source:** [GroveSPDTRelay30A.circuit.tsx](boards/GroveSPDTRelay30A/GroveSPDTRelay30A.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Screw Terminal — `GroveScrewTerminal`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveScrewTerminal/DESIGN_REVIEW1.md)
**Source:** [GroveScrewTerminal.circuit.tsx](boards/GroveScrewTerminal/GroveScrewTerminal.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `Screw-Terminal` · declared MPN `Screw-Terminal` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove - Electromagnet — `GroveElectromagnet`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveElectromagnet/DESIGN_REVIEW1.md)
**Source:** [GroveElectromagnet.circuit.tsx](boards/GroveElectromagnet/GroveElectromagnet.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MOSFET-Driver` · declared MPN `MOSFET-Driver` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove - Red LED — `GroveRedLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRedLED/DESIGN_REVIEW1.md)
**Source:** [GroveRedLED.circuit.tsx](boards/GroveRedLED/GroveRedLED.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove - Circular LED — `GroveCircularLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCircularLED/DESIGN_REVIEW1.md)
**Source:** [GroveCircularLED.circuit.tsx](boards/GroveCircularLED/GroveCircularLED.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove - RGB LED Ring (20 - WS2813 Mini) — `GroveRGBLEDRing20WS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDRing20WS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDRing20WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing20WS2813Mini/GroveRGBLEDRing20WS2813Mini.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 41 source components · 87 source traces · 81 PCB traces · 79 schematic traces · 0 placeholder MPNs · 84 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 84 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove - LED String Light — `GroveLEDStringLight`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDStringLight/DESIGN_REVIEW1.md)
**Source:** [GroveLEDStringLight.circuit.tsx](boards/GroveLEDStringLight/GroveLEDStringLight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove - LED Strip Driver — `GroveLEDStripDriver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDStripDriver/DESIGN_REVIEW1.md)
**Source:** [GroveLEDStripDriver.circuit.tsx](boards/GroveLEDStripDriver/GroveLEDStripDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove - RGB LED Matrix w/Driver — `GroveRGBLEDMatrixWDriver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDMatrixWDriver/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDMatrixWDriver.circuit.tsx](boards/GroveRGBLEDMatrixWDriver/GroveRGBLEDMatrixWDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 4 source components · 14 source traces · 8 PCB traces · 5 schematic traces · 0 placeholder MPNs · 11 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 11 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove - LED Matrix Driver (HT16K33) — `GroveLEDMatrixDriverHT16K33`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDMatrixDriverHT16K33/DESIGN_REVIEW1.md)
**Source:** [GroveLEDMatrixDriverHT16K33.circuit.tsx](boards/GroveLEDMatrixDriverHT16K33/GroveLEDMatrixDriverHT16K33.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · display · primary model `HT16K33` · declared MPN `HT16K33` · 5V

**Artifact counts:** 4 source components · 14 source traces · 8 PCB traces · 5 schematic traces · 0 placeholder MPNs · 11 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 11 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove - Red LED Matrix w/Driver — `GroveRedLEDMatrixWDriver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRedLEDMatrixWDriver/DESIGN_REVIEW1.md)
**Source:** [GroveRedLEDMatrixWDriver.circuit.tsx](boards/GroveRedLEDMatrixWDriver/GroveRedLEDMatrixWDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 4 source components · 14 source traces · 8 PCB traces · 5 schematic traces · 0 placeholder MPNs · 11 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 11 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — No explicit I²C pull-up value is visible in the source; calculate bus rise time at the declared rail and document whether pull-ups are on-board or supplied by the host.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove - Button — `GroveButton2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveButton2/DESIGN_REVIEW1.md)
**Source:** [GroveButton2.circuit.tsx](boards/GroveButton2/GroveButton2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Switch(P) — `GroveSwitchP`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSwitchP/DESIGN_REVIEW1.md)
**Source:** [GroveSwitchP.circuit.tsx](boards/GroveSwitchP/GroveSwitchP.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove-LED Button — `GroveLEDButton`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDButton/DESIGN_REVIEW1.md)
**Source:** [GroveLEDButton.circuit.tsx](boards/GroveLEDButton/GroveLEDButton.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Dual Button — `GroveDualButton`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDualButton/DESIGN_REVIEW1.md)
**Source:** [GroveDualButton.circuit.tsx](boards/GroveDualButton/GroveDualButton.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove-Mech keycap — `GroveMechKeycap`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMechKeycap/DESIGN_REVIEW1.md)
**Source:** [GroveMechKeycap.circuit.tsx](boards/GroveMechKeycap/GroveMechKeycap.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove - Thumb Joystick — `GroveThumbJoystick`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThumbJoystick/DESIGN_REVIEW1.md)
**Source:** [GroveThumbJoystick.circuit.tsx](boards/GroveThumbJoystick/GroveThumbJoystick.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - Magnetic Switch — `GroveMagneticSwitch`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMagneticSwitch/DESIGN_REVIEW1.md)
**Source:** [GroveMagneticSwitch.circuit.tsx](boards/GroveMagneticSwitch/GroveMagneticSwitch.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove - I2C Hub — `GroveI2CHub`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CHub/DESIGN_REVIEW1.md)
**Source:** [GroveI2CHub.circuit.tsx](boards/GroveI2CHub/GroveI2CHub.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 7 source components · 25 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - I2C Hub(6 Port) — `GroveI2CHub6Port`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CHub6Port/DESIGN_REVIEW1.md)
**Source:** [GroveI2CHub6Port.circuit.tsx](boards/GroveI2CHub6Port/GroveI2CHub6Port.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 7 source components · 25 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - 8 Channel I2C Multiplexer/I2C Hub (TCA9548A) — `Grove8ChannelI2CMultiplexerI2CHubTCA9548A`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove8ChannelI2CMultiplexerI2CHubTCA9548A/DESIGN_REVIEW1.md)
**Source:** [Grove8ChannelI2CMultiplexerI2CHubTCA9548A.circuit.tsx](boards/Grove8ChannelI2CMultiplexerI2CHubTCA9548A/Grove8ChannelI2CMultiplexerI2CHubTCA9548A.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 7 source components · 25 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - 4-Channel 16-bit ADC(ADS1115) — `Grove4Channel16BitADCADS1115`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove4Channel16BitADCADS1115/DESIGN_REVIEW1.md)
**Source:** [Grove4Channel16BitADCADS1115.circuit.tsx](boards/Grove4Channel16BitADCADS1115/Grove4Channel16BitADCADS1115.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `ADS1115` · declared MPN `ADS1115` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove - Wrapper — `GroveWrapper`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWrapper/DESIGN_REVIEW1.md)
**Source:** [GroveWrapper.circuit.tsx](boards/GroveWrapper/GroveWrapper.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `Grove-Wrapper` · declared MPN `Grove-Wrapper` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove 16 x 2 LCD Black on Yellow — `Grove16X2LCDBlackOnYellow`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove16X2LCDBlackOnYellow/DESIGN_REVIEW1.md)
**Source:** [Grove16X2LCDBlackOnYellow.circuit.tsx](boards/Grove16X2LCDBlackOnYellow/Grove16X2LCDBlackOnYellow.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Yellow.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove 16 x 2 LCD Black on Red — `Grove16X2LCDBlackOnRed`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove16X2LCDBlackOnRed/DESIGN_REVIEW1.md)
**Source:** [Grove16X2LCDBlackOnRed.circuit.tsx](boards/Grove16X2LCDBlackOnRed/Grove16X2LCDBlackOnRed.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Red.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove 16x2 LCD White on Blue — `Grove16x2LCDWhiteOnBlue`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove16x2LCDWhiteOnBlue/DESIGN_REVIEW1.md)
**Source:** [Grove16x2LCDWhiteOnBlue.circuit.tsx](boards/Grove16x2LCDWhiteOnBlue/Grove16x2LCDWhiteOnBlue.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16x2-LCD-White-on-Blue.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove I2C UV Sensor VEML6070 — `GroveI2CUVSensorVEML6070`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CUVSensorVEML6070/DESIGN_REVIEW1.md)
**Source:** [GroveI2CUVSensorVEML6070.circuit.tsx](boards/GroveI2CUVSensorVEML6070/GroveI2CUVSensorVEML6070.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-UV-Sensor-VEML6070.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `VEML6070` · declared MPN `VEML6070` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Capacitive Touch Slider Sensor CY8C4014LQI — `GroveCapacitiveTouchSliderSensorCY8C4014LQI`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCapacitiveTouchSliderSensorCY8C4014LQI/DESIGN_REVIEW1.md)
**Source:** [GroveCapacitiveTouchSliderSensorCY8C4014LQI.circuit.tsx](boards/GroveCapacitiveTouchSliderSensorCY8C4014LQI/GroveCapacitiveTouchSliderSensorCY8C4014LQI.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Capacitive-Touch-Slider-Sensor-CY8C4014LQI.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `CY8C4014` · declared MPN `CY8C4014` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove Vibration Sensor SW 420 — `GroveVibrationSensorSW420`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVibrationSensorSW420/DESIGN_REVIEW1.md)
**Source:** [GroveVibrationSensorSW420.circuit.tsx](boards/GroveVibrationSensorSW420/GroveVibrationSensorSW420.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Vibration-Sensor-SW-420.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `SW-420` · declared MPN `SW-420` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove IMU 9DOF ICM20600 AK09918 — `GroveIMU9DOFICM20600AK09918`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU9DOFICM20600AK09918/DESIGN_REVIEW1.md)
**Source:** [GroveIMU9DOFICM20600AK09918.circuit.tsx](boards/GroveIMU9DOFICM20600AK09918/GroveIMU9DOFICM20600AK09918.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-ICM20600-AK09918.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `ICM20600` · declared MPN `ICM20600` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove 12 Key Capacitive I2C Touch Sensor V2 MPR121 — `Grove12KeyCapacitiveI2CTouchSensorV2MPR121`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12KeyCapacitiveI2CTouchSensorV2MPR121/DESIGN_REVIEW1.md)
**Source:** [Grove12KeyCapacitiveI2CTouchSensorV2MPR121.circuit.tsx](boards/Grove12KeyCapacitiveI2CTouchSensorV2MPR121/Grove12KeyCapacitiveI2CTouchSensorV2MPR121.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-12-Key-Capacitive-I2C-Touch-Sensor-V2-MPR121.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · input · primary model `MPR121` · declared MPN `MPR121` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove 6 Position DIP Switch — `Grove6PositionDIPSwitch`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6PositionDIPSwitch/DESIGN_REVIEW1.md)
**Source:** [Grove6PositionDIPSwitch.circuit.tsx](boards/Grove6PositionDIPSwitch/Grove6PositionDIPSwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Position-DIP-Switch.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove 5 Way Switch — `Grove5WaySwitch`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove5WaySwitch/DESIGN_REVIEW1.md)
**Source:** [Grove5WaySwitch.circuit.tsx](boards/Grove5WaySwitch/Grove5WaySwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-5-Way-Switch.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove 4 Channel Solid State Relay — `Grove4ChannelSolidStateRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove4ChannelSolidStateRelay/DESIGN_REVIEW1.md)
**Source:** [Grove4ChannelSolidStateRelay.circuit.tsx](boards/Grove4ChannelSolidStateRelay/Grove4ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-4-Channel-Solid-State-Relay.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove 2 Channel Solid State Relay — `Grove2ChannelSolidStateRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove2ChannelSolidStateRelay/DESIGN_REVIEW1.md)
**Source:** [Grove2ChannelSolidStateRelay.circuit.tsx](boards/Grove2ChannelSolidStateRelay/Grove2ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-2-Channel-Solid-State-Relay.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Solid State Relay V2 — `GroveSolidStateRelayV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSolidStateRelayV2/DESIGN_REVIEW1.md)
**Source:** [GroveSolidStateRelayV2.circuit.tsx](boards/GroveSolidStateRelayV2/GroveSolidStateRelayV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Solid-State-Relay-V2-p-3128.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove WS2813 RGB LED Strip Waterproof 60 LED m 1m — `GroveWS2813RGBLEDStripWaterproof60LEDM1m`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWS2813RGBLEDStripWaterproof60LEDM1m/DESIGN_REVIEW1.md)
**Source:** [GroveWS2813RGBLEDStripWaterproof60LEDM1m.circuit.tsx](boards/GroveWS2813RGBLEDStripWaterproof60LEDM1m/GroveWS2813RGBLEDStripWaterproof60LEDM1m.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-60-LED-m-1m.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove WS2813 RGB LED Strip Waterproof 30 LED m 1m — `GroveWS2813RGBLEDStripWaterproof30LEDM1m`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWS2813RGBLEDStripWaterproof30LEDM1m/DESIGN_REVIEW1.md)
**Source:** [GroveWS2813RGBLEDStripWaterproof30LEDM1m.circuit.tsx](boards/GroveWS2813RGBLEDStripWaterproof30LEDM1m/GroveWS2813RGBLEDStripWaterproof30LEDM1m.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-30-LED-m-1m.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Blue LED Button — `GroveBlueLEDButton`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBlueLEDButton/DESIGN_REVIEW1.md)
**Source:** [GroveBlueLEDButton.circuit.tsx](boards/GroveBlueLEDButton/GroveBlueLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blue-LED-Button.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Yellow LED Button — `GroveYellowLEDButton`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveYellowLEDButton/DESIGN_REVIEW1.md)
**Source:** [GroveYellowLEDButton.circuit.tsx](boards/GroveYellowLEDButton/GroveYellowLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Yellow-LED-Button.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Red LED Button — `GroveRedLEDButton`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRedLEDButton/DESIGN_REVIEW1.md)
**Source:** [GroveRedLEDButton.circuit.tsx](boards/GroveRedLEDButton/GroveRedLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Red-LED-Button.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F P — `GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP.circuit.tsx](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F-P.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `GP2Y0D805Z0F` · declared MPN `GP2Y0D805Z0F` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F — `GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F.circuit.tsx](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `GP2Y0D805Z0F` · declared MPN `GP2Y0D805Z0F` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove I2C FM Receiver v1 1 — `GroveI2CFMReceiverV11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CFMReceiverV11/DESIGN_REVIEW1.md)
**Source:** [GroveI2CFMReceiverV11.circuit.tsx](boards/GroveI2CFMReceiverV11/GroveI2CFMReceiverV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-FM-Receiver-v1-1.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `RDA5807M` · declared MPN `RDA5807M` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove UART WiFi V2 ESP8285 — `GroveUARTWiFiV2ESP8285`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUARTWiFiV2ESP8285/DESIGN_REVIEW1.md)
**Source:** [GroveUARTWiFiV2ESP8285.circuit.tsx](boards/GroveUARTWiFiV2ESP8285/GroveUARTWiFiV2ESP8285.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-UART-WiFi-V2-ESP8285.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove 3 Axis Digital Compass V2 — `Grove3AxisDigitalCompassV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalCompassV2/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalCompassV2.circuit.tsx](boards/Grove3AxisDigitalCompassV2/Grove3AxisDigitalCompassV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass-V2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Micro Switch — `GroveMicroSwitch`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMicroSwitch/DESIGN_REVIEW1.md)
**Source:** [GroveMicroSwitch.circuit.tsx](boards/GroveMicroSwitch/GroveMicroSwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Micro-Switch.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove OLED Display 1 12 V2 — `GroveOLEDDisplay112V2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay112V2/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay112V2.circuit.tsx](boards/GroveOLEDDisplay112V2/GroveOLEDDisplay112V2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12-V2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove Variable Color LED V1 1 — `GroveVariableColorLEDV11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVariableColorLEDV11/DESIGN_REVIEW1.md)
**Source:** [GroveVariableColorLEDV11.circuit.tsx](boards/GroveVariableColorLEDV11/GroveVariableColorLEDV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Variable-Color-LED-V1-1.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove mini PIR motion sensor — `GroveMiniPIRMotionSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMiniPIRMotionSensor/DESIGN_REVIEW1.md)
**Source:** [GroveMiniPIRMotionSensor.circuit.tsx](boards/GroveMiniPIRMotionSensor/GroveMiniPIRMotionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-mini-PIR-motion-sensor-p-2930.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove I2C Color Sensor V2 — `GroveI2CColorSensorV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CColorSensorV2/DESIGN_REVIEW1.md)
**Source:** [GroveI2CColorSensorV2.circuit.tsx](boards/GroveI2CColorSensorV2/GroveI2CColorSensorV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Color-Sensor-V2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `TCS3414CS` · declared MPN `TCS3414CS` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Heelight Sensor — `GroveHeelightSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHeelightSensor/DESIGN_REVIEW1.md)
**Source:** [GroveHeelightSensor.circuit.tsx](boards/GroveHeelightSensor/GroveHeelightSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Heelight-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Infrared Reflective Sensor v1 2 — `GroveInfraredReflectiveSensorV12`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveInfraredReflectiveSensorV12/DESIGN_REVIEW1.md)
**Source:** [GroveInfraredReflectiveSensorV12.circuit.tsx](boards/GroveInfraredReflectiveSensorV12/GroveInfraredReflectiveSensorV12.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Infrared-Reflective-Sensor-v1-2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 5 source components · 16 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove LoRa Radio 433MHz — `GroveLoRaRadio433MHz`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLoRaRadio433MHz/DESIGN_REVIEW1.md)
**Source:** [GroveLoRaRadio433MHz.circuit.tsx](boards/GroveLoRaRadio433MHz/GroveLoRaRadio433MHz.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-Radio-433MHz-p-2777.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove LoRa Radio 868MHz — `GroveLoRaRadio868MHz`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLoRaRadio868MHz/DESIGN_REVIEW1.md)
**Source:** [GroveLoRaRadio868MHz.circuit.tsx](boards/GroveLoRaRadio868MHz/GroveLoRaRadio868MHz.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-Radio-868MHz.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove High Precision RTC — `GroveHighPrecisionRTC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHighPrecisionRTC/DESIGN_REVIEW1.md)
**Source:** [GroveHighPrecisionRTC.circuit.tsx](boards/GroveHighPrecisionRTC/GroveHighPrecisionRTC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-High-Precision-RTC.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove Light Sensor v1 2 LS06 S phototransistor — `GroveLightSensorV12LS06SPhototransistor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightSensorV12LS06SPhototransistor/DESIGN_REVIEW1.md)
**Source:** [GroveLightSensorV12LS06SPhototransistor.circuit.tsx](boards/GroveLightSensorV12LS06SPhototransistor/GroveLightSensorV12LS06SPhototransistor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Sensor-v1-2-LS06-S-phototransistor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Recorder v3 0 — `GroveRecorderV30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRecorderV30/DESIGN_REVIEW1.md)
**Source:** [GroveRecorderV30.circuit.tsx](boards/GroveRecorderV30/GroveRecorderV30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Recorder-v3-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 4 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove Speech Recognizer — `GroveSpeechRecognizer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSpeechRecognizer/DESIGN_REVIEW1.md)
**Source:** [GroveSpeechRecognizer.circuit.tsx](boards/GroveSpeechRecognizer/GroveSpeechRecognizer.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Speech-Recognizer.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · utility · primary model `M007` · declared MPN `M007` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.

### Grove Light Sensor P v1 1 — `GroveLightSensorPV11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightSensorPV11/DESIGN_REVIEW1.md)
**Source:** [GroveLightSensorPV11.circuit.tsx](boards/GroveLightSensorPV11/GroveLightSensorPV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Sensor-P-v1-1.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove IMU 10DOF v2 0 — `GroveIMU10DOFV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU10DOFV20/DESIGN_REVIEW1.md)
**Source:** [GroveIMU10DOFV20.circuit.tsx](boards/GroveIMU10DOFV20/GroveIMU10DOFV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-10DOF-v2-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MPU-9250` · declared MPN `MPU-9250` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Mini Fan v1 1 — `GroveMiniFanV11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMiniFanV11/DESIGN_REVIEW1.md)
**Source:** [GroveMiniFanV11.circuit.tsx](boards/GroveMiniFanV11/GroveMiniFanV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Fan-v1-1.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `ATMEGA168PV-10MU` · declared MPN `ATMEGA168PV-10MU` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Temperature Humidity Sensor SHT31 — `GroveTemperatureHumiditySensorSHT31`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorSHT31/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorSHT31.circuit.tsx](boards/GroveTemperatureHumiditySensorSHT31/GroveTemperatureHumiditySensorSHT31.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-SHT31.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SHT31` · declared MPN `SHT31` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove BME280 Environmental Sensor Temperature Humidity Barometer — `GroveBME280EnvironmentalSensorTemperatureHumidityBarometer`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBME280EnvironmentalSensorTemperatureHumidityBarometer/DESIGN_REVIEW1.md)
**Source:** [GroveBME280EnvironmentalSensorTemperatureHumidityBarometer.circuit.tsx](boards/GroveBME280EnvironmentalSensorTemperatureHumidityBarometer/GroveBME280EnvironmentalSensorTemperatureHumidityBarometer.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-BME280-Environmental-Sensor-Temperature-Humidity-Barometer.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BME280` · declared MPN `BME280` · 5V

**Artifact counts:** 8 source components · 28 source traces · 18 PCB traces · 10 schematic traces · 0 placeholder MPNs · 23 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 23 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove LED Matrix Driver v1 0 — `GroveLEDMatrixDriverV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDMatrixDriverV10/DESIGN_REVIEW1.md)
**Source:** [GroveLEDMatrixDriverV10.circuit.tsx](boards/GroveLEDMatrixDriverV10/GroveLEDMatrixDriverV10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Matrix-Driver-v1-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 4 source components · 14 source traces · 8 PCB traces · 5 schematic traces · 0 placeholder MPNs · 11 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 11 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove Mouse Encoder — `GroveMouseEncoder`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMouseEncoder/DESIGN_REVIEW1.md)
**Source:** [GroveMouseEncoder.circuit.tsx](boards/GroveMouseEncoder/GroveMouseEncoder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mouse-Encoder.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove MP3 v2 0 — `GroveMP3V20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMP3V20/DESIGN_REVIEW1.md)
**Source:** [GroveMP3V20.circuit.tsx](boards/GroveMP3V20/GroveMP3V20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MP3-v2-0-p-2597.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.

### Grove Mini Track Ball — `GroveMiniTrackBall`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMiniTrackBall/DESIGN_REVIEW1.md)
**Source:** [GroveMiniTrackBall.circuit.tsx](boards/GroveMiniTrackBall/GroveMiniTrackBall.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Track-Ball.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Haptic Motor — `GroveHapticMotor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHapticMotor/DESIGN_REVIEW1.md)
**Source:** [GroveHapticMotor.circuit.tsx](boards/GroveHapticMotor/GroveHapticMotor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Haptic-Motor-p-2546.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `DRV2605` · declared MPN `DRV2605` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Water Atomization v1 0 — `GroveWaterAtomizationV10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWaterAtomizationV10/DESIGN_REVIEW1.md)
**Source:** [GroveWaterAtomizationV10.circuit.tsx](boards/GroveWaterAtomizationV10/GroveWaterAtomizationV10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Water-Atomization-v1-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `Atomizer-Driver` · declared MPN `Atomizer-Driver` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Temperature Humidity Sensor HDC100 — `GroveTemperatureHumiditySensorHDC100`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorHDC100/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorHDC100.circuit.tsx](boards/GroveTemperatureHumiditySensorHDC100/GroveTemperatureHumiditySensorHDC100.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-HDC100-p-2535.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove I2C Mini Motor Driver — `GroveI2CMiniMotorDriver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CMiniMotorDriver/DESIGN_REVIEW1.md)
**Source:** [GroveI2CMiniMotorDriver.circuit.tsx](boards/GroveI2CMiniMotorDriver/GroveI2CMiniMotorDriver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Mini-Motor-Driver.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 10 source components · 32 source traces · 20 PCB traces · 11 schematic traces · 0 placeholder MPNs · 26 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 26 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Uart Wifi — `GroveUartWifi`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUartWifi/DESIGN_REVIEW1.md)
**Source:** [GroveUartWifi.circuit.tsx](boards/GroveUartWifi/GroveUartWifi.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Uart-Wifi-p-2495.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove 6 Axis Accelerometer Compass v2 0 — `Grove6AxisAccelerometerCompassV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6AxisAccelerometerCompassV20/DESIGN_REVIEW1.md)
**Source:** [Grove6AxisAccelerometerCompassV20.circuit.tsx](boards/Grove6AxisAccelerometerCompassV20/Grove6AxisAccelerometerCompassV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-v2-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Serial Blueseeed CSR BC417 — `GroveSerialBlueseeedCSRBC417`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialBlueseeedCSRBC417/DESIGN_REVIEW1.md)
**Source:** [GroveSerialBlueseeedCSRBC417.circuit.tsx](boards/GroveSerialBlueseeedCSRBC417/GroveSerialBlueseeedCSRBC417.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-Blueseeed-CSR-BC417.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `BC417` · declared MPN `BC417` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove LED Bar v2 0 — `GroveLEDBarV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDBarV20/DESIGN_REVIEW1.md)
**Source:** [GroveLEDBarV20.circuit.tsx](boards/GroveLEDBarV20/GroveLEDBarV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Bar-v2-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 7 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove Gesture PAJ7620U2 — `GroveGesturePAJ7620U2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGesturePAJ7620U2/DESIGN_REVIEW1.md)
**Source:** [GroveGesturePAJ7620U2.circuit.tsx](boards/GroveGesturePAJ7620U2/GroveGesturePAJ7620U2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gesture-PAJ7620U2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · utility · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.

### Grove Finger clip Heart Rate Sensor with shell — `GroveFingerClipHeartRateSensorWithShell`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFingerClipHeartRateSensorWithShell/DESIGN_REVIEW1.md)
**Source:** [GroveFingerClipHeartRateSensorWithShell.circuit.tsx](boards/GroveFingerClipHeartRateSensorWithShell/GroveFingerClipHeartRateSensorWithShell.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Finger-clip-Heart-Rate-Sensor-with-shell.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Blueseeed Dual model HM13 — `GroveBlueseeedDualModelHM13`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBlueseeedDualModelHM13/DESIGN_REVIEW1.md)
**Source:** [GroveBlueseeedDualModelHM13.circuit.tsx](boards/GroveBlueseeedDualModelHM13/GroveBlueseeedDualModelHM13.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blueseeed-Dual-model-HM13.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `HM-13` · declared MPN `HM-13` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove IMU 9DOF v2 0 — `GroveIMU9DOFV20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU9DOFV20/DESIGN_REVIEW1.md)
**Source:** [GroveIMU9DOFV20.circuit.tsx](boards/GroveIMU9DOFV20/GroveIMU9DOFV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-v2-0.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MPU-9150` · declared MPN `MPU-9150` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove IMU 10DOF — `GroveIMU10DOF`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU10DOF/DESIGN_REVIEW1.md)
**Source:** [GroveIMU10DOF.circuit.tsx](boards/GroveIMU10DOF/GroveIMU10DOF.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-10DOF-p-2386.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MPU-9250` · declared MPN `MPU-9250` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove EL Driver — `GroveELDriver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveELDriver/DESIGN_REVIEW1.md)
**Source:** [GroveELDriver.circuit.tsx](boards/GroveELDriver/GroveELDriver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-EL-Driver.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Carbon Dioxide Sensor MH Z16 — `GroveCarbonDioxideSensorMHZ16`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCarbonDioxideSensorMHZ16/DESIGN_REVIEW1.md)
**Source:** [GroveCarbonDioxideSensorMHZ16.circuit.tsx](boards/GroveCarbonDioxideSensorMHZ16/GroveCarbonDioxideSensorMHZ16.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Carbon-Dioxide-Sensor-MH-Z16.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `MH-Z16` · declared MPN `MH-Z16` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Q Touch Sensor — `GroveQTouchSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveQTouchSensor/DESIGN_REVIEW1.md)
**Source:** [GroveQTouchSensor.circuit.tsx](boards/GroveQTouchSensor/GroveQTouchSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Q-Touch-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove FM Receiver — `GroveFMReceiver`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFMReceiver/DESIGN_REVIEW1.md)
**Source:** [GroveFMReceiver.circuit.tsx](boards/GroveFMReceiver/GroveFMReceiver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-FM-Receiver.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `SX6119` · declared MPN `SX6119` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove Barometer Sensor BMP18 — `GroveBarometerSensorBMP18`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBarometerSensorBMP18/DESIGN_REVIEW1.md)
**Source:** [GroveBarometerSensorBMP18.circuit.tsx](boards/GroveBarometerSensorBMP18/GroveBarometerSensorBMP18.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Barometer-Sensor-BMP18-p-1840.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove Recorder — `GroveRecorder`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRecorder/DESIGN_REVIEW1.md)
**Source:** [GroveRecorder.circuit.tsx](boards/GroveRecorder/GroveRecorder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Recorder-p-1825.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 4 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove NFC — `GroveNFC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveNFC/DESIGN_REVIEW1.md)
**Source:** [GroveNFC.circuit.tsx](boards/GroveNFC/GroveNFC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-NFC.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove IMU 9DOF — `GroveIMU9DOF`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIMU9DOF/DESIGN_REVIEW1.md)
**Source:** [GroveIMU9DOF.circuit.tsx](boards/GroveIMU9DOF/GroveIMU9DOF.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-p-1728.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MPU-9150` · declared MPN `MPU-9150` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Mini Camera — `GroveMiniCamera`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMiniCamera/DESIGN_REVIEW1.md)
**Source:** [GroveMiniCamera.circuit.tsx](boards/GroveMiniCamera/GroveMiniCamera.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Camera-p-1578.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `OV2640` · declared MPN `OV2640` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove PH Sensor — `GrovePHSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GrovePHSensor/DESIGN_REVIEW1.md)
**Source:** [GrovePHSensor.circuit.tsx](boards/GrovePHSensor/GrovePHSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-PH-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `OPA333` · declared MPN `OPA333` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Serial MP3 Player — `GroveSerialMP3Player`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialMP3Player/DESIGN_REVIEW1.md)
**Source:** [GroveSerialMP3Player.circuit.tsx](boards/GroveSerialMP3Player/GroveSerialMP3Player.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-MP3-Player-p-1542.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Single Axis Analog Gyro — `GroveSingleAxisAnalogGyro`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSingleAxisAnalogGyro/DESIGN_REVIEW1.md)
**Source:** [GroveSingleAxisAnalogGyro.circuit.tsx](boards/GroveSingleAxisAnalogGyro/GroveSingleAxisAnalogGyro.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Single-Axis-Analog-Gyro-p-1451.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · utility · primary model `ENC-03R` · declared MPN `ENC-03R` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.

### Grove 6 Axis Accelerometer Compass — `Grove6AxisAccelerometerCompass`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6AxisAccelerometerCompass/DESIGN_REVIEW1.md)
**Source:** [Grove6AxisAccelerometerCompass.circuit.tsx](boards/Grove6AxisAccelerometerCompass/Grove6AxisAccelerometerCompass.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-p-1448.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Fingerprint Sensor — `GroveFingerprintSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFingerprintSensor/DESIGN_REVIEW1.md)
**Source:** [GroveFingerprintSensor.circuit.tsx](boards/GroveFingerprintSensor/GroveFingerprintSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Fingerprint-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `AS608` · declared MPN `AS608` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Gas Sensor MQ9 — `GroveGasSensorMQ9`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorMQ9/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorMQ9.circuit.tsx](boards/GroveGasSensorMQ9/GroveGasSensorMQ9.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ9.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-9` · declared MPN `MQ-9` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove MQ3 Grove Gas Sensor — `GroveMQ3GroveGasSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMQ3GroveGasSensor/DESIGN_REVIEW1.md)
**Source:** [GroveMQ3GroveGasSensor.circuit.tsx](boards/GroveMQ3GroveGasSensor/GroveMQ3GroveGasSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MQ3-Grove-Gas-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-3` · declared MPN `MQ-3` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Dry Reed Relay — `GroveDryReedRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDryReedRelay/DESIGN_REVIEW1.md)
**Source:** [GroveDryReedRelay.circuit.tsx](boards/GroveDryReedRelay/GroveDryReedRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Dry-Reed-Relay.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Solid State Relay — `GroveSolidStateRelay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSolidStateRelay/DESIGN_REVIEW1.md)
**Source:** [GroveSolidStateRelay.circuit.tsx](boards/GroveSolidStateRelay/GroveSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Solid-State-Relay.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 27 source traces · 17 PCB traces · 9 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove LED Bar — `GroveLEDBar`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLEDBar/DESIGN_REVIEW1.md)
**Source:** [GroveLEDBar.circuit.tsx](boards/GroveLEDBar/GroveLEDBar.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Bar.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Differential Amplifier — `GroveDifferentialAmplifier`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDifferentialAmplifier/DESIGN_REVIEW1.md)
**Source:** [GroveDifferentialAmplifier.circuit.tsx](boards/GroveDifferentialAmplifier/GroveDifferentialAmplifier.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Differential-Amplifier.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `INA125` · declared MPN `INA125` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Digital Light Sensor TSL2561 — `GroveDigitalLightSensorTSL2561`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalLightSensorTSL2561/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalLightSensorTSL2561.circuit.tsx](boards/GroveDigitalLightSensorTSL2561/GroveDigitalLightSensorTSL2561.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Light-Sensor-TSL2561.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `TSL2561` · declared MPN `TSL2561` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove IR Distance Interrupter — `GroveIRDistanceInterrupter`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveIRDistanceInterrupter/DESIGN_REVIEW1.md)
**Source:** [GroveIRDistanceInterrupter.circuit.tsx](boards/GroveIRDistanceInterrupter/GroveIRDistanceInterrupter.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IR-Distance-Interrupter-p-1278.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Button P — `GroveButtonP`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveButtonP/DESIGN_REVIEW1.md)
**Source:** [GroveButtonP.circuit.tsx](boards/GroveButtonP/GroveButtonP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Button-P.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 5 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Rotary Angle Sensor P — `GroveRotaryAngleSensorP`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRotaryAngleSensorP/DESIGN_REVIEW1.md)
**Source:** [GroveRotaryAngleSensorP.circuit.tsx](boards/GroveRotaryAngleSensorP/GroveRotaryAngleSensorP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Rotary-Angle-Sensor-P.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 5 source components · 16 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 13 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 13 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove Barometer Sensor — `GroveBarometerSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBarometerSensor/DESIGN_REVIEW1.md)
**Source:** [GroveBarometerSensor.circuit.tsx](boards/GroveBarometerSensor/GroveBarometerSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Barometer-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove Serial Camera — `GroveSerialCamera`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialCamera/DESIGN_REVIEW1.md)
**Source:** [GroveSerialCamera.circuit.tsx](boards/GroveSerialCamera/GroveSerialCamera.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-Camera-p-945.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `VC0706` · declared MPN `VC0706` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Gas Sensor MQ5 — `GroveGasSensorMQ5`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorMQ5/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorMQ5.circuit.tsx](boards/GroveGasSensorMQ5/GroveGasSensorMQ5.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ5.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-5` · declared MPN `MQ-5` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Gas Sensor MQ2 — `GroveGasSensorMQ2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorMQ2/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorMQ2.circuit.tsx](boards/GroveGasSensorMQ2/GroveGasSensorMQ2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ2.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MQ-2` · declared MPN `MQ-2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove I2C Motor Driver with L298 — `GroveI2CMotorDriverWithL298`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CMotorDriverWithL298/DESIGN_REVIEW1.md)
**Source:** [GroveI2CMotorDriverWithL298.circuit.tsx](boards/GroveI2CMotorDriverWithL298/GroveI2CMotorDriverWithL298.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Motor-Driver-with-L298.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 10 source components · 32 source traces · 20 PCB traces · 11 schematic traces · 0 placeholder MPNs · 26 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 26 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; a switching element is present, but its SOA/gate drive/return path must be verified.
- P1 — This load family needs a measured current path and suppression network; a diode is declared, but polarity, pulse energy, and physical placement must be checked.

### Grove Sound Recorder — `GroveSoundRecorder`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSoundRecorder/DESIGN_REVIEW1.md)
**Source:** [GroveSoundRecorder.circuit.tsx](boards/GroveSoundRecorder/GroveSoundRecorder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Sound-Recorder-p-904.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Audio noise, bias, gain, grounding, acoustic port, and cable EMI need bench measurements; the current netlist does not prove signal integrity or dynamic range.

### Grove Geiger Counter — `GroveGeigerCounter`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGeigerCounter/DESIGN_REVIEW1.md)
**Source:** [GroveGeigerCounter.circuit.tsx](boards/GroveGeigerCounter/GroveGeigerCounter.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Geiger-Counter-p-867.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `M4011` · declared MPN `M4011` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove I2C Color Sensor — `GroveI2CColorSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CColorSensor/DESIGN_REVIEW1.md)
**Source:** [GroveI2CColorSensor.circuit.tsx](boards/GroveI2CColorSensor/GroveI2CColorSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Color-Sensor-p-854.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `TCS3414CS` · declared MPN `TCS3414CS` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Variable Color LED — `GroveVariableColorLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveVariableColorLED/DESIGN_REVIEW1.md)
**Source:** [GroveVariableColorLED.circuit.tsx](boards/GroveVariableColorLED/GroveVariableColorLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Variable-Color-LED-p-852.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove Chainable RGB LED — `GroveChainableRGBLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveChainableRGBLED/DESIGN_REVIEW1.md)
**Source:** [GroveChainableRGBLED.circuit.tsx](boards/GroveChainableRGBLED/GroveChainableRGBLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Chainable-RGB-LED.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · actuator · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove I2C Touch Sensor — `GroveI2CTouchSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveI2CTouchSensor/DESIGN_REVIEW1.md)
**Source:** [GroveI2CTouchSensor.circuit.tsx](boards/GroveI2CTouchSensor/GroveI2CTouchSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Touch-Sensor-p-840.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 6 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.

### Grove Temperature Humidity Sensor Pro AM2302 DHT22 — `GroveTemperatureHumiditySensorProAM2302DHT22`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorProAM2302DHT22/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorProAM2302DHT22.circuit.tsx](boards/GroveTemperatureHumiditySensorProAM2302DHT22/GroveTemperatureHumiditySensorProAM2302DHT22.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-Pro-AM2302-DHT22.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT22` · declared MPN `DHT22` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove BlinkM — `GroveBlinkM`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBlinkM/DESIGN_REVIEW1.md)
**Source:** [GroveBlinkM.circuit.tsx](boards/GroveBlinkM/GroveBlinkM.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-BlinkM-p-826.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Line Finder — `GroveLineFinder`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLineFinder/DESIGN_REVIEW1.md)
**Source:** [GroveLineFinder.circuit.tsx](boards/GroveLineFinder/GroveLineFinder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Line-Finder-p-825.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove OLED Display 1 12 — `GroveOLEDDisplay112`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay112/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay112.circuit.tsx](boards/GroveOLEDDisplay112/GroveOLEDDisplay112.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove OLED Display 0 96 — `GroveOLEDDisplay096`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay096/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay096.circuit.tsx](boards/GroveOLEDDisplay096/GroveOLEDDisplay096.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-0-96.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove Serial LCD — `GroveSerialLCD`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSerialLCD/DESIGN_REVIEW1.md)
**Source:** [GroveSerialLCD.circuit.tsx](boards/GroveSerialLCD/GroveSerialLCD.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-LCD-p-773.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `ST7066U` · declared MPN `ST7066U` · 5V

**Artifact counts:** 6 source components · 23 source traces · 11 PCB traces · 6 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — No explicit I²C pull-up value is visible in the source; calculate bus rise time at the declared rail and document whether pull-ups are on-board or supplied by the host.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove LED — `GroveLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLED/DESIGN_REVIEW1.md)
**Source:** [GroveLED.circuit.tsx](boards/GroveLED/GroveLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-p-767.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove 3 Axis Digital Accelerometer 1 5g — `Grove3AxisDigitalAccelerometer15g`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer15g/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer15g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer15g/Grove3AxisDigitalAccelerometer15g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-1-5g.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MMA7660FC` · declared MPN `MMA7660FC` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove 3 Axis Digital Compass — `Grove3AxisDigitalCompass`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalCompass/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalCompass.circuit.tsx](boards/Grove3AxisDigitalCompass/Grove3AxisDigitalCompass.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove RTC DS1307 — `GroveRTCDS1307`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRTCDS1307/DESIGN_REVIEW1.md)
**Source:** [GroveRTCDS1307.circuit.tsx](boards/GroveRTCDS1307/GroveRTCDS1307.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RTC-DS1307.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove 3 Axis Digital Gyro — `Grove3AxisDigitalGyro`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalGyro/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalGyro.circuit.tsx](boards/Grove3AxisDigitalGyro/Grove3AxisDigitalGyro.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Gyro.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ITG-3205` · declared MPN `ITG-3205` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove 3 Axis Digital Accelerometer 16g — `Grove3AxisDigitalAccelerometer16g`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer16g/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer16g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer16g/Grove3AxisDigitalAccelerometer16g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-16g.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL345` · declared MPN `ADXL345` · 5V

**Artifact counts:** 7 source components · 22 source traces · 15 PCB traces · 10 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Green LED — `GroveGreenLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGreenLED/DESIGN_REVIEW1.md)
**Source:** [GroveGreenLED.circuit.tsx](boards/GroveGreenLED/GroveGreenLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Green-LED.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Purple LED 3mm — `GrovePurpleLED3mm`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GrovePurpleLED3mm/DESIGN_REVIEW1.md)
**Source:** [GrovePurpleLED3mm.circuit.tsx](boards/GrovePurpleLED3mm/GrovePurpleLED3mm.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Purple-LED-3mm.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Multi Color Flash LED 5mm — `GroveMultiColorFlashLED5mm`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMultiColorFlashLED5mm/DESIGN_REVIEW1.md)
**Source:** [GroveMultiColorFlashLED5mm.circuit.tsx](boards/GroveMultiColorFlashLED5mm/GroveMultiColorFlashLED5mm.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Multi-Color-Flash-LED-5mm.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove White LED — `GroveWhiteLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWhiteLED/DESIGN_REVIEW1.md)
**Source:** [GroveWhiteLED.circuit.tsx](boards/GroveWhiteLED/GroveWhiteLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-White-LED.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Blue LED — `GroveBlueLED`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBlueLED/DESIGN_REVIEW1.md)
**Source:** [GroveBlueLED.circuit.tsx](boards/GroveBlueLED/GroveBlueLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blue-LED.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove Collision Sensor — `GroveCollisionSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCollisionSensor/DESIGN_REVIEW1.md)
**Source:** [GroveCollisionSensor.circuit.tsx](boards/GroveCollisionSensor/GroveCollisionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Collision-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `MVS0608.02` · declared MPN `MVS0608.02` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Dragrove Generic gateway for internet of things — `GroveDragroveGenericGatewayForInternetOfThings`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDragroveGenericGatewayForInternetOfThings/DESIGN_REVIEW1.md)
**Source:** [GroveDragroveGenericGatewayForInternetOfThings.circuit.tsx](boards/GroveDragroveGenericGatewayForInternetOfThings/GroveDragroveGenericGatewayForInternetOfThings.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Dragrove-Generic-gateway-for-internet-of-things-p-1118.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ESP8266` · declared MPN `ESP8266` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Chest Strap Heart Rate Sensor — `GroveChestStrapHeartRateSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveChestStrapHeartRateSensor/DESIGN_REVIEW1.md)
**Source:** [GroveChestStrapHeartRateSensor.circuit.tsx](boards/GroveChestStrapHeartRateSensor/GroveChestStrapHeartRateSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Chest-Strap-Heart-Rate-Sensor-p-1115.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 18 source traces · 12 PCB traces · 5 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### MilCandy the Easiest Grove Controller — `GroveMilCandyTheEasiestGroveController`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMilCandyTheEasiestGroveController/DESIGN_REVIEW1.md)
**Source:** [GroveMilCandyTheEasiestGroveController.circuit.tsx](boards/GroveMilCandyTheEasiestGroveController/GroveMilCandyTheEasiestGroveController.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/MilCandy-the-Easiest-Grove-Controller-p-1104.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ATmega328P` · declared MPN `ATmega328P` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove 3 Axis Analog Accelerometer ADXL335 — `Grove3AxisAnalogAccelerometerADXL335`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisAnalogAccelerometerADXL335/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisAnalogAccelerometerADXL335.circuit.tsx](boards/Grove3AxisAnalogAccelerometerADXL335/Grove3AxisAnalogAccelerometerADXL335.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-ADXL335.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL335` · declared MPN `ADXL335` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Expansion NET Gadgeteer Compatible — `GroveExpansionNETGadgeteerCompatible`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveExpansionNETGadgeteerCompatible/DESIGN_REVIEW1.md)
**Source:** [GroveExpansionNETGadgeteerCompatible.circuit.tsx](boards/GroveExpansionNETGadgeteerCompatible/GroveExpansionNETGadgeteerCompatible.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Expansion-NET-Gadgeteer-Compatible-p-1084.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `Grove-Expansion` · declared MPN `Grove-Expansion` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove Air quality sensor — `GroveAirQualitySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAirQualitySensor/DESIGN_REVIEW1.md)
**Source:** [GroveAirQualitySensor.circuit.tsx](boards/GroveAirQualitySensor/GroveAirQualitySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-quality-sensor-p-1065.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Dust Sensor PPD42NS — `GroveDustSensorPPD42NS`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDustSensorPPD42NS/DESIGN_REVIEW1.md)
**Source:** [GroveDustSensorPPD42NS.circuit.tsx](boards/GroveDustSensorPPD42NS/GroveDustSensorPPD42NS.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Dust-Sensor-PPD42NS.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `PPD42NS` · declared MPN `PPD42NS` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Ultrasonic Distance Sensor — `GroveUltrasonicDistanceSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUltrasonicDistanceSensor/DESIGN_REVIEW1.md)
**Source:** [GroveUltrasonicDistanceSensor.circuit.tsx](boards/GroveUltrasonicDistanceSensor/GroveUltrasonicDistanceSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Ultrasonic-Distance-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Luminance Sensor — `GroveLuminanceSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLuminanceSensor/DESIGN_REVIEW1.md)
**Source:** [GroveLuminanceSensor.circuit.tsx](boards/GroveLuminanceSensor/GroveLuminanceSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Luminance-Sensor.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `APDS-9002` · declared MPN `APDS-9002` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Blueseeed HM11 — `GroveBlueseeedHM11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBlueseeedHM11/DESIGN_REVIEW1.md)
**Source:** [GroveBlueseeedHM11.circuit.tsx](boards/GroveBlueseeedHM11/GroveBlueseeedHM11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blueseeed-HM11.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `HM-11` · declared MPN `HM-11` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Temperature Humidity Sensor High Accuracy Mini — `GroveTemperatureHumiditySensorHighAccuracyMini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorHighAccuracyMini/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorHighAccuracyMini.circuit.tsx](boards/GroveTemperatureHumiditySensorHighAccuracyMini/GroveTemperatureHumiditySensorHighAccuracyMini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-High-Accuracy-Mini.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove 3 Axis Digital Accelerometer 400g — `Grove3AxisDigitalAccelerometer400g`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer400g/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer400g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer400g/Grove3AxisDigitalAccelerometer400g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-400g.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `H3LIS331DL` · declared MPN `H3LIS331DL` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove GPS Module — `GroveGPSModule`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGPSModule/DESIGN_REVIEW1.md)
**Source:** [GroveGPSModule.circuit.tsx](boards/GroveGPSModule/GroveGPSModule.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-GPS-Module.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `NEO-6M` · declared MPN `NEO-6M` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove Oxygen Sensor ME2 O2 f20 — `GroveOxygenSensorME2O2F20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOxygenSensorME2O2F20/DESIGN_REVIEW1.md)
**Source:** [GroveOxygenSensorME2O2F20.circuit.tsx](boards/GroveOxygenSensorME2O2F20/GroveOxygenSensorME2O2F20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-ME2-O2-f20.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ME2-O2` · declared MPN `ME2-O2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Human Presence Sensor AK9753 — `GroveHumanPresenceSensorAK9753`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHumanPresenceSensorAK9753/DESIGN_REVIEW1.md)
**Source:** [GroveHumanPresenceSensorAK9753.circuit.tsx](boards/GroveHumanPresenceSensorAK9753/GroveHumanPresenceSensorAK9753.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Human-Presence-Sensor-AK9753.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · sensor · primary model `AK9753` · declared MPN `AK9753` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove RS232 — `GroveRS232`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRS232/DESIGN_REVIEW1.md)
**Source:** [GroveRS232.circuit.tsx](boards/GroveRS232/GroveRS232.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RS232.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `MAX3232` · declared MPN `MAX3232` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Light Color Proximity Sensor TMG39931 — `GroveLightColorProximitySensorTMG39931`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLightColorProximitySensorTMG39931/DESIGN_REVIEW1.md)
**Source:** [GroveLightColorProximitySensorTMG39931.circuit.tsx](boards/GroveLightColorProximitySensorTMG39931/GroveLightColorProximitySensorTMG39931.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Color-Proximity-Sensor-TMG39931-p-2879.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `TMG39931` · declared MPN `TMG39931` · 5V

**Artifact counts:** 9 source components · 30 source traces · 20 PCB traces · 10 schematic traces · 0 placeholder MPNs · 25 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 25 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Triple Color E Ink Display 2 13 — `GroveTripleColorEInkDisplay213`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTripleColorEInkDisplay213/DESIGN_REVIEW1.md)
**Source:** [GroveTripleColorEInkDisplay213.circuit.tsx](boards/GroveTripleColorEInkDisplay213/GroveTripleColorEInkDisplay213.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-2-13-p-2889.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `IL0373` · declared MPN `IL0373` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove Triple Color E Ink Display 1 54 — `GroveTripleColorEInkDisplay154`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTripleColorEInkDisplay154/DESIGN_REVIEW1.md)
**Source:** [GroveTripleColorEInkDisplay154.circuit.tsx](boards/GroveTripleColorEInkDisplay154/GroveTripleColorEInkDisplay154.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-1-54-p-2890.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `IL0373` · declared MPN `IL0373` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove RS485 — `GroveRS485`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRS485/DESIGN_REVIEW1.md)
**Source:** [GroveRS485.circuit.tsx](boards/GroveRS485/GroveRS485.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RS485-p-2924.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `SN75176` · declared MPN `SN75176` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove 3 Axis Digital Accelerometer 200g ADXL372 — `Grove3AxisDigitalAccelerometer200gADXL372`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer200gADXL372/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer200gADXL372.circuit.tsx](boards/Grove3AxisDigitalAccelerometer200gADXL372/Grove3AxisDigitalAccelerometer200gADXL372.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-200g-ADXL372-p-4003.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL372` · declared MPN `ADXL372` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove 3 Axis Analog Accelerometer 20g ADXL356B — `Grove3AxisAnalogAccelerometer20gADXL356B`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisAnalogAccelerometer20gADXL356B/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisAnalogAccelerometer20gADXL356B.circuit.tsx](boards/Grove3AxisAnalogAccelerometer20gADXL356B/Grove3AxisAnalogAccelerometer20gADXL356B.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-20g-ADXL356B-p-4004.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL356B` · declared MPN `ADXL356B` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove 3 Axis Digital Accelerometer 40g ADXL357 — `Grove3AxisDigitalAccelerometer40gADXL357`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisDigitalAccelerometer40gADXL357/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisDigitalAccelerometer40gADXL357.circuit.tsx](boards/Grove3AxisDigitalAccelerometer40gADXL357/Grove3AxisDigitalAccelerometer40gADXL357.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-40g-ADXL357-p-4005.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL357` · declared MPN `ADXL357` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove 3 Axis Analog Accelerometer 40g ADXL356C — `Grove3AxisAnalogAccelerometer40gADXL356C`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove3AxisAnalogAccelerometer40gADXL356C/DESIGN_REVIEW1.md)
**Source:** [Grove3AxisAnalogAccelerometer40gADXL356C.circuit.tsx](boards/Grove3AxisAnalogAccelerometer40gADXL356C/Grove3AxisAnalogAccelerometer40gADXL356C.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-40g-ADXL356C-p-4006.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL356C` · declared MPN `ADXL356C` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove W600 — `GroveW600`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveW600/DESIGN_REVIEW1.md)
**Source:** [GroveW600.circuit.tsx](boards/GroveW600/GroveW600.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-W600-p-4019.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `W600` · declared MPN `W600` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove 0 54 Red Dual Alphanumeric Display — `Grove054RedDualAlphanumericDisplay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove054RedDualAlphanumericDisplay/DESIGN_REVIEW1.md)
**Source:** [Grove054RedDualAlphanumericDisplay.circuit.tsx](boards/Grove054RedDualAlphanumericDisplay/Grove054RedDualAlphanumericDisplay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-0-54-Red-Dual-Alphanumeric-Display-p-4031.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove 0 54 Red Quad Alphanumeric Display — `Grove054RedQuadAlphanumericDisplay`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove054RedQuadAlphanumericDisplay/DESIGN_REVIEW1.md)
**Source:** [Grove054RedQuadAlphanumericDisplay.circuit.tsx](boards/Grove054RedQuadAlphanumericDisplay/Grove054RedQuadAlphanumericDisplay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-0-54-Red-Quad-Alphanumeric-Display-p-4032.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove Breadboard — `GroveBreadboard`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveBreadboard/DESIGN_REVIEW1.md)
**Source:** [GroveBreadboard.circuit.tsx](boards/GroveBreadboard/GroveBreadboard.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Breadboard-p-4034.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Single Axis Analog Accelerometer 100g ADXL1001 — `GroveSingleAxisAnalogAccelerometer100gADXL1001`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSingleAxisAnalogAccelerometer100gADXL1001/DESIGN_REVIEW1.md)
**Source:** [GroveSingleAxisAnalogAccelerometer100gADXL1001.circuit.tsx](boards/GroveSingleAxisAnalogAccelerometer100gADXL1001/GroveSingleAxisAnalogAccelerometer100gADXL1001.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Single-Axis-Analog-Accelerometer-100g-ADXL1001-p-4035.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADXL1001` · declared MPN `ADXL1001` · 5V

**Artifact counts:** 7 source components · 21 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove 6 Axis Digital Accelerometer Gyroscope 40g ADIS16470 — `Grove6AxisDigitalAccelerometerGyroscope40gADIS16470`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove6AxisDigitalAccelerometerGyroscope40gADIS16470/DESIGN_REVIEW1.md)
**Source:** [Grove6AxisDigitalAccelerometerGyroscope40gADIS16470.circuit.tsx](boards/Grove6AxisDigitalAccelerometerGyroscope40gADIS16470/Grove6AxisDigitalAccelerometerGyroscope40gADIS16470.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Digital-Accelerometer-Gyroscope-40g-ADIS16470-p-4036.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ADIS16470` · declared MPN `ADIS16470` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### MT3620 Grove Breakout — `GroveMT3620GroveBreakout`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMT3620GroveBreakout/DESIGN_REVIEW1.md)
**Source:** [GroveMT3620GroveBreakout.circuit.tsx](boards/GroveMT3620GroveBreakout/GroveMT3620GroveBreakout.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/MT3620-Grove-Breakout-p-4043.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `MT3620` · declared MPN `MT3620` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### 38mm 8 8 square matrix LED matched with Grove Green Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode/DESIGN_REVIEW1.md)
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Green-Common-Anode-p-4050.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### 38mm 8 8 square matrix LED matched with Grove Red Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode/DESIGN_REVIEW1.md)
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Red-Common-Anode-p-4051.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### 38mm 8 8 square matrix LED matched with Grove Blue Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode/DESIGN_REVIEW1.md)
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Blue-Common-Anode-p-4052.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove 12 bit Magnetic Rotary Position Sensor AS5600 — `Grove12BitMagneticRotaryPositionSensorAS5600`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove12BitMagneticRotaryPositionSensorAS5600/DESIGN_REVIEW1.md)
**Source:** [Grove12BitMagneticRotaryPositionSensorAS5600.circuit.tsx](boards/Grove12BitMagneticRotaryPositionSensorAS5600/Grove12BitMagneticRotaryPositionSensorAS5600.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-12-bit-Magnetic-Rotary-Position-Sensor-AS5600-p-4192.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · input · primary model `AS5600` · declared MPN `AS5600` · 5V

**Artifact counts:** 7 source components · 25 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P2 — Input behavior needs debounce, ESD, pull-state, and accidental-short analysis across cable length and host pin configuration.
- P2 — Verify the user-interface mechanics (shaft/key travel, actuation force, panel height, rotation/pin order) and ESD path; a symbolic component does not establish the physical fit.

### Grove RGB LED Ring 16 WS2813 Mini — `GroveRGBLEDRing16WS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDRing16WS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDRing16WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing16WS2813Mini/GroveRGBLEDRing16WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Ring-16-WS2813-Mini-p-4201.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 33 source components · 71 source traces · 65 PCB traces · 63 schematic traces · 0 placeholder MPNs · 68 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 68 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove RGB LED Ring 24 WS2813 Mini — `GroveRGBLEDRing24WS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDRing24WS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDRing24WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing24WS2813Mini/GroveRGBLEDRing24WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Ring-24-WS2813-Mini-p-4202.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 49 source components · 103 source traces · 97 PCB traces · 95 schematic traces · 0 placeholder MPNs · 100 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 100 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove Ultimate RGB LED Ring — `GroveUltimateRGBLEDRing`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveUltimateRGBLEDRing/DESIGN_REVIEW1.md)
**Source:** [GroveUltimateRGBLEDRing.circuit.tsx](boards/GroveUltimateRGBLEDRing/GroveUltimateRGBLEDRing.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Ultimate-RGB-LED-Ring-p-4203.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove RGB LED WS2813 Mini — `GroveRGBLEDWS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDWS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDWS2813Mini.circuit.tsx](boards/GroveRGBLEDWS2813Mini/GroveRGBLEDWS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-WS2813-Mini-p-4269.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.

### Grove RGB LED Stick 15 WS2813 Mini — `GroveRGBLEDStick15WS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDStick15WS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDStick15WS2813Mini.circuit.tsx](boards/GroveRGBLEDStick15WS2813Mini/GroveRGBLEDStick15WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Stick-15-WS2813-Mini-p-4270.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 31 source components · 67 source traces · 61 PCB traces · 59 schematic traces · 0 placeholder MPNs · 64 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 64 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove RGB LED Stick 20 WS2813 Mini — `GroveRGBLEDStick20WS2813Mini`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveRGBLEDStick20WS2813Mini/DESIGN_REVIEW1.md)
**Source:** [GroveRGBLEDStick20WS2813Mini.circuit.tsx](boards/GroveRGBLEDStick20WS2813Mini/GroveRGBLEDStick20WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Stick-20-WS2813-Mini-p-4271.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 41 source components · 87 source traces · 81 PCB traces · 79 schematic traces · 0 placeholder MPNs · 84 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 84 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Actuator current, inrush, thermal rise, and fault behavior need load testing; no obvious dedicated load switch is visible in the source.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. No explicit current-limiting resistor is evident.

### Grove MP3 V3 — `GroveMP3V3`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMP3V3/DESIGN_REVIEW1.md)
**Source:** [GroveMP3V3.circuit.tsx](boards/GroveMP3V3/GroveMP3V3.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MP3-V3-p-4297.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.

### Grove Thermal Imaging Camera IR Array MLX90640 110 degree — `GroveThermalImagingCameraIRArrayMLX90640110Degree`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraIRArrayMLX90640110Degree/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraIRArrayMLX90640110Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90640110Degree/GroveThermalImagingCameraIRArrayMLX90640110Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-110-degree-p-4334.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Thermal Imaging Camera IR Array MLX90640 55 degree — `GroveThermalImagingCameraIRArrayMLX9064055Degree`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraIRArrayMLX9064055Degree/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraIRArrayMLX9064055Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX9064055Degree/GroveThermalImagingCameraIRArrayMLX9064055Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-55-degree-p-4335.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Arch Mix Grove Breakout — `GroveArchMixGroveBreakout`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveArchMixGroveBreakout/DESIGN_REVIEW1.md)
**Source:** [GroveArchMixGroveBreakout.circuit.tsx](boards/GroveArchMixGroveBreakout/GroveArchMixGroveBreakout.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Arch-Mix-Grove-Breakout-p-4362.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ESP32` · declared MPN `ESP32` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Capacitive Fingerprint Scanner — `GroveCapacitiveFingerprintScanner`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveCapacitiveFingerprintScanner/DESIGN_REVIEW1.md)
**Source:** [GroveCapacitiveFingerprintScanner.circuit.tsx](boards/GroveCapacitiveFingerprintScanner/GroveCapacitiveFingerprintScanner.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Capacitive-Fingerprint-Scanner-p-4363.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `AS608` · declared MPN `AS608` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove High Precision Barometer Sensor DPS310 — `GroveHighPrecisionBarometerSensorDPS310`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveHighPrecisionBarometerSensorDPS310/DESIGN_REVIEW1.md)
**Source:** [GroveHighPrecisionBarometerSensorDPS310.circuit.tsx](boards/GroveHighPrecisionBarometerSensorDPS310/GroveHighPrecisionBarometerSensorDPS310.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-High-Precision-Barometer-Sensor-DPS310-p-4397.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `DPS310` · declared MPN `DPS310` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove 8 Channel I2C Hub TCA9548A — `Grove8ChannelI2CHubTCA9548A`

**Per-board review:** [DESIGN_REVIEW1.md](boards/Grove8ChannelI2CHubTCA9548A/DESIGN_REVIEW1.md)
**Source:** [Grove8ChannelI2CHubTCA9548A.circuit.tsx](boards/Grove8ChannelI2CHubTCA9548A/Grove8ChannelI2CHubTCA9548A.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-8-Channel-I2C-Hub-TCA9548A-p-4398.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 7 source components · 25 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove Turbidity Sensor — `GroveTurbiditySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTurbiditySensor/DESIGN_REVIEW1.md)
**Source:** [GroveTurbiditySensor.circuit.tsx](boards/GroveTurbiditySensor/GroveTurbiditySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Turbidity-Sensor-p-4399.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `SEN0189` · declared MPN `SEN0189` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Water Level Sensor 10CM — `GroveWaterLevelSensor10CM`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWaterLevelSensor10CM/DESIGN_REVIEW1.md)
**Source:** [GroveWaterLevelSensor10CM.circuit.tsx](boards/GroveWaterLevelSensor10CM/GroveWaterLevelSensor10CM.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Water-Level-Sensor-10CM-p-4443.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove AHT20 I2C Industrial grade temperature and humidity sensor — `GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor/DESIGN_REVIEW1.md)
**Source:** [GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor.circuit.tsx](boards/GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor/GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-AHT20-I2C-Industrial-grade-temperature-and-humidity-sensor-p-4497.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `AHT20` · declared MPN `AHT20` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove Digital PIR Motion Sensor — `GroveDigitalPIRMotionSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDigitalPIRMotionSensor/DESIGN_REVIEW1.md)
**Source:** [GroveDigitalPIRMotionSensor.circuit.tsx](boards/GroveDigitalPIRMotionSensor/GroveDigitalPIRMotionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-PIR-Motion-Sensor-p-4524.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 6 source components · 20 source traces · 13 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove Qwiic Hub — `GroveQwiicHub`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveQwiicHub/DESIGN_REVIEW1.md)
**Source:** [GroveQwiicHub.circuit.tsx](boards/GroveQwiicHub/GroveQwiicHub.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Qwiic-Hub-p-4531.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 7 source components · 25 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 20 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 20 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Multichannel Gas Sensor v2 — `GroveMultichannelGasSensorV2`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveMultichannelGasSensorV2/DESIGN_REVIEW1.md)
**Source:** [GroveMultichannelGasSensorV2.circuit.tsx](boards/GroveMultichannelGasSensorV2/GroveMultichannelGasSensorV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Multichannel-Gas-Sensor-v2-p-4569.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Doppler Radar BGT24LTR11 — `GroveDopplerRadarBGT24LTR11`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveDopplerRadarBGT24LTR11/DESIGN_REVIEW1.md)
**Source:** [GroveDopplerRadarBGT24LTR11.circuit.tsx](boards/GroveDopplerRadarBGT24LTR11/GroveDopplerRadarBGT24LTR11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Doppler-Radar-BGT24LTR11-p-4572.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `BGT24LTR11` · declared MPN `BGT24LTR11` · 5V

**Artifact counts:** 5 source components · 18 source traces · 11 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.
- P1 — Validate transducer/sensor spacing, acoustic/optical keepouts, aperture geometry, blind zone, and host timing assumptions against the mechanical assembly.

### Grove ADS1115 16 bit ADC — `GroveADS111516BitADC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveADS111516BitADC/DESIGN_REVIEW1.md)
**Source:** [GroveADS111516BitADC.circuit.tsx](boards/GroveADS111516BitADC/GroveADS111516BitADC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-ADS1115-16-bit-ADC-p-4599.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · utility · primary model `ADS1115` · declared MPN `ADS1115` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.

### Grove Thermal Imaging Camera IR Array MLX90641 110 degree — `GroveThermalImagingCameraIRArrayMLX90641110Degree`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraIRArrayMLX90641110Degree/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraIRArrayMLX90641110Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90641110Degree/GroveThermalImagingCameraIRArrayMLX90641110Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90641-110-degree-p-4612.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Thermal Imaging Camera MLX90614 DCI IR Array with 5 FOV — `GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV/GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCI-IR-Array-with-5-FOV-p-4654.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Thermal Imaging Camera MLX90621 BAA 16x4 IR Array with 25 FOV — `GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAA-16x4-IR-Array-with-25-FOV-p-4655.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9062x` · declared MPN `MLX9062x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Thermal Imaging Camera MLX90614 DCC IR Array with 35 FOV — `GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV/GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCC-IR-Array-with-35-FOV-p-4657.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Oxygen Sensor MIX8410 — `GroveOxygenSensorMIX8410`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOxygenSensorMIX8410/DESIGN_REVIEW1.md)
**Source:** [GroveOxygenSensorMIX8410.circuit.tsx](boards/GroveOxygenSensorMIX8410/GroveOxygenSensorMIX8410.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-MIX8410-p-4697.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `MIX8410` · declared MPN `MIX8410` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove LoRa E5 STM32WLE5JC — `GroveLoRaE5STM32WLE5JC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveLoRaE5STM32WLE5JC/DESIGN_REVIEW1.md)
**Source:** [GroveLoRaE5STM32WLE5JC.circuit.tsx](boards/GroveLoRaE5STM32WLE5JC/GroveLoRaE5STM32WLE5JC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-E5-STM32WLE5JC-p-4867.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** uart · communications · primary model `STM32WLE5JC` · declared MPN `STM32WLE5JC` · 5V

**Artifact counts:** 5 source components · 20 source traces · 8 PCB traces · 3 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — UART/RF serial levels, baud-domain assumptions, and RX/TX protection must be checked against the host voltage; the Grove connector alone does not prove compatibility.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove Oxygen Sensor Pro Pre calibration — `GroveOxygenSensorProPreCalibration`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOxygenSensorProPreCalibration/DESIGN_REVIEW1.md)
**Source:** [GroveOxygenSensorProPreCalibration.circuit.tsx](boards/GroveOxygenSensorProPreCalibration/GroveOxygenSensorProPreCalibration.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-Pro-Pre-calibration-p-4896.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `GGC2330-O2` · declared MPN `GGC2330-O2` · 5V

**Artifact counts:** 5 source components · 15 source traces · 9 PCB traces · 6 schematic traces · 0 placeholder MPNs · 12 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Temperature Humidity Sensor V2 0 DHT20 — `GroveTemperatureHumiditySensorV20DHT20`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTemperatureHumiditySensorV20DHT20/DESIGN_REVIEW1.md)
**Source:** [GroveTemperatureHumiditySensorV20DHT20.circuit.tsx](boards/GroveTemperatureHumiditySensorV20DHT20/GroveTemperatureHumiditySensorV20DHT20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-V2-0-DHT20-p-4967.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 6 source components · 20 source traces · 12 PCB traces · 6 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove OLED Yellow Blue Display 0 96 SSD1315 V1 0 — `GroveOLEDYellowBlueDisplay096SSD1315V10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDYellowBlueDisplay096SSD1315V10/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDYellowBlueDisplay096SSD1315V10.circuit.tsx](boards/GroveOLEDYellowBlueDisplay096SSD1315V10/GroveOLEDYellowBlueDisplay096SSD1315V10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Yellow-Blue-Display-0-96-SSD1315-V1-0-p-5010.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove OLED Display 1 12 SH1107 V3 0 — `GroveOLEDDisplay112SH1107V30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay112SH1107V30/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay112SH1107V30.circuit.tsx](boards/GroveOLEDDisplay112SH1107V30/GroveOLEDDisplay112SH1107V30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12-SH1107-V3-0-p-5011.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SH1107` · declared MPN `SH1107` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove OLED Display 0 66 SSD1306 v1 0 — `GroveOLEDDisplay066SSD1306V10`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveOLEDDisplay066SSD1306V10/DESIGN_REVIEW1.md)
**Source:** [GroveOLEDDisplay066SSD1306V10.circuit.tsx](boards/GroveOLEDDisplay066SSD1306V10/GroveOLEDDisplay066SSD1306V10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-0-66-SSD1306-v1-0-p-5096.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 22 source traces · 14 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Display glass/module dimensions, connector/flex pin order, backlight current, contrast/logic rail, and mounting keepouts need mechanical and electrical sign-off.
- P1 — LED current and thermal budget are not proven: verify per-channel resistoring, worst-case simultaneous current, copper/connector limits, data-chain termination, and reset/power sequencing. Series resistors exist in the source, but their values and dissipation still need calculation.
- P1 — Confirm that the declared display footprint is the actual panel/module outline rather than a symbolic placeholder, including mounting holes, glass keepout, and connector orientation.

### Grove Formaldehyde Sensor SFA30 — `GroveFormaldehydeSensorSFA30`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveFormaldehydeSensorSFA30/DESIGN_REVIEW1.md)
**Source:** [GroveFormaldehydeSensorSFA30.circuit.tsx](boards/GroveFormaldehydeSensorSFA30/GroveFormaldehydeSensorSFA30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Formaldehyde-Sensor-SFA30-p-5204.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SFA30` · declared MPN `SFA30` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Thermal Imaging Camera MLX90641 BCB 16x12 IR Array with 55 FOV — `GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV/GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90641-BCB-16x12-IR-Array-with-55-FOV-p-5265.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove Thermal Imaging Camera MLX90621 BAB 16x4 IR Array with 60 FOV — `GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV/DESIGN_REVIEW1.md)
**Source:** [GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV/GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAB-16x4-IR-Array-with-60-FOV-p-5266.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `MLX9062x` · declared MPN `MLX9062x` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.

### Grove All in one Environmental Sensor SEN55 — `GroveAllInOneEnvironmentalSensorSEN55`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAllInOneEnvironmentalSensorSEN55/DESIGN_REVIEW1.md)
**Source:** [GroveAllInOneEnvironmentalSensorSEN55.circuit.tsx](boards/GroveAllInOneEnvironmentalSensorSEN55/GroveAllInOneEnvironmentalSensorSEN55.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN55-p-5373.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove All in one Environmental Sensor SEN54 — `GroveAllInOneEnvironmentalSensorSEN54`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAllInOneEnvironmentalSensorSEN54/DESIGN_REVIEW1.md)
**Source:** [GroveAllInOneEnvironmentalSensorSEN54.circuit.tsx](boards/GroveAllInOneEnvironmentalSensorSEN54/GroveAllInOneEnvironmentalSensorSEN54.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN54-p-5374.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P2 — Keep the sensing element thermally isolated from regulators, LEDs, heaters, and host airflow; verify the declared package/vent and calibration conditions.

### Grove Temp Humi Sensor SHT41 — `GroveTempHumiSensorSHT41`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTempHumiSensorSHT41/DESIGN_REVIEW1.md)
**Source:** [GroveTempHumiSensorSHT41.circuit.tsx](boards/GroveTempHumiSensorSHT41/GroveTempHumiSensorSHT41.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT41-p-5383.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SHT4x` · declared MPN `SHT4x` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Temp Humi Sensor SHT40 — `GroveTempHumiSensorSHT40`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveTempHumiSensorSHT40/DESIGN_REVIEW1.md)
**Source:** [GroveTempHumiSensorSHT40.circuit.tsx](boards/GroveTempHumiSensorSHT40/GroveTempHumiSensorSHT40.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT40-p-5384.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SHT4x` · declared MPN `SHT4x` · 5V

**Artifact counts:** 8 source components · 27 source traces · 17 PCB traces · 10 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.

### Grove Gas Sensor BME688 — `GroveGasSensorBME688`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveGasSensorBME688/DESIGN_REVIEW1.md)
**Source:** [GroveGasSensorBME688.circuit.tsx](boards/GroveGasSensorBME688/GroveGasSensorBME688.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-BME688-p-5478.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `BME688` · declared MPN `BME688` · 5V

**Artifact counts:** 8 source components · 26 source traces · 16 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove AC Voltage sensor — `GroveACVoltageSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveACVoltageSensor/DESIGN_REVIEW1.md)
**Source:** [GroveACVoltageSensor.circuit.tsx](boards/GroveACVoltageSensor/GroveACVoltageSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-AC-Voltage-sensor-p-5540.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `ZMPT101B` · declared MPN `ZMPT101B` · 5V

**Artifact counts:** 4 source components · 13 source traces · 7 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Verify shunt/heating/current capacity, Kelvin routing, divider tolerance and maximum input, creepage, and calibration at the specified load range.

### Grove Wizfi360 — `GroveWizfi360`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveWizfi360/DESIGN_REVIEW1.md)
**Source:** [GroveWizfi360.circuit.tsx](boards/GroveWizfi360/GroveWizfi360.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Wizfi360-p-5541.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** digital · utility · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 3 source components · 11 source traces · 5 PCB traces · 2 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify VIH/VIL across the declared rail, startup state, edge rate, debounce/pulse width, and host input protection; the source does not establish firmware timing behavior.

### Grove Air Quality Sensor SGP41 — `GroveAirQualitySensorSGP41`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAirQualitySensorSGP41/DESIGN_REVIEW1.md)
**Source:** [GroveAirQualitySensorSGP41.circuit.tsx](boards/GroveAirQualitySensorSGP41/GroveAirQualitySensorSGP41.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP41-p-5687.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SGP41` · declared MPN `SGP41` · 5V

**Artifact counts:** 7 source components · 26 source traces · 16 PCB traces · 8 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove NFC ST25DV64KC — `GroveNFCST25DV64KC`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveNFCST25DV64KC/DESIGN_REVIEW1.md)
**Source:** [GroveNFCST25DV64KC.circuit.tsx](boards/GroveNFCST25DV64KC/GroveNFCST25DV64KC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-NFC-ST25DV64KC-p-5688.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · communications · primary model `ST25DV64` · declared MPN `ST25DV64` · 5V

**Artifact counts:** 7 source components · 24 source traces · 14 PCB traces · 8 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — RF/communications production review is missing: antenna or connector keepout, impedance/control of the RF path, shielding, ESD, regulatory identity, and module firmware/configuration must be documented.
- P1 — Wireless placement must preserve antenna clearance and ground strategy; confirm module certification, matching/impedance assumptions, and enclosure detuning.

### Grove Air Quality Sensor SGP40 — `GroveAirQualitySensorSGP40`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveAirQualitySensorSGP40/DESIGN_REVIEW1.md)
**Source:** [GroveAirQualitySensorSGP40.circuit.tsx](boards/GroveAirQualitySensorSGP40/GroveAirQualitySensorSGP40.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP40-p-5700.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** i2c · sensor · primary model `SGP40` · declared MPN `SGP40` · 5V

**Artifact counts:** 7 source components · 26 source traces · 16 PCB traces · 8 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — I²C pull-ups are present in source; verify their rail, aggregate resistance across stacked modules, bus capacitance, and address/strap state.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
- P1 — Gas/heater designs require a measured heater-current path, warm-up profile, thermal isolation, sensor replacement/calibration plan, and enclosure airflow review.

### Grove Smart IR Gesture Sensor — `GroveSmartIRGestureSensor`

**Per-board review:** [DESIGN_REVIEW1.md](boards/GroveSmartIRGestureSensor/DESIGN_REVIEW1.md)
**Source:** [GroveSmartIRGestureSensor.circuit.tsx](boards/GroveSmartIRGestureSensor/GroveSmartIRGestureSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Smart-IR-Gesture-Sensor-p-5721.html)
**Implementation class:** board-local engineering draft
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 18 source traces · 10 PCB traces · 5 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Critical findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Verify sensor output range, source impedance, ADC reference, over-voltage tolerance, and calibration transfer function at the Grove SIG pin.
- P1 — Sensor accuracy is not demonstrated by the schematic: review calibration constants, self-heating, placement/venting, environmental limits, and production test points.
