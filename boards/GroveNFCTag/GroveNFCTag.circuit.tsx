import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveNFCTag = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveNFCTag",
      title: "Grove - NFC_tag",
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

export default GroveNFCTag
