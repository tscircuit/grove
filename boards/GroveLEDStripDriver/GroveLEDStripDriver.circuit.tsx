import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLEDStripDriver = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLEDStripDriver",
      title: "Grove - LED Strip Driver",
      category: "LED",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove LEDStripDriver controller",
      manufacturerPartNumber: "GROVE-GROVELEDSTRIPDRIVER",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLEDStripDriver
