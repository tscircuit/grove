import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureSensor",
      title: "Grove-Temperature_Sensor",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "Grove TemperatureSensor controller",
      manufacturerPartNumber: "GROVE-GROVETEMPERATURESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureSensor
