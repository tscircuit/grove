import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveAlcoholSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveAlcoholSensor",
      title: "Grove - Alcohol Sensor",
      category: "Gas",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "MQ-3",
      manufacturerPartNumber: "MQ-3",
      powerVoltage: "5V",
    }}
  />
)

export default GroveAlcoholSensor
