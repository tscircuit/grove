import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveFMReceiver = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveFMReceiver",
      title: "Grove FM Receiver",
      category: "Catalogue",
      sourceUrl: "https://www.seeedstudio.com/Grove-FM-Receiver.html",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "SX6119",
      manufacturerPartNumber: "SX6119",
      powerVoltage: "5V",
    }}
  />
)

export default GroveFMReceiver
