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
      primaryModel: "MY9221",
      manufacturerPartNumber: "MY9221",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLEDStripDriver
