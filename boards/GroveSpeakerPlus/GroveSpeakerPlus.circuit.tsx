import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSpeakerPlus = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSpeakerPlus",
      title: "Grove - Speaker Plus",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "actuator",
      primaryModel: "LM386",
      manufacturerPartNumber: "LM386",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSpeakerPlus
