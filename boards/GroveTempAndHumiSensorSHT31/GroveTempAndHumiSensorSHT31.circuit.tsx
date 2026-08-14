import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveTempAndHumiSensorSHT31 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveTempAndHumiSensorSHT31",
      title: "Grove - Temp and Humi Sensor(SHT31)",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SHT31",
      manufacturerPartNumber: "SHT31",
      powerVoltage: "5V",
    }}
  />
)

export default GroveTempAndHumiSensorSHT31
