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
      primaryModel: "Grove SoundSensor controller",
      manufacturerPartNumber: "GROVE-GROVESOUNDSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSoundSensor
