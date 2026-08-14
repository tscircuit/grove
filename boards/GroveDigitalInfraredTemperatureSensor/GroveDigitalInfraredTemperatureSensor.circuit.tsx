import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveDigitalInfraredTemperatureSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveDigitalInfraredTemperatureSensor",
      title: "Grove - Digital Infrared Temperature Sensor",
      category: "Temperature",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove DigitalInfraredTemperatureSensor controller",
      manufacturerPartNumber: "GROVE-GROVEDIGITALINFRAREDTEMPERATURESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveDigitalInfraredTemperatureSensor
