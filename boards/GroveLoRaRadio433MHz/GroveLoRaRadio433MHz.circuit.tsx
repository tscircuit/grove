import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLoRaRadio433MHz = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLoRaRadio433MHz",
      title: "Grove LoRa Radio 433MHz",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-LoRa-Radio-433MHz-p-2777.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "RFM95",
      manufacturerPartNumber: "RFM95",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLoRaRadio433MHz
