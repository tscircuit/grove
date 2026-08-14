import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveVisionAIModule = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveVisionAIModule",
      title: "Grove Vision AI Module",
      category: "AI-powered",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "uart",
      detailKind: "communications",
      primaryModel: "Himax WE1",
      manufacturerPartNumber: "Himax WE1",
      powerVoltage: "5V",
    }}
  />
)

export default GroveVisionAIModule
