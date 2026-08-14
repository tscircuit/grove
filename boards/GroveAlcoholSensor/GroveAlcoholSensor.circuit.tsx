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
      primaryModel: "Grove AlcoholSensor controller",
      manufacturerPartNumber: "GROVE-GROVEALCOHOLSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveAlcoholSensor
