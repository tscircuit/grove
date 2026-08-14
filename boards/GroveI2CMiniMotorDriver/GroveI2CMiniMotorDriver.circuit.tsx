import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CMiniMotorDriver = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CMiniMotorDriver",
      title: "Grove I2C Mini Motor Driver",
      category: "Actuator",
      sourceUrl: "https://www.seeedstudio.com/Grove-I2C-Mini-Motor-Driver.html",
      interfaceKind: "i2c",
      detailKind: "actuator",
      primaryModel: "L298N",
      manufacturerPartNumber: "L298N",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CMiniMotorDriver
