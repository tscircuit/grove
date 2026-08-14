import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveHighTemperatureSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveHighTemperatureSensor",
      title: "Grove - High Temperature Sensor",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove HighTemperatureSensor controller",
      manufacturerPartNumber: "GROVE-GROVEHIGHTEMPERATURESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHighTemperatureSensor
