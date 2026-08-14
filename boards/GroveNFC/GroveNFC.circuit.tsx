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
      primaryModel: "Grove NFC controller",
      manufacturerPartNumber: "GROVE-GROVENFC",
      powerVoltage: "5V",
    }}
  />
)

export default GroveNFC
