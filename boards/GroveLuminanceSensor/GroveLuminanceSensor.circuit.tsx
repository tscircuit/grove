import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLuminanceSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLuminanceSensor",
      title: "Grove Luminance Sensor",
      category: "Light & LED",
      sourceUrl: "https://www.seeedstudio.com/Grove-Luminance-Sensor.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "APDS-9002",
      manufacturerPartNumber: "APDS-9002",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLuminanceSensor
