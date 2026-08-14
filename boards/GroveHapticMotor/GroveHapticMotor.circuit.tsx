import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveHapticMotor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveHapticMotor",
      title: "Grove Haptic Motor",
      category: "Actuator",
      sourceUrl: "https://www.seeedstudio.com/Grove-Haptic-Motor-p-2546.html",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "DRV2605",
      manufacturerPartNumber: "DRV2605",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHapticMotor
