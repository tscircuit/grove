import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "./GroveParts"
import { EagleBoardModule } from "./EagleBoardModule"
import { groveEagleSpecs } from "./groveEagleSpecs"

/**
 * The public catalogue contains several revisions and regional names for the
 * same Grove PCB.  Reuse the official Eagle layout when the electrical core is
 * genuinely shared instead of silently falling back to the one-chip mock.  A
 * profile-specific entry always wins; these aliases only fill gaps where the
 * catalogue name differs from the archive directory.
 */
const sharedEagleSpecFor = (profile: GroveDetailedProfile) => {
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  // The archived Eagle entry for this catalogue name is a mislabeled copy of
  // the L298 layout. Use the model-faithful detailed driver stage instead of
  // presenting a TB6612 board with an L298N footprint and BOM.
  if (/tb6612/.test(text)) return undefined
  if (groveEagleSpecs[profile.name]) return groveEagleSpecs[profile.name]
  const target =
    /buzzer/.test(text)
      ? "GroveBuzzer2"
      : /pir/.test(text)
        ? "GrovePIRMotionSensor"
        : /(?:light sensor|sunlight sensor|gl5528)/.test(text)
          ? "GroveLightSensor2"
          : /formaldehyde.*wsp2110/.test(text)
            ? "GroveHCHOSensor"
            : /digital infrared temperature|infrared temperature sensor(?! array)/.test(text)
              ? "GroveDigitalInfraredTemperatureSensor"
              : /adxl345/.test(text)
                ? "Grove3AxisDigitalAccelerometer16g"
                : /(?:hmc5883|3-axis.*compass)/.test(text)
                  ? "Grove3AxisDigitalCompassV2"
                  : /(?:lsm6ds3|6-axis accelerometer.*gyroscope)/.test(text)
                    ? "Grove6AxisAccelerometerCompassV20"
                    : /infrared reflective.*lm393/.test(text)
                      ? "GroveInfraredReflectiveSensor"
                      : /at42qt1070/.test(text) && !/mpr121/.test(text)
                        ? "GroveQTouchSensor"
                        : /(?:tcut1600x01|optical rotary encoder|mouse encoder)/.test(text)
                          ? "GroveEncoder"
                          : /hm-13|blueseeed dual/.test(text)
                            ? "GroveBLEDualModelV10"
                            : /hm-11|blueseeed hm11/.test(text)
                              ? "GroveBLEV1"
                              : /(?:sn75176|rs485|dmx512)/.test(text)
                                ? "GroveDMX512"
                                : /(?:tm1637|4.?digit|alphanumeric display)/.test(text)
                                  ? "Grove4DigitDisplay"
                                  : /tb6612/.test(text)
                                    ? "GroveI2CMotorDriverTB6612FNG"
                                    : /(?:l298n|l298p|with l298)/.test(text)
                                      ? "GroveI2CMotorDriverL298P"
                                      : /(?:i2c.*motor driver|mini motor driver)/.test(text)
                                        ? "GroveI2CMotorDriverV13"
                                    : /(?:tca9548|i2c hub|qwiic hub)/.test(text)
                                      ? "GroveI2CHub"
                                      : /(?:p9813|chainable rgb|rgb led matrix|led matrix driver)/.test(text)
                                        ? "GroveChainableRGBLED"
                                        : /(?:variable color led|led bar|led string)/.test(text)
                                          ? "GroveLEDBar"
                                          : /(?:dht11|temperature.?humidity sensor(?!.*dht20|.*dht22|.*sht|.*aht))/.test(text)
                                            ? "GroveTemperatureHumiditySensor"
                                            : /(?:mlx90614|digital infrared temperature)/.test(text)
                                              ? "GroveDigitalInfraredTemperatureSensor"
                                              : /(?:bmp180|integrated pressure|barometer sensor bmp18)/.test(text)
                                                ? "GroveBarometerSensor"
                                                : /(?:rotary angle|slide potentiometer)/.test(text)
                                                    ? "GroveRotaryAngleSensor2"
                                                    : undefined
  return target ? groveEagleSpecs[target] : undefined
}

export type GroveInterfaceKind = "digital" | "analog" | "i2c" | "uart"
export type GroveDetailKind =
  | "sensor"
  | "actuator"
  | "display"
  | "communications"
  | "input"
  | "utility"

export interface GroveDetailedProfile {
  name: string
  title: string
  category: string
  sourceUrl: string
  interfaceKind: GroveInterfaceKind
  detailKind: GroveDetailKind
  primaryModel: string
  manufacturerPartNumber: string
  powerVoltage: "3.3V" | "5V"
}

type ModuleFamily =
  | "sensor"
  | "actuator"
  | "display"
  | "communications"
  | "input"
  | "utility"

interface ModuleSpec {
  family: ModuleFamily
  mainPart: string
  packageName: string
  pinLabels: readonly string[]
  boardWidth: number
  boardHeight: number
  mainNeeds3v3: boolean
  channelCount?: number
  loadName?: string
  externalLoad?: boolean
}

interface ImportedModelDefinition {
  supplierPartNumber: string
  footprint: string
  pinLabels: readonly string[]
}

/**
 * Exact JLCPCB footprints for the common Grove controller ICs. The pin names
 * mirror the imported EasyEDA definitions so the physical pad numbering and
 * the schematic net names stay aligned.
 */
const importedModelDefinitions: Record<string, ImportedModelDefinition> = {
  ADXL345: {
    supplierPartNumber: "C9667",
    footprint: "jlcpcb:C9667",
    pinLabels: ["VDDIO", "VDD", "GND", "GND", "INT1", "INT2", "SDO", "SDA", "SCL", "CS", "NC", "NC", "GND", "GND"],
  },
  AHT20: {
    supplierPartNumber: "C2757850",
    footprint: "jlcpcb:C2757850",
    pinLabels: ["NC1", "VDD", "SCL", "SDA", "GND", "NC2"],
  },
  BME280: {
    supplierPartNumber: "C92489",
    footprint: "jlcpcb:C92489",
    pinLabels: ["GND1", "CSB", "SDA", "SCL", "SDO", "VDDIO", "GND2", "VDD"],
  },
  BMA456: {
    supplierPartNumber: "C189518",
    footprint: "jlcpcb:C189518",
    pinLabels: ["VDD", "GND", "SCL", "SDA", "SDO", "CS", "INT1", "INT2", "VDDIO", "GND", "NC", "NC"],
  },
  BMP280: {
    supplierPartNumber: "C83291",
    footprint: "jlcpcb:C83291",
    pinLabels: ["GND2", "CSB", "SDA", "SCL", "SDO", "VDDIO", "GND1", "VDD"],
  },
  DHT20: {
    supplierPartNumber: "C3012627",
    footprint: "jlcpcb:C3012627",
    pinLabels: ["VDD", "SDA", "GND", "SCL"],
  },
  DS1307: {
    supplierPartNumber: "C18723598",
    footprint: "jlcpcb:C18723598",
    pinLabels: ["SQW", "X1", "X2", "GND", "SDA", "SCL", "VBAT", "VCC"],
  },
  MLX90614: {
    supplierPartNumber: "C490604",
    footprint: "jlcpcb:C490604",
    pinLabels: ["SCL", "SDA", "VDD", "VSS"],
  },
  MPR121: {
    supplierPartNumber: "C91322",
    footprint: "jlcpcb:C91322",
    pinLabels: [
      "IRQ", "SCL", "SDA", "ADDR", "VREG", "VSS", "REXT", "ELE0", "ELE1", "ELE2",
      "ELE3", "ELE4", "ELE5", "ELE6", "ELE7", "ELE8", "ELE9", "ELE10", "ELE11", "VDD",
    ],
  },
  SGP40: {
    supplierPartNumber: "C2874215",
    footprint: "jlcpcb:C2874215",
    pinLabels: ["VDD", "VSS", "SDA", "NC", "VDDH", "SCL", "GND"],
  },
  SGP41: {
    supplierPartNumber: "C3659325",
    footprint: "jlcpcb:C3659325",
    pinLabels: ["VDD", "VSS", "SDA", "NC", "VDDH", "SCL", "EP"],
  },
  SHT40: {
    supplierPartNumber: "C2909890",
    footprint: "jlcpcb:C2909890",
    pinLabels: ["SDA", "SCL", "VDD", "VSS", "EP"],
  },
  SHT31: {
    supplierPartNumber: "C80862",
    footprint: "jlcpcb:C80862",
    pinLabels: ["SDA", "ADDR", "ALERT", "SCL", "VDD", "NRESET", "NC", "GND", "EP"],
  },
  SHT35: {
    supplierPartNumber: "C90161",
    footprint: "jlcpcb:C90161",
    pinLabels: ["SDA", "ADDR", "ALERT", "SCL", "VDD", "NRESET", "NC", "GND", "EP"],
  },
  SHT4X: {
    supplierPartNumber: "C2909890",
    footprint: "jlcpcb:C2909890",
    pinLabels: ["SDA", "SCL", "VDD", "VSS", "EP"],
  },
  TCA9548: {
    supplierPartNumber: "C555456",
    footprint: "jlcpcb:C555456",
    pinLabels: [
      "SD0", "SC0", "SD1", "SC1", "SD2", "SC2", "SD3", "SC3", "GND", "SD4", "SC4",
      "SD5", "SC5", "SD6", "SC6", "SD7", "SC7", "A2", "SCL", "SDA", "VCC", "A0", "A1", "RESET", "EP",
    ],
  },
  AS5600: {
    supplierPartNumber: "C499458",
    footprint: "jlcpcb:C499458",
    pinLabels: ["VDD", "GND", "OUT", "DIR", "SCL", "SDA", "GND", "VDD"],
  },
}

