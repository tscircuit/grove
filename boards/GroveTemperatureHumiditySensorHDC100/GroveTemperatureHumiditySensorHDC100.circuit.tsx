import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensorHDC100 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensorHDC100",
      title: "Grove Temperature Humidity Sensor HDC100",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Temperature-Humidity-Sensor-HDC100-p-2535.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "DHT11",
      manufacturerPartNumber: "DHT11",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensorHDC100
