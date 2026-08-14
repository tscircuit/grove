import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveInfraredEmitter = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveInfraredEmitter",
      title: "Grove - Infrared Emitter",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "digital",
      detailKind: "utility",
      primaryModel: "IR333-A",
      manufacturerPartNumber: "IR333-A",
      powerVoltage: "5V",
    }}
  />
)

export default GroveInfraredEmitter
