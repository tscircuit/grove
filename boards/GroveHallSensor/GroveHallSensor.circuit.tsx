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
      primaryModel: "A3144",
      manufacturerPartNumber: "A3144",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHallSensor
