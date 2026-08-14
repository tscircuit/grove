import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GrovePIRMotionSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GrovePIRMotionSensor",
      title: "Grove - PIR Motion Sensor",
      category: "Motion",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove PIRMotionSensor controller",
      manufacturerPartNumber: "GROVE-GROVEPIRMOTIONSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GrovePIRMotionSensor
