import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GrovePHSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GrovePHSensor",
      title: "Grove PH Sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-PH-Sensor.html",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "Grove PHSensor controller",
      manufacturerPartNumber: "GROVE-GROVEPHSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GrovePHSensor
