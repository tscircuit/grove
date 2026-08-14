import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTDSSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTDSSensor",
      title: "Grove - TDS Sensor",
      category: "Liquid",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove TDSSensor controller",
      manufacturerPartNumber: "GROVE-GROVETDSSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTDSSensor
