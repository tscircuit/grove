import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensorProDHT22 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensorProDHT22",
      title: "Grove - Temperature&Humidity Sensor Pro(DHT22)",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "DHT22",
      manufacturerPartNumber: "DHT22",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensorProDHT22
