import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveI2CHighAccuracyTempHumiSensorSHT35 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveI2CHighAccuracyTempHumiSensorSHT35",
      title: "Grove - I2C High Accuracy Temp&Humi Sensor(SHT35)",
      category: "Temp & Humi",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "SHT35",
      manufacturerPartNumber: "SHT35",
      powerVoltage: "5V",
    }}
  />
)

export default GroveI2CHighAccuracyTempHumiSensorSHT35
