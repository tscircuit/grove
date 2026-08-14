import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensorDHT11 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensorDHT11",
      title: "Grove - Temperature&Humidity Sensor (DHT11)",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "DHT11",
      manufacturerPartNumber: "DHT11",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensorDHT11
