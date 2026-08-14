import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveBarometerSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveBarometerSensor",
      title: "Grove Barometer Sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Barometer-Sensor.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "BMP180",
      manufacturerPartNumber: "BMP180",
      powerVoltage: "5V",
    }}
  />
)

export default GroveBarometerSensor
