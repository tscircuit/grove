import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveInfraredReceiver = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveInfraredReceiver",
      title: "Grove - Infrared Receiver",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "utility",
      primaryModel: "TSOP38238",
      manufacturerPartNumber: "TSOP38238",
      powerVoltage: "5V",
    }}
  />
)

export default GroveInfraredReceiver
