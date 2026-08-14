import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CHub = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CHub",
      title: "Grove - I2C Hub",
      category: "Input Output",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "Grove I2CHub controller",
      manufacturerPartNumber: "GROVE-GROVEI2CHUB",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CHub
