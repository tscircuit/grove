import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveAirQualitySensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveAirQualitySensor",
      title: "Grove Air quality sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Air-quality-sensor-p-1065.html",
      interfaceKind: "analog",
      detailKind: "sensor",
      primaryModel: "Grove AirQualitySensor controller",
      manufacturerPartNumber: "GROVE-GROVEAIRQUALITYSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveAirQualitySensor
