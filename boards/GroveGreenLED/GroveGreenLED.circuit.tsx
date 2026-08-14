import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGreenLED = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGreenLED",
      title: "Grove Green LED",
      category: "Light & LED",
      sourceUrl: "https://www.seeedstudio.com/Grove-Green-LED.html",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "MY9221",
      manufacturerPartNumber: "MY9221",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGreenLED
