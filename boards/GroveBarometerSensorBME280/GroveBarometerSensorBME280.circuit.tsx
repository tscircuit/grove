import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveBarometerSensorBME280 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveBarometerSensorBME280",
      title: "Grove - Barometer Sensor(BME280)",
      category: "Barometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "BME280",
      manufacturerPartNumber: "BME280",
      powerVoltage: "5V",
    }}
  />
)

export default GroveBarometerSensorBME280
