import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveNFCPN532 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveNFCPN532",
      title: "Grove - NFC(PN532)",
      category: "NFC",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
      interfaceKind: "i2c",
      detailKind: "communications",
      primaryModel: "PN532",
      manufacturerPartNumber: "PN532",
      powerVoltage: "5V",
    }}
  />
)

export default GroveNFCPN532
