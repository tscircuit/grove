import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveSoundRecorder = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveSoundRecorder",
      title: "Grove Sound Recorder",
      category: "Catalogue",
      sourceUrl: "https://www.seeedstudio.com/Grove-Sound-Recorder-p-904.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "ISD1820P",
      manufacturerPartNumber: "ISD1820P",
      powerVoltage: "5V",
    }}
  />
)

export default GroveSoundRecorder
