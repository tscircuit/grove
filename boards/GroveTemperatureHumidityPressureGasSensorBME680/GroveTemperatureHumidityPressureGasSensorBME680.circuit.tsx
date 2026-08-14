import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureHumidityPressureGasSensorBME680 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureHumidityPressureGasSensorBME680",
      title: "Grove - Temperature Humidity Pressure Gas Sensor(BME680)",
      category: "Multiple in one",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "BME680",
      manufacturerPartNumber: "BME680",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureHumidityPressureGasSensorBME680
