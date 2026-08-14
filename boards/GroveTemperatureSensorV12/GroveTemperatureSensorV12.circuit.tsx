import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTemperatureSensorV12 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTemperatureSensorV12",
      title: "Grove - Temperature Sensor V1.2",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "LM358",
      manufacturerPartNumber: "LM358",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTemperatureSensorV12
