import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveServo = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveServo",
      title: "Grove - Servo",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "SG90",
      manufacturerPartNumber: "SG90",
      powerVoltage: "5V",
    }}
  />
)

export default GroveServo
