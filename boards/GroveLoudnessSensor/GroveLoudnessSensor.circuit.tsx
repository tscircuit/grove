import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLoudnessSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLoudnessSensor",
      title: "Grove - Loudness Sensor",
      category: "Sound",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove LoudnessSensor controller",
      manufacturerPartNumber: "GROVE-GROVELOUDNESSSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLoudnessSensor
