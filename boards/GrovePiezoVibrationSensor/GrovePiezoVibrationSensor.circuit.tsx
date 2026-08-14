import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GrovePiezoVibrationSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GrovePiezoVibrationSensor",
      title: "Grove - Piezo Vibration Sensor",
      category: "Motion",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove PiezoVibrationSensor controller",
      manufacturerPartNumber: "GROVE-GROVEPIEZOVIBRATIONSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GrovePiezoVibrationSensor
