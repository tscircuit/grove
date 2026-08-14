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
      primaryModel: "Grove DigitalLightSensor controller",
      manufacturerPartNumber: "GROVE-GROVEDIGITALLIGHTSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveDigitalLightSensor
