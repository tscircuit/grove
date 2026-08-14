import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveMoistureSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveMoistureSensor",
      title: "Grove - Moisture Sensor",
      category: "Soli Humidity",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove MoistureSensor controller",
      manufacturerPartNumber: "GROVE-GROVEMOISTURESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveMoistureSensor
