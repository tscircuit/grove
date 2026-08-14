import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CHub6Port = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CHub6Port",
      title: "Grove - I2C Hub(6 Port)",
      category: "Input Output",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "TCA9548A",
      manufacturerPartNumber: "TCA9548A",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CHub6Port
