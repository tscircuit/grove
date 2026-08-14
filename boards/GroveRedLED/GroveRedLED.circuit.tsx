import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveRedLED = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveRedLED",
      title: "Grove - Red LED",
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

export default GroveRedLED
