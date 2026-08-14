import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveFlameSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveFlameSensor",
      title: "Grove - Flame Sensor",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "YG1006",
      manufacturerPartNumber: "YG1006",
      powerVoltage: "5V",
    }}
  />
)

export default GroveFlameSensor
