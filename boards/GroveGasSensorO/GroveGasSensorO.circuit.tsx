import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGasSensorO = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGasSensorO",
      title: "Grove - Gas Sensor(O₂)",
      category: "Gas",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "ME3-O2",
      manufacturerPartNumber: "ME3-O2",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGasSensorO
