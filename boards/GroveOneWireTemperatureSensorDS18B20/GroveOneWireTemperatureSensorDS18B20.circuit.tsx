import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveOneWireTemperatureSensorDS18B20 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveOneWireTemperatureSensorDS18B20",
      title: "One Wire Temperature Sensor DS18B20",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "DS18B20",
      manufacturerPartNumber: "DS18B20",
      powerVoltage: "5V",
    }}
  />
)

export default GroveOneWireTemperatureSensorDS18B20
