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
      primaryModel: "TDS-SENSOR",
      manufacturerPartNumber: "TDS-SENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTDSSensor
