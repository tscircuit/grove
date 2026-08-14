import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLoRaRadio868MHz = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLoRaRadio868MHz",
      title: "Grove LoRa Radio 868MHz",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-LoRa-Radio-868MHz.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "RFM95",
      manufacturerPartNumber: "RFM95",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLoRaRadio868MHz
