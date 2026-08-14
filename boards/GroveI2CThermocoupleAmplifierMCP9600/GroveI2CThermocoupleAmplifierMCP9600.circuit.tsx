import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CThermocoupleAmplifierMCP9600 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CThermocoupleAmplifierMCP9600",
      title: "Grove - I2C Thermocouple Amplifier (MCP9600)",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "MCP9600",
      manufacturerPartNumber: "MCP9600",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CThermocoupleAmplifierMCP9600
