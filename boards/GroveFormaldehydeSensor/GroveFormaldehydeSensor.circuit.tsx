import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveFormaldehydeSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveFormaldehydeSensor",
      title: "Grove - Formaldehyde sensor",
      category: "Air Quality",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "Grove FormaldehydeSensor controller",
      manufacturerPartNumber: "GROVE-GROVEFORMALDEHYDESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveFormaldehydeSensor
