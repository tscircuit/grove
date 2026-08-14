import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveUVSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveUVSensor",
      title: "Grove - UV Sensor",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "Grove UVSensor controller",
      manufacturerPartNumber: "GROVE-GROVEUVSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveUVSensor
