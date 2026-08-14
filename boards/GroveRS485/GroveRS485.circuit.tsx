import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveRS485 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveRS485",
      title: "Grove RS485",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-RS485-p-2924.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "SN75176",
      manufacturerPartNumber: "SN75176",
      powerVoltage: "5V",
    }}
  />
)

export default GroveRS485
