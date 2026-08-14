import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveLuminanceSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveLuminanceSensor",
      title: "Grove Luminance Sensor",
      category: "Light & LED",
      sourceUrl: "https://www.seeedstudio.com/Grove-Luminance-Sensor.html",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove LuminanceSensor controller",
      manufacturerPartNumber: "GROVE-GROVELUMINANCESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveLuminanceSensor
