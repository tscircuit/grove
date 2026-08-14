import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveFingerprintSensor = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveFingerprintSensor",
      title: "Grove Fingerprint Sensor",
      category: "Sensor",
      sourceUrl: "https://www.seeedstudio.com/Grove-Fingerprint-Sensor.html",
      interfaceKind: "digital",
      detailKind: "sensor",
      primaryModel: "Grove FingerprintSensor controller",
      manufacturerPartNumber: "GROVE-GROVEFINGERPRINTSENSOR",
      powerVoltage: "5V",
    }}
  />
)

export default GroveFingerprintSensor