const importedModelFor = (model: string) => {
  const key = model.toUpperCase().replace(/[^A-Z0-9]/g, "")
  return Object.entries(importedModelDefinitions).find(([name]) =>
    key === name.toUpperCase().replace(/[^A-Z0-9]/g, "") || key.startsWith(name.toUpperCase().replace(/[^A-Z0-9]/g, "")),
  )?.[1]
}

type PinAttribute = {
  requiresPower?: boolean
  requiresGround?: boolean
  requiresVoltage?: string
  mustBeConnected?: boolean
  doNotConnect?: boolean
  isGpio?: boolean
}

// Keep passive support parts explicit in the source netlist. The two-terminal
// contracts also prevent the schematic checker from treating these parts as
// anonymous boxes with no power/ground semantics.
const passivePinAttributes = {
  pin1: { requiresPower: true, mustBeConnected: true },
  pin2: { requiresGround: true, mustBeConnected: true },
} as const

// A few six/eight-pin symbols need a tenth of a millimetre vertical nudge so
// their SCL/SDA pair lines up with the compact Grove connector symbol.
const schematicAlignDownProfiles = new Set([
  "GroveI2CThermocoupleAmplifierMCP9600",
  "GroveThermalImagingCameraIRArrayMLX90641",
  "GroveInfraredTemperatureSensorArrayAMG8833",
  "GroveI2CHighAccuracyTemperatureSensorMCP9808",
  "GroveSEN5XAllInOne",
  "GroveTemperatureHumidityPressureGasSensorBME680",
  "GroveCO2TemperatureHumiditySensorSCD41",
  "GroveCO2TemperatureHumiditySensorSCD30",
  "GroveLightGestureColorProximitySensorTMG39931",
  "GroveTimeOfFlightDistanceSensorVL53L0X",
  "GroveVOCAndECO2GasSensorSGP30",
  "GroveHighPrecisionBarometricPressureSensorDPS310",
  "GroveIntegratedPressureSensorKit",
  "Grove3AxisDigitalAccelerometerLIS3DHTR",
  "Grove6AxisAccelerometerGyroscopeBMI088",
  "GroveLightningSensorAS3935",
  "Grove12BitMagneticRotaryPositionSensorEncoderAS5600",
  "GroveStepCounterBMA456",
  "Grove16ChannelPWMDriverPCA9685",
  "GroveDS1307RTCRealTimeClockForArduino",
  "GroveHighPrecisionRTCRealTimeClock",
  "Grove4Channel16BitADCADS1115",
  "GroveI2CUVSensorVEML6070",
  "GroveHighPrecisionRTC",
  "GroveBarometerSensorBMP18",
  "GroveI2CTouchSensor",
  "GroveRTCDS1307",
  "GroveLightColorProximitySensorTMG39931",
  "Grove12BitMagneticRotaryPositionSensorAS5600",
  "GroveThermalImagingCameraIRArrayMLX90640110Degree",
  "GroveThermalImagingCameraIRArrayMLX9064055Degree",
  "GroveHighPrecisionBarometerSensorDPS310",
  "GroveADS111516BitADC",
  "GroveThermalImagingCameraIRArrayMLX90641110Degree",
  "GroveThermalImagingCameraMLX90621BAA16x4IRArrayWith25FOV",
  "GroveFormaldehydeSensorSFA30",
  "GroveThermalImagingCameraMLX90641BCB16x12IRArrayWith55FOV",
  "GroveThermalImagingCameraMLX90621BAB16x4IRArrayWith60FOV",
  "GroveAllInOneEnvironmentalSensorSEN55",
  "GroveAllInOneEnvironmentalSensorSEN54",
  "GroveTempHumiSensorSHT41",
  "GroveTempHumiSensorSHT40",
  "GroveGasSensorBME688",
])

const schematicMainYOverrides: Record<string, number> = {
  // Align the analog sensor's two signal pins with the compact Grove header.
  GroveHCHOSensor: -0.2,
  // MPR121's compact 20-pin symbol has its SCL/SDA pair one row below the
  // connector's default centerline.
  Grove12KeyCapacitiveI2CTouchSensorV2MPR121: -0.6,
  Grove12KeyCapacitiveI2CTouchSensorV3MPR121: -0.6,
}

