import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveElectromagnet = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveElectromagnet",
      title: "Grove - Electromagnet",
      category: "Current",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "MOSFET-Driver",
      manufacturerPartNumber: "MOSFET-Driver",
      powerVoltage: "5V",
    }}
  />
)

export default GroveElectromagnet
