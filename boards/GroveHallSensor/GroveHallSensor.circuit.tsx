import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveHallSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveHallSensor",
      title: "Grove - Hall Sensor",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove HallSensor controller",
      manufacturerPartNumber: "GROVE-GROVEHALLSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHallSensor
