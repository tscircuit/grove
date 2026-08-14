import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveWaterSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveWaterSensor",
      title: "Grove - Water Sensor",
      category: "Liquid",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove WaterSensor controller",
      manufacturerPartNumber: "GROVE-GROVEWATERSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveWaterSensor
