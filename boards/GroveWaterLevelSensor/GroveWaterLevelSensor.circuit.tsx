import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveWaterLevelSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveWaterLevelSensor",
      title: "Grove - Water Level Sensor",
      category: "Liquid",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove WaterLevelSensor controller",
      manufacturerPartNumber: "GROVE-GROVEWATERLEVELSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveWaterLevelSensor
