import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const GroveHighPrecisionRTCRealTimeClock = () => (
  <GroveDetailedModule
    profile={{
      name: "GroveHighPrecisionRTCRealTimeClock",
      title: "Grove - High Precision RTC (Real Time Clock)",
      category: "Time",
      sourceUrl: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
      interfaceKind: "i2c",
      detailKind: "utility",
      primaryModel: "DS1307",
      manufacturerPartNumber: "DS1307",
      powerVoltage: "5V",
    }}
  />
)

export default GroveHighPrecisionRTCRealTimeClock
