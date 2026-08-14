import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor",
      title: "Grove - AHT20 I2C Industrial Grade Temperature&Humidity Sensor",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "AHT20",
      manufacturerPartNumber: "AHT20",
      powerVoltage: "5V",
    }}
  />
)

export default GroveAHT20I2CIndustrialGradeTemperatureHumiditySensor
