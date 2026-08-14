import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveInfraredTemperatureSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveInfraredTemperatureSensor",
      title: "Grove - Infrared Temperature Sensor",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "MLX90614",
      manufacturerPartNumber: "MLX90614",
      powerVoltage: "5V",
    }}
  />
)

export default GroveInfraredTemperatureSensor
