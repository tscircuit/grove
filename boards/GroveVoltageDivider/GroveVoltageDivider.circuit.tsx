import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveVoltageDivider = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveVoltageDivider",
      title: "Grove - Voltage Divider",
      category: "Actuator",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "LMV358",
      manufacturerPartNumber: "LMV358",
      powerVoltage: "5V",
    }}
  />
)

export default GroveVoltageDivider
