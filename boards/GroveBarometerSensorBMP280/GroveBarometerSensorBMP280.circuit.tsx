import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveBarometerSensorBMP280 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveBarometerSensorBMP280",
      title: "Grove - Barometer Sensor (BMP280)",
      category: "Barometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "BMP280",
      manufacturerPartNumber: "BMP280",
      powerVoltage: "5V",
    }}
  />
)

export default GroveBarometerSensorBMP280
