import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const Grove3AxisAnalogAccelerometer = () => (
  <GroveDetailedModule
    profile={{
      name: "Grove3AxisAnalogAccelerometer",
      title: "Grove - 3-Axis Analog Accelerometer",
      category: "Accelerometer",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "ADXL335",
      manufacturerPartNumber: "ADXL335",
      powerVoltage: "5V",
    }}
  />
)

export default Grove3AxisAnalogAccelerometer
