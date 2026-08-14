import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensorSHT31 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensorSHT31",
      title: "Grove Temperature Humidity Sensor SHT31",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-SHT31.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SHT31",
      manufacturerPartNumber: "SHT31",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensorSHT31
