import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove3AxisDigitalAccelerometer = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove3AxisDigitalAccelerometer",
      title: "Grove - 3-Axis Digital Accelerometer",
      category: "Accelerometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "ADXL345",
      manufacturerPartNumber: "ADXL345",
      powerVoltage: "5V",
    }}
  />
)

export default Grove3AxisDigitalAccelerometer
