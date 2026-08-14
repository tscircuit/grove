import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLEDButton = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLEDButton",
      title: "Grove-LED Button",
      category: "Switch & Button",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove LEDButton controller",
      manufacturerPartNumber: "GROVE-GROVELEDBUTTON",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLEDButton
