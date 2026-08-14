import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSoundSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSoundSensor",
      title: "Grove - Sound Sensor",
      category: "Sound",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "LM358",
      manufacturerPartNumber: "LM358",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSoundSensor
