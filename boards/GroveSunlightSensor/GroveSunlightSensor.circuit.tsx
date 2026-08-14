import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSunlightSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSunlightSensor",
      title: "Grove - Sunlight Sensor",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove SunlightSensor controller",
      manufacturerPartNumber: "GROVE-GROVESUNLIGHTSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSunlightSensor
