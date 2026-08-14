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
      primaryModel: "Grove GPSModule controller",
      manufacturerPartNumber: "GROVE-GROVEGPSMODULE",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGPSModule
