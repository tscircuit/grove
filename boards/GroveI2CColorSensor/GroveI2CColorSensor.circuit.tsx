import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CColorSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CColorSensor",
      title: "Grove I2C Color Sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-I2C-Color-Sensor-p-854.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "Grove I2CColorSensor controller",
      manufacturerPartNumber: "GROVE-GROVEI2CCOLORSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CColorSensor
