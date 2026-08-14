import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CHighAccuracyTemperatureSensorMCP9808 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CHighAccuracyTemperatureSensorMCP9808",
      title: "Grove - I2C High Accuracy Temperature Sensor(MCP9808)",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "MCP9808",
      manufacturerPartNumber: "MCP9808",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CHighAccuracyTemperatureSensorMCP9808