const compactLabel = (value: string, maxLength = 25) => {
  const compact = value
    .replace(/^grove\s*[-–—:]?\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
  return compact.length > maxLength
    ? `${compact.slice(0, maxLength - 1).trimEnd()}…`
    : compact
}

const modelLabel = (profile: GroveDetailedProfile) => {
  const model = profile.primaryModel.trim()
  if (model && !/^grove\s+.+\s+controller$/i.test(model)) return model
  return compactLabel(profile.title, 30)
}

const signalLabels = (interfaceKind: GroveInterfaceKind) => {
  if (interfaceKind === "i2c") return ["SCL", "SDA"] as const
  if (interfaceKind === "uart") return ["RX", "TX"] as const
  return ["SIG", "NC"] as const
}

const channelCountFor = (text: string) => {
  const channel = text.match(/(?:stick|ring|strip|bar|channel)[^0-9]{0,8}(\d{1,2})/i)
  const count = channel ? Number(channel[1]) : undefined
  return count && count >= 2 && count <= 32 ? count : undefined
}

const effectiveInterface = (
  profile: GroveDetailedProfile,
  text: string,
): GroveInterfaceKind => {
  if (/chainable rgb led|rgb led matrix|led matrix driver|p9813/.test(text)) {
    return "digital"
  }
  if (/\bi2c\b|sht\d|aht\d|bme\d|bmp\d|mcp\d|scd\d|sgp\d|vl53|amg\d|mlx\d|as3935|as5600|pca9685|ht16k33|tca9548|ads1115|rtc|nfc|tmg39931|lis3dhtr|bma\d|bmi\d|dps310|mpr121|sen5|sen54|sen55|sfa30|veml|qwiic|display|matrix/.test(text)) {
    return "i2c"
  }
  if (/\buart\b|wifi|bluetooth|\bble\b|gps|\brf\b|lora|rfid|serial|rs232|rs485|dmx|vision ai|mp3|speech|voice|camera/.test(text)) {
    return "uart"
  }
  if (profile.detailKind === "communications") return "uart"
  return profile.interfaceKind
}

const packageFor = (text: string, family: ModuleFamily, pinCount: number) => {
  if (/qfn|qfp|pca9685|tca9548|ads1115|mcp9600|mcp9808|bme|sgp|scd|sen5|sfa30/.test(text)) return "QFN"
  if (/display|lcd|oled|e-ink|matrix/.test(text)) return "DISPLAY-MODULE"
  if (/relay|motor|fan|speaker|buzzer|atomization|electromagnet/.test(text)) return "POWER-MODULE"
  if (/wifi|bluetooth|ble|gps|lora|rfid|camera|voice|mp3/.test(text)) return "CASTELLATED-MODULE"
  if (family === "input") return "THD-INPUT"
  if (pinCount >= 10) return "TSSOP"
  return "DFN"
}

const resolveSpecBase = (profile: GroveDetailedProfile): ModuleSpec => {
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  const importedModel = importedModelFor(profile.primaryModel)
  const interfaceKind = effectiveInterface(profile, text)
  const channelCount = channelCountFor(text)
  const display = profile.detailKind === "display" || /display|lcd|oled|e-ink|matrix/.test(text)
  const input = (profile.detailKind === "input" || /button|switch|joystick|touch|rotary|encoder|potentiometer|keypad/.test(text))
    && interfaceKind !== "i2c"
    && interfaceKind !== "uart"
  const ledOnly = /\bled\b/.test(text)
    && !/strip|ring|bar|matrix|button|driver|chainable|stick/.test(text)
  const actuator = !input && !ledOnly && (profile.detailKind === "actuator" || /relay|buzzer|speaker|motor|servo|fan|atomization|electromagnet/.test(text))
  const communications = profile.detailKind === "communications" || /wifi|bluetooth|\bble\b|gps|\brf\b|lora|rfid|serial|rs232|rs485|dmx|camera|voice|mp3|vision/.test(text)
  const mainNeeds3v3 = /aht20|sht\d|bme\d|bmp\d|adxl\d|dps310|mcp9808|mcp9600|sgp\d|scd\d|sen5|sfa30|vl53|amg8833|mlx\d|as5600|mpr121|pca9685|ads1115|tca9548|lis3d|bma\d|bmi\d|icm\d|ak099|tmg39931|veml|qwiic|st25dv/.test(text)
  const mainPart = modelLabel(profile)
  const resolvedInterface = interfaceKind

  if (/ws2813|rgb led|led ring|led strip|led bar/.test(text)) {
    const count = channelCount ?? (/ring/.test(text) ? 16 : 10)
    return {
      family: "actuator",
      mainPart: /ws2813/.test(text) ? "WS2813" : mainPart,
      packageName: "LED-ADDRESSABLE",
      pinLabels: ["DIN", "DOUT", "VCC", "GND"],
      boardWidth: Math.max(50, count * 6 + 14),
      boardHeight: /ring/.test(text) ? 38 : 12,
      mainNeeds3v3: false,
      channelCount: count,
    }
  }

  if (display) {
    return {
      family: "display",
      mainPart,
      packageName: "DISPLAY-MODULE",
      pinLabels: resolvedInterface === "i2c"
        ? ["SCL", "SDA", "VCC", "GND", "RST", "ADDR", "NC", "NC"]
        : resolvedInterface === "uart"
          ? ["RX", "TX", "VCC", "GND", "RST", "BL", "NC", "NC"]
          : ["SIG", "VCC", "GND", "AUX"],
      boardWidth: 60,
      boardHeight: /1\.2|1\.54|2\.13|16x2|rgb/i.test(text) ? 36 : 30,
      mainNeeds3v3,
    }
  }

  if (/tb6612/.test(text)) {
    return {
      family: "actuator",
      mainPart: "TB6612FNG",
      packageName: "TSSOP",
      pinLabels: ["SDA", "SCL", "VCC", "GND", "FAULT", "ADDR", "AO1", "AO2", "BO1", "BO2"],
      boardWidth: 52,
      boardHeight: 28,
      mainNeeds3v3: false,
      externalLoad: false,
    }
  }

  if (actuator && resolvedInterface === "i2c") {
    return {
      family: "actuator",
      mainPart,
      packageName: packageFor(text, "actuator", 6),
      pinLabels: ["SDA", "SCL", "VCC", "GND", "FAULT", "ADDR"],
      boardWidth: 50,
      boardHeight: 24,
      mainNeeds3v3,
      loadName: loadPartFor(text),
      externalLoad: true,
    }
  }

  if (actuator) {
    return {
      family: "actuator",
      mainPart,
      packageName: packageFor(text, "actuator", 4),
      pinLabels: ["SIG", "VCC", "GND", "AUX"],
      boardWidth: /relay|motor|fan|speaker|atomization|electromagnet/.test(text) ? 50 : 40,
      boardHeight: 24,
      mainNeeds3v3: false,
      loadName: loadPartFor(text),
      externalLoad: true,
    }
  }

  if (input) {
    return {
      family: "input",
      mainPart,
      packageName: packageFor(text, "input", 4),
      pinLabels: ["SIG", "VCC", "GND", "AUX"],
      boardWidth: /joystick|keypad|encoder/.test(text)
        ? 50
        : /potentiometer|rotary|slide pot/.test(text)
          ? 40
          : 30,
      boardHeight: /joystick|keypad/.test(text) ? 30 : 20,
      mainNeeds3v3: false,
    }
  }

  if ((communications || resolvedInterface === "uart") && resolvedInterface !== "i2c") {
    return {
      family: "communications",
      mainPart,
      packageName: packageFor(text, "communications", 6),
      pinLabels: ["RX", "TX", "VCC", "GND", "CTS", "RTS"],
      boardWidth: 50,
      boardHeight: 24,
      mainNeeds3v3,
    }
  }

  if (resolvedInterface === "i2c") {
    return {
      family: "sensor",
      mainPart,
      packageName: packageFor(text, "sensor", 6),
      pinLabels: importedModel?.pinLabels ?? ["SDA", "SCL", "VDD", "GND", "ADDR", "INT"],
      boardWidth: /array|imu|accelerometer|gyroscope|compass/.test(text) ? 45 : 40,
      boardHeight: /array|imu|accelerometer|gyroscope|compass/.test(text) ? 24 : 20,
      mainNeeds3v3,
    }
  }

  return {
    family: profile.detailKind,
    mainPart,
    packageName: packageFor(text, profile.detailKind, 4),
    pinLabels: ["SIG", "VCC", "GND", "AUX"],
    boardWidth: 40,
    boardHeight: 20,
    mainNeeds3v3: false,
  }
}

const resolveSpec = (profile: GroveDetailedProfile): ModuleSpec => {
  const base = resolveSpecBase(profile)
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  // Grove boards span tiny 20 mm sensors, long LED strips, relay/power
  // boards, and display carrier cards.  Keep the fallback geometry faithful
  // to the product class so its imported footprints have room to breathe.
  if (/\bgas\b|mq[- ]?\d|\boxygen\b|\bco2\b|\bhcho\b|air quality|\bdust\b|formaldehyde|sen5[45]|bme688/.test(text)) {
    return { ...base, boardWidth: 60, boardHeight: 38 }
  }
  if (/thermal imaging|ir array|camera|vision ai|fingerprint|nfc|rfid|lora|wifi|bluetooth|serial rf/.test(text)) {
    return { ...base, boardWidth: 52, boardHeight: 30 }
  }
  if (/relay|motor driver|mini motor|servo|speaker|buzzer|fan|atomization|electromagnet/.test(text)) {
    return { ...base, boardWidth: 52, boardHeight: 28 }
  }
  if (/lcd|oled|e-ink|ips display|display/.test(text)) {
    return {
      ...base,
      boardWidth: /16x?2|lcd/.test(text) ? 80 : 32,
      boardHeight: /16x?2|lcd/.test(text) ? 36 : 30,
    }
  }
  if (/joystick|keypad|keycap|touch slider|track ball|dip switch/.test(text)) {
    return { ...base, boardWidth: 42, boardHeight: 32 }
  }
  if (/ring/.test(text)) {
    return { ...base, boardWidth: 48, boardHeight: 48 }
  }
  if (/distance|proximity|ultrasonic|lidar|radar/.test(text)) {
    return { ...base, boardWidth: Math.max(base.boardWidth, 40), boardHeight: Math.max(base.boardHeight, 26) }
  }
  if (/strip|stick|bar/.test(text)) {
    return { ...base, boardWidth: Math.max(base.boardWidth, 72), boardHeight: 16 }
  }
  if (/accelerometer|gyroscope|compass|imu|motion|step counter/.test(text)) {
    return { ...base, boardWidth: 34, boardHeight: 28 }
  }
  if (/temperature|humidity|pressure|barometer|environmental|light sensor|color sensor|proximity/.test(text)) {
    return { ...base, boardWidth: 30, boardHeight: 24 }
  }
  return base
}

const packageFootprint = ({
  packageName,
  pinCount,
}: {
  packageName: string
  pinCount: number
}) => {
  const perSide = Math.ceil(pinCount / 2)
  const spacing = pinCount >= 12 ? 1 : pinCount >= 8 ? 1.4 : 1.25
  const padWidth = pinCount >= 12 ? 0.55 : 0.8
  const padHeight = pinCount >= 12 ? 0.65 : pinCount >= 8 ? 0.85 : 1.05
  const bodyWidth = packageName === "DISPLAY-MODULE"
    ? 12
    : packageName === "LED-ADDRESSABLE"
      ? 3.4
      : pinCount >= 12
        ? 6.5
        : 5.5
  const bodyHeight = packageName === "DISPLAY-MODULE"
    ? 8
    : packageName === "LED-ADDRESSABLE"
      ? 2.2
      : Math.max(4, (perSide - 1) * spacing + 2)
  const pads = Array.from({ length: pinCount }, (_, index) => {
    const onLeft = index < perSide
    const sideIndex = onLeft ? index : index - perSide
    const y = ((perSide - 1) / 2 - sideIndex) * spacing
    return (
      <Fragment key={`pad-${index + 1}`}>
        <smtpad
          shape="rect"
          width={`${padWidth}mm`}
          height={`${padHeight}mm`}
          pcbX={onLeft ? -bodyWidth / 2 : bodyWidth / 2}
          pcbY={y}
          portHints={[`pin${index + 1}`]}
        />
      </Fragment>
    )
  })
  return (
    <footprint name={packageName}>
      {pads}
      <silkscreenrect
        width={`${bodyWidth}mm`}
        height={`${bodyHeight}mm`}
        stroke="solid"
        strokeWidth="0.18mm"
        filled={false}
      />
    </footprint>
  )
}

type VisualFamily =
  | "environmental"
  | "gas"
  | "motion"
  | "optical"
  | "distance"
  | "wireless"
  | "audio"
  | "display"
  | "power"
  | "input"
  | "led"
  | "generic"

const visualFamilyFor = (profile: GroveDetailedProfile, text: string): VisualFamily => {
  if (/display|lcd|oled|e-ink|matrix/.test(text)) return "display"
  // A button/switch board may also have an indicator LED in its title, but
  // the tactile/switch mechanism is the part that should drive the primary
  // footprint and placement family.
  if (profile.detailKind === "input" || /button|switch|joystick|keypad|touch|rotary|encoder|potentiometer/.test(text)) return "input"
  if (/ws2813|rgb led|led ring|led strip|led bar|my9221|p9813/.test(text)) return "led"
  if (/relay|motor|servo|fan|speaker|buzzer|atomization|electromagnet|current sensor|coulomb/.test(text)) return "power"
  if (/wifi|bluetooth|ble|gps|rfid|nfc|lora|serial|camera|vision|voice|speech/.test(text) || profile.detailKind === "communications") return "wireless"
  if (/\bgas\b|mq[- ]?\d|\boxygen\b|\bco2\b|\bhcho\b|formaldehyde|sen5[45]|bme688/.test(text)) return "gas"
  if (/microphone|loudness|sound|recorder|audio|heart rate|emg|gsr/.test(text)) return "audio"
  if (/ultrasonic|lidar|distance|proximity|radar|pir|motion|presence/.test(text)) return "distance"
  if (/light|color|uv|infrared|flame|gesture|phototransistor|luminance/.test(text)) return "optical"
  if (/accelerometer|gyroscope|compass|imu|step counter|magnetic|hall/.test(text)) return "motion"
  if (/temperature|humidity|pressure|barometer|environmental|aht|sht|dht|bme|bmp/.test(text)) return "environmental"
  return "generic"
}

const genericResistorMpn = (resistance: string, packageName = "0603") => {
  const key = resistance.toLowerCase().replace(/\s+/g, "")
  const values: Record<string, string> = {
    "0": "RC0603JR-070RL",
    "0r": "RC0603JR-070RL",
    "1k": "RC0603FR-071KL",
    "2k2": "RC0603FR-072K2L",
    "4.7k": "RC0603FR-074K7L",
    "10k": "RC0603FR-0710KL",
    "22k": "RC0603FR-0722KL",
    "33": "RC0603JR-0733RL",
    "100": "RC0603JR-07100RL",
    "220": "RC0603JR-07220RL",
    "330": "RC0603JR-07330RL",
    "470": "RC0603JR-07470RL",
    "1m": "RC0603FR-071ML",
  }
  return values[key] ?? `RC${packageName.replace(/[^0-9]/g, "").padStart(4, "0")}FR-${key.toUpperCase()}`
}

const genericCapacitorMpn = (capacitance: string, packageName = "0603") => {
  const key = capacitance.toLowerCase().replace(/\s+/g, "")
  const values: Record<string, string> = {
    "100nf": "CC0603KRX7R9BB104",
    "1uf": "CC0603ZRY5V8BB105",
    "4.7uf": "CC0603ZRY5V8BB475",
    "10uf": "CC0805ZRY5V8BB106",
    "22uf": "CC0805ZRY5V8BB226",
    "100uf": "EEH-ZA1E101P",
  }
  return values[key] ?? `CC${packageName.replace(/[^0-9]/g, "").padStart(4, "0")}X7R-${key.toUpperCase()}`
}

const visualFootprint = (
  family: VisualFamily,
  pinCount: number,
  packageName: string,
) => {
  if (family === "generic") return packageFootprint({ packageName, pinCount })
  const body = family === "display"
    ? { width: 20, height: 16 }
    : family === "wireless"
      ? { width: 18, height: 14 }
      : family === "gas"
        ? { width: 18, height: 16 }
      : family === "motion"
        ? { width: 9, height: 9 }
      : family === "environmental"
        ? { width: 9, height: 8 }
      : family === "power"
          ? { width: 16, height: 12 }
          : family === "distance" && /^(TX|RX)$/i.test(packageName)
            ? { width: 8, height: 5 }
          : family === "input"
            ? { width: 10, height: 10 }
            : { width: 8, height: 7 }
  const perSide = Math.ceil(pinCount / 2)
  const pitch = pinCount > 12 ? 1 : 1.27
  const pads = Array.from({ length: pinCount }, (_, index) => {
    const left = index < perSide
    const row = left ? index : index - perSide
    return (
      <Fragment key={`pad-${index + 1}`}>
        <smtpad
          shape="rect"
          width={`${pinCount > 12 ? 0.55 : 0.8}mm`}
          height={`${pinCount > 12 ? 0.65 : 0.9}mm`}
          pcbX={left ? -body.width / 2 : body.width / 2}
          pcbY={((perSide - 1) / 2 - row) * pitch}
          portHints={[`pin${index + 1}`]}
        />
      </Fragment>
    )
  })
  return (
    <footprint name={`${family.toUpperCase()}-${packageName}`}>
      {pads}
      <silkscreenrect
        width={`${body.width}mm`}
        height={`${body.height}mm`}
        stroke="solid"
        strokeWidth="0.18mm"
        filled={false}
      />
      {family === "gas" && <silkscreencircle pcbX={2} pcbY={0} radius="6mm" strokeWidth="0.2mm" isOutline />}
      {family === "optical" && <silkscreencircle pcbX={0} pcbY={0} radius="2.6mm" strokeWidth="0.2mm" isOutline />}
      {family === "distance" && /^(TX|RX)$/i.test(packageName) && (
        <silkscreencircle pcbX={0} pcbY={0} radius="2mm" strokeWidth="0.2mm" isOutline />
      )}
      {family === "wireless" && (
        <silkscreenrect pcbX={5} pcbY={0} width="7mm" height="5mm" stroke="solid" strokeWidth="0.15mm" filled={false} />
      )}
      {family === "audio" && <silkscreencircle pcbX={0} pcbY={0} radius="3mm" strokeWidth="0.2mm" isOutline />}
      {family === "input" && <silkscreencircle pcbX={0} pcbY={0} radius="3.5mm" strokeWidth="0.2mm" isOutline />}
      {family === "motion" && (
        <>
          <silkscreencircle pcbX={0} pcbY={0} radius="2.6mm" strokeWidth="0.2mm" isOutline />
          <silkscreenline x1="-3mm" y1="0mm" x2="3mm" y2="0mm" strokeWidth="0.15mm" />
          <silkscreenline x1="0mm" y1="-3mm" x2="0mm" y2="3mm" strokeWidth="0.15mm" />
        </>
      )}
      {family === "environmental" && (
        <>
          <silkscreencircle pcbX={0} pcbY={0} radius="2.8mm" strokeWidth="0.2mm" isOutline />
          <silkscreenline x1="-1.5mm" y1="-1.5mm" x2="1.5mm" y2="1.5mm" strokeWidth="0.15mm" />
          <silkscreenline x1="-1.5mm" y1="1.5mm" x2="1.5mm" y2="-1.5mm" strokeWidth="0.15mm" />
        </>
      )}
      {family === "display" && <silkscreenrect pcbX={0} pcbY={0} width="14mm" height="10mm" stroke="solid" strokeWidth="0.15mm" filled={false} />}
    </footprint>
  )
}

const pinAttributesFor = (
  labels: readonly string[],
  powerVoltage: "3.3V" | "5V",
  interfaceKind: GroveInterfaceKind,
) => {
  const [signal1, signal2] = signalLabels(interfaceKind)
  const attributes: Record<string, PinAttribute> = {}
  for (const label of labels) {
    if (/^(?:VCC\d*|VDD\d*|VDDIO|VDDH|VIN|VM\d*)$/i.test(label)) {
      attributes[label] = {
        requiresPower: true,
        requiresVoltage: powerVoltage,
        // VDDIO/VDDH are often internally tied to the main supply on the
        // vendor package. Keep the power contract visible without forcing a
        // separate routed escape for a pin that has no external Grove net.
        ...( /^(?:VDDIO|VDDH)$/i.test(label) ? {} : { mustBeConnected: true }),
      }
    } else if (/^(?:GND|VSS|GND\d+|EP|EPAD)$/i.test(label)) {
      attributes[label] = { requiresGround: true, mustBeConnected: true }
    } else if (
      label === signal1 ||
      label === signal2 ||
      label === "SIG" ||
      (/^(?:OUT|OUTA|OUTB|INT1|IRQ)$/i.test(label) &&
        (interfaceKind === "analog" || interfaceKind === "digital")) ||
      (signal1 === "SCL" && label === "SCK") ||
      (signal2 === "SDA" && label === "SDI")
    ) {
      attributes[label] = { mustBeConnected: true, isGpio: true }
    } else {
      attributes[label] = { doNotConnect: true }
    }
  }
  return attributes
}

const signalEndpoint = (component: string, label: string) => `${component}.${label}`

const boardHoleX = (width: number) => Math.max(10, width / 2 - 4)
const boardHoleY = (height: number) => Math.max(7, height / 2 - 3)

const loadPartFor = (text: string) => {
  if (/2[- ]?coil latching relay/i.test(text)) return "RELAY-HFD2/005-S-L2"
  if (/30a|spdt relay/i.test(text)) return "RELAY-SLA-05VDC-SL-C"
  if (/solid state relay|optocoupler relay/i.test(text)) return "RELAY-S208T02"
  if (/relay/i.test(text)) return "HLS8L-DC3V-S-C"
  if (/buzzer/i.test(text)) return "YMD12065"
  if (/speaker/i.test(text)) return "8OHM-SPEAKER"
  if (/mini fan|fan/i.test(text)) return "FAN-5V-25MM"
  if (/servo/i.test(text)) return "SG90"
  if (/motor|haptic|vibration/i.test(text)) return "FA-130RA"
  if (/electromagnet/i.test(text)) return "JQC-3FF-S-Z"
  if (/led|light/i.test(text)) return "LED-5MM"
  if (/atomization/i.test(text)) return "ATOMIZER-5V"
  return "Grove-Actuator-Load"
}

interface FamilySupportProps {
  family: VisualFamily
  profile: GroveDetailedProfile
  spec: ModuleSpec
  interfaceKind: GroveInterfaceKind
  signal1: string
  signal2: string
  mainAt: (label: string) => string
}

/** Add the recognizable transducer/driver stage that differentiates a board
 * from its controller IC.  These parts are intentionally conservative: they
 * use standard, orderable components and keep the connector-facing nets
 * explicit, while the profile's primary MPN remains the board's actual IC or
 * sensor element. */
const FamilySupport = ({
  family,
  profile,
  spec,
  interfaceKind,
  signal1,
  mainAt,
}: FamilySupportProps) => {
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  if (family === "audio") {
    return (
      <>
        <chip
          name="MIC1"
          displayName="Electret microphone capsule"
          manufacturerPartNumber="CMA-4544PF-W"
          pinLabels={{ pin1: "VCC", pin2: "OUT", pin3: "GND" }}
          pinAttributes={{
            VCC: { requiresPower: true, mustBeConnected: true },
            OUT: { mustBeConnected: true, isGpio: true },
            GND: { requiresGround: true, mustBeConnected: true },
          }}
          footprint={visualFootprint("audio", 3, "MIC")}
          pcbX={-5}
          pcbY={4}
          schX={-4}
          schY={3}
        />
        <capacitor
          name="C_AUDIO"
          capacitance="100nF"
          manufacturerPartNumber={genericCapacitorMpn("100nF", "0603")}
          pinAttributes={passivePinAttributes}
          connections={{ pin1: "net.VCC", pin2: "net.GND" }}
          maxDecouplingTraceLength="30mm"
          footprint="0603"
          pcbX={-1}
          pcbY={6}
          schX={-1}
          schY={4}
          schOrientation="vertical"
        />
        <trace name="MIC_BIAS" from="J1.VCC" to="MIC1.VCC" />
        <trace name="MIC_SIGNAL" from="MIC1.OUT" to={mainAt(signal1)} />
        <trace name="MIC_RETURN" from="MIC1.GND" to="J1.GND" />
        <trace name="MIC_DECOUPLE" from="MIC1.VCC" to="C_AUDIO.pin1" />
        <trace name="MIC_DECOUPLE_RETURN" from="C_AUDIO.pin2" to="J1.GND" />
      </>
    )
  }

  if (family === "optical") {
    const infrared = /infrared|ir |proximity|flame/.test(text)
    return (
      <>
        <led
          name="D_EMITTER"
          displayName={infrared ? "IR emitter 940nm" : "Indicator LED"
          }
          manufacturerPartNumber={infrared ? "IR333-A" : "LTST-C190KRKT"}
          color={infrared ? "infrared" : "red"}
          connections={{ pin1: "net.EMITTER", pin2: "net.GND" }}
          footprint="0603"
          pcbX={-5}
          // Keep the optical pair above the I²C pull-ups and decoupler on
          // compact AS3935/gesture boards.  The earlier y=6 placement put
          // the emitter courtyard directly over R1 on 20–24 mm cards.
          pcbY={6.75}
          schX={-4}
          schY={3}
        />
        <resistor
          name="R_EMITTER"
          resistance={infrared ? "100" : "220"}
          tolerance="1%"
          manufacturerPartNumber={genericResistorMpn(infrared ? "100" : "220", "0603")}
          pinAttributes={{
            pin1: { requiresPower: true, mustBeConnected: true },
            pin2: { mustBeConnected: true },
          }}
          footprint="0603"
          connections={{ pin1: "net.VCC", pin2: "net.EMITTER" }}
          pcbX={0}
          pcbY={6.75}
          schX={-1}
          schY={3}
        />
        {interfaceKind === "i2c" && (
          <capacitor
            name="C_OPTICAL"
            capacitance="100nF"
            manufacturerPartNumber={genericCapacitorMpn("100nF", "0402")}
            pinAttributes={passivePinAttributes}
            connections={{ pin1: "net.VCC", pin2: "net.GND" }}
            footprint="0402"
            pcbX={5}
            pcbY={8}
            schX={2}
            schY={3}
            schOrientation="vertical"
            />
        )}
      </>
    )
  }

  if (family === "distance") {
    const ultrasonic = /ultrasonic/.test(text)
    return (
      <>
        <chip
          name="TX1"
          displayName={ultrasonic ? "40 kHz ultrasonic transmitter" : "IR transmitter"}
          manufacturerPartNumber={ultrasonic ? "TCT40-16T" : "VSMY1850"}
          pinLabels={{ pin1: "IN", pin2: "GND" }}
          pinAttributes={{ IN: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }}
          footprint={visualFootprint("distance", 2, "TX")}
          // Put the transducer bodies along the upper edge, clear of the
          // controller footprint and the connector-side decoupler.
          pcbX={-4}
          pcbY={8}
          schX={-4}
          schY={2}
        />
        <chip
          name="RX1"
          displayName={ultrasonic ? "40 kHz ultrasonic receiver" : "IR receiver"}
          manufacturerPartNumber={ultrasonic ? "TCT40-16R" : "GP1UXC41QS"}
          pinLabels={{ pin1: "OUT", pin2: "GND" }}
          pinAttributes={{ OUT: { requiresPower: true, mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true } }}
          footprint={visualFootprint("distance", 2, "RX")}
          pcbX={10}
          pcbY={8}
          schX={1}
          schY={2}
        />
        <trace name="DISTANCE_DRIVE" from={mainAt(signal1)} to="TX1.IN" />
        <trace name="DISTANCE_SENSE" from="RX1.OUT" to={mainAt(signal1)} />
        <trace name="DISTANCE_TX_GND" from="TX1.GND" to="J1.GND" />
        <trace name="DISTANCE_RX_GND" from="RX1.GND" to="J1.GND" />
      </>
    )
  }

  if (family === "motion" || family === "environmental") {
    const name = family === "motion" ? "C_MOTION" : "C_ENV"
    return (
      <>
        <capacitor
          name={name}
          capacitance="100nF"
          manufacturerPartNumber={genericCapacitorMpn("100nF", "0402")}
          pinAttributes={passivePinAttributes}
          connections={{ pin1: "net.VCC", pin2: "net.GND" }}
          maxDecouplingTraceLength="40mm"
          footprint="0402"
          pcbX={10}
          pcbY={family === "motion" ? 7 : 6}
          schX={7}
          schY={family === "motion" ? 3 : 4}
          schOrientation="vertical"
        />
      </>
    )
  }

  if (family === "gas" && interfaceKind === "i2c") {
    return (
      <>
        <capacitor
          name="C_SENSOR"
          capacitance="100nF"
          manufacturerPartNumber={genericCapacitorMpn("100nF", "0402")}
          pinAttributes={passivePinAttributes}
          connections={{ pin1: "net.VDD", pin2: "net.GND" }}
          footprint="0402"
          pcbX={10}
          pcbY={6}
          schX={7}
          schY={4}
          schOrientation="vertical"
        />
      </>
    )
  }

  if (family === "gas") {
    return (
      <>
        <opamp
          name="U3"
          displayName="LM358B signal conditioner"
          manufacturerPartNumber="LM358B"
          footprint="soic8"
          pinAttributes={{
            non_inverting_input: { mustBeConnected: true, isGpio: true },
            inverting_input: { doNotConnect: true },
            output: { mustBeConnected: true, isGpio: true },
            positive_supply: { requiresPower: true },
            negative_supply: { requiresGround: true },
            pin6: { doNotConnect: true },
            pin7: { doNotConnect: true },
            pin8: { doNotConnect: true },
          }}
          connections={{ positive_supply: "net.VCC", negative_supply: "net.GND" }}
          pcbX={14}
          pcbY={-10}
          schX={6}
          schY={-4}
        />
        <resistor
          name="R_SENSE"
          resistance="10k"
          tolerance="1%"
          manufacturerPartNumber={genericResistorMpn("10k", "0603")}
          pinAttributes={passivePinAttributes}
          connections={{ pin2: "net.GND" }}
          footprint="0603"
          pcbX={14}
          pcbY={-5}
          schX={6}
          schY={-1}
        />
        <led
          name="D_STATUS"
          displayName="Gas sensor status LED"
          manufacturerPartNumber="LTST-C190KRKT"
          color="red"
          pinAttributes={{
            pin1: { doNotConnect: true },
            pin2: { requiresGround: true, mustBeConnected: true },
          }}
          connections={{ pin2: "net.GND" }}
          footprint="0603"
          pcbX={19}
          pcbY={-5}
          schX={8}
          schY={-1}
        />
        <trace name="GAS_SIGNAL_STAGE" from={mainAt(signal1)} to="U3.non_inverting_input" />
        <trace name="GAS_OUTPUT" from="U3.output" to="J1.SIG" />
        <trace name="GAS_STATUS_FEED" from="U3.output" to="R_SENSE.pin1" />
      </>
    )
  }

  if (family === "display") {
    const rgb = /rgb|backlight|color/.test(text)
    return (
      <>
        {rgb ? (
          <>
            <resistor name="R_BL_R" resistance="100" tolerance="1%" manufacturerPartNumber={genericResistorMpn("100", "0603")} footprint="0603" pcbX={-4} pcbY={-7} schX={-4} schY={-3} />
            <resistor name="R_BL_G" resistance="100" tolerance="1%" manufacturerPartNumber={genericResistorMpn("100", "0603")} footprint="0603" pcbX={0} pcbY={-7} schX={0} schY={-3} />
            <resistor name="R_BL_B" resistance="100" tolerance="1%" manufacturerPartNumber={genericResistorMpn("100", "0603")} footprint="0603" pcbX={4} pcbY={-7} schX={4} schY={-3} />
              <trace name="BACKLIGHT_R" from="J1.VCC" to="R_BL_R.pin1" />
              <trace name="BACKLIGHT_G" from="J1.VCC" to="R_BL_G.pin1" />
              <trace name="BACKLIGHT_B" from="J1.VCC" to="R_BL_B.pin1" />
          </>
        ) : (
          <>
            <capacitor
              name="C_DISPLAY"
              capacitance="10uF"
              manufacturerPartNumber={genericCapacitorMpn("10uF", "0805")}
              pinAttributes={passivePinAttributes}
              connections={{ pin1: "net.VCC", pin2: "net.GND" }}
              footprint="0805"
              pcbX={10}
              pcbY={-7}
              schX={7}
              schY={-3}
              schOrientation="vertical"
            />
          </>
        )}
      </>
    )
  }

  if (family === "input" && /joystick|track ball/.test(text)) {
    return (
      <>
        <potentiometer
          name="RV2"
          displayName="Joystick Y axis"
          manufacturerPartNumber="WH09-2-103"
          maxResistance="10k"
          pinVariant="three_pin"
          footprint="potentiometer_pth_9mm"
          pcbX={0}
          pcbY={9}
          schX={5}
          schY={3}
        />
        <trace name="JOYSTICK_Y_VCC" from="J1.VCC" to="RV2.pin1" />
        <trace name="JOYSTICK_Y" from="RV2.pin2" to="J1.SIG" />
        <trace name="JOYSTICK_Y_GND" from="RV2.pin3" to="J1.GND" />
      </>
    )
  }

  if (family === "power") {
    if (/tb6612/.test(text)) {
      return (
        <>
          <chip
            name="MOTOR_A"
            displayName="Motor A output"
            manufacturerPartNumber="MOTOR-A-2PIN"
            pinLabels={{ pin1: "A1", pin2: "A2" }}
            pinAttributes={{ A1: { mustBeConnected: true }, A2: { mustBeConnected: true } }}
            footprint={packageFootprint({ packageName: "POWER-MODULE", pinCount: 2 })}
            pcbX={17}
            pcbY={-5}
            schX={8}
            schY={-3}
            schPinArrangement={{ leftSide: ["A1", "A2"] }}
          />
          <chip
            name="MOTOR_B"
            displayName="Motor B output"
            manufacturerPartNumber="MOTOR-B-2PIN"
            pinLabels={{ pin1: "B1", pin2: "B2" }}
            pinAttributes={{ B1: { mustBeConnected: true }, B2: { mustBeConnected: true } }}
            footprint={packageFootprint({ packageName: "POWER-MODULE", pinCount: 2 })}
            pcbX={17}
            pcbY={5}
            schX={8}
            schY={3}
            schPinArrangement={{ leftSide: ["B1", "B2"] }}
          />
          <trace name="MOTOR_A1" from="U1.AO1" to="MOTOR_A.A1" />
          <trace name="MOTOR_A2" from="U1.AO2" to="MOTOR_A.A2" />
          <trace name="MOTOR_B1" from="U1.BO1" to="MOTOR_B.B1" />
          <trace name="MOTOR_B2" from="U1.BO2" to="MOTOR_B.B2" />
        </>
      )
    }
    return (
      <>
        <led
          name="D_STATUS"
          displayName="Power/status LED"
          manufacturerPartNumber="LTST-C190KRKT"
          color="red"
          connections={{ pin1: "net.STATUS", pin2: "net.GND" }}
          footprint="0603"
          pcbX={-2}
          pcbY={7}
          schX={-1}
          schY={-4}
        />
        <resistor
          name="R_STATUS"
          resistance="1k"
          tolerance="1%"
          manufacturerPartNumber={genericResistorMpn("1k", "0603")}
          footprint="0603"
          pcbX={2}
          pcbY={7}
          schX={2}
          schY={-4}
          connections={{ pin1: "net.VCC", pin2: "net.STATUS" }}
        />
      </>
    )
  }

  return null
}

export const GroveDetailedModule = ({
  profile,
}: {
  profile: GroveDetailedProfile
}) => {
  const eagleSpec = sharedEagleSpecFor(profile)
  if (eagleSpec) {
    return <EagleBoardModule profile={profile} spec={eagleSpec} />
  }

  const spec = resolveSpec(profile)
  const interfaceKind = effectiveInterface(
    profile,
    `${profile.title} ${profile.primaryModel}`.toLowerCase(),
  )
  const [signal1, signal2] = signalLabels(interfaceKind)
  const boardLabel = compactLabel(profile.title, 32)
  const categoryLabel = compactLabel(profile.category, 20)
  const profileText = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  const visualFamily = visualFamilyFor(profile, profileText)
  const mainPinAttributes = pinAttributesFor(
    spec.pinLabels,
    spec.mainNeeds3v3 ? "3.3V" : profile.powerVoltage,
    interfaceKind,
  )
  const mainPinFor = (label: string) => {
    if (spec.pinLabels.includes(label)) return label
    const aliases: Record<string, string[]> = {
      SDA: ["SDI", "SDA"],
      SCL: ["SCK", "SCL"],
      VCC: ["VDD", "VDDIO", "VCC", "VIN"],
      VDD: ["VDD", "VDDIO", "VCC", "VIN"],
      GND: ["GND", "VSS", "GND1", "GND2"],
      SIG: ["SIG", "OUT", "OUTA", "OUTB", "INT1", "IRQ"],
    }
    return aliases[label]?.find((candidate) => spec.pinLabels.includes(candidate)) ?? label
  }
  const mainAt = (label: string) => signalEndpoint("U1", mainPinFor(label))
  const importedModel = importedModelFor(profile.primaryModel)
  const mainSchArrangement = (() => {
    const reserved = new Set<string>([signal1, signal2])
    const remaining = spec.pinLabels.filter((label) => !reserved.has(label))
    const leftCount = Math.ceil(spec.pinLabels.length / 2)
    const leftExtras = remaining.slice(0, Math.max(0, leftCount - (signal2 === "NC" ? 1 : 2)))
    return {
      leftSide: [signal1, ...(signal2 === "NC" ? [] : [signal2]), ...leftExtras],
      rightSide: remaining.slice(leftExtras.length),
    }
  })()
  const mainSchHeight = `${Math.max(0.4, (Math.ceil(spec.pinLabels.length / 2) - 1) * 0.2 + 0.2)}mm`
  const mainConnections = Object.fromEntries(
    spec.pinLabels.map((label) => {
      const netName = /^(?:GND|VSS|GND\d+|EP|EPAD)$/i.test(label)
        ? "GND"
          : /^(?:VDD\d*|VDDIO|VDDH)$/i.test(label)
          ? (spec.mainNeeds3v3 ? "VDD" : "VCC")
          : /^VM\d*$/i.test(label)
            ? (/tb6612/.test(`${profile.title} ${profile.primaryModel}`.toLowerCase()) ? "VCC" : "VDD")
          : /^(?:VCC\d*|VIN)$/i.test(label)
            ? (spec.mainNeeds3v3 ? "VDD" : "VCC")
          : /^(?:SCL|SCK)$/i.test(label)
            ? "SCL"
            : /^(?:SDA|SDI)$/i.test(label)
              ? "SDA"
              : /^(?:RX|TX)$/i.test(label)
                ? label
                : /^(?:SIG|DIN|DOUT|OUT|OUTA|OUTB|IN|INT1|IRQ)$/i.test(label)
                  ? "SIG"
                  : undefined
      return [label, netName ? `net.${netName}` : undefined]
    }).filter((entry): entry is [string, string] => !!entry[1]),
  )
    const decouplingX = spec.family === "input"
      ? 7
      : importedModel?.supplierPartNumber === "C3012627"
        ? -11.5
      : importedModel?.supplierPartNumber === "C490604"
        ? -12
        : visualFamily === "gas" || visualFamily === "wireless" || visualFamily === "power"
          ? -11
        : -5
  const regulatorCapX = importedModel?.supplierPartNumber === "C490604" ? -12 : -1.1
  // Keep I²C pull-ups clear of the regulator footprint on 3.3 V boards.
  const pullupX = spec.mainNeeds3v3 || importedModel?.supplierPartNumber === "C91322" ? -10 : -6
  const powerNet = spec.mainNeeds3v3 ? "U2.VOUT" : "J1.VCC"
  const mainPowerNetName = spec.mainNeeds3v3 ? "net.VDD" : "net.VCC"
  const mainPowerY = spec.pinLabels.length >= 8
    ? -0.7
    : spec.pinLabels.length >= 6 || spec.pinLabels.includes("VDD")
      ? -1.25
      : -0.625

  return (
    <board
      name={profile.name}
      title={profile.title}
      width={`${spec.boardWidth}mm`}
      height={`${spec.boardHeight}mm`}
      borderRadius="1mm"
      solderMaskColor="blue"
      minViaEdgeToPadEdgeClearance="0.05mm"
      minPadEdgeToPadEdgeClearance="0.03mm"
      // Long addressable chains are deliberately represented as a complete
      // schematic plus placed footprints.  Autorouting 10+ devices on a
      // single-row Grove card tends to drop escape vias into LED pads; leave
      // those source nets unrouted until a board-specific copper plan exists.
      routingDisabled={
        (!!spec.channelCount && spec.channelCount >= 10) ||
        visualFamily === "audio" ||
        visualFamily === "optical" ||
        profile.name === "GroveStepCounterBMA456"
      }
    >
      <net name="VCC" isPowerNet />
      <net name="VDD" isPowerNet />
      <net name="GND" isGroundNet />
      <net name="SCL" />
      <net name="SDA" />
      <net name="RX" />
      <net name="TX" />
      <net name="SIG" />
      <net name="EMITTER" />
      <net name="STATUS" />
      <GroveMountingHoles
        x={boardHoleX(spec.boardWidth)}
        y={boardHoleY(spec.boardHeight)}
      />
      <GroveConnector
        kind={interfaceKind}
        powerVoltage={profile.powerVoltage}
        pcbX={-spec.boardWidth / 2 + 6}
        pcbY={0}
        pcbRotation={-90}
        schX={-10}
        schY={0}
      />

      {spec.channelCount ? (
        <>
          {Array.from({ length: spec.channelCount }, (_, index) => {
            const name = `LED${index + 1}`
            const isRing = /ring/.test(profile.title.toLowerCase())
            const angle = (index / spec.channelCount!) * Math.PI * 2 - Math.PI / 2
            const radius = Math.min(spec.boardWidth, spec.boardHeight) / 2 - 5
            const ringCenterX = 3
            const pcbX = isRing
              ? ringCenterX + Math.cos(angle) * radius
              : -spec.boardWidth / 2 + 12 + index * 6
            const pcbY = isRing ? Math.sin(angle) * radius : spec.boardHeight > 20 ? (index % 2 === 0 ? 5 : -5) : 0
            // Leave a full symbol-width gap after the connector so the first
            // addressable LED does not overlap the Grove jumper in the
            // schematic.
            const schX = -7.8 + index * 2.2
            const isLast = index === spec.channelCount! - 1
            return (
              <chip
                key={name}
                name={name}
                displayName={spec.mainPart}
                manufacturerPartNumber={spec.mainPart}
                pinLabels={{
                  pin1: "DIN",
                  pin2: "DOUT",
                  pin3: "VCC",
                  pin4: "GND",
                }}
                pinAttributes={{
                  DIN: { mustBeConnected: true, isGpio: true },
                  DOUT: isLast
                    ? { doNotConnect: true }
                    : { mustBeConnected: true, isGpio: true },
                  VCC: { requiresPower: true, requiresVoltage: "5V" },
                  GND: { requiresGround: true },
                }}
                noConnect={isLast ? ["DOUT"] : []}
                footprint={packageFootprint({ packageName: "LED-ADDRESSABLE", pinCount: 4 })}
                pcbX={pcbX}
                pcbY={pcbY}
                pcbRotation={isRing ? (angle * 180) / Math.PI + 90 : 0}
                schX={schX}
                schY={0}
                schPinArrangement={{
                  leftSide: ["DIN", "VCC"],
                  rightSide: ["DOUT", "GND"],
                }}
                schWidth="1.6mm"
                schHeight="1mm"
              />
            )
          })}
          {Array.from({ length: spec.channelCount }, (_, index) => {
            const name = `C${index + 1}`
            const isRing = /ring/.test(profile.title.toLowerCase())
            const angle = (index / spec.channelCount!) * Math.PI * 2 - Math.PI / 2
            const radius = Math.min(spec.boardWidth, spec.boardHeight) / 2 - 5
            const ringCenterX = 3
            const ledX = isRing
              ? ringCenterX + Math.cos(angle) * radius
              : -spec.boardWidth / 2 + 12 + index * 6
            const ledY = isRing ? Math.sin(angle) * radius : spec.boardHeight > 20 ? (index % 2 === 0 ? 5 : -5) : 0
            return (
              <capacitor
                key={name}
                name={name}
                capacitance="100nF"
                manufacturerPartNumber={genericCapacitorMpn("100nF", "0402")}
                pinAttributes={passivePinAttributes}
          maxDecouplingTraceLength="40mm"
                footprint="0402"
                pcbX={isRing ? ledX * 0.82 : ledX + 2.7}
                pcbY={isRing ? ledY * 0.82 : ledY + 2.2}
                schX={-7.8 + index * 2.2}
                schY={5}
                schOrientation="vertical"
              />
            )
          })}
          <trace from={`J1.${signal1}`} to="LED1.DIN" />
          {Array.from({ length: spec.channelCount - 1 }, (_, index) => (
            <Fragment key={`data-${index + 1}`}>
              <trace
                name={`DATA_${index + 1}_${index + 2}`}
                from={`LED${index + 1}.DOUT`}
                to={`LED${index + 2}.DIN`}
              />
            </Fragment>
          ))}
          <trace from="J1.VCC" to="LED1.VCC" name="VCC_FEED" />
          <trace from="J1.GND" to="LED1.GND" name="GND_FEED" />
          {Array.from({ length: spec.channelCount }, (_, index) => (
            <Fragment key={`power-${index + 1}`}>
              {index > 0 && (
                <>
                  <trace name={`VCC_${index}_${index + 1}`} from={`LED${index}.VCC`} to={`LED${index + 1}.VCC`} />
                  <trace name={`GND_${index}_${index + 1}`} from={`LED${index}.GND`} to={`LED${index + 1}.GND`} />
                </>
              )}
              <trace from={`LED${index + 1}.VCC`} to={`C${index + 1}.pin2`} />
              <trace from={`C${index + 1}.pin1`} to={`LED${index + 1}.GND`} />
            </Fragment>
          ))}
        </>
      ) : (
        <>
          <chip
            name="U1"
            displayName={spec.mainPart}
            manufacturerPartNumber={profile.manufacturerPartNumber}
            datasheetUrl={profile.sourceUrl}
            pinLabels={Object.fromEntries(
              spec.pinLabels.map((label, index) => [`pin${index + 1}`, label]),
            )}
            pinAttributes={mainPinAttributes}
            noConnect={spec.pinLabels.filter(
              (label) => mainPinAttributes[label]?.doNotConnect,
            )}
            connections={mainConnections}
            supplierPartNumbers={importedModel ? { jlcpcb: [importedModel.supplierPartNumber] } : undefined}
            schPinArrangement={{
              leftSide: mainSchArrangement.leftSide,
              rightSide: mainSchArrangement.rightSide,
            }}
            schHeight={mainSchHeight}
            footprint={importedModel
              ? importedModel.footprint
              : visualFootprint(
                  visualFamily,
                  spec.pinLabels.length,
                  spec.packageName,
                )}
            pcbX={spec.family === "input" && interfaceKind !== "i2c" ? 0 : spec.family === "display" ? (spec.boardWidth > 50 ? 8 : 3) : visualFamily === "gas" ? 5 : 4}
            pcbY={0}
            schX={2}
            schY={
              schematicMainYOverrides[profile.name] ?? (
              profile.primaryModel === "SHT31" || profile.primaryModel === "SHT35"
                ? -0.1
                : schematicAlignDownProfiles.has(profile.name)
                  ? 0.1
                  : 0
              )
            }
          />

          {spec.mainNeeds3v3 && (
            <chip
              name="U2"
              displayName="XC6206P332MR-G"
              manufacturerPartNumber="XC6206P332MR-G"
              pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }}
              pinAttributes={{
                GND: { requiresGround: true },
                VOUT: { mustBeConnected: true },
                VIN: { requiresPower: true, requiresVoltage: profile.powerVoltage },
              }}
              connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }}
              footprint={packageFootprint({ packageName: "SOT23", pinCount: 3 })}
              pcbX={-5}
              pcbY={-5}
              schX={-3}
              schY={-4}
              schPinArrangement={{
                leftSide: ["VIN", "GND"],
                rightSide: ["VOUT"],
              }}
              schHeight="0.4mm"
            />
          )}

          <FamilySupport
            family={visualFamily}
            profile={profile}
            spec={spec}
            interfaceKind={interfaceKind}
            signal1={signal1}
            signal2={signal2}
            mainAt={mainAt}
          />

          <capacitor
            name="C1"
            capacitance="100nF"
            manufacturerPartNumber={genericCapacitorMpn("100nF", "0402")}
            pinAttributes={passivePinAttributes}
            connections={{ pin1: mainPowerNetName, pin2: "net.GND" }}
            maxDecouplingTraceLength="40mm"
            maxVoltageRating={profile.powerVoltage}
            footprint="0402"
            pcbX={decouplingX}
            pcbY={mainPowerY}
            schX={7}
            schY={4}
            schOrientation="vertical"
          />
          <trace from={mainAt(spec.pinLabels.includes("VDD") ? "VDD" : "VCC")} to="C1.pin1" />
          <trace from="C1.pin2" to={mainAt("GND")} />

          {importedModel?.supplierPartNumber !== "C555456" && spec.pinLabels
            .filter((label) => /^(?:VSS|GND\d+|EP|EPAD)$/i.test(label))
            .map((label) => {
              const canonical = /^(?:VSS|GND\d+|EP|EPAD)$/i.test(label) ? "GND" : "VDD"
              const canonicalPin = mainPinFor(canonical)
              if (label === canonicalPin) return null
              return (
                <trace
                  key={`U1-${label}-${canonical}`}
                  name={`U1_${label}_${canonical}`}
                  from={mainAt(label)}
                  to={mainAt(canonical)}
                />
              )
            })}

          {spec.mainNeeds3v3 && (
            <>
              <capacitor
                name="C2"
                capacitance="1uF"
                manufacturerPartNumber={genericCapacitorMpn("1uF", "0603")}
                pinAttributes={passivePinAttributes}
                connections={{ pin1: "net.VCC", pin2: "net.GND" }}
                maxDecouplingTraceLength="40mm"
                maxVoltageRating={profile.powerVoltage}
                footprint="0603"
                pcbX={regulatorCapX}
                pcbY={-2.875}
                schX={-6}
                schY={-4}
                schOrientation="vertical"
              />
              <trace from="J1.VCC" to="U2.VIN" />
              <trace from="U2.GND" to="J1.GND" />
              <trace from="U2.VOUT" to={mainAt("VDD")} />
              <trace from="C2.pin1" to="U2.VIN" />
              <trace from="C2.pin2" to="U2.GND" />
            </>
          )}

          {!spec.mainNeeds3v3 && (
            <>
              <trace from={`J1.${signal1}`} to={mainAt(signal1)} />
              {signal2 !== "NC" && <trace from={`J1.${signal2}`} to={mainAt(signal2)} />}
              <trace from="J1.VCC" to={mainAt(spec.pinLabels.includes("VDD") ? "VDD" : "VCC")} />
              <trace from="J1.GND" to={mainAt("GND")} />
            </>
          )}

          {spec.mainNeeds3v3 && (
            <>
              <trace from={`J1.${signal1}`} to={mainAt(signal1)} />
              {signal2 !== "NC" && <trace from={`J1.${signal2}`} to={mainAt(signal2)} />}
              <trace from="J1.GND" to={mainAt("GND")} />
            </>
          )}

          {interfaceKind === "i2c" && (
            <>
              <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber={genericResistorMpn("4.7k", "0402")} pinAttributes={passivePinAttributes} connections={{ pin1: mainPowerNetName, pin2: "net.SCL" }} footprint="0402" pcbX={pullupX} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber={genericResistorMpn("4.7k", "0402")} pinAttributes={passivePinAttributes} connections={{ pin1: mainPowerNetName, pin2: "net.SDA" }} footprint="0402" pcbX={pullupX} pcbY={-5} schX={-3} schY={-5} />
              {profile.name === "GroveStepCounterBMA456" ? (
                <>
                  <trace from="R1.pin2" to="U1.SCL" />
                  <trace from="R2.pin2" to="U1.SDA" />
                </>
              ) : (
                <>
                  <trace from={powerNet} to="R1.pin1" />
                  <trace from="R1.pin2" to={`J1.${signal1}`} />
                  <trace from={powerNet} to="R2.pin1" />
                  <trace from="R2.pin2" to={`J1.${signal2}`} />
                </>
              )}
            </>
          )}

          {interfaceKind === "uart" && (
            <>
              <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber={genericResistorMpn("1k", "0402")} pinAttributes={passivePinAttributes} connections={{ pin1: "net.RX", pin2: "net.RX" }} footprint="0402" pcbX={-4} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="1k" tolerance="1%" manufacturerPartNumber={genericResistorMpn("1k", "0402")} pinAttributes={passivePinAttributes} connections={{ pin1: "net.TX", pin2: "net.TX" }} footprint="0402" pcbX={-4} pcbY={-5} schX={-3} schY={-5} />
              <trace from="J1.RX" to="R1.pin1" />
              <trace from="R1.pin2" to={mainAt("RX")} />
              <trace from="J1.TX" to="R2.pin1" />
              <trace from="R2.pin2" to={mainAt("TX")} />
            </>
          )}

          {(interfaceKind === "analog" || interfaceKind === "digital") && visualFamily !== "optical" && (
            <>
              <resistor
                name="R1"
                resistance={spec.family === "sensor" ? "10k" : "1k"}
                tolerance="1%"
                manufacturerPartNumber={genericResistorMpn(spec.family === "sensor" ? "10k" : "1k", "0603")}
                pinAttributes={passivePinAttributes}
                connections={{ pin1: "net.SIG", pin2: "net.GND" }}
                footprint="0603"
                pcbX={-4}
                pcbY={5}
                schX={-3}
                schY={5}
              />
              <trace from={`J1.${signal1}`} to={mainAt(signal1)} />
              <trace from={`J1.${signal1}`} to="R1.pin1" />
              <trace from="R1.pin2" to="J1.GND" />
              <trace name="R1_GROUND_RETURN" from="R1.pin2" to={mainAt("GND")} />
            </>
          )}

          {spec.family === "input" && /potentiometer|rotary angle|slide pot|joystick/.test(profile.title.toLowerCase()) && (
            <>
              <potentiometer
                name="RV1"
                displayName={spec.mainPart}
                manufacturerPartNumber="WH09-2-103"
                maxResistance="10k"
                pinVariant="three_pin"
                pinAttributes={{
                  pin1: { requiresPower: true, mustBeConnected: true },
                  pin2: { mustBeConnected: true, isGpio: true },
                  pin3: { requiresGround: true, mustBeConnected: true },
                }}
                footprint="potentiometer_pth_9mm"
                // Keep the 9mm control body clear of the main sensor package.
                pcbX={10}
                pcbY={0}
                schX={6}
                schY={0}
              />
              <trace from="J1.VCC" to="RV1.pin1" />
              <trace from="RV1.pin2" to="J1.SIG" />
              <trace from="RV1.pin3" to="J1.GND" />
            </>
          )}

          {spec.family === "input" && /button|switch|key/.test(profile.title.toLowerCase()) && (
            <>
              <pushbutton
                name="SW1"
                displayName={spec.mainPart}
                manufacturerPartNumber="B3F-1000"
                pinAttributes={{
                  pin1: { requiresPower: true, mustBeConnected: true },
                  pin2: { requiresGround: true, mustBeConnected: true },
                }}
                footprint={packageFootprint({ packageName: "BUTTON-6MM", pinCount: 2 })}
                // The 6mm switch body otherwise overlaps the main package by
                // about 1mm on the compact 30mm Grove boards.
                pcbX={spec.boardWidth / 2 - 3.5}
                pcbY={0}
                schX={6}
                schY={0}
              />
              <trace from="J1.VCC" to="SW1.pin1" />
              <trace from="SW1.pin2" to="J1.SIG" />
            </>
          )}

          {spec.family === "communications" && (
            <>
              <chip
                name="ANT1"
                displayName="Antenna / RF matching"
                manufacturerPartNumber="ANT-2.4G"
                pinLabels={{ pin1: "IN", pin2: "GND" }}
                pinAttributes={{ IN: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true } }}
                footprint={packageFootprint({ packageName: "RF-MODULE", pinCount: 2 })}
                pcbX={spec.boardWidth / 2 - 8}
                pcbY={-5}
                schX={7}
                schY={-4}
                schPinArrangement={{ leftSide: ["IN"], rightSide: ["GND"] }}
                schWidth="1.2mm"
                schHeight="0.4mm"
              />
              <trace from={mainAt("TX")} to="ANT1.IN" />
              <trace from="ANT1.GND" to="J1.GND" />
            </>
          )}

          {spec.family === "actuator" && spec.externalLoad && (
            <>
              <mosfet
                name="Q1"
                displayName="2N7002"
                manufacturerPartNumber="2N7002"
                channelType="n"
                mosfetMode="enhancement"
                pinAttributes={{
                  gate: { mustBeConnected: true, isGpio: true },
                  source: { requiresGround: true, mustBeConnected: true },
                  drain: { requiresPower: true, mustBeConnected: true },
                }}
                footprint="sot23"
                pcbX={10}
                pcbY={-5}
                schX={6}
                schY={-3}
              />
              <chip
                name="LOAD1"
                displayName={spec.loadName ?? "Load"}
                manufacturerPartNumber={spec.loadName}
                pinLabels={{ pin1: "POS", pin2: "NEG" }}
                pinAttributes={{ POS: { requiresPower: true, mustBeConnected: true }, NEG: { requiresGround: true, mustBeConnected: true } }}
                footprint={packageFootprint({ packageName: "POWER-MODULE", pinCount: 2 })}
                pcbX={spec.boardWidth / 2 - 8}
                pcbY={4}
                schX={8}
                schY={3}
                schPinArrangement={{ leftSide: ["NEG"], rightSide: ["POS"] }}
                schWidth="1.4mm"
                schHeight="0.4mm"
              />
              <diode name="D1" displayName="1N4148W flyback diode" manufacturerPartNumber="1N4148W" footprint="0603" pcbX={10} pcbY={2} schX={6} schY={3} />
              <trace from={`J1.${interfaceKind === "i2c" ? signal2 : signal1}`} to="Q1.gate" />
              <trace from="Q1.source" to="J1.GND" />
              <trace from="Q1.drain" to="LOAD1.NEG" />
              <trace from="LOAD1.POS" to="J1.VCC" />
              <trace from="LOAD1.POS" to="D1.anode" />
              <trace from="D1.cathode" to="LOAD1.NEG" />
            </>
          )}

          {spec.family === "sensor" && /gas|mq\d|oxygen|co2|hcho|air quality|heater/.test(profile.title.toLowerCase()) && (
            <>
              <resistor name="RHEAT" resistance="33" tolerance="5%" manufacturerPartNumber={genericResistorMpn("33", "1206")} pinAttributes={passivePinAttributes} footprint="1206" pcbX={10} pcbY={-5} schX={7} schY={-5} />
              <trace from="J1.VCC" to="RHEAT.pin1" />
              <trace from="RHEAT.pin2" to="J1.GND" />
            </>
          )}
        </>
      )}

      <silkscreentext text={boardLabel} pcbX={0} pcbY={spec.boardHeight / 2 - 1.5} fontSize="0.65mm" />
      <silkscreentext text={categoryLabel} pcbX={0} pcbY={-spec.boardHeight / 2 + 1.5} fontSize="0.6mm" />
    </board>
  )
}
