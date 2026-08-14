import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove16x2LCD = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove16x2LCD",
      title: "Grove - 16x2 LCD",
      category: "Display",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "display",
      primaryModel: "HD44780",
      manufacturerPartNumber: "HD44780",
      powerVoltage: "5V",
    }}
  />
)

export default Grove16x2LCD
