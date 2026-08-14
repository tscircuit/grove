import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveGasSensorBME688 = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveGasSensorBME688",
      title: "Grove Gas Sensor BME688",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Gas-Sensor-BME688-p-5478.html",
      interfaceKind: "i2c",
      detailKind: "sensor",
      primaryModel: "BME688",
      manufacturerPartNumber: "BME688",
      powerVoltage: "5V",
    }}
  />
)

export default GroveGasSensorBME688
