import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensorDHT20 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensorDHT20",
      title: "Grove - Temperature&Humidity Sensor(DHT20)",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "DHT20",
      manufacturerPartNumber: "DHT20",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensorDHT20
