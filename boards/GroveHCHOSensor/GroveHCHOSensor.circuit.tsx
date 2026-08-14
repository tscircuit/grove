import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveHCHOSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveHCHOSensor",
      title: "Grove - HCHO Sensor",
      category: "Gas",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "WSP2110",
      manufacturerPartNumber: "WSP2110",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHCHOSensor
