# Grove - LCD RGB Backlight v5.0

Review-oriented functional recreation of the current 16×2 RGB-backlit Grove LCD. It separates the LCD controller path (I²C address 0x3E) from the V5 SGM31323 RGB driver path (I²C address 0x30).

## Source fidelity

- Target: current v5.0 product, Seeed Studio SKU 104030001.
- Sources: [official product wiki](https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/) and [official compatible library](https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight).
- Seeed publishes V5 behavior, voltage compatibility, driver change from PCA9632 to SGM31323, and address change from 0x62 to 0x30, but no V5 editable schematic/PCB archive. This model captures the documented functional partition and display mechanics; controller pin mapping, placement, board dimensions, and routing are representative and must not be treated as manufacturing CAD.
- License: the referenced Seeed software library is MIT-licensed; the product wiki does not state a license for the V5 hardware design.
