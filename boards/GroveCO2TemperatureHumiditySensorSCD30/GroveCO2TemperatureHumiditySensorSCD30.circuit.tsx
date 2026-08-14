import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveCO2TemperatureHumiditySensorSCD30 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveCO2TemperatureHumiditySensorSCD30",
      title: "Grove - CO2 & Temperature & Humidity Sensor (SCD30)",
      category: "Multiple in one",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SCD30",
      manufacturerPartNumber: "SCD30",
      powerVoltage: "5V",
    }}
  />
)

export default GroveCO2TemperatureHumiditySensorSCD30
