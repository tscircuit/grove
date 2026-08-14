import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveBME280EnvironmentalSensorTemperatureHumidityBarometer = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveBME280EnvironmentalSensorTemperatureHumidityBarometer",
      title: "Grove BME280 Environmental Sensor Temperature Humidity Barometer",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-BME280-Environmental-Sensor-Temperature-Humidity-Barometer.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "BME280",
      manufacturerPartNumber: "BME280",
      powerVoltage: "5V",
    }}
  />
)

export default GroveBME280EnvironmentalSensorTemperatureHumidityBarometer
