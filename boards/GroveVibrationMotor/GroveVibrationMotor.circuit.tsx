import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveVibrationMotor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveVibrationMotor",
      title: "Grove - Vibration Motor",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "DRV2605",
      manufacturerPartNumber: "DRV2605",
      powerVoltage: "5V",
    }}
  />
)

export default GroveVibrationMotor
