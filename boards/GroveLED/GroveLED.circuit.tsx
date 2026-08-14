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
      primaryModel: "MY9221",
      manufacturerPartNumber: "MY9221",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLED
