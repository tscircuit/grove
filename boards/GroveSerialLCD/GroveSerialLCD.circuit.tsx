import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSerialLCD = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSerialLCD",
      title: "Grove Serial LCD",
      category: "Display",
      sourceUrl: "https://www.seeedstudio.com/Grove-Serial-LCD-p-773.html",
      interfaceKind: "i2c",
      detailKind: "display",
      primaryModel: "ST7066U",
      manufacturerPartNumber: "ST7066U",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSerialLCD
