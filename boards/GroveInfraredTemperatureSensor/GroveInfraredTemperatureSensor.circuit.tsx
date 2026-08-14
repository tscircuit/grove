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
      primaryModel: "Grove InfraredTemperatureSensor controller",
      manufacturerPartNumber: "GROVE-GROVEINFRAREDTEMPERATURESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveInfraredTemperatureSensor
