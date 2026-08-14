import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveEarClipHeartRateSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveEarClipHeartRateSensor",
      title: "Grove - Ear-clip Heart Rate Sensor",
      category: "Biometric",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "MAX30100",
      manufacturerPartNumber: "MAX30100",
      powerVoltage: "5V",
    }}
  />
)

export default GroveEarClipHeartRateSensor
