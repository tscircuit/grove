import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLCDRGBBacklight = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLCDRGBBacklight",
      title: "Grove - LCD RGB Backlight",
      category: "Display",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "display",
      primaryModel: "Grove LCDRGBBacklight controller",
      manufacturerPartNumber: "GROVE-GROVELCDRGBBACKLIGHT",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLCDRGBBacklight
