import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSpeaker = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSpeaker",
      title: "Grove - Speaker",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "Grove Speaker controller",
      manufacturerPartNumber: "GROVE-GROVESPEAKER",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSpeaker
