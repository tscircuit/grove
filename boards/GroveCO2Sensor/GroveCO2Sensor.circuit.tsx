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
      primaryModel: "Grove CO2Sensor controller",
      manufacturerPartNumber: "GROVE-GROVECO2SENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveCO2Sensor
