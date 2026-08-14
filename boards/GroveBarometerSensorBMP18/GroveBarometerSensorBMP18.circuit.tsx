import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveBarometerSensorBMP18 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveBarometerSensorBMP18",
      title: "Grove Barometer Sensor BMP18",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Barometer-Sensor-BMP18-p-1840.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "Grove BarometerSensorBMP18 controller",
      manufacturerPartNumber: "GROVE-GROVEBAROMETERSENSORBMP18",
      powerVoltage: "5V",
    }}
  />
)

export default GroveBarometerSensorBMP18
