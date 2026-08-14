import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveAnalogMicrophone = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveAnalogMicrophone",
      title: "Grove - Analog Microphone",
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

export default GroveAnalogMicrophone
