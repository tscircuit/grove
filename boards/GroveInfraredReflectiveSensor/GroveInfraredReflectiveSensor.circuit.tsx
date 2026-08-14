import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveInfraredReflectiveSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveInfraredReflectiveSensor",
      title: "Grove - Infrared Reflective Sensor",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "LM393",
      manufacturerPartNumber: "LM393",
      powerVoltage: "5V",
    }}
  />
)

export default GroveInfraredReflectiveSensor
