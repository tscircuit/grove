import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveDigitalLightSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveDigitalLightSensor",
      title: "Grove - Digital Light Sensor",
      category: "Light",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "TSL2561",
      manufacturerPartNumber: "TSL2561",
      powerVoltage: "5V",
    }}
  />
)

export default GroveDigitalLightSensor
