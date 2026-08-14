import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveNFC = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveNFC",
      title: "Grove NFC",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-NFC.html",
      interfaceKind: "i2c",
      detailKind: "communications",
      primaryModel: "PN532",
      manufacturerPartNumber: "PN532",
      powerVoltage: "5V",
    }}
  />
)

export default GroveNFC
