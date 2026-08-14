import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveACVoltageSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveACVoltageSensor",
      title: "Grove AC Voltage sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-AC-Voltage-sensor-p-5540.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove ACVoltageSensor controller",
      manufacturerPartNumber: "GROVE-GROVEACVOLTAGESENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveACVoltageSensor
