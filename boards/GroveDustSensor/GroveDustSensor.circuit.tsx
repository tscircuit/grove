import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveDustSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveDustSensor",
      title: "Grove - Dust Sensor",
      category: "Air Quality",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "PPD42NS",
      manufacturerPartNumber: "PPD42NS",
      powerVoltage: "5V",
    }}
  />
)

export default GroveDustSensor
