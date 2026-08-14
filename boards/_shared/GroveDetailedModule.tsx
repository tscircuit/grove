import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "./GroveParts"

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

type PinAttribute = {
  requiresPower?: boolean
  requiresGround?: boolean
  requiresVoltage?: string
  mustBeConnected?: boolean
  doNotConnect?: boolean
  isGpio?: boolean
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
      pinLabels: ["SDA", "SCL", "VDD", "GND", "ADDR", "INT"],
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
    if (label === "VCC" || label === "VDD") {
      attributes[label] = {
        requiresPower: true,
        requiresVoltage: powerVoltage,
        mustBeConnected: true,
      }
    } else if (label === "GND") {
      attributes[label] = { requiresGround: true, mustBeConnected: true }
    } else if (label === signal1 || label === signal2 || label === "SIG") {
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
  const mainAt = (label: string) => signalEndpoint("U1", label)
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
    >
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
            const schX = -10 + index * 2.2
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
                maxDecouplingTraceLength="20mm"
                footprint="0402"
                pcbX={pcbX + 2.7}
                pcbY={ledY + 2.2}
                schX={-10 + index * 2.2}
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
            schPinArrangement={{
              leftSide: [signal1, ...(signal2 === "NC" ? [] : [signal2])],
              rightSide: spec.pinLabels.filter(
                (label) => label !== signal1 && label !== signal2,
              ),
            }}
            schWidth={spec.pinLabels.length >= 8 ? "4.5mm" : "2.6mm"}
            schHeight={spec.pinLabels.length >= 8 ? "2.4mm" : "1.8mm"}
            footprint={packageFootprint({
              packageName: spec.packageName,
              pinCount: spec.pinLabels.length,
            })}
            pcbX={spec.family === "display" ? 5 : 4}
            pcbY={0}
            schX={2}
            schY={0}
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
              schWidth="2mm"
              schHeight="1.5mm"
            />
          )}

          <capacitor
            name="C1"
            capacitance="100nF"
            maxDecouplingTraceLength="20mm"
            maxVoltageRating={profile.powerVoltage}
            footprint="0402"
            pcbX={2.3}
            pcbY={mainPowerY}
            schX={7}
            schY={4}
            schOrientation="vertical"
          />
          <trace from={mainAt(spec.pinLabels.includes("VDD") ? "VDD" : "VCC")} to="C1.pin1" />
          <trace from="C1.pin2" to={mainAt("GND")} />

          {spec.mainNeeds3v3 && (
            <>
              <capacitor
                name="C2"
                capacitance="1uF"
                maxDecouplingTraceLength="20mm"
                maxVoltageRating={profile.powerVoltage}
                footprint="0603"
                pcbX={-1.1}
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
              <resistor name="R1" resistance="4.7k" tolerance="1%" footprint="0402" pcbX={-6} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="4.7k" tolerance="1%" footprint="0402" pcbX={-6} pcbY={-5} schX={-3} schY={-5} />
              <trace from={powerNet} to="R1.pin1" />
              <trace from="R1.pin2" to={`J1.${signal1}`} />
              <trace from={powerNet} to="R2.pin1" />
              <trace from="R2.pin2" to={`J1.${signal2}`} />
            </>
          )}

          {interfaceKind === "uart" && (
            <>
              <resistor name="R1" resistance="1k" tolerance="1%" footprint="0402" pcbX={-4} pcbY={5} schX={-3} schY={5} />
              <resistor name="R2" resistance="1k" tolerance="1%" footprint="0402" pcbX={-4} pcbY={-5} schX={-3} schY={-5} />
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
                footprint="potentiometer_pth_9mm"
                pcbX={8}
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
                footprint={packageFootprint({ packageName: "BUTTON-6MM", pinCount: 2 })}
                pcbX={8}
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
                schWidth="2mm"
                schHeight="1.2mm"
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
                schWidth="2.4mm"
                schHeight="1.6mm"
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
              <resistor name="RHEAT" resistance="33" tolerance="5%" footprint="1206" pcbX={10} pcbY={-5} schX={7} schY={-5} />
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
