import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveElectricitySensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveElectricitySensor",
      title: "Grove - Electricity Sensor",
      category: "Current",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "ACS712",
      manufacturerPartNumber: "ACS712",
      powerVoltage: "5V",
    }}
  />
)

export default GroveElectricitySensor
