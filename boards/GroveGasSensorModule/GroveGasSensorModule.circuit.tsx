import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGasSensorModule = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGasSensorModule",
      title: "Grove - Gas Sensor module",
      category: "Gas",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove GasSensorModule controller",
      manufacturerPartNumber: "GROVE-GROVEGASSENSORMODULE",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGasSensorModule
