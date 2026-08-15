# DESIGN_REVIEW1 — Grove catalogue production-readiness review

Generated from the checked-in board-local TSX sources and the latest `dist/boards/**/circuit.json` artifacts. This is a release review, not a claim that a passing renderer snapshot is fabrication approval.

## Executive disposition

The catalogue is structurally complete but is **not production-ready as a set**. Every entry now has a board-local TSX source and a committed PCB/schematic snapshot, but the current artifacts still require board-specific BOM, datasheet, footprint, mechanical, power, and routed-copper sign-off. The strongest repo-wide blocker is that 19/394 boards produced at least one PCB trace in the latest build; 309/394 emitted autorouting/disconnected-port/missing-PCB-trace diagnostics, and 58/394 contain at least one placeholder MPN.

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
| Source components | 3123 |
| Source traces | 10053 |
| PCB traces | 353 |
| Schematic traces | 3299 |
| Boards with PCB traces | 19 |
| Boards with autorouting/disconnect/missing-trace diagnostics | 309 |
| Boards with placeholder MPNs | 58 |
| Unnamed source-trace warnings | 6556 |
| Refdes convention warnings | 311 |
| Power metadata warnings | 123 |
| Ground metadata warnings | 88 |

## Review method

Each section below names the exact source file, links its upstream reference, records the catalogue declaration, and reports counts from that board's current circuit JSON. Findings are intentionally conservative: a schematic/PCB snapshot demonstrates reproducible rendering, not correct pin mapping, a manufacturable footprint, safe power dissipation, or a complete routed layout. P0/P1 findings block release; P2 findings should be closed before sign-off.

## Board-by-board findings

### Grove - Button v1.0 — `Grove-Button`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Button.circuit.tsx](boards/Grove-Button/Grove-Button.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Button/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 3 source components · 4 source traces · 4 PCB traces · 2 schematic traces · 0 placeholder MPNs · 4 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 4 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Buzzer v1.1b — `Grove-Buzzer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Buzzer.circuit.tsx](boards/Grove-Buzzer/Grove-Buzzer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Buzzer/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 4 source components · 5 source traces · 5 PCB traces · 3 schematic traces · 0 placeholder MPNs · 5 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 5 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Capacitive Moisture Sensor (Corrosion Resistant) — `Grove-Capacitive-Moisture`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Capacitive-Moisture.circuit.tsx](boards/Grove-Capacitive-Moisture/Grove-Capacitive-Moisture.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** analog · sensor · primary model `NE555DR` · declared MPN `NE555DR` · 5V

**Artifact counts:** 15 source components · 29 source traces · 29 PCB traces · 12 schematic traces · 0 placeholder MPNs · 29 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 29 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature & Humidity Sensor DHT20 v2.1 — `Grove-DHT20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-DHT20.circuit.tsx](boards/Grove-DHT20/Grove-DHT20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** i2c · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 13 source components · 25 source traces · 25 PCB traces · 11 schematic traces · 0 placeholder MPNs · 25 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 25 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Digital PIR Motion Sensor v1.0 — `Grove-Digital-PIR`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Digital-PIR.circuit.tsx](boards/Grove-Digital-PIR/Grove-Digital-PIR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Digital-PIR-Sensor/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 11 source components · 21 source traces · 21 PCB traces · 9 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - LCD RGB Backlight v5.0 — `Grove-LCD-RGB-Backlight`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-LCD-RGB-Backlight.circuit.tsx](boards/Grove-LCD-RGB-Backlight/Grove-LCD-RGB-Backlight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 11 source components · 35 source traces · 33 PCB traces · 14 schematic traces · 0 placeholder MPNs · 35 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 4 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Light Sensor v1.2 — `Grove-Light-Sensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Light-Sensor.circuit.tsx](boards/Grove-Light-Sensor/Grove-Light-Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Light_Sensor/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 4 source components · 8 source traces · 8 PCB traces · 4 schematic traces · 0 placeholder MPNs · 8 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 8 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Display 0.96 inch (SSD1315) v1.0 — `Grove-OLED-SSD1315`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-OLED-SSD1315.circuit.tsx](boards/Grove-OLED-SSD1315/Grove-OLED-SSD1315.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-OLED-Display-0.96-SSD1315/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 16 source components · 35 source traces · 35 PCB traces · 12 schematic traces · 0 placeholder MPNs · 35 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Relay v1.2 — `Grove-Relay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Relay.circuit.tsx](boards/Grove-Relay/Grove-Relay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Relay/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 11 source components · 19 source traces · 19 PCB traces · 9 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - RGB LED Stick (10 WS2813 Mini) — `Grove-RGB-LED-Stick`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-RGB-LED-Stick.circuit.tsx](boards/Grove-RGB-LED-Stick/Grove-RGB-LED-Stick.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 34 source components · 97 source traces · 85 PCB traces · 59 schematic traces · 0 placeholder MPNs · 79 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 79 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 13 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Rotary Angle Sensor v1.2 — `Grove-Rotary-Angle-Sensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Rotary-Angle-Sensor.circuit.tsx](boards/Grove-Rotary-Angle-Sensor/Grove-Rotary-Angle-Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 2 source components · 3 source traces · 3 PCB traces · 3 schematic traces · 0 placeholder MPNs · 3 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 3 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Ultrasonic Ranger v2.0 — `Grove-Ultrasonic-Ranger`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove-Ultrasonic-Ranger.circuit.tsx](boards/Grove-Ultrasonic-Ranger/Grove-Ultrasonic-Ranger.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/)  
**Implementation class:** retained hand-authored source  
**Catalogue declaration:** digital · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 9 source components · 16 source traces · 16 PCB traces · 8 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Retained hand-authored source still needs a source/BOM/footprint and electrical review; rendering is not fabrication sign-off.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - AHT20 I2C Industrial Grade Temperature&Humidity Sensor — `GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor.circuit.tsx](boards/GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor/GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `AHT20` · declared MPN `AHT20` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temp and Humi Sensor(SHT31) — `GroveTempAndHumiSensorSHT31`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTempAndHumiSensorSHT31.circuit.tsx](boards/GroveTempAndHumiSensorSHT31/GroveTempAndHumiSensorSHT31.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SHT31` · declared MPN `SHT31` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C High Accuracy Temp&Humi Sensor(SHT35) — `GroveI2CHighAccuracyTempHumiSensorSHT35`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CHighAccuracyTempHumiSensorSHT35.circuit.tsx](boards/GroveI2CHighAccuracyTempHumiSensorSHT35/GroveI2CHighAccuracyTempHumiSensorSHT35.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SHT35` · declared MPN `SHT35` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature&Humidity Sensor Pro(DHT22) — `GroveTemperatureHumiditySensorProDHT22`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorProDHT22.circuit.tsx](boards/GroveTemperatureHumiditySensorProDHT22/GroveTemperatureHumiditySensorProDHT22.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `DHT22` · declared MPN `DHT22` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature&Humidity Sensor (DHT11) — `GroveTemperatureHumiditySensorDHT11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorDHT11.circuit.tsx](boards/GroveTemperatureHumiditySensorDHT11/GroveTemperatureHumiditySensorDHT11.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 15 source components · 52 source traces · 0 PCB traces · 21 schematic traces · 0 placeholder MPNs · 43 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 43 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature&Humidity Sensor(DHT20) — `GroveTemperatureHumiditySensorDHT20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorDHT20.circuit.tsx](boards/GroveTemperatureHumiditySensorDHT20/GroveTemperatureHumiditySensorDHT20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 4 disconnected-port errors, 4 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature&Humidity Sensor (High-Accuracy &Mini) v1.0 — `GroveTemperatureHumiditySensorHighAccuracyMiniV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorHighAccuracyMiniV10.circuit.tsx](boards/GroveTemperatureHumiditySensorHighAccuracyMiniV10/GroveTemperatureHumiditySensorHighAccuracyMiniV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `TH02` · declared MPN `TH02` · 5V

**Artifact counts:** 15 source components · 52 source traces · 0 PCB traces · 21 schematic traces · 0 placeholder MPNs · 43 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 43 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature & Humidity Sensor — `GroveTemperatureHumiditySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensor.circuit.tsx](boards/GroveTemperatureHumiditySensor/GroveTemperatureHumiditySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 15 source components · 52 source traces · 0 PCB traces · 21 schematic traces · 0 placeholder MPNs · 43 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 43 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 1-Wire Thermocouple Amplifier(MAX31850K) — `Grove1WireThermocoupleAmplifierMAX31850K`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove1WireThermocoupleAmplifierMAX31850K.circuit.tsx](boards/Grove1WireThermocoupleAmplifierMAX31850K/Grove1WireThermocoupleAmplifierMAX31850K.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `MAX31850K` · declared MPN `MAX31850K` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Thermocouple Amplifier (MCP9600) — `GroveI2CThermocoupleAmplifierMCP9600`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CThermocoupleAmplifierMCP9600.circuit.tsx](boards/GroveI2CThermocoupleAmplifierMCP9600/GroveI2CThermocoupleAmplifierMCP9600.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `MCP9600` · declared MPN `MCP9600` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### One Wire Temperature Sensor DS18B20 — `GroveOneWireTemperatureSensorDS18B20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOneWireTemperatureSensorDS18B20.circuit.tsx](boards/GroveOneWireTemperatureSensorDS18B20/GroveOneWireTemperatureSensorDS18B20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `DS18B20` · declared MPN `DS18B20` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - High Temperature Sensor — `GroveHighTemperatureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHighTemperatureSensor.circuit.tsx](boards/GroveHighTemperatureSensor/GroveHighTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `CJ432` · declared MPN `CJ432` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Thermal Imaging Camera IR-Array MLX90641 — `GroveThermalImagingCameraIRArrayMLX90641`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraIRArrayMLX90641.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90641/GroveThermalImagingCameraIRArrayMLX90641.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Digital Infrared Temperature Sensor — `GroveDigitalInfraredTemperatureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalInfraredTemperatureSensor.circuit.tsx](boards/GroveDigitalInfraredTemperatureSensor/GroveDigitalInfraredTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Infrared Temperature Sensor — `GroveInfraredTemperatureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredTemperatureSensor.circuit.tsx](boards/GroveInfraredTemperatureSensor/GroveInfraredTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Infrared Temperature Sensor Array(AMG8833) — `GroveInfraredTemperatureSensorArrayAMG8833`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredTemperatureSensorArrayAMG8833.circuit.tsx](boards/GroveInfraredTemperatureSensorArrayAMG8833/GroveInfraredTemperatureSensorArrayAMG8833.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `AMG8833` · declared MPN `AMG8833` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-Temperature_Sensor — `GroveTemperatureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureSensor.circuit.tsx](boards/GroveTemperatureSensor/GroveTemperatureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature Sensor V1.2 — `GroveTemperatureSensorV12`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureSensorV12.circuit.tsx](boards/GroveTemperatureSensorV12/GroveTemperatureSensorV12.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C High Accuracy Temperature Sensor(MCP9808) — `GroveI2CHighAccuracyTemperatureSensorMCP9808`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CHighAccuracyTemperatureSensorMCP9808.circuit.tsx](boards/GroveI2CHighAccuracyTemperatureSensorMCP9808/GroveI2CHighAccuracyTemperatureSensorMCP9808.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `MCP9808` · declared MPN `MCP9808` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove SEN5X All in One — `GroveSEN5XAllInOne`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSEN5XAllInOne.circuit.tsx](boards/GroveSEN5XAllInOne/GroveSEN5XAllInOne.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Temperature Humidity Pressure Gas Sensor(BME680) — `GroveTemperatureHumidityPressureGasSensorBME680`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumidityPressureGasSensorBME680.circuit.tsx](boards/GroveTemperatureHumidityPressureGasSensorBME680/GroveTemperatureHumidityPressureGasSensorBME680.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BME680` · declared MPN `BME680` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - CO2 & Temperature & Humidity Sensor (SCD41) — `GroveCO2TemperatureHumiditySensorSCD41`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCO2TemperatureHumiditySensorSCD41.circuit.tsx](boards/GroveCO2TemperatureHumiditySensorSCD41/GroveCO2TemperatureHumiditySensorSCD41.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SCD41` · declared MPN `SCD41` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - CO2 & Temperature & Humidity Sensor (SCD30) — `GroveCO2TemperatureHumiditySensorSCD30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCO2TemperatureHumiditySensorSCD30.circuit.tsx](boards/GroveCO2TemperatureHumiditySensorSCD30/GroveCO2TemperatureHumiditySensorSCD30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SCD30` · declared MPN `SCD30` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Light Gesture Color Proximity Sensor (TMG39931) — `GroveLightGestureColorProximitySensorTMG39931`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightGestureColorProximitySensorTMG39931.circuit.tsx](boards/GroveLightGestureColorProximitySensorTMG39931/GroveLightGestureColorProximitySensorTMG39931.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `TMG39931` · declared MPN `TMG39931` · 5V

**Artifact counts:** 9 source components · 30 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 13 disconnected-port errors, 15 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Vision AI Module — `GroveVisionAIModule`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVisionAIModule.circuit.tsx](boards/GroveVisionAIModule/GroveVisionAIModule.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `Himax WE1` · declared MPN `Himax WE1` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Vision AI Module V2 — `GroveVisionAIModuleV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVisionAIModuleV2.circuit.tsx](boards/GroveVisionAIModuleV2/GroveVisionAIModuleV2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `WiseEye2` · declared MPN `WiseEye2` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Smart IR Gesture Sensor (PAJ7660) — `GroveSmartIRGestureSensorPAJ7660`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSmartIRGestureSensorPAJ7660.circuit.tsx](boards/GroveSmartIRGestureSensorPAJ7660/GroveSmartIRGestureSensorPAJ7660.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Moisture Sensor — `GroveMoistureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMoistureSensor.circuit.tsx](boards/GroveMoistureSensor/GroveMoistureSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Ultrasonic Ranger — `GroveUltrasonicRanger2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUltrasonicRanger2.circuit.tsx](boards/GroveUltrasonicRanger2/GroveUltrasonicRanger2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - IR Distance Interrupter v1.2 — `GroveIRDistanceInterrupterV12`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIRDistanceInterrupterV12.circuit.tsx](boards/GroveIRDistanceInterrupterV12/GroveIRDistanceInterrupterV12.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - TF Mini LiDAR — `GroveTFMiniLiDAR`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTFMiniLiDAR.circuit.tsx](boards/GroveTFMiniLiDAR/GroveTFMiniLiDAR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `TFMINI` · declared MPN `TFMINI` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-Doppler-Radar — `GroveDopplerRadar`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDopplerRadar.circuit.tsx](boards/GroveDopplerRadar/GroveDopplerRadar.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `HB100` · declared MPN `HB100` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Time of Flight Distance Sensor VL53L0X — `GroveTimeOfFlightDistanceSensorVL53L0X`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTimeOfFlightDistanceSensorVL53L0X.circuit.tsx](boards/GroveTimeOfFlightDistanceSensorVL53L0X/GroveTimeOfFlightDistanceSensorVL53L0X.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `VL53L0X` · declared MPN `VL53L0X` · 5V

**Artifact counts:** 9 source components · 30 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 13 disconnected-port errors, 15 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 80cm Infrared Proximity Sensor — `Grove80cmInfraredProximitySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove80cmInfraredProximitySensor.circuit.tsx](boards/Grove80cmInfraredProximitySensor/Grove80cmInfraredProximitySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `GP2Y0A21YK` · declared MPN `GP2Y0A21YK` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Gesture V1.0 — `GroveGestureV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGestureV10.circuit.tsx](boards/GroveGestureV10/GroveGestureV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Adjustable PIR Motion Sensor — `GroveAdjustablePIRMotionSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAdjustablePIRMotionSensor.circuit.tsx](boards/GroveAdjustablePIRMotionSensor/GroveAdjustablePIRMotionSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 35 source components · 108 source traces · 0 PCB traces · 34 schematic traces · 0 placeholder MPNs · 86 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Laser PM2.5 Sensor (HM3301) — `GroveLaserPM25SensorHM3301`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLaserPM25SensorHM3301.circuit.tsx](boards/GroveLaserPM25SensorHM3301/GroveLaserPM25SensorHM3301.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `HM3301` · declared MPN `HM3301` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Dust Sensor — `GroveDustSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDustSensor.circuit.tsx](boards/GroveDustSensor/GroveDustSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `PPD42NS` · declared MPN `PPD42NS` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Air Quality Sensor v1.3 — `GroveAirQualitySensorV13`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAirQualitySensorV13.circuit.tsx](boards/GroveAirQualitySensorV13/GroveAirQualitySensorV13.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Formaldehyde sensor — `GroveFormaldehydeSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFormaldehydeSensor.circuit.tsx](boards/GroveFormaldehydeSensor/GroveFormaldehydeSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · sensor · primary model `WSP2110` · declared MPN `WSP2110` · 5V

**Artifact counts:** 3 source components · 10 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 10 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 1 disconnected-port errors, 1 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Gas Sensor V2(Multichannel) — `GroveGasSensorV2Multichannel`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorV2Multichannel.circuit.tsx](boards/GroveGasSensorV2Multichannel/GroveGasSensorV2Multichannel.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Gas Sensor module — `GroveGasSensorModule`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorModule.circuit.tsx](boards/GroveGasSensorModule/GroveGasSensorModule.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-2` · declared MPN `MQ-2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Gas Sensor(O₂) — `GroveGasSensorO`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorO.circuit.tsx](boards/GroveGasSensorO/GroveGasSensorO.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ME3-O2` · declared MPN `ME3-O2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Gas O₂ Sensor(MIX8410) — `GroveGasOSensorMIX8410`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasOSensorMIX8410.circuit.tsx](boards/GroveGasOSensorMIX8410/GroveGasOSensorMIX8410.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MIX8410` · declared MPN `MIX8410` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Oxygen Sensor Pro(GGC2330-O2) — `GroveOxygenSensorProGGC2330O2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOxygenSensorProGGC2330O2.circuit.tsx](boards/GroveOxygenSensorProGGC2330O2/GroveOxygenSensorProGGC2330O2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `GGC2330-O2` · declared MPN `GGC2330-O2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Alcohol Sensor — `GroveAlcoholSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAlcoholSensor.circuit.tsx](boards/GroveAlcoholSensor/GroveAlcoholSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-3` · declared MPN `MQ-3` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - CO2 Sensor — `GroveCO2Sensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCO2Sensor.circuit.tsx](boards/GroveCO2Sensor/GroveCO2Sensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `MH-Z16` · declared MPN `MH-Z16` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove -Smart Air Quality Sensor (SGP41) — `GroveSmartAirQualitySensorSGP41`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSmartAirQualitySensorSGP41.circuit.tsx](boards/GroveSmartAirQualitySensorSGP41/GroveSmartAirQualitySensorSGP41.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SGP41` · declared MPN `SGP41` · 5V

**Artifact counts:** 7 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-VOC and eCO2 Gas Sensor(SGP30) — `GroveVOCAndECO2GasSensorSGP30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVOCAndECO2GasSensorSGP30.circuit.tsx](boards/GroveVOCAndECO2GasSensorSGP30/GroveVOCAndECO2GasSensorSGP30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SGP30` · declared MPN `SGP30` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - VOC Gas Sensor (SGP40) — `GroveVOCGasSensorSGP40`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVOCGasSensorSGP40.circuit.tsx](boards/GroveVOCGasSensorSGP40/GroveVOCGasSensorSGP40.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SGP40` · declared MPN `SGP40` · 5V

**Artifact counts:** 8 source components · 30 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - HCHO Sensor — `GroveHCHOSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHCHOSensor.circuit.tsx](boards/GroveHCHOSensor/GroveHCHOSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `WSP2110` · declared MPN `WSP2110` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Multichannel Gas Sensor — `GroveMultichannelGasSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMultichannelGasSensor.circuit.tsx](boards/GroveMultichannelGasSensor/GroveMultichannelGasSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Barometer (High-Accuracy) — `GroveBarometerHighAccuracy`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBarometerHighAccuracy.circuit.tsx](boards/GroveBarometerHighAccuracy/GroveBarometerHighAccuracy.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `HP206C` · declared MPN `HP206C` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Barometer Sensor(BME280) — `GroveBarometerSensorBME280`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBarometerSensorBME280.circuit.tsx](boards/GroveBarometerSensorBME280/GroveBarometerSensorBME280.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BME280` · declared MPN `BME280` · 5V

**Artifact counts:** 8 source components · 30 source traces · 0 PCB traces · 13 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Barometer Sensor (BMP280) — `GroveBarometerSensorBMP280`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBarometerSensorBMP280.circuit.tsx](boards/GroveBarometerSensorBMP280/GroveBarometerSensorBMP280.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BMP280` · declared MPN `BMP280` · 5V

**Artifact counts:** 8 source components · 30 source traces · 0 PCB traces · 13 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - High Precision Barometric Pressure Sensor DPS310 — `GroveHighPrecisionBarometricPressureSensorDPS310`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHighPrecisionBarometricPressureSensorDPS310.circuit.tsx](boards/GroveHighPrecisionBarometricPressureSensorDPS310/GroveHighPrecisionBarometricPressureSensorDPS310.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `DPS310` · declared MPN `DPS310` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Integrated Pressure Sensor Kit — `GroveIntegratedPressureSensorKit`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIntegratedPressureSensorKit.circuit.tsx](boards/GroveIntegratedPressureSensorKit/GroveIntegratedPressureSensorKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 32 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 30 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 32 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 30 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - D7S Vibration Sensor — `GroveD7SVibrationSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveD7SVibrationSensor.circuit.tsx](boards/GroveD7SVibrationSensor/GroveD7SVibrationSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `D7S` · declared MPN `D7S` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 3-Axis Digital Accelerometer — `Grove3AxisDigitalAccelerometer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer.circuit.tsx](boards/Grove3AxisDigitalAccelerometer/Grove3AxisDigitalAccelerometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `ADXL345` · declared MPN `ADXL345` · 5V

**Artifact counts:** 11 source components · 42 source traces · 0 PCB traces · 18 schematic traces · 0 placeholder MPNs · 35 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 42 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 3-Axis Digital Accelerometer (LIS3DHTR) — `Grove3AxisDigitalAccelerometerLIS3DHTR`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometerLIS3DHTR.circuit.tsx](boards/Grove3AxisDigitalAccelerometerLIS3DHTR/Grove3AxisDigitalAccelerometerLIS3DHTR.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `LIS3DHTR` · declared MPN `LIS3DHTR` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 3-Axis Analog Accelerometer — `Grove3AxisAnalogAccelerometer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisAnalogAccelerometer.circuit.tsx](boards/Grove3AxisAnalogAccelerometer/Grove3AxisAnalogAccelerometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL335` · declared MPN `ADXL335` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 3-Axis Digitial Compass v2.0 — `Grove3AxisDigitialCompassV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitialCompassV20.circuit.tsx](boards/Grove3AxisDigitialCompassV20/Grove3AxisDigitialCompassV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · sensor · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 11 source components · 37 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 33 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 37 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 33 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 3 Axis Digital Accelerometer±16g Ultra-low Power (BMA400) — `Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400.circuit.tsx](boards/Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400/Grove3AxisDigitalAccelerometer16gUltraLowPowerBMA400.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BMA400` · declared MPN `BMA400` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 6-Axis Accelerometer&Gyroscope — `Grove6AxisAccelerometerGyroscope`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6AxisAccelerometerGyroscope.circuit.tsx](boards/Grove6AxisAccelerometerGyroscope/Grove6AxisAccelerometerGyroscope.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 17 source components · 59 source traces · 0 PCB traces · 26 schematic traces · 0 placeholder MPNs · 49 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 59 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 49 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 6-Axis Accelerometer&Gyroscope(BMI088) — `Grove6AxisAccelerometerGyroscopeBMI088`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6AxisAccelerometerGyroscopeBMI088.circuit.tsx](boards/Grove6AxisAccelerometerGyroscopeBMI088/Grove6AxisAccelerometerGyroscopeBMI088.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · sensor · primary model `BMI088` · declared MPN `BMI088` · 5V

**Artifact counts:** 17 source components · 59 source traces · 0 PCB traces · 26 schematic traces · 0 placeholder MPNs · 49 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 59 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 49 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - IMU 9DOF(lcm20600+AK09918) — `GroveIMU9DOFLcm20600AK09918`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU9DOFLcm20600AK09918.circuit.tsx](boards/GroveIMU9DOFLcm20600AK09918/GroveIMU9DOFLcm20600AK09918.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `AK09918` · declared MPN `AK09918` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Lightning Sensor AS3935 — `GroveLightningSensorAS3935`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightningSensorAS3935.circuit.tsx](boards/GroveLightningSensorAS3935/GroveLightningSensorAS3935.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `AS3935` · declared MPN `AS3935` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Digital Light Sensor — `GroveDigitalLightSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalLightSensor.circuit.tsx](boards/GroveDigitalLightSensor/GroveDigitalLightSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `TSL2561` · declared MPN `TSL2561` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Light Sensor — `GroveLightSensor2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightSensor2.circuit.tsx](boards/GroveLightSensor2/GroveLightSensor2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Sunlight Sensor — `GroveSunlightSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSunlightSensor.circuit.tsx](boards/GroveSunlightSensor/GroveSunlightSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - UV Sensor — `GroveUVSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUVSensor.circuit.tsx](boards/GroveUVSensor/GroveUVSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `GUVA-S12D` · declared MPN `GUVA-S12D` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Infrared Receiver — `GroveInfraredReceiver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredReceiver.circuit.tsx](boards/GroveInfraredReceiver/GroveInfraredReceiver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `TSOP38238` · declared MPN `TSOP38238` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Line Finder V1.1 — `GroveLineFinderV11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLineFinderV11.circuit.tsx](boards/GroveLineFinderV11/GroveLineFinderV11.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Flame Sensor — `GroveFlameSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFlameSensor.circuit.tsx](boards/GroveFlameSensor/GroveFlameSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `YG1006` · declared MPN `YG1006` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Infrared Reflective Sensor — `GroveInfraredReflectiveSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredReflectiveSensor.circuit.tsx](boards/GroveInfraredReflectiveSensor/GroveInfraredReflectiveSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 8 source components · 26 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Finger-clip Heart Rate Sensor — `GroveFingerClipHeartRateSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFingerClipHeartRateSensor.circuit.tsx](boards/GroveFingerClipHeartRateSensor/GroveFingerClipHeartRateSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - EMG Detector — `GroveEMGDetector`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveEMGDetector.circuit.tsx](boards/GroveEMGDetector/GroveEMGDetector.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · utility · primary model `INA331` · declared MPN `INA331` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Ear-clip Heart Rate Sensor — `GroveEarClipHeartRateSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveEarClipHeartRateSensor.circuit.tsx](boards/GroveEarClipHeartRateSensor/GroveEarClipHeartRateSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - GSR Sensor — `GroveGSRSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGSRSensor.circuit.tsx](boards/GroveGSRSensor/GroveGSRSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM324` · declared MPN `LM324` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Sound Sensor — `GroveSoundSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSoundSensor.circuit.tsx](boards/GroveSoundSensor/GroveSoundSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Loudness Sensor — `GroveLoudnessSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLoudnessSensor.circuit.tsx](boards/GroveLoudnessSensor/GroveLoudnessSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Analog Microphone — `GroveAnalogMicrophone`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAnalogMicrophone.circuit.tsx](boards/GroveAnalogMicrophone/GroveAnalogMicrophone.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM358` · declared MPN `LM358` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Recorder v2.0 — `GroveRecorderV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRecorderV20.circuit.tsx](boards/GroveRecorderV20/GroveRecorderV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Offline Voice Recognition — `GroveOfflineVoiceRecognition`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOfflineVoiceRecognition.circuit.tsx](boards/GroveOfflineVoiceRecognition/GroveOfflineVoiceRecognition.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · sensor · primary model `M007` · declared MPN `M007` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Touch Sensor — `GroveTouchSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTouchSensor.circuit.tsx](boards/GroveTouchSensor/GroveTouchSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 16 source components · 52 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 39 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 39 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Rotary Angle Sensor — `GroveRotaryAngleSensor2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRotaryAngleSensor2.circuit.tsx](boards/GroveRotaryAngleSensor2/GroveRotaryAngleSensor2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 1 source components · 3 source traces · 0 PCB traces · 2 schematic traces · 0 placeholder MPNs · 3 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 3 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P2 — 3 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Grove - Round Force Sensor FSR402 — `GroveGroveRoundForceSensorFSR402`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGroveRoundForceSensorFSR402.circuit.tsx](boards/GroveGroveRoundForceSensorFSR402/GroveGroveRoundForceSensorFSR402.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `FSR402` · declared MPN `FSR402` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 2-Channel Inductive Sensor(LDC1612) — `Grove2ChannelInductiveSensorLDC1612`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove2ChannelInductiveSensorLDC1612.circuit.tsx](boards/Grove2ChannelInductiveSensorLDC1612/Grove2ChannelInductiveSensorLDC1612.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · input · primary model `LDC1612` · declared MPN `LDC1612` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 12 Key Capacitive I2C Touch Sensor V3 (MPR121) — `Grove12KeyCapacitiveI2CTouchSensorV3MPR121`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12KeyCapacitiveI2CTouchSensorV3MPR121.circuit.tsx](boards/Grove12KeyCapacitiveI2CTouchSensorV3MPR121/Grove12KeyCapacitiveI2CTouchSensorV3MPR121.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · input · primary model `MPR121` · declared MPN `MPR121` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 12 missing-PCB-trace errors.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 12 Channel Capacitive Touch Keypad (ATtiny1616) — `Grove12ChannelCapacitiveTouchKeypadATtiny1616`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12ChannelCapacitiveTouchKeypadATtiny1616.circuit.tsx](boards/Grove12ChannelCapacitiveTouchKeypadATtiny1616/Grove12ChannelCapacitiveTouchKeypadATtiny1616.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `ATtiny1616` · declared MPN `ATtiny1616` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - ORP Sensor Kit Pro — `GroveORPSensorKitPro`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveORPSensorKitPro.circuit.tsx](boards/GroveORPSensorKitPro/GroveORPSensorKitPro.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `OPA333` · declared MPN `OPA333` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Water Sensor — `GroveWaterSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWaterSensor.circuit.tsx](boards/GroveWaterSensor/GroveWaterSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Water Level Sensor — `GroveWaterLevelSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWaterLevelSensor.circuit.tsx](boards/GroveWaterLevelSensor/GroveWaterLevelSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - TDS Sensor — `GroveTDSSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTDSSensor.circuit.tsx](boards/GroveTDSSensor/GroveTDSSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `TDS-SENSOR` · declared MPN `TDS-SENSOR` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Turbidity Sensor Meter for Arduino V1.0 — `GroveTurbiditySensorMeterForArduinoV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTurbiditySensorMeterForArduinoV10.circuit.tsx](boards/GroveTurbiditySensorMeterForArduinoV10/GroveTurbiditySensorMeterForArduinoV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `SEN0189` · declared MPN `SEN0189` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - PIR Motion Sensor — `GrovePIRMotionSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GrovePIRMotionSensor.circuit.tsx](boards/GrovePIRMotionSensor/GrovePIRMotionSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 35 source components · 108 source traces · 0 PCB traces · 34 schematic traces · 0 placeholder MPNs · 86 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Digital PIR Sensor — `GroveDigitalPIRSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalPIRSensor.circuit.tsx](boards/GroveDigitalPIRSensor/GroveDigitalPIRSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 35 source components · 108 source traces · 0 PCB traces · 34 schematic traces · 0 placeholder MPNs · 86 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Tilt Switch — `GroveTiltSwitch`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTiltSwitch.circuit.tsx](boards/GroveTiltSwitch/GroveTiltSwitch.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `SW-200D` · declared MPN `SW-200D` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Piezo Vibration Sensor — `GrovePiezoVibrationSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GrovePiezoVibrationSensor.circuit.tsx](boards/GrovePiezoVibrationSensor/GrovePiezoVibrationSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM2904` · declared MPN `LM2904` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Slide Potentiometer — `GroveSlidePotentiometer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSlidePotentiometer.circuit.tsx](boards/GroveSlidePotentiometer/GroveSlidePotentiometer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 1 source components · 3 source traces · 0 PCB traces · 2 schematic traces · 0 placeholder MPNs · 3 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 3 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P2 — 3 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Optical Rotary Encoder(TCUT1600X01) — `GroveOpticalRotaryEncoderTCUT1600X01`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOpticalRotaryEncoderTCUT1600X01.circuit.tsx](boards/GroveOpticalRotaryEncoderTCUT1600X01/GroveOpticalRotaryEncoderTCUT1600X01.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 9 source components · 28 source traces · 0 PCB traces · 6 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 12-bit Magnetic Rotary Position Sensor / Encoder (AS5600) — `Grove12BitMagneticRotaryPositionSensorEncoderAS5600`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12BitMagneticRotaryPositionSensorEncoderAS5600.circuit.tsx](boards/Grove12BitMagneticRotaryPositionSensorEncoderAS5600/Grove12BitMagneticRotaryPositionSensorEncoderAS5600.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · input · primary model `AS5600` · declared MPN `AS5600` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 13 disconnected-port errors, 13 missing-PCB-trace errors.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-Encoder — `GroveEncoder`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveEncoder.circuit.tsx](boards/GroveEncoder/GroveEncoder.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 9 source components · 28 source traces · 0 PCB traces · 6 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Step Counter(BMA456) — `GroveStepCounterBMA456`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveStepCounterBMA456.circuit.tsx](boards/GroveStepCounterBMA456/GroveStepCounterBMA456.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `BMA456` · declared MPN `BMA456` · 5V

**Artifact counts:** 8 source components · 30 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - ADC for Load Cell (HX711) — `GroveADCForLoadCellHX711`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveADCForLoadCellHX711.circuit.tsx](boards/GroveADCForLoadCellHX711/GroveADCForLoadCellHX711.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Sensor_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `HX711` · declared MPN `HX711` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Wio-E5 — `GroveWioE5`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWioE5.circuit.tsx](boards/GroveWioE5/GroveWioE5.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · communications · primary model `Wio-E5` · declared MPN `Wio-E5` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - BLE (dual model) v1.0 — `GroveBLEDualModelV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBLEDualModelV10.circuit.tsx](boards/GroveBLEDualModelV10/GroveBLEDualModelV10.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** uart · communications · primary model `HM-13` · declared MPN `HM-13` · 5V

**Artifact counts:** 17 source components · 55 source traces · 0 PCB traces · 16 schematic traces · 0 placeholder MPNs · 45 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 55 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 45 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Serial Bluetooth v3.0 — `GroveSerialBluetoothV30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialBluetoothV30.circuit.tsx](boards/GroveSerialBluetoothV30/GroveSerialBluetoothV30.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `BC417` · declared MPN `BC417` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - BLE v1 — `GroveBLEV1`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBLEV1.circuit.tsx](boards/GroveBLEV1/GroveBLEV1.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** uart · communications · primary model `HM-11` · declared MPN `HM-11` · 5V

**Artifact counts:** 22 source components · 64 source traces · 0 PCB traces · 22 schematic traces · 0 placeholder MPNs · 52 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 64 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 52 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - UART Wifi V2 — `GroveUARTWifiV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUARTWifiV2.circuit.tsx](boards/GroveUARTWifiV2/GroveUARTWifiV2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - NFC (ST25DV64) — `GroveNFCST25DV64`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveNFCST25DV64.circuit.tsx](boards/GroveNFCST25DV64/GroveNFCST25DV64.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `ST25DV64` · declared MPN `ST25DV64` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - NFC(PN532) — `GroveNFCPN532`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveNFCPN532.circuit.tsx](boards/GroveNFCPN532/GroveNFCPN532.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - NFC_tag — `GroveNFCTag`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveNFCTag.circuit.tsx](boards/GroveNFCTag/GroveNFCTag.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - GPS (SIM28) — `GroveGPSSIM28`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGPSSIM28.circuit.tsx](boards/GroveGPSSIM28/GroveGPSSIM28.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `SIM28` · declared MPN `SIM28` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - GPS (Air530) — `GroveGPSAir530`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGPSAir530.circuit.tsx](boards/GroveGPSAir530/GroveGPSAir530.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `Air530` · declared MPN `Air530` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 125KHz RFID Reader — `Grove125KHzRFIDReader`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove125KHzRFIDReader.circuit.tsx](boards/Grove125KHzRFIDReader/Grove125KHzRFIDReader.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `EM4100` · declared MPN `EM4100` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 315MHz RF Kit — `Grove315MHzRFKit`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove315MHzRFKit.circuit.tsx](boards/Grove315MHzRFKit/Grove315MHzRFKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `FS1000A` · declared MPN `FS1000A` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 433MHz Simple RF Link Kit — `Grove433MHzSimpleRFLinkKit`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove433MHzSimpleRFLinkKit.circuit.tsx](boards/Grove433MHzSimpleRFLinkKit/Grove433MHzSimpleRFLinkKit.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `FS1000A` · declared MPN `FS1000A` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Long Range — `GroveLongRange`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLongRange.circuit.tsx](boards/GroveLongRange/GroveLongRange.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Serial RF Pro — `GroveSerialRFPro`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialRFPro.circuit.tsx](boards/GroveSerialRFPro/GroveSerialRFPro.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `HM-TRP` · declared MPN `HM-TRP` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - DMX512 — `GroveDMX512`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDMX512.circuit.tsx](boards/GroveDMX512/GroveDMX512.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** uart · communications · primary model `SN75176` · declared MPN `SN75176` · 5V

**Artifact counts:** 5 source components · 24 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove- I2C ADC — `GroveI2CADC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CADC.circuit.tsx](boards/GroveI2CADC/GroveI2CADC.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `ADC121C021` · declared MPN `ADC121C021` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C FM Receiver — `GroveI2CFMReceiver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CFMReceiver.circuit.tsx](boards/GroveI2CFMReceiver/GroveI2CFMReceiver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `RDA5807M` · declared MPN `RDA5807M` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Protoshield — `GroveProtoshield`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveProtoshield.circuit.tsx](boards/GroveProtoshield/GroveProtoshield.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - RJ45 Adapter — `GroveRJ45Adapter`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRJ45Adapter.circuit.tsx](boards/GroveRJ45Adapter/GroveRJ45Adapter.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_network_module_intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 1.2-inch IPS Display — `Grove12InchIPSDisplay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12InchIPSDisplay.circuit.tsx](boards/Grove12InchIPSDisplay/Grove12InchIPSDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `ST7789` · declared MPN `ST7789` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 4-Digit Display — `Grove4DigitDisplay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove4DigitDisplay.circuit.tsx](boards/Grove4DigitDisplay/Grove4DigitDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 9 source components · 60 source traces · 0 PCB traces · 8 schematic traces · 1 placeholder MPNs · 44 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 60 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 0.54 inch Red Alphanumeric Display — `Grove054InchRedAlphanumericDisplay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove054InchRedAlphanumericDisplay.circuit.tsx](boards/Grove054InchRedAlphanumericDisplay/Grove054InchRedAlphanumericDisplay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 9 source components · 60 source traces · 0 PCB traces · 8 schematic traces · 1 placeholder MPNs · 44 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 60 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 16x2 LCD — `Grove16x2LCD`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove16x2LCD.circuit.tsx](boards/Grove16x2LCD/Grove16x2LCD.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - LCD RGB Backlight — `GroveLCDRGBBacklight`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLCDRGBBacklight.circuit.tsx](boards/GroveLCDRGBBacklight/GroveLCDRGBBacklight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Display 0.66" (SSD1306) — `GroveOLEDDisplay066SSD1306`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay066SSD1306.circuit.tsx](boards/GroveOLEDDisplay066SSD1306/GroveOLEDDisplay066SSD1306.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Display 0.96" (SSD1315) — `GroveOLEDDisplay096SSD1315`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay096SSD1315.circuit.tsx](boards/GroveOLEDDisplay096SSD1315/GroveOLEDDisplay096SSD1315.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Yellow&Blue Display 0.96(SSD1315) - SPI/IIC -3.3V/5V — `GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V.circuit.tsx](boards/GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V/GroveOLEDYellowBlueDisplay096SSD1315SPIIIC33V5V.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 3.3V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Display 1.12&#34 — `GroveOLEDDisplay11234`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay11234.circuit.tsx](boards/GroveOLEDDisplay11234/GroveOLEDDisplay11234.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - OLED Display 1.12 (SH1107) V3.0 - SPI/IIC -3.3V/5V — `GroveOLEDDisplay112SH1107V30SPIIIC33V5V`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay112SH1107V30SPIIIC33V5V.circuit.tsx](boards/GroveOLEDDisplay112SH1107V30SPIIIC33V5V/GroveOLEDDisplay112SH1107V30SPIIIC33V5V.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SH1107` · declared MPN `SH1107` · 3.3V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 2-Coil Latching Relay — `Grove2CoilLatchingRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove2CoilLatchingRelay.circuit.tsx](boards/Grove2CoilLatchingRelay/Grove2CoilLatchingRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Buzzer — `GroveBuzzer2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBuzzer2.circuit.tsx](boards/GroveBuzzer2/GroveBuzzer2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 4 source components · 15 source traces · 5 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Passive Buzzer — `GrovePassiveBuzzer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GrovePassiveBuzzer.circuit.tsx](boards/GrovePassiveBuzzer/GrovePassiveBuzzer.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `YMD12065` · declared MPN `YMD12065` · 5V

**Artifact counts:** 4 source components · 15 source traces · 5 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove – Chainable RGB LED V2.0 — `GroveChainableRGBLEDV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveChainableRGBLEDV20.circuit.tsx](boards/GroveChainableRGBLEDV20/GroveChainableRGBLEDV20.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · actuator · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Motor Driver V1.3 — `GroveI2CMotorDriverV13`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CMotorDriverV13.circuit.tsx](boards/GroveI2CMotorDriverV13/GroveI2CMotorDriverV13.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 42 source components · 166 source traces · 0 PCB traces · 47 schematic traces · 1 placeholder MPNs · 135 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 166 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 135 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 8 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (11 power-pin warning(s), 6 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Motor Driver (L298P) — `GroveI2CMotorDriverL298P`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CMotorDriverL298P.circuit.tsx](boards/GroveI2CMotorDriverL298P/GroveI2CMotorDriverL298P.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 42 source components · 166 source traces · 0 PCB traces · 47 schematic traces · 1 placeholder MPNs · 135 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 166 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 135 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 8 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (11 power-pin warning(s), 6 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Infrared Emitter — `GroveInfraredEmitter`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredEmitter.circuit.tsx](boards/GroveInfraredEmitter/GroveInfraredEmitter.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `IR333-A` · declared MPN `IR333-A` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - MP3 v4.0 — `GroveMP3V40`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMP3V40.circuit.tsx](boards/GroveMP3V40/GroveMP3V40.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Mini Fan — `GroveMiniFan`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMiniFan.circuit.tsx](boards/GroveMiniFan/GroveMiniFan.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `ATMEGA168PV-10MU` · declared MPN `ATMEGA168PV-10MU` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Recorder V3 — `GroveRecorderV3`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRecorderV3.circuit.tsx](boards/GroveRecorderV3/GroveRecorderV3.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Relay — `GroveRelay2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRelay2.circuit.tsx](boards/GroveRelay2/GroveRelay2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 2-Channel SPDT Relay — `Grove2ChannelSPDTRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove2ChannelSPDTRelay.circuit.tsx](boards/Grove2ChannelSPDTRelay/Grove2ChannelSPDTRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 4-Channel SPDT Relay — `Grove4ChannelSPDTRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove4ChannelSPDTRelay.circuit.tsx](boards/Grove4ChannelSPDTRelay/Grove4ChannelSPDTRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 8-Channel Solid State Relay — `Grove8ChannelSolidStateRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove8ChannelSolidStateRelay.circuit.tsx](boards/Grove8ChannelSolidStateRelay/Grove8ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Optocoupler Relay (M281) — `GroveOptocouplerRelayM281`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOptocouplerRelayM281.circuit.tsx](boards/GroveOptocouplerRelayM281/GroveOptocouplerRelayM281.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Servo — `GroveServo`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveServo.circuit.tsx](boards/GroveServo/GroveServo.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `SG90` · declared MPN `SG90` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Speaker — `GroveSpeaker`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSpeaker.circuit.tsx](boards/GroveSpeaker/GroveSpeaker.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `LM386` · declared MPN `LM386` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Speaker Plus — `GroveSpeakerPlus`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSpeakerPlus.circuit.tsx](boards/GroveSpeakerPlus/GroveSpeakerPlus.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `LM386` · declared MPN `LM386` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Vibration Motor — `GroveVibrationMotor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVibrationMotor.circuit.tsx](boards/GroveVibrationMotor/GroveVibrationMotor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `DRV2605` · declared MPN `DRV2605` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Water Atomization — `GroveWaterAtomization`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWaterAtomization.circuit.tsx](boards/GroveWaterAtomization/GroveWaterAtomization.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `Atomizer-Driver` · declared MPN `Atomizer-Driver` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 16 Channel PWM Driver (PCA9685) — `Grove16ChannelPWMDriverPCA9685`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove16ChannelPWMDriverPCA9685.circuit.tsx](boards/Grove16ChannelPWMDriverPCA9685/Grove16ChannelPWMDriverPCA9685.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `PCA9685` · declared MPN `PCA9685` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Motor Driver (TB6612FNG) — `GroveI2CMotorDriverTB6612FNG`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CMotorDriverTB6612FNG.circuit.tsx](boards/GroveI2CMotorDriverTB6612FNG/GroveI2CMotorDriverTB6612FNG.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · actuator · primary model `TB6612FNG` · declared MPN `TB6612FNG` · 5V

**Artifact counts:** 10 source components · 26 source traces · 0 PCB traces · 7 schematic traces · 1 placeholder MPNs · 12 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 14 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 12 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Hall Sensor — `GroveHallSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHallSensor.circuit.tsx](boards/GroveHallSensor/GroveHallSensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `A3144` · declared MPN `A3144` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Voltage Divider — `GroveVoltageDivider`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVoltageDivider.circuit.tsx](boards/GroveVoltageDivider/GroveVoltageDivider.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LMV358` · declared MPN `LMV358` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - DS1307 RTC (Real Time Clock) for Arduino — `GroveDS1307RTCRealTimeClockForArduino`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDS1307RTCRealTimeClockForArduino.circuit.tsx](boards/GroveDS1307RTCRealTimeClockForArduino/GroveDS1307RTCRealTimeClockForArduino.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - High Precision RTC (Real Time Clock) — `GroveHighPrecisionRTCRealTimeClock`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHighPrecisionRTCRealTimeClock.circuit.tsx](boards/GroveHighPrecisionRTCRealTimeClock/GroveHighPrecisionRTCRealTimeClock.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 10A DC Current Sensor (ACS725) — `Grove10ADCCurrentSensorACS725`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove10ADCCurrentSensorACS725.circuit.tsx](boards/Grove10ADCCurrentSensorACS725/Grove10ADCCurrentSensorACS725.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ACS725` · declared MPN `ACS725` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - ±5A DC/AC Current Sensor (ACS70331) — `Grove5ADCACCurrentSensorACS70331`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove5ADCACCurrentSensorACS70331.circuit.tsx](boards/Grove5ADCACCurrentSensorACS70331/Grove5ADCACCurrentSensorACS70331.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ACS70331` · declared MPN `ACS70331` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 2.5A DC Current Sensor(ACS70331) — `Grove25ADCCurrentSensorACS70331`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove25ADCCurrentSensorACS70331.circuit.tsx](boards/Grove25ADCCurrentSensorACS70331/Grove25ADCCurrentSensorACS70331.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ACS70331` · declared MPN `ACS70331` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Electricity Sensor — `GroveElectricitySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveElectricitySensor.circuit.tsx](boards/GroveElectricitySensor/GroveElectricitySensor.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ACS712` · declared MPN `ACS712` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Coulomb Counter 3.3V to 5V (LTC2941) — `GroveCoulombCounter33VTo5VLTC2941`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCoulombCounter33VTo5VLTC2941.circuit.tsx](boards/GroveCoulombCounter33VTo5VLTC2941/GroveCoulombCounter33VTo5VLTC2941.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `LTC2941` · declared MPN `LTC2941` · 3.3V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - MOSFET — `GroveMOSFET`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMOSFET.circuit.tsx](boards/GroveMOSFET/GroveMOSFET.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `2N7002` · declared MPN `2N7002` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - SPDT Relay(30A) — `GroveSPDTRelay30A`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSPDTRelay30A.circuit.tsx](boards/GroveSPDTRelay30A/GroveSPDTRelay30A.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Screw Terminal — `GroveScrewTerminal`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveScrewTerminal.circuit.tsx](boards/GroveScrewTerminal/GroveScrewTerminal.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `Screw-Terminal` · declared MPN `Screw-Terminal` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Electromagnet — `GroveElectromagnet`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveElectromagnet.circuit.tsx](boards/GroveElectromagnet/GroveElectromagnet.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MOSFET-Driver` · declared MPN `MOSFET-Driver` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Red LED — `GroveRedLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRedLED.circuit.tsx](boards/GroveRedLED/GroveRedLED.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Circular LED — `GroveCircularLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCircularLED.circuit.tsx](boards/GroveCircularLED/GroveCircularLED.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - RGB LED Ring (20 - WS2813 Mini) — `GroveRGBLEDRing20WS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDRing20WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing20WS2813Mini/GroveRGBLEDRing20WS2813Mini.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 41 source components · 100 source traces · 0 PCB traces · 38 schematic traces · 0 placeholder MPNs · 40 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 100 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 40 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 20 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - LED String Light — `GroveLEDStringLight`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDStringLight.circuit.tsx](boards/GroveLEDStringLight/GroveLEDStringLight.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 13 source components · 89 source traces · 0 PCB traces · 25 schematic traces · 0 placeholder MPNs · 67 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 89 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 67 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - LED Strip Driver — `GroveLEDStripDriver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDStripDriver.circuit.tsx](boards/GroveLEDStripDriver/GroveLEDStripDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - RGB LED Matrix w/Driver — `GroveRGBLEDMatrixWDriver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDMatrixWDriver.circuit.tsx](boards/GroveRGBLEDMatrixWDriver/GroveRGBLEDMatrixWDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 5 source components · 15 source traces · 0 PCB traces · 4 schematic traces · 1 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 15 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - LED Matrix Driver (HT16K33) — `GroveLEDMatrixDriverHT16K33`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDMatrixDriverHT16K33.circuit.tsx](boards/GroveLEDMatrixDriverHT16K33/GroveLEDMatrixDriverHT16K33.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · display · primary model `HT16K33` · declared MPN `HT16K33` · 5V

**Artifact counts:** 5 source components · 15 source traces · 0 PCB traces · 4 schematic traces · 1 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 15 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Red LED Matrix w/Driver — `GroveRedLEDMatrixWDriver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRedLEDMatrixWDriver.circuit.tsx](boards/GroveRedLEDMatrixWDriver/GroveRedLEDMatrixWDriver.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 5 source components · 15 source traces · 0 PCB traces · 4 schematic traces · 1 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 15 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Button — `GroveButton2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveButton2.circuit.tsx](boards/GroveButton2/GroveButton2.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Switch(P) — `GroveSwitchP`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSwitchP.circuit.tsx](boards/GroveSwitchP/GroveSwitchP.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-LED Button — `GroveLEDButton`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDButton.circuit.tsx](boards/GroveLEDButton/GroveLEDButton.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Dual Button — `GroveDualButton`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDualButton.circuit.tsx](boards/GroveDualButton/GroveDualButton.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove-Mech keycap — `GroveMechKeycap`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMechKeycap.circuit.tsx](boards/GroveMechKeycap/GroveMechKeycap.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Thumb Joystick — `GroveThumbJoystick`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThumbJoystick.circuit.tsx](boards/GroveThumbJoystick/GroveThumbJoystick.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 7 source components · 15 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 6 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 15 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P2 — 6 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Magnetic Switch — `GroveMagneticSwitch`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMagneticSwitch.circuit.tsx](boards/GroveMagneticSwitch/GroveMagneticSwitch.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Hub — `GroveI2CHub`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CHub.circuit.tsx](boards/GroveI2CHub/GroveI2CHub.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 4 source components · 20 source traces · 12 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - I2C Hub(6 Port) — `GroveI2CHub6Port`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CHub6Port.circuit.tsx](boards/GroveI2CHub6Port/GroveI2CHub6Port.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 4 source components · 20 source traces · 12 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 8 Channel I2C Multiplexer/I2C Hub (TCA9548A) — `Grove8ChannelI2CMultiplexerI2CHubTCA9548A`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove8ChannelI2CMultiplexerI2CHubTCA9548A.circuit.tsx](boards/Grove8ChannelI2CMultiplexerI2CHubTCA9548A/Grove8ChannelI2CMultiplexerI2CHubTCA9548A.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 4 source components · 20 source traces · 12 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - 4-Channel 16-bit ADC(ADS1115) — `Grove4Channel16BitADCADS1115`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove4Channel16BitADCADS1115.circuit.tsx](boards/Grove4Channel16BitADCADS1115/Grove4Channel16BitADCADS1115.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `ADS1115` · declared MPN `ADS1115` · 5V

**Artifact counts:** 33 source components · 79 source traces · 0 PCB traces · 30 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 79 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 16 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove - Wrapper — `GroveWrapper`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWrapper.circuit.tsx](boards/GroveWrapper/GroveWrapper.circuit.tsx) · [upstream reference](https://wiki.seeedstudio.com/Grove_Accessories_Intro/)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `Grove-Wrapper` · declared MPN `Grove-Wrapper` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 16 x 2 LCD Black on Yellow — `Grove16X2LCDBlackOnYellow`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove16X2LCDBlackOnYellow.circuit.tsx](boards/Grove16X2LCDBlackOnYellow/Grove16X2LCDBlackOnYellow.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Yellow.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 16 x 2 LCD Black on Red — `Grove16X2LCDBlackOnRed`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove16X2LCDBlackOnRed.circuit.tsx](boards/Grove16X2LCDBlackOnRed/Grove16X2LCDBlackOnRed.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16-x-2-LCD-Black-on-Red.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 16x2 LCD White on Blue — `Grove16x2LCDWhiteOnBlue`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove16x2LCDWhiteOnBlue.circuit.tsx](boards/Grove16x2LCDWhiteOnBlue/Grove16x2LCDWhiteOnBlue.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-16x2-LCD-White-on-Blue.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `HD44780` · declared MPN `HD44780` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C UV Sensor VEML6070 — `GroveI2CUVSensorVEML6070`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CUVSensorVEML6070.circuit.tsx](boards/GroveI2CUVSensorVEML6070/GroveI2CUVSensorVEML6070.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-UV-Sensor-VEML6070.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `VEML6070` · declared MPN `VEML6070` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Capacitive Touch Slider Sensor CY8C4014LQI — `GroveCapacitiveTouchSliderSensorCY8C4014LQI`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCapacitiveTouchSliderSensorCY8C4014LQI.circuit.tsx](boards/GroveCapacitiveTouchSliderSensorCY8C4014LQI/GroveCapacitiveTouchSliderSensorCY8C4014LQI.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Capacitive-Touch-Slider-Sensor-CY8C4014LQI.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `CY8C4014` · declared MPN `CY8C4014` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Vibration Sensor SW 420 — `GroveVibrationSensorSW420`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVibrationSensorSW420.circuit.tsx](boards/GroveVibrationSensorSW420/GroveVibrationSensorSW420.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Vibration-Sensor-SW-420.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `SW-420` · declared MPN `SW-420` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IMU 9DOF ICM20600 AK09918 — `GroveIMU9DOFICM20600AK09918`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU9DOFICM20600AK09918.circuit.tsx](boards/GroveIMU9DOFICM20600AK09918/GroveIMU9DOFICM20600AK09918.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-ICM20600-AK09918.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `ICM20600` · declared MPN `ICM20600` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 12 Key Capacitive I2C Touch Sensor V2 MPR121 — `Grove12KeyCapacitiveI2CTouchSensorV2MPR121`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12KeyCapacitiveI2CTouchSensorV2MPR121.circuit.tsx](boards/Grove12KeyCapacitiveI2CTouchSensorV2MPR121/Grove12KeyCapacitiveI2CTouchSensorV2MPR121.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-12-Key-Capacitive-I2C-Touch-Sensor-V2-MPR121.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · input · primary model `MPR121` · declared MPN `MPR121` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 12 missing-PCB-trace errors.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 6 Position DIP Switch — `Grove6PositionDIPSwitch`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6PositionDIPSwitch.circuit.tsx](boards/Grove6PositionDIPSwitch/Grove6PositionDIPSwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Position-DIP-Switch.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 5 Way Switch — `Grove5WaySwitch`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove5WaySwitch.circuit.tsx](boards/Grove5WaySwitch/Grove5WaySwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-5-Way-Switch.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 4 Channel Solid State Relay — `Grove4ChannelSolidStateRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove4ChannelSolidStateRelay.circuit.tsx](boards/Grove4ChannelSolidStateRelay/Grove4ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-4-Channel-Solid-State-Relay.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 2 Channel Solid State Relay — `Grove2ChannelSolidStateRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove2ChannelSolidStateRelay.circuit.tsx](boards/Grove2ChannelSolidStateRelay/Grove2ChannelSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-2-Channel-Solid-State-Relay.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Solid State Relay V2 — `GroveSolidStateRelayV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSolidStateRelayV2.circuit.tsx](boards/GroveSolidStateRelayV2/GroveSolidStateRelayV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Solid-State-Relay-V2-p-3128.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove WS2813 RGB LED Strip Waterproof 60 LED m 1m — `GroveWS2813RGBLEDStripWaterproof60LEDM1m`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWS2813RGBLEDStripWaterproof60LEDM1m.circuit.tsx](boards/GroveWS2813RGBLEDStripWaterproof60LEDM1m/GroveWS2813RGBLEDStripWaterproof60LEDM1m.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-60-LED-m-1m.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove WS2813 RGB LED Strip Waterproof 30 LED m 1m — `GroveWS2813RGBLEDStripWaterproof30LEDM1m`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWS2813RGBLEDStripWaterproof30LEDM1m.circuit.tsx](boards/GroveWS2813RGBLEDStripWaterproof30LEDM1m/GroveWS2813RGBLEDStripWaterproof30LEDM1m.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-WS2813-RGB-LED-Strip-Waterproof-30-LED-m-1m.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Blue LED Button — `GroveBlueLEDButton`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBlueLEDButton.circuit.tsx](boards/GroveBlueLEDButton/GroveBlueLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blue-LED-Button.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Yellow LED Button — `GroveYellowLEDButton`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveYellowLEDButton.circuit.tsx](boards/GroveYellowLEDButton/GroveYellowLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Yellow-LED-Button.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Red LED Button — `GroveRedLEDButton`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRedLEDButton.circuit.tsx](boards/GroveRedLEDButton/GroveRedLEDButton.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Red-LED-Button.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F P — `GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP.circuit.tsx](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0FP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F-P.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `GP2Y0D805Z0F` · declared MPN `GP2Y0D805Z0F` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Digital Distance Interrupter 0 5 to 5cm GP2Y0D805Z0F — `GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F.circuit.tsx](boards/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F/GroveDigitalDistanceInterrupter05To5cmGP2Y0D805Z0F.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Distance-Interrupter-0-5-to-5cm-GP2Y0D805Z0F.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `GP2Y0D805Z0F` · declared MPN `GP2Y0D805Z0F` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C FM Receiver v1 1 — `GroveI2CFMReceiverV11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CFMReceiverV11.circuit.tsx](boards/GroveI2CFMReceiverV11/GroveI2CFMReceiverV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-FM-Receiver-v1-1.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `RDA5807M` · declared MPN `RDA5807M` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove UART WiFi V2 ESP8285 — `GroveUARTWiFiV2ESP8285`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUARTWiFiV2ESP8285.circuit.tsx](boards/GroveUARTWiFiV2ESP8285/GroveUARTWiFiV2ESP8285.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-UART-WiFi-V2-ESP8285.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Compass V2 — `Grove3AxisDigitalCompassV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalCompassV2.circuit.tsx](boards/Grove3AxisDigitalCompassV2/Grove3AxisDigitalCompassV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass-V2.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · utility · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 11 source components · 37 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 33 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 37 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 33 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Micro Switch — `GroveMicroSwitch`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMicroSwitch.circuit.tsx](boards/GroveMicroSwitch/GroveMicroSwitch.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Micro-Switch.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Display 1 12 V2 — `GroveOLEDDisplay112V2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay112V2.circuit.tsx](boards/GroveOLEDDisplay112V2/GroveOLEDDisplay112V2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12-V2.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Variable Color LED V1 1 — `GroveVariableColorLEDV11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVariableColorLEDV11.circuit.tsx](boards/GroveVariableColorLEDV11/GroveVariableColorLEDV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Variable-Color-LED-V1-1.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 13 source components · 89 source traces · 0 PCB traces · 25 schematic traces · 0 placeholder MPNs · 67 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 89 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 67 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove mini PIR motion sensor — `GroveMiniPIRMotionSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMiniPIRMotionSensor.circuit.tsx](boards/GroveMiniPIRMotionSensor/GroveMiniPIRMotionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-mini-PIR-motion-sensor-p-2930.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 35 source components · 108 source traces · 0 PCB traces · 34 schematic traces · 0 placeholder MPNs · 86 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C Color Sensor V2 — `GroveI2CColorSensorV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CColorSensorV2.circuit.tsx](boards/GroveI2CColorSensorV2/GroveI2CColorSensorV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Color-Sensor-V2.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `TCS3414CS` · declared MPN `TCS3414CS` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Heelight Sensor — `GroveHeelightSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHeelightSensor.circuit.tsx](boards/GroveHeelightSensor/GroveHeelightSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Heelight-Sensor.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Infrared Reflective Sensor v1 2 — `GroveInfraredReflectiveSensorV12`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveInfraredReflectiveSensorV12.circuit.tsx](boards/GroveInfraredReflectiveSensorV12/GroveInfraredReflectiveSensorV12.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Infrared-Reflective-Sensor-v1-2.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 8 source components · 26 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 22 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 22 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LoRa Radio 433MHz — `GroveLoRaRadio433MHz`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLoRaRadio433MHz.circuit.tsx](boards/GroveLoRaRadio433MHz/GroveLoRaRadio433MHz.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-Radio-433MHz-p-2777.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LoRa Radio 868MHz — `GroveLoRaRadio868MHz`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLoRaRadio868MHz.circuit.tsx](boards/GroveLoRaRadio868MHz/GroveLoRaRadio868MHz.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-Radio-868MHz.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `RFM95` · declared MPN `RFM95` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove High Precision RTC — `GroveHighPrecisionRTC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHighPrecisionRTC.circuit.tsx](boards/GroveHighPrecisionRTC/GroveHighPrecisionRTC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-High-Precision-RTC.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Light Sensor v1 2 LS06 S phototransistor — `GroveLightSensorV12LS06SPhototransistor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightSensorV12LS06SPhototransistor.circuit.tsx](boards/GroveLightSensorV12LS06SPhototransistor/GroveLightSensorV12LS06SPhototransistor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Sensor-v1-2-LS06-S-phototransistor.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Recorder v3 0 — `GroveRecorderV30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRecorderV30.circuit.tsx](boards/GroveRecorderV30/GroveRecorderV30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Recorder-v3-0.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Speech Recognizer — `GroveSpeechRecognizer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSpeechRecognizer.circuit.tsx](boards/GroveSpeechRecognizer/GroveSpeechRecognizer.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Speech-Recognizer.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · utility · primary model `M007` · declared MPN `M007` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Light Sensor P v1 1 — `GroveLightSensorPV11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightSensorPV11.circuit.tsx](boards/GroveLightSensorPV11/GroveLightSensorPV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Sensor-P-v1-1.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `GL5528` · declared MPN `GL5528` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IMU 10DOF v2 0 — `GroveIMU10DOFV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU10DOFV20.circuit.tsx](boards/GroveIMU10DOFV20/GroveIMU10DOFV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-10DOF-v2-0.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MPU-9250` · declared MPN `MPU-9250` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Mini Fan v1 1 — `GroveMiniFanV11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMiniFanV11.circuit.tsx](boards/GroveMiniFanV11/GroveMiniFanV11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Fan-v1-1.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `ATMEGA168PV-10MU` · declared MPN `ATMEGA168PV-10MU` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temperature Humidity Sensor SHT31 — `GroveTemperatureHumiditySensorSHT31`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorSHT31.circuit.tsx](boards/GroveTemperatureHumiditySensorSHT31/GroveTemperatureHumiditySensorSHT31.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-SHT31.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SHT31` · declared MPN `SHT31` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove BME280 Environmental Sensor Temperature Humidity Barometer — `GroveBME280EnvironmentalSensorTemperatureHumidityBarometer`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBME280EnvironmentalSensorTemperatureHumidityBarometer.circuit.tsx](boards/GroveBME280EnvironmentalSensorTemperatureHumidityBarometer/GroveBME280EnvironmentalSensorTemperatureHumidityBarometer.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-BME280-Environmental-Sensor-Temperature-Humidity-Barometer.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BME280` · declared MPN `BME280` · 5V

**Artifact counts:** 8 source components · 30 source traces · 0 PCB traces · 13 schematic traces · 0 placeholder MPNs · 19 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 19 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LED Matrix Driver v1 0 — `GroveLEDMatrixDriverV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDMatrixDriverV10.circuit.tsx](boards/GroveLEDMatrixDriverV10/GroveLEDMatrixDriverV10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Matrix-Driver-v1-0.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · display · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 5 source components · 15 source traces · 0 PCB traces · 4 schematic traces · 1 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 15 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Mouse Encoder — `GroveMouseEncoder`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMouseEncoder.circuit.tsx](boards/GroveMouseEncoder/GroveMouseEncoder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mouse-Encoder.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `TCUT1600X01` · declared MPN `TCUT1600X01` · 5V

**Artifact counts:** 9 source components · 28 source traces · 0 PCB traces · 6 schematic traces · 0 placeholder MPNs · 21 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 21 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove MP3 v2 0 — `GroveMP3V20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMP3V20.circuit.tsx](boards/GroveMP3V20/GroveMP3V20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MP3-v2-0-p-2597.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Mini Track Ball — `GroveMiniTrackBall`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMiniTrackBall.circuit.tsx](boards/GroveMiniTrackBall/GroveMiniTrackBall.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Track-Ball.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Haptic Motor — `GroveHapticMotor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHapticMotor.circuit.tsx](boards/GroveHapticMotor/GroveHapticMotor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Haptic-Motor-p-2546.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `DRV2605` · declared MPN `DRV2605` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Water Atomization v1 0 — `GroveWaterAtomizationV10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWaterAtomizationV10.circuit.tsx](boards/GroveWaterAtomizationV10/GroveWaterAtomizationV10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Water-Atomization-v1-0.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `Atomizer-Driver` · declared MPN `Atomizer-Driver` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temperature Humidity Sensor HDC100 — `GroveTemperatureHumiditySensorHDC100`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorHDC100.circuit.tsx](boards/GroveTemperatureHumiditySensorHDC100/GroveTemperatureHumiditySensorHDC100.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-HDC100-p-2535.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 15 source components · 52 source traces · 0 PCB traces · 21 schematic traces · 0 placeholder MPNs · 43 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 43 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C Mini Motor Driver — `GroveI2CMiniMotorDriver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CMiniMotorDriver.circuit.tsx](boards/GroveI2CMiniMotorDriver/GroveI2CMiniMotorDriver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Mini-Motor-Driver.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 42 source components · 166 source traces · 0 PCB traces · 47 schematic traces · 1 placeholder MPNs · 135 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 166 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 135 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 8 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (11 power-pin warning(s), 6 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Uart Wifi — `GroveUartWifi`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUartWifi.circuit.tsx](boards/GroveUartWifi/GroveUartWifi.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Uart-Wifi-p-2495.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 6 Axis Accelerometer Compass v2 0 — `Grove6AxisAccelerometerCompassV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6AxisAccelerometerCompassV20.circuit.tsx](boards/Grove6AxisAccelerometerCompassV20/Grove6AxisAccelerometerCompassV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-v2-0.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 17 source components · 59 source traces · 0 PCB traces · 26 schematic traces · 0 placeholder MPNs · 49 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 59 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 49 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Serial Blueseeed CSR BC417 — `GroveSerialBlueseeedCSRBC417`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialBlueseeedCSRBC417.circuit.tsx](boards/GroveSerialBlueseeedCSRBC417/GroveSerialBlueseeedCSRBC417.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-Blueseeed-CSR-BC417.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `BC417` · declared MPN `BC417` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LED Bar v2 0 — `GroveLEDBarV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDBarV20.circuit.tsx](boards/GroveLEDBarV20/GroveLEDBarV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Bar-v2-0.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 13 source components · 89 source traces · 0 PCB traces · 25 schematic traces · 0 placeholder MPNs · 67 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 89 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 67 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Gesture PAJ7620U2 — `GroveGesturePAJ7620U2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGesturePAJ7620U2.circuit.tsx](boards/GroveGesturePAJ7620U2/GroveGesturePAJ7620U2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gesture-PAJ7620U2.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · utility · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Finger clip Heart Rate Sensor with shell — `GroveFingerClipHeartRateSensorWithShell`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFingerClipHeartRateSensorWithShell.circuit.tsx](boards/GroveFingerClipHeartRateSensorWithShell/GroveFingerClipHeartRateSensorWithShell.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Finger-clip-Heart-Rate-Sensor-with-shell.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Blueseeed Dual model HM13 — `GroveBlueseeedDualModelHM13`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBlueseeedDualModelHM13.circuit.tsx](boards/GroveBlueseeedDualModelHM13/GroveBlueseeedDualModelHM13.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blueseeed-Dual-model-HM13.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · utility · primary model `HM-13` · declared MPN `HM-13` · 5V

**Artifact counts:** 17 source components · 55 source traces · 0 PCB traces · 16 schematic traces · 0 placeholder MPNs · 45 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 55 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 45 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IMU 9DOF v2 0 — `GroveIMU9DOFV20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU9DOFV20.circuit.tsx](boards/GroveIMU9DOFV20/GroveIMU9DOFV20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-v2-0.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MPU-9150` · declared MPN `MPU-9150` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IMU 10DOF — `GroveIMU10DOF`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU10DOF.circuit.tsx](boards/GroveIMU10DOF/GroveIMU10DOF.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-10DOF-p-2386.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MPU-9250` · declared MPN `MPU-9250` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove EL Driver — `GroveELDriver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveELDriver.circuit.tsx](boards/GroveELDriver/GroveELDriver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-EL-Driver.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Carbon Dioxide Sensor MH Z16 — `GroveCarbonDioxideSensorMHZ16`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCarbonDioxideSensorMHZ16.circuit.tsx](boards/GroveCarbonDioxideSensorMHZ16/GroveCarbonDioxideSensorMHZ16.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Carbon-Dioxide-Sensor-MH-Z16.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `MH-Z16` · declared MPN `MH-Z16` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Q Touch Sensor — `GroveQTouchSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveQTouchSensor.circuit.tsx](boards/GroveQTouchSensor/GroveQTouchSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Q-Touch-Sensor.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 16 source components · 52 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 39 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 39 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove FM Receiver — `GroveFMReceiver`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFMReceiver.circuit.tsx](boards/GroveFMReceiver/GroveFMReceiver.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-FM-Receiver.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `SX6119` · declared MPN `SX6119` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Barometer Sensor BMP18 — `GroveBarometerSensorBMP18`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBarometerSensorBMP18.circuit.tsx](boards/GroveBarometerSensorBMP18/GroveBarometerSensorBMP18.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Barometer-Sensor-BMP18-p-1840.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 32 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 30 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 32 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 30 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Recorder — `GroveRecorder`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRecorder.circuit.tsx](boards/GroveRecorder/GroveRecorder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Recorder-p-1825.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove NFC — `GroveNFC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveNFC.circuit.tsx](boards/GroveNFC/GroveNFC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-NFC.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `PN532` · declared MPN `PN532` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IMU 9DOF — `GroveIMU9DOF`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIMU9DOF.circuit.tsx](boards/GroveIMU9DOF/GroveIMU9DOF.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IMU-9DOF-p-1728.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MPU-9150` · declared MPN `MPU-9150` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Mini Camera — `GroveMiniCamera`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMiniCamera.circuit.tsx](boards/GroveMiniCamera/GroveMiniCamera.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Mini-Camera-p-1578.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `OV2640` · declared MPN `OV2640` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove PH Sensor — `GrovePHSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GrovePHSensor.circuit.tsx](boards/GrovePHSensor/GrovePHSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-PH-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `OPA333` · declared MPN `OPA333` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Serial MP3 Player — `GroveSerialMP3Player`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialMP3Player.circuit.tsx](boards/GroveSerialMP3Player/GroveSerialMP3Player.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-MP3-Player-p-1542.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Single Axis Analog Gyro — `GroveSingleAxisAnalogGyro`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSingleAxisAnalogGyro.circuit.tsx](boards/GroveSingleAxisAnalogGyro/GroveSingleAxisAnalogGyro.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Single-Axis-Analog-Gyro-p-1451.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · utility · primary model `ENC-03R` · declared MPN `ENC-03R` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 6 Axis Accelerometer Compass — `Grove6AxisAccelerometerCompass`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6AxisAccelerometerCompass.circuit.tsx](boards/Grove6AxisAccelerometerCompass/Grove6AxisAccelerometerCompass.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Accelerometer-Compass-p-1448.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `LSM6DS3` · declared MPN `LSM6DS3` · 5V

**Artifact counts:** 17 source components · 59 source traces · 0 PCB traces · 26 schematic traces · 0 placeholder MPNs · 49 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 59 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 49 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Fingerprint Sensor — `GroveFingerprintSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFingerprintSensor.circuit.tsx](boards/GroveFingerprintSensor/GroveFingerprintSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Fingerprint-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `AS608` · declared MPN `AS608` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Gas Sensor MQ9 — `GroveGasSensorMQ9`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorMQ9.circuit.tsx](boards/GroveGasSensorMQ9/GroveGasSensorMQ9.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ9.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-9` · declared MPN `MQ-9` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove MQ3 Grove Gas Sensor — `GroveMQ3GroveGasSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMQ3GroveGasSensor.circuit.tsx](boards/GroveMQ3GroveGasSensor/GroveMQ3GroveGasSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MQ3-Grove-Gas-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-3` · declared MPN `MQ-3` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Dry Reed Relay — `GroveDryReedRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDryReedRelay.circuit.tsx](boards/GroveDryReedRelay/GroveDryReedRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Dry-Reed-Relay.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Solid State Relay — `GroveSolidStateRelay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSolidStateRelay.circuit.tsx](boards/GroveSolidStateRelay/GroveSolidStateRelay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Solid-State-Relay.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `HLS8L-DC3V-S-C` · declared MPN `HLS8L-DC3V-S-C` · 5V

**Artifact counts:** 9 source components · 22 source traces · 0 PCB traces · 5 schematic traces · 1 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 22 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 9 disconnected-port errors, 13 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LED Bar — `GroveLEDBar`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLEDBar.circuit.tsx](boards/GroveLEDBar/GroveLEDBar.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-Bar.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 13 source components · 89 source traces · 0 PCB traces · 25 schematic traces · 0 placeholder MPNs · 67 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 89 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 67 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Differential Amplifier — `GroveDifferentialAmplifier`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDifferentialAmplifier.circuit.tsx](boards/GroveDifferentialAmplifier/GroveDifferentialAmplifier.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Differential-Amplifier.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `INA125` · declared MPN `INA125` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Digital Light Sensor TSL2561 — `GroveDigitalLightSensorTSL2561`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalLightSensorTSL2561.circuit.tsx](boards/GroveDigitalLightSensorTSL2561/GroveDigitalLightSensorTSL2561.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-Light-Sensor-TSL2561.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `TSL2561` · declared MPN `TSL2561` · 5V

**Artifact counts:** 12 source components · 39 source traces · 0 PCB traces · 15 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 39 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove IR Distance Interrupter — `GroveIRDistanceInterrupter`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveIRDistanceInterrupter.circuit.tsx](boards/GroveIRDistanceInterrupter/GroveIRDistanceInterrupter.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-IR-Distance-Interrupter-p-1278.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Button P — `GroveButtonP`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveButtonP.circuit.tsx](boards/GroveButtonP/GroveButtonP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Button-P.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · input · primary model `B3F-1000` · declared MPN `B3F-1000` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 5 disconnected-port errors, 7 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Rotary Angle Sensor P — `GroveRotaryAngleSensorP`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRotaryAngleSensorP.circuit.tsx](boards/GroveRotaryAngleSensorP/GroveRotaryAngleSensorP.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Rotary-Angle-Sensor-P.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · input · primary model `WH09-2-103` · declared MPN `WH09-2-103` · 5V

**Artifact counts:** 1 source components · 3 source traces · 0 PCB traces · 2 schematic traces · 0 placeholder MPNs · 3 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 3 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P2 — 3 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Barometer Sensor — `GroveBarometerSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBarometerSensor.circuit.tsx](boards/GroveBarometerSensor/GroveBarometerSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Barometer-Sensor.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BMP180` · declared MPN `BMP180` · 5V

**Artifact counts:** 8 source components · 32 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 30 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 32 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 30 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Serial Camera — `GroveSerialCamera`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialCamera.circuit.tsx](boards/GroveSerialCamera/GroveSerialCamera.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-Camera-p-945.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `VC0706` · declared MPN `VC0706` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Gas Sensor MQ5 — `GroveGasSensorMQ5`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorMQ5.circuit.tsx](boards/GroveGasSensorMQ5/GroveGasSensorMQ5.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ5.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-5` · declared MPN `MQ-5` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Gas Sensor MQ2 — `GroveGasSensorMQ2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorMQ2.circuit.tsx](boards/GroveGasSensorMQ2/GroveGasSensorMQ2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-MQ2.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MQ-2` · declared MPN `MQ-2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C Motor Driver with L298 — `GroveI2CMotorDriverWithL298`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CMotorDriverWithL298.circuit.tsx](boards/GroveI2CMotorDriverWithL298/GroveI2CMotorDriverWithL298.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Motor-Driver-with-L298.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · actuator · primary model `L298N` · declared MPN `L298N` · 5V

**Artifact counts:** 42 source components · 166 source traces · 0 PCB traces · 47 schematic traces · 1 placeholder MPNs · 135 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 166 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 135 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 8 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (11 power-pin warning(s), 6 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Sound Recorder — `GroveSoundRecorder`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSoundRecorder.circuit.tsx](boards/GroveSoundRecorder/GroveSoundRecorder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Sound-Recorder-p-904.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ISD1820P` · declared MPN `ISD1820P` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Geiger Counter — `GroveGeigerCounter`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGeigerCounter.circuit.tsx](boards/GroveGeigerCounter/GroveGeigerCounter.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Geiger-Counter-p-867.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `M4011` · declared MPN `M4011` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C Color Sensor — `GroveI2CColorSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CColorSensor.circuit.tsx](boards/GroveI2CColorSensor/GroveI2CColorSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Color-Sensor-p-854.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `TCS3414CS` · declared MPN `TCS3414CS` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Variable Color LED — `GroveVariableColorLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveVariableColorLED.circuit.tsx](boards/GroveVariableColorLED/GroveVariableColorLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Variable-Color-LED-p-852.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 13 source components · 89 source traces · 0 PCB traces · 25 schematic traces · 0 placeholder MPNs · 67 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 89 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 67 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Chainable RGB LED — `GroveChainableRGBLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveChainableRGBLED.circuit.tsx](boards/GroveChainableRGBLED/GroveChainableRGBLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Chainable-RGB-LED.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · actuator · primary model `P9813` · declared MPN `P9813` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove I2C Touch Sensor — `GroveI2CTouchSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveI2CTouchSensor.circuit.tsx](boards/GroveI2CTouchSensor/GroveI2CTouchSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-I2C-Touch-Sensor-p-840.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · input · primary model `AT42QT1070` · declared MPN `AT42QT1070` · 5V

**Artifact counts:** 16 source components · 52 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 39 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 39 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temperature Humidity Sensor Pro AM2302 DHT22 — `GroveTemperatureHumiditySensorProAM2302DHT22`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorProAM2302DHT22.circuit.tsx](boards/GroveTemperatureHumiditySensorProAM2302DHT22/GroveTemperatureHumiditySensorProAM2302DHT22.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-Pro-AM2302-DHT22.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `DHT22` · declared MPN `DHT22` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove BlinkM — `GroveBlinkM`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBlinkM.circuit.tsx](boards/GroveBlinkM/GroveBlinkM.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-BlinkM-p-826.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Line Finder — `GroveLineFinder`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLineFinder.circuit.tsx](boards/GroveLineFinder/GroveLineFinder.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Line-Finder-p-825.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Display 1 12 — `GroveOLEDDisplay112`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay112.circuit.tsx](boards/GroveOLEDDisplay112/GroveOLEDDisplay112.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Display 0 96 — `GroveOLEDDisplay096`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay096.circuit.tsx](boards/GroveOLEDDisplay096/GroveOLEDDisplay096.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-0-96.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Serial LCD — `GroveSerialLCD`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSerialLCD.circuit.tsx](boards/GroveSerialLCD/GroveSerialLCD.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Serial-LCD-p-773.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `ST7066U` · declared MPN `ST7066U` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 7 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LED — `GroveLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLED.circuit.tsx](boards/GroveLED/GroveLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LED-p-767.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Accelerometer 1 5g — `Grove3AxisDigitalAccelerometer15g`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer15g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer15g/Grove3AxisDigitalAccelerometer15g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-1-5g.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MMA7660FC` · declared MPN `MMA7660FC` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Compass — `Grove3AxisDigitalCompass`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalCompass.circuit.tsx](boards/Grove3AxisDigitalCompass/Grove3AxisDigitalCompass.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Compass.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · utility · primary model `HMC5883` · declared MPN `HMC5883` · 5V

**Artifact counts:** 11 source components · 37 source traces · 0 PCB traces · 14 schematic traces · 0 placeholder MPNs · 33 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 37 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 33 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RTC DS1307 — `GroveRTCDS1307`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRTCDS1307.circuit.tsx](boards/GroveRTCDS1307/GroveRTCDS1307.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RTC-DS1307.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `DS1307` · declared MPN `DS1307` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Gyro — `Grove3AxisDigitalGyro`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalGyro.circuit.tsx](boards/Grove3AxisDigitalGyro/Grove3AxisDigitalGyro.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Gyro.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ITG-3205` · declared MPN `ITG-3205` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Accelerometer 16g — `Grove3AxisDigitalAccelerometer16g`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer16g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer16g/Grove3AxisDigitalAccelerometer16g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-16g.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `ADXL345` · declared MPN `ADXL345` · 5V

**Artifact counts:** 11 source components · 42 source traces · 0 PCB traces · 18 schematic traces · 0 placeholder MPNs · 35 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 42 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 35 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (3 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Green LED — `GroveGreenLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGreenLED.circuit.tsx](boards/GroveGreenLED/GroveGreenLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Green-LED.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Purple LED 3mm — `GrovePurpleLED3mm`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GrovePurpleLED3mm.circuit.tsx](boards/GrovePurpleLED3mm/GrovePurpleLED3mm.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Purple-LED-3mm.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Multi Color Flash LED 5mm — `GroveMultiColorFlashLED5mm`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMultiColorFlashLED5mm.circuit.tsx](boards/GroveMultiColorFlashLED5mm/GroveMultiColorFlashLED5mm.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Multi-Color-Flash-LED-5mm.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove White LED — `GroveWhiteLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWhiteLED.circuit.tsx](boards/GroveWhiteLED/GroveWhiteLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-White-LED.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Blue LED — `GroveBlueLED`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBlueLED.circuit.tsx](boards/GroveBlueLED/GroveBlueLED.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blue-LED.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Collision Sensor — `GroveCollisionSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCollisionSensor.circuit.tsx](boards/GroveCollisionSensor/GroveCollisionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Collision-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `MVS0608.02` · declared MPN `MVS0608.02` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Dragrove Generic gateway for internet of things — `GroveDragroveGenericGatewayForInternetOfThings`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDragroveGenericGatewayForInternetOfThings.circuit.tsx](boards/GroveDragroveGenericGatewayForInternetOfThings/GroveDragroveGenericGatewayForInternetOfThings.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Dragrove-Generic-gateway-for-internet-of-things-p-1118.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ESP8266` · declared MPN `ESP8266` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Chest Strap Heart Rate Sensor — `GroveChestStrapHeartRateSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveChestStrapHeartRateSensor.circuit.tsx](boards/GroveChestStrapHeartRateSensor/GroveChestStrapHeartRateSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Chest-Strap-Heart-Rate-Sensor-p-1115.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MAX30100` · declared MPN `MAX30100` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### MilCandy the Easiest Grove Controller — `GroveMilCandyTheEasiestGroveController`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMilCandyTheEasiestGroveController.circuit.tsx](boards/GroveMilCandyTheEasiestGroveController/GroveMilCandyTheEasiestGroveController.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/MilCandy-the-Easiest-Grove-Controller-p-1104.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ATmega328P` · declared MPN `ATmega328P` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Analog Accelerometer ADXL335 — `Grove3AxisAnalogAccelerometerADXL335`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisAnalogAccelerometerADXL335.circuit.tsx](boards/Grove3AxisAnalogAccelerometerADXL335/Grove3AxisAnalogAccelerometerADXL335.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-ADXL335.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL335` · declared MPN `ADXL335` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Expansion NET Gadgeteer Compatible — `GroveExpansionNETGadgeteerCompatible`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveExpansionNETGadgeteerCompatible.circuit.tsx](boards/GroveExpansionNETGadgeteerCompatible/GroveExpansionNETGadgeteerCompatible.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Expansion-NET-Gadgeteer-Compatible-p-1084.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `Grove-Expansion` · declared MPN `Grove-Expansion` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Air quality sensor — `GroveAirQualitySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAirQualitySensor.circuit.tsx](boards/GroveAirQualitySensor/GroveAirQualitySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-quality-sensor-p-1065.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `SX1301` · declared MPN `SX1301` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Dust Sensor PPD42NS — `GroveDustSensorPPD42NS`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDustSensorPPD42NS.circuit.tsx](boards/GroveDustSensorPPD42NS/GroveDustSensorPPD42NS.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Dust-Sensor-PPD42NS.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `PPD42NS` · declared MPN `PPD42NS` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Ultrasonic Distance Sensor — `GroveUltrasonicDistanceSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUltrasonicDistanceSensor.circuit.tsx](boards/GroveUltrasonicDistanceSensor/GroveUltrasonicDistanceSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Ultrasonic-Distance-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `HC-SR04` · declared MPN `HC-SR04` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Luminance Sensor — `GroveLuminanceSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLuminanceSensor.circuit.tsx](boards/GroveLuminanceSensor/GroveLuminanceSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Luminance-Sensor.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `APDS-9002` · declared MPN `APDS-9002` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Blueseeed HM11 — `GroveBlueseeedHM11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBlueseeedHM11.circuit.tsx](boards/GroveBlueseeedHM11/GroveBlueseeedHM11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Blueseeed-HM11.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · utility · primary model `HM-11` · declared MPN `HM-11` · 5V

**Artifact counts:** 22 source components · 64 source traces · 0 PCB traces · 22 schematic traces · 0 placeholder MPNs · 52 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 64 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 52 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temperature Humidity Sensor High Accuracy Mini — `GroveTemperatureHumiditySensorHighAccuracyMini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorHighAccuracyMini.circuit.tsx](boards/GroveTemperatureHumiditySensorHighAccuracyMini/GroveTemperatureHumiditySensorHighAccuracyMini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-High-Accuracy-Mini.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `DHT11` · declared MPN `DHT11` · 5V

**Artifact counts:** 15 source components · 52 source traces · 0 PCB traces · 21 schematic traces · 0 placeholder MPNs · 43 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 52 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 43 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (0 power-pin warning(s), 2 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Accelerometer 400g — `Grove3AxisDigitalAccelerometer400g`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer400g.circuit.tsx](boards/Grove3AxisDigitalAccelerometer400g/Grove3AxisDigitalAccelerometer400g.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-400g.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `H3LIS331DL` · declared MPN `H3LIS331DL` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove GPS Module — `GroveGPSModule`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGPSModule.circuit.tsx](boards/GroveGPSModule/GroveGPSModule.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-GPS-Module.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `NEO-6M` · declared MPN `NEO-6M` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Oxygen Sensor ME2 O2 f20 — `GroveOxygenSensorME2O2F20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOxygenSensorME2O2F20.circuit.tsx](boards/GroveOxygenSensorME2O2F20/GroveOxygenSensorME2O2F20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-ME2-O2-f20.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ME2-O2` · declared MPN `ME2-O2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Human Presence Sensor AK9753 — `GroveHumanPresenceSensorAK9753`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHumanPresenceSensorAK9753.circuit.tsx](boards/GroveHumanPresenceSensorAK9753/GroveHumanPresenceSensorAK9753.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Human-Presence-Sensor-AK9753.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · sensor · primary model `AK9753` · declared MPN `AK9753` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RS232 — `GroveRS232`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRS232.circuit.tsx](boards/GroveRS232/GroveRS232.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RS232.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `MAX3232` · declared MPN `MAX3232` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Light Color Proximity Sensor TMG39931 — `GroveLightColorProximitySensorTMG39931`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLightColorProximitySensorTMG39931.circuit.tsx](boards/GroveLightColorProximitySensorTMG39931/GroveLightColorProximitySensorTMG39931.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Light-Color-Proximity-Sensor-TMG39931-p-2879.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `TMG39931` · declared MPN `TMG39931` · 5V

**Artifact counts:** 9 source components · 30 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 30 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 13 disconnected-port errors, 15 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Triple Color E Ink Display 2 13 — `GroveTripleColorEInkDisplay213`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTripleColorEInkDisplay213.circuit.tsx](boards/GroveTripleColorEInkDisplay213/GroveTripleColorEInkDisplay213.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-2-13-p-2889.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `IL0373` · declared MPN `IL0373` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Triple Color E Ink Display 1 54 — `GroveTripleColorEInkDisplay154`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTripleColorEInkDisplay154.circuit.tsx](boards/GroveTripleColorEInkDisplay154/GroveTripleColorEInkDisplay154.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Triple-Color-E-Ink-Display-1-54-p-2890.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `IL0373` · declared MPN `IL0373` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RS485 — `GroveRS485`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRS485.circuit.tsx](boards/GroveRS485/GroveRS485.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RS485-p-2924.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** uart · communications · primary model `SN75176` · declared MPN `SN75176` · 5V

**Artifact counts:** 5 source components · 24 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Accelerometer 200g ADXL372 — `Grove3AxisDigitalAccelerometer200gADXL372`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer200gADXL372.circuit.tsx](boards/Grove3AxisDigitalAccelerometer200gADXL372/Grove3AxisDigitalAccelerometer200gADXL372.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-200g-ADXL372-p-4003.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL372` · declared MPN `ADXL372` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Analog Accelerometer 20g ADXL356B — `Grove3AxisAnalogAccelerometer20gADXL356B`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisAnalogAccelerometer20gADXL356B.circuit.tsx](boards/Grove3AxisAnalogAccelerometer20gADXL356B/Grove3AxisAnalogAccelerometer20gADXL356B.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-20g-ADXL356B-p-4004.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL356B` · declared MPN `ADXL356B` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Digital Accelerometer 40g ADXL357 — `Grove3AxisDigitalAccelerometer40gADXL357`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisDigitalAccelerometer40gADXL357.circuit.tsx](boards/Grove3AxisDigitalAccelerometer40gADXL357/Grove3AxisDigitalAccelerometer40gADXL357.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Digital-Accelerometer-40g-ADXL357-p-4005.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL357` · declared MPN `ADXL357` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 3 Axis Analog Accelerometer 40g ADXL356C — `Grove3AxisAnalogAccelerometer40gADXL356C`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove3AxisAnalogAccelerometer40gADXL356C.circuit.tsx](boards/Grove3AxisAnalogAccelerometer40gADXL356C/Grove3AxisAnalogAccelerometer40gADXL356C.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-3-Axis-Analog-Accelerometer-40g-ADXL356C-p-4006.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL356C` · declared MPN `ADXL356C` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove W600 — `GroveW600`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveW600.circuit.tsx](boards/GroveW600/GroveW600.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-W600-p-4019.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `W600` · declared MPN `W600` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 0 54 Red Dual Alphanumeric Display — `Grove054RedDualAlphanumericDisplay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove054RedDualAlphanumericDisplay.circuit.tsx](boards/Grove054RedDualAlphanumericDisplay/Grove054RedDualAlphanumericDisplay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-0-54-Red-Dual-Alphanumeric-Display-p-4031.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 9 source components · 60 source traces · 0 PCB traces · 8 schematic traces · 1 placeholder MPNs · 44 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 60 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 0 54 Red Quad Alphanumeric Display — `Grove054RedQuadAlphanumericDisplay`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove054RedQuadAlphanumericDisplay.circuit.tsx](boards/Grove054RedQuadAlphanumericDisplay/Grove054RedQuadAlphanumericDisplay.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-0-54-Red-Quad-Alphanumeric-Display-p-4032.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · display · primary model `TM1637` · declared MPN `TM1637` · 5V

**Artifact counts:** 9 source components · 60 source traces · 0 PCB traces · 8 schematic traces · 1 placeholder MPNs · 44 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 60 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 44 trace(s) lack a `name`, reducing review/debug traceability.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 1 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Breadboard — `GroveBreadboard`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveBreadboard.circuit.tsx](boards/GroveBreadboard/GroveBreadboard.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Breadboard-p-4034.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `Grove-Prototyping` · declared MPN `Grove-Prototyping` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Single Axis Analog Accelerometer 100g ADXL1001 — `GroveSingleAxisAnalogAccelerometer100gADXL1001`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSingleAxisAnalogAccelerometer100gADXL1001.circuit.tsx](boards/GroveSingleAxisAnalogAccelerometer100gADXL1001/GroveSingleAxisAnalogAccelerometer100gADXL1001.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Single-Axis-Analog-Accelerometer-100g-ADXL1001-p-4035.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADXL1001` · declared MPN `ADXL1001` · 5V

**Artifact counts:** 7 source components · 24 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 14 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 24 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 10 disconnected-port errors, 10 missing-PCB-trace errors.
- P2 — 14 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 6 Axis Digital Accelerometer Gyroscope 40g ADIS16470 — `Grove6AxisDigitalAccelerometerGyroscope40gADIS16470`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove6AxisDigitalAccelerometerGyroscope40gADIS16470.circuit.tsx](boards/Grove6AxisDigitalAccelerometerGyroscope40gADIS16470/Grove6AxisDigitalAccelerometerGyroscope40gADIS16470.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-6-Axis-Digital-Accelerometer-Gyroscope-40g-ADIS16470-p-4036.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ADIS16470` · declared MPN `ADIS16470` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### MT3620 Grove Breakout — `GroveMT3620GroveBreakout`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMT3620GroveBreakout.circuit.tsx](boards/GroveMT3620GroveBreakout/GroveMT3620GroveBreakout.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/MT3620-Grove-Breakout-p-4043.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `MT3620` · declared MPN `MT3620` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### 38mm 8 8 square matrix LED matched with Grove Green Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveGreenCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Green-Common-Anode-p-4050.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### 38mm 8 8 square matrix LED matched with Grove Red Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveRedCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Red-Common-Anode-p-4051.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### 38mm 8 8 square matrix LED matched with Grove Blue Common Anode — `Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode.circuit.tsx](boards/Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode/Grovemm88SquareMatrixLEDMatchedWithGroveBlueCommonAnode.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/38mm-8-8-square-matrix-LED-matched-with-Grove-Blue-Common-Anode-p-4052.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 12 bit Magnetic Rotary Position Sensor AS5600 — `Grove12BitMagneticRotaryPositionSensorAS5600`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove12BitMagneticRotaryPositionSensorAS5600.circuit.tsx](boards/Grove12BitMagneticRotaryPositionSensorAS5600/Grove12BitMagneticRotaryPositionSensorAS5600.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-12-bit-Magnetic-Rotary-Position-Sensor-AS5600-p-4192.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · input · primary model `AS5600` · declared MPN `AS5600` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 13 disconnected-port errors, 13 missing-PCB-trace errors.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RGB LED Ring 16 WS2813 Mini — `GroveRGBLEDRing16WS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDRing16WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing16WS2813Mini/GroveRGBLEDRing16WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Ring-16-WS2813-Mini-p-4201.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 33 source components · 80 source traces · 0 PCB traces · 30 schematic traces · 0 placeholder MPNs · 32 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 80 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 32 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 16 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RGB LED Ring 24 WS2813 Mini — `GroveRGBLEDRing24WS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDRing24WS2813Mini.circuit.tsx](boards/GroveRGBLEDRing24WS2813Mini/GroveRGBLEDRing24WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Ring-24-WS2813-Mini-p-4202.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 49 source components · 120 source traces · 0 PCB traces · 46 schematic traces · 0 placeholder MPNs · 48 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 120 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 48 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 24 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Ultimate RGB LED Ring — `GroveUltimateRGBLEDRing`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveUltimateRGBLEDRing.circuit.tsx](boards/GroveUltimateRGBLEDRing/GroveUltimateRGBLEDRing.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Ultimate-RGB-LED-Ring-p-4203.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `MY9221` · declared MPN `MY9221` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RGB LED WS2813 Mini — `GroveRGBLEDWS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDWS2813Mini.circuit.tsx](boards/GroveRGBLEDWS2813Mini/GroveRGBLEDWS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-WS2813-Mini-p-4269.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RGB LED Stick 15 WS2813 Mini — `GroveRGBLEDStick15WS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDStick15WS2813Mini.circuit.tsx](boards/GroveRGBLEDStick15WS2813Mini/GroveRGBLEDStick15WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Stick-15-WS2813-Mini-p-4270.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 31 source components · 75 source traces · 0 PCB traces · 28 schematic traces · 0 placeholder MPNs · 30 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 75 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 30 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 15 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove RGB LED Stick 20 WS2813 Mini — `GroveRGBLEDStick20WS2813Mini`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveRGBLEDStick20WS2813Mini.circuit.tsx](boards/GroveRGBLEDStick20WS2813Mini/GroveRGBLEDStick20WS2813Mini.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-RGB-LED-Stick-20-WS2813-Mini-p-4271.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · actuator · primary model `WS2813` · declared MPN `WS2813` · 5V

**Artifact counts:** 41 source components · 100 source traces · 0 PCB traces · 38 schematic traces · 0 placeholder MPNs · 40 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 100 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 40 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 20 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove MP3 V3 — `GroveMP3V3`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMP3V3.circuit.tsx](boards/GroveMP3V3/GroveMP3V3.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-MP3-V3-p-4297.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · utility · primary model `WT5001-48L` · declared MPN `WT5001-48L` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera IR Array MLX90640 110 degree — `GroveThermalImagingCameraIRArrayMLX90640110Degree`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraIRArrayMLX90640110Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90640110Degree/GroveThermalImagingCameraIRArrayMLX90640110Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-110-degree-p-4334.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera IR Array MLX90640 55 degree — `GroveThermalImagingCameraIRArrayMLX9064055Degree`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraIRArrayMLX9064055Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX9064055Degree/GroveThermalImagingCameraIRArrayMLX9064055Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90640-55-degree-p-4335.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Arch Mix Grove Breakout — `GroveArchMixGroveBreakout`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveArchMixGroveBreakout.circuit.tsx](boards/GroveArchMixGroveBreakout/GroveArchMixGroveBreakout.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Arch-Mix-Grove-Breakout-p-4362.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ESP32` · declared MPN `ESP32` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Capacitive Fingerprint Scanner — `GroveCapacitiveFingerprintScanner`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveCapacitiveFingerprintScanner.circuit.tsx](boards/GroveCapacitiveFingerprintScanner/GroveCapacitiveFingerprintScanner.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Capacitive-Fingerprint-Scanner-p-4363.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `AS608` · declared MPN `AS608` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove High Precision Barometer Sensor DPS310 — `GroveHighPrecisionBarometerSensorDPS310`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveHighPrecisionBarometerSensorDPS310.circuit.tsx](boards/GroveHighPrecisionBarometerSensorDPS310/GroveHighPrecisionBarometerSensorDPS310.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-High-Precision-Barometer-Sensor-DPS310-p-4397.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `DPS310` · declared MPN `DPS310` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 11 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove 8 Channel I2C Hub TCA9548A — `Grove8ChannelI2CHubTCA9548A`

**Disposition:** NOT PRODUCTION READY  
**Source:** [Grove8ChannelI2CHubTCA9548A.circuit.tsx](boards/Grove8ChannelI2CHubTCA9548A/Grove8ChannelI2CHubTCA9548A.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-8-Channel-I2C-Hub-TCA9548A-p-4398.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** i2c · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 4 source components · 20 source traces · 12 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Turbidity Sensor — `GroveTurbiditySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTurbiditySensor.circuit.tsx](boards/GroveTurbiditySensor/GroveTurbiditySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Turbidity-Sensor-p-4399.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `SEN0189` · declared MPN `SEN0189` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Water Level Sensor 10CM — `GroveWaterLevelSensor10CM`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWaterLevelSensor10CM.circuit.tsx](boards/GroveWaterLevelSensor10CM/GroveWaterLevelSensor10CM.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Water-Level-Sensor-10CM-p-4443.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `LM393` · declared MPN `LM393` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove AHT20 I2C Industrial grade temperature and humidity sensor — `GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor.circuit.tsx](boards/GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor/GroveAHT20I2CIndustrialGradeTemperatureAndHumiditySensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-AHT20-I2C-Industrial-grade-temperature-and-humidity-sensor-p-4497.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `AHT20` · declared MPN `AHT20` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Digital PIR Motion Sensor — `GroveDigitalPIRMotionSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDigitalPIRMotionSensor.circuit.tsx](boards/GroveDigitalPIRMotionSensor/GroveDigitalPIRMotionSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Digital-PIR-Motion-Sensor-p-4524.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** analog · sensor · primary model `BISS0001` · declared MPN `BISS0001` · 5V

**Artifact counts:** 35 source components · 108 source traces · 0 PCB traces · 34 schematic traces · 0 placeholder MPNs · 86 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P1 — 108 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — `routingDisabled={true}` is present; this board has no automated copper completion and needs an explicit routed layout review.
- P2 — 86 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 2 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (1 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Qwiic Hub — `GroveQwiicHub`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveQwiicHub.circuit.tsx](boards/GroveQwiicHub/GroveQwiicHub.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Qwiic-Hub-p-4531.html)  
**Implementation class:** board-local Eagle geometry materialization  
**Catalogue declaration:** digital · utility · primary model `TCA9548A` · declared MPN `TCA9548A` · 5V

**Artifact counts:** 4 source components · 20 source traces · 12 PCB traces · 10 schematic traces · 0 placeholder MPNs · 16 unnamed-trace warnings

**Findings:**

- P1 — Pad/net geometry was materialized locally from an Eagle source set; confirm the exact Seeed revision, BOM alternates, assembly polarity, and board outline against the upstream design before release.
- P2 — 16 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 3 reference-designator convention warning(s) require cleanup before release.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Multichannel Gas Sensor v2 — `GroveMultichannelGasSensorV2`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveMultichannelGasSensorV2.circuit.tsx](boards/GroveMultichannelGasSensorV2/GroveMultichannelGasSensorV2.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Multichannel-Gas-Sensor-v2-p-4569.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MiCS-6814` · declared MPN `MiCS-6814` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Doppler Radar BGT24LTR11 — `GroveDopplerRadarBGT24LTR11`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveDopplerRadarBGT24LTR11.circuit.tsx](boards/GroveDopplerRadarBGT24LTR11/GroveDopplerRadarBGT24LTR11.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Doppler-Radar-BGT24LTR11-p-4572.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `BGT24LTR11` · declared MPN `BGT24LTR11` · 5V

**Artifact counts:** 6 source components · 16 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 7 disconnected-port errors, 9 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.
- P2 — 1 reference-designator convention warning(s) require cleanup before release.
- P1 — Power/ground metadata is incomplete (2 power-pin warning(s), 0 ground-pin warning(s)); confirm rail constraints and return-current paths.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove ADS1115 16 bit ADC — `GroveADS111516BitADC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveADS111516BitADC.circuit.tsx](boards/GroveADS111516BitADC/GroveADS111516BitADC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-ADS1115-16-bit-ADC-p-4599.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · utility · primary model `ADS1115` · declared MPN `ADS1115` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera IR Array MLX90641 110 degree — `GroveThermalImagingCameraIRArrayMLX90641110Degree`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraIRArrayMLX90641110Degree.circuit.tsx](boards/GroveThermalImagingCameraIRArrayMLX90641110Degree/GroveThermalImagingCameraIRArrayMLX90641110Degree.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-IR-Array-MLX90641-110-degree-p-4612.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera MLX90614 DCI IR Array with 5 FOV — `GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV/GroveThermalImagingCameraMLX90614DCIIRArrayWith5FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCI-IR-Array-with-5-FOV-p-4654.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera MLX90621 BAA 16x4 IR Array with 25 FOV — `GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV/GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAA-16x4-IR-Array-with-25-FOV-p-4655.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9062x` · declared MPN `MLX9062x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera MLX90614 DCC IR Array with 35 FOV — `GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV/GroveThermalImagingCameraMLX90614DCCIRArrayWith35FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90614-DCC-IR-Array-with-35-FOV-p-4657.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX90614` · declared MPN `MLX90614` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Oxygen Sensor MIX8410 — `GroveOxygenSensorMIX8410`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOxygenSensorMIX8410.circuit.tsx](boards/GroveOxygenSensorMIX8410/GroveOxygenSensorMIX8410.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-MIX8410-p-4697.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `MIX8410` · declared MPN `MIX8410` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove LoRa E5 STM32WLE5JC — `GroveLoRaE5STM32WLE5JC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveLoRaE5STM32WLE5JC.circuit.tsx](boards/GroveLoRaE5STM32WLE5JC/GroveLoRaE5STM32WLE5JC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-LoRa-E5-STM32WLE5JC-p-4867.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** uart · communications · primary model `STM32WLE5JC` · declared MPN `STM32WLE5JC` · 5V

**Artifact counts:** 5 source components · 16 source traces · 0 PCB traces · 7 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 16 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 6 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Oxygen Sensor Pro Pre calibration — `GroveOxygenSensorProPreCalibration`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOxygenSensorProPreCalibration.circuit.tsx](boards/GroveOxygenSensorProPreCalibration/GroveOxygenSensorProPreCalibration.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Oxygen-Sensor-Pro-Pre-calibration-p-4896.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `GGC2330-O2` · declared MPN `GGC2330-O2` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temperature Humidity Sensor V2 0 DHT20 — `GroveTemperatureHumiditySensorV20DHT20`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTemperatureHumiditySensorV20DHT20.circuit.tsx](boards/GroveTemperatureHumiditySensorV20DHT20/GroveTemperatureHumiditySensorV20DHT20.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-V2-0-DHT20-p-4967.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `DHT20` · declared MPN `DHT20` · 5V

**Artifact counts:** 5 source components · 14 source traces · 0 PCB traces · 4 schematic traces · 0 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 14 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 4 disconnected-port errors, 4 missing-PCB-trace errors.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Yellow Blue Display 0 96 SSD1315 V1 0 — `GroveOLEDYellowBlueDisplay096SSD1315V10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDYellowBlueDisplay096SSD1315V10.circuit.tsx](boards/GroveOLEDYellowBlueDisplay096SSD1315V10/GroveOLEDYellowBlueDisplay096SSD1315V10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Yellow-Blue-Display-0-96-SSD1315-V1-0-p-5010.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1315` · declared MPN `SSD1315` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Display 1 12 SH1107 V3 0 — `GroveOLEDDisplay112SH1107V30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay112SH1107V30.circuit.tsx](boards/GroveOLEDDisplay112SH1107V30/GroveOLEDDisplay112SH1107V30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-1-12-SH1107-V3-0-p-5011.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SH1107` · declared MPN `SH1107` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove OLED Display 0 66 SSD1306 v1 0 — `GroveOLEDDisplay066SSD1306V10`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveOLEDDisplay066SSD1306V10.circuit.tsx](boards/GroveOLEDDisplay066SSD1306V10/GroveOLEDDisplay066SSD1306V10.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-OLED-Display-0-66-SSD1306-v1-0-p-5096.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · display · primary model `SSD1306` · declared MPN `SSD1306` · 5V

**Artifact counts:** 6 source components · 19 source traces · 0 PCB traces · 6 schematic traces · 1 placeholder MPNs · 10 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 19 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 6 disconnected-port errors, 9 missing-PCB-trace errors.
- P1 — 1 source component MPN(s) are placeholder/unspecified values; replace them with orderable manufacturer numbers and verify alternates.
- P2 — 10 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Formaldehyde Sensor SFA30 — `GroveFormaldehydeSensorSFA30`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveFormaldehydeSensorSFA30.circuit.tsx](boards/GroveFormaldehydeSensorSFA30/GroveFormaldehydeSensorSFA30.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Formaldehyde-Sensor-SFA30-p-5204.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SFA30` · declared MPN `SFA30` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera MLX90641 BCB 16x12 IR Array with 55 FOV — `GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV/GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90641-BCB-16x12-IR-Array-with-55-FOV-p-5265.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9064x` · declared MPN `MLX9064x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Thermal Imaging Camera MLX90621 BAB 16x4 IR Array with 60 FOV — `GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV.circuit.tsx](boards/GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV/GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Thermal-Imaging-Camera-MLX90621-BAB-16x4-IR-Array-with-60-FOV-p-5266.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `MLX9062x` · declared MPN `MLX9062x` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove All in one Environmental Sensor SEN55 — `GroveAllInOneEnvironmentalSensorSEN55`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAllInOneEnvironmentalSensorSEN55.circuit.tsx](boards/GroveAllInOneEnvironmentalSensorSEN55/GroveAllInOneEnvironmentalSensorSEN55.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN55-p-5373.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove All in one Environmental Sensor SEN54 — `GroveAllInOneEnvironmentalSensorSEN54`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAllInOneEnvironmentalSensorSEN54.circuit.tsx](boards/GroveAllInOneEnvironmentalSensorSEN54/GroveAllInOneEnvironmentalSensorSEN54.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-All-in-one-Environmental-Sensor-SEN54-p-5374.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SEN55` · declared MPN `SEN55` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temp Humi Sensor SHT41 — `GroveTempHumiSensorSHT41`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTempHumiSensorSHT41.circuit.tsx](boards/GroveTempHumiSensorSHT41/GroveTempHumiSensorSHT41.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT41-p-5383.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SHT4x` · declared MPN `SHT4x` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Temp Humi Sensor SHT40 — `GroveTempHumiSensorSHT40`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveTempHumiSensorSHT40.circuit.tsx](boards/GroveTempHumiSensorSHT40/GroveTempHumiSensorSHT40.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT40-p-5384.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SHT4x` · declared MPN `SHT4x` · 5V

**Artifact counts:** 8 source components · 29 source traces · 0 PCB traces · 12 schematic traces · 0 placeholder MPNs · 18 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 29 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 18 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Gas Sensor BME688 — `GroveGasSensorBME688`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveGasSensorBME688.circuit.tsx](boards/GroveGasSensorBME688/GroveGasSensorBME688.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Gas-Sensor-BME688-p-5478.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `BME688` · declared MPN `BME688` · 5V

**Artifact counts:** 8 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove AC Voltage sensor — `GroveACVoltageSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveACVoltageSensor.circuit.tsx](boards/GroveACVoltageSensor/GroveACVoltageSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-AC-Voltage-sensor-p-5540.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `ZMPT101B` · declared MPN `ZMPT101B` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Wizfi360 — `GroveWizfi360`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveWizfi360.circuit.tsx](boards/GroveWizfi360/GroveWizfi360.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Wizfi360-p-5541.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** digital · utility · primary model `ESP8285` · declared MPN `ESP8285` · 5V

**Artifact counts:** 4 source components · 12 source traces · 0 PCB traces · 3 schematic traces · 0 placeholder MPNs · 7 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 12 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 5 disconnected-port errors, 5 missing-PCB-trace errors.
- P2 — 7 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Air Quality Sensor SGP41 — `GroveAirQualitySensorSGP41`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAirQualitySensorSGP41.circuit.tsx](boards/GroveAirQualitySensorSGP41/GroveAirQualitySensorSGP41.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP41-p-5687.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SGP41` · declared MPN `SGP41` · 5V

**Artifact counts:** 7 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove NFC ST25DV64KC — `GroveNFCST25DV64KC`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveNFCST25DV64KC.circuit.tsx](boards/GroveNFCST25DV64KC/GroveNFCST25DV64KC.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-NFC-ST25DV64KC-p-5688.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · communications · primary model `ST25DV64` · declared MPN `ST25DV64` · 5V

**Artifact counts:** 7 source components · 26 source traces · 0 PCB traces · 9 schematic traces · 0 placeholder MPNs · 15 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 26 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 15 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Air Quality Sensor SGP40 — `GroveAirQualitySensorSGP40`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveAirQualitySensorSGP40.circuit.tsx](boards/GroveAirQualitySensorSGP40/GroveAirQualitySensorSGP40.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Air-Quality-Sensor-SGP40-p-5700.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** i2c · sensor · primary model `SGP40` · declared MPN `SGP40` · 5V

**Artifact counts:** 7 source components · 28 source traces · 0 PCB traces · 10 schematic traces · 0 placeholder MPNs · 17 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 28 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 2 autorouting errors, 11 disconnected-port errors, 11 missing-PCB-trace errors.
- P2 — 17 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.

### Grove Smart IR Gesture Sensor — `GroveSmartIRGestureSensor`

**Disposition:** NOT PRODUCTION READY  
**Source:** [GroveSmartIRGestureSensor.circuit.tsx](boards/GroveSmartIRGestureSensor/GroveSmartIRGestureSensor.circuit.tsx) · [upstream reference](https://www.seeedstudio.com/Grove-Smart-IR-Gesture-Sensor-p-5721.html)  
**Implementation class:** board-local engineering draft  
**Catalogue declaration:** analog · sensor · primary model `PAJ7620` · declared MPN `PAJ7620` · 5V

**Artifact counts:** 6 source components · 17 source traces · 0 PCB traces · 5 schematic traces · 0 placeholder MPNs · 9 unnamed-trace warnings

**Findings:**

- P1 — This is an explicit board-local engineering draft, but its primary part, support circuit, footprint, and mechanical envelope still require source-specific review before release.
- P1 — 17 source traces are declared but the build produced 0 PCB traces; routing, clearances, and DRC must be resolved.
- P1 — Build diagnostics: 1 autorouting errors, 8 disconnected-port errors, 8 missing-PCB-trace errors.
- P2 — 9 trace(s) lack a `name`, reducing review/debug traceability.

**Release evidence still required:** exact BOM and approved alternates; datasheet pin/power verification; supplier-backed footprints and courtyard/polarity checks; board outline, mounting, connector orientation, and keepouts; completed copper routing with ERC/DRC; and functional bring-up against the intended Grove pin contract.
