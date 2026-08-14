import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CMotorDriverV13 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CMotorDriverV13",
      title: "Grove - I2C Motor Driver V1.3",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "actuator",
      primaryModel: "L298N",
      manufacturerPartNumber: "L298N",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CMotorDriverV13
