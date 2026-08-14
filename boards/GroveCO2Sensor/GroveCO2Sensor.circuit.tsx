import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveCO2Sensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveCO2Sensor",
      title: "Grove - CO2 Sensor",
      category: "Gas",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "MH-Z16",
      manufacturerPartNumber: "MH-Z16",
      powerVoltage: "5V",
    }}
  />
)

export default GroveCO2Sensor
