import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove4DigitDisplay = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove4DigitDisplay",
      title: "Grove - 4-Digit Display",
      category: "Display",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "display",
      primaryModel: "TM1637",
      manufacturerPartNumber: "TM1637",
      powerVoltage: "5V",
    }}
  />
)

export default Grove4DigitDisplay
