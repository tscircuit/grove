import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveIntegratedPressureSensorKit = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveIntegratedPressureSensorKit",
      title: "Grove - Integrated Pressure Sensor Kit",
      category: "Barometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "BMP180",
      manufacturerPartNumber: "BMP180",
      powerVoltage: "5V",
    }}
  />
)

export default GroveIntegratedPressureSensorKit
