import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTempHumiSensorSHT41 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTempHumiSensorSHT41",
      title: "Grove Temp Humi Sensor SHT41",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT41-p-5383.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SHT4x",
      manufacturerPartNumber: "SHT4x",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTempHumiSensorSHT41
