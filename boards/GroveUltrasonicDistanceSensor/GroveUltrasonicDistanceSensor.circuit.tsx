import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveUltrasonicDistanceSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveUltrasonicDistanceSensor",
      title: "Grove Ultrasonic Distance Sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Ultrasonic-Distance-Sensor.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "HC-SR04",
      manufacturerPartNumber: "HC-SR04",
      powerVoltage: "5V",
    }}
  />
)

export default GroveUltrasonicDistanceSensor
