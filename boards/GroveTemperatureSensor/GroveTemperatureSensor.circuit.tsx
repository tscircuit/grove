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
      primaryModel: "LM358",
      manufacturerPartNumber: "LM358",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureSensor
