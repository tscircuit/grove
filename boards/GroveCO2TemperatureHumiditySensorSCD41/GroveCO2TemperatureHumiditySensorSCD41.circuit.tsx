import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveCO2TemperatureHumiditySensorSCD41 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveCO2TemperatureHumiditySensorSCD41",
      title: "Grove - CO2 & Temperature & Humidity Sensor (SCD41)",
      category: "Multiple in one",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SCD41",
      manufacturerPartNumber: "SCD41",
      powerVoltage: "5V",
    }}
  />
)

export default GroveCO2TemperatureHumiditySensorSCD41
