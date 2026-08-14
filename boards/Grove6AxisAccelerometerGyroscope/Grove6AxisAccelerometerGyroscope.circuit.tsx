import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove6AxisAccelerometerGyroscope = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove6AxisAccelerometerGyroscope",
      title: "Grove - 6-Axis Accelerometer&Gyroscope",
      category: "Accelerometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "LSM6DS3",
      manufacturerPartNumber: "LSM6DS3",
      powerVoltage: "5V",
    }}
  />
)

export default Grove6AxisAccelerometerGyroscope
