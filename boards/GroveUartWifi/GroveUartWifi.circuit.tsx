import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveUartWifi = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveUartWifi",
      title: "Grove Uart Wifi",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-Uart-Wifi-p-2495.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "ESP8285",
      manufacturerPartNumber: "ESP8285",
      powerVoltage: "5V",
    }}
  />
)

export default GroveUartWifi
