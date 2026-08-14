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
      primaryModel: "GUVA-S12D",
      manufacturerPartNumber: "GUVA-S12D",
      powerVoltage: "5V",
    }}
  />
)

export default GroveUVSensor
