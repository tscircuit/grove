import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveMiniFan = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveMiniFan",
      title: "Grove - Mini Fan",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove MiniFan controller",
      manufacturerPartNumber: "GROVE-GROVEMINIFAN",
      powerVoltage: "5V",
    }}
  />
)

export default GroveMiniFan
