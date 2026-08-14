import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGSRSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGSRSensor",
      title: "Grove - GSR Sensor",
      category: "Biometric",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "LM324",
      manufacturerPartNumber: "LM324",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGSRSensor
