import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTempHumiSensorSHT40 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTempHumiSensorSHT40",
      title: "Grove Temp Humi Sensor SHT40",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Temp-Humi-Sensor-SHT40-p-5384.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SHT4x",
      manufacturerPartNumber: "GROVE-GROVETEMPHUMISENSORSHT40",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTempHumiSensorSHT40
