import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLEDBar = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLEDBar",
      title: "Grove LED Bar",
      category: "Light & LED",
      sourceUrl: "https://www.seeedstudio.com/Grove-LED-Bar.html",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove LEDBar controller",
      manufacturerPartNumber: "GROVE-GROVELEDBAR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLEDBar
