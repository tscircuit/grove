import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CFMReceiver = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CFMReceiver",
      title: "Grove - I2C FM Receiver",
      category: "Other Standard Protocol",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "RDA5807M",
      manufacturerPartNumber: "RDA5807M",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CFMReceiver
