import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove125KHzRFIDReader = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove125KHzRFIDReader",
      title: "Grove - 125KHz RFID Reader",
      category: "RF",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "EM4100",
      manufacturerPartNumber: "EM4100",
      powerVoltage: "5V",
    }}
  />
)

export default Grove125KHzRFIDReader
