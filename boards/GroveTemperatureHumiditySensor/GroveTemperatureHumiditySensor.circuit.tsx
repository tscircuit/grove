import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumiditySensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumiditySensor",
      title: "Grove - Temperature & Humidity Sensor",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove TemperatureHumiditySensor controller",
      manufacturerPartNumber: "GROVE-GROVETEMPERATUREHUMIDITYSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumiditySensor
