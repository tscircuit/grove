import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGPSModule = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGPSModule",
      title: "Grove GPS Module",
      category: "Communications",
      sourceUrl: "https://www.seeedstudio.com/Grove-GPS-Module.html",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "NEO-6M",
      manufacturerPartNumber: "NEO-6M",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGPSModule
