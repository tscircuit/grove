import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveRJ45Adapter = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveRJ45Adapter",
      title: "Grove - RJ45 Adapter",
      category: "Other Standard Protocol",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
      interfaceKind: "digital",
      detailKind: "utility",
      primaryModel: "Grove RJ45Adapter controller",
      manufacturerPartNumber: "GROVE-GROVERJ45ADAPTER",
      powerVoltage: "5V",
    }}
  />
)

export default GroveRJ45Adapter
