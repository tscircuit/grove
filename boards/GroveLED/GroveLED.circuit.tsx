import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLED = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLED",
      title: "Grove LED",
      category: "Light & LED",
      sourceUrl: "https://www.seeedstudio.com/Grove-LED-p-767.html",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove LED controller",
      manufacturerPartNumber: "GROVE-GROVELED",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLED
