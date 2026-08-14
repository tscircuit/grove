import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CADC = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CADC",
      title: "Grove- I2C ADC",
      category: "Other Standard Protocol",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "ADC121C021",
      manufacturerPartNumber: "ADC121C021",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CADC
