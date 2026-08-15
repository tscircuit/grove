import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "./GroveParts"
import { EagleBoardModule } from "./EagleBoardModule"
import { groveEagleSpecs } from "./groveEagleSpecs"

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

const resolveSpec = (profile: GroveDetailedProfile): ModuleSpec => {
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
  const mainNeeds3v3 = /aht20|sht\d|bme\d|bmp\d|dps310|mcp9808|mcp9600|sgp\d|scd\d|sen5|sfa30|vl53|amg8833|mlx\d|as5600|mpr121|pca9685|ads1115|tca9548|lis3d|bma\d|bmi\d|icm\d|ak099|tmg39931|veml|qwiic|st25dv/.test(text)
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
      ? 4.5
      : pinCount >= 12
        ? 6.5
        : 5.5
  const bodyHeight = packageName === "DISPLAY-MODULE" ? 8 : Math.max(4, (perSide - 1) * spacing + 2)
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

const pinAttributesFor = (
  labels: readonly string[],
  powerVoltage: "3.3V" | "5V",
  interfaceKind: GroveInterfaceKind,
) => {
  const [signal1, signal2] = signalLabels(interfaceKind)
  const attributes: Record<string, PinAttribute> = {}
  for (const label of labels) {
    if (/^(?:VCC|VDD|VDDIO|VDDH|VIN)$/i.test(label)) {
      attributes[label] = {
        requiresPower: true,
        requiresVoltage: powerVoltage,
        mustBeConnected: true,
      }
    } else if (/^(?:GND|VSS|GND\d+|EP|EPAD)$/i.test(label)) {
      attributes[label] = { requiresGround: true, mustBeConnected: true }
    } else if (
      label === signal1 ||
      label === signal2 ||
      label === "SIG" ||
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

export const GroveDetailedModule = ({
  profile,
}: {
  profile: GroveDetailedProfile
}) => {
  const eagleSpec = groveEagleSpecs[profile.name]
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
        : /^(?:VCC|VDD|VDDIO|VDDH|VIN)$/i.test(label)
          ? "VDD"
          : /^(?:SCL|SCK)$/i.test(label)
            ? "SCL"
            : /^(?:SDA|SDI)$/i.test(label)
              ? "SDA"
              : /^(?:RX|TX)$/i.test(label)
                ? label
                : undefined
      return [label, netName ? `net.${netName}` : undefined]
    }).filter((entry): entry is [string, string] => !!entry[1]),
  )
  const decouplingX = importedModel?.supplierPartNumber === "C3012627"
      ? -8
      : importedModel?.supplierPartNumber === "C490604"
        ? -6
        : -5
  const regulatorCapX = importedModel?.supplierPartNumber === "C490604" ? -8 : -1.1
  // Keep I²C pull-ups clear of the regulator footprint on 3.3 V boards.
  const pullupX = spec.mainNeeds3v3 || importedModel?.supplierPartNumber === "C91322" ? -10 : -6
  const powerNet = spec.mainNeeds3v3 ? "U2.VOUT" : "J1.VCC"
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
    >
      <net name="VCC" isPowerNet />
      <net name="VDD" isPowerNet />
      <net name="GND" isGroundNet />
      <net name="SCL" />
      <net name="SDA" />
      <net name="RX" />
      <net name="TX" />
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
            const pcbX = -spec.boardWidth / 2 + 12 + index * 6
            const isRing = /ring/.test(profile.title.toLowerCase())
            const pcbY = isRing ? 0 : spec.boardHeight > 20 ? (index % 2 === 0 ? 8 : -8) : 0
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
                footprint={packageFootprint({ packageName: spec.packageName, pinCount: 4 })}
                pcbX={pcbX}
                pcbY={pcbY}
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
            const pcbX = -spec.boardWidth / 2 + 12 + index * 6
            const isRing = /ring/.test(profile.title.toLowerCase())
            const ledY = isRing ? 0 : spec.boardHeight > 20 ? (index % 2 === 0 ? 8 : -8) : 0
            return (
              <capacitor
                key={name}
                name={name}
                capacitance="100nF"
                pinAttributes={passivePinAttributes}
                maxDecouplingTraceLength="20mm"
                footprint="0402"
                pcbX={pcbX + 2.7}
                pcbY={ledY + 2.2}
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
            connections={importedModel?.supplierPartNumber === "C555456" ? mainConnections : undefined}
            supplierPartNumbers={importedModel ? { jlcpcb: [importedModel.supplierPartNumber] } : undefined}
            schPinArrangement={{
              leftSide: mainSchArrangement.leftSide,
              rightSide: mainSchArrangement.rightSide,
            }}
            schHeight={mainSchHeight}
            footprint={importedModel
              ? importedModel.footprint
              : packageFootprint({
                  packageName: spec.packageName,
                  pinCount: spec.pinLabels.length,
                })}
            pcbX={spec.family === "display" ? 5 : 4}
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

          <capacitor
            name="C1"
            capacitance="100nF"
            pinAttributes={passivePinAttributes}
            maxDecouplingTraceLength="20mm"
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
            .filter((label) => /^(?:VDDIO|VDDH|VSS|GND\d+|EP|EPAD)$/i.test(label))
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
                pinAttributes={passivePinAttributes}
                maxDecouplingTraceLength="20mm"
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
              <resistor name="R1" resistance="4.7k" tolerance="1%" pinAttributes={passivePinAttributes} footprint="0402" pcbX={pullupX} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="4.7k" tolerance="1%" pinAttributes={passivePinAttributes} footprint="0402" pcbX={pullupX} pcbY={-5} schX={-3} schY={-5} />
              <trace from={powerNet} to="R1.pin1" />
              <trace from="R1.pin2" to={`J1.${signal1}`} />
              <trace from={powerNet} to="R2.pin1" />
              <trace from="R2.pin2" to={`J1.${signal2}`} />
            </>
          )}

          {interfaceKind === "uart" && (
            <>
              <resistor name="R1" resistance="1k" tolerance="1%" pinAttributes={passivePinAttributes} footprint="0402" pcbX={-4} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="1k" tolerance="1%" pinAttributes={passivePinAttributes} footprint="0402" pcbX={-4} pcbY={-5} schX={-3} schY={-5} />
              <trace from="J1.RX" to="R1.pin1" />
              <trace from="R1.pin2" to={mainAt("RX")} />
              <trace from="J1.TX" to="R2.pin1" />
              <trace from="R2.pin2" to={mainAt("TX")} />
            </>
          )}

          {(interfaceKind === "analog" || interfaceKind === "digital") && (
            <>
              <resistor
                name="R1"
                resistance={spec.family === "sensor" ? "10k" : "1k"}
                tolerance="1%"
                pinAttributes={passivePinAttributes}
                footprint="0603"
                pcbX={-4}
                pcbY={5}
                schX={-3}
                schY={5}
              />
              <trace from={`J1.${signal1}`} to={mainAt(signal1)} />
              <trace from={`J1.${signal1}`} to="R1.pin1" />
              <trace from="R1.pin2" to="J1.GND" />
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
                pcbX={10.5}
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
                pinAttributes={{ IN: { mustBeConnected: true }, GND: { requiresGround: true } }}
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
                pinAttributes={{ POS: { requiresPower: true }, NEG: { mustBeConnected: true } }}
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
              <resistor name="RHEAT" resistance="33" tolerance="5%" pinAttributes={passivePinAttributes} footprint="1206" pcbX={10} pcbY={-5} schX={7} schY={-5} />
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
