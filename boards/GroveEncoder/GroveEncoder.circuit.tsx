import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveEncoder = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveEncoder",
      title: "Grove-Encoder",
      category: "Motion",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
      interfaceKind: "analog",
      detailKind: "input",
      primaryModel: "Grove Encoder controller",
      manufacturerPartNumber: "GROVE-GROVEENCODER",
      powerVoltage: "5V",
    }}
  />
)

export default GroveEncoder
