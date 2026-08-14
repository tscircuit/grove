import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveRS232 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveRS232",
      title: "Grove RS232",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-RS232.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "MAX3232",
      manufacturerPartNumber: "MAX3232",
      powerVoltage: "5V",
    }}
  />
)

export default GroveRS232
