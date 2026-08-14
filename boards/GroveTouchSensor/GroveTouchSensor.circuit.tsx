import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTouchSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTouchSensor",
      title: "Grove - Touch Sensor",
      category: "Touch",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "input",
      primaryModel: "AT42QT1070",
      manufacturerPartNumber: "AT42QT1070",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTouchSensor
