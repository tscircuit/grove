import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"
import { groveEagleSpecs } from "../boards/_shared/groveEagleSpecs"

type Profile = (typeof groveCatalogueManifest)[number]
type EagleSpec = any

const repoRoot = join(import.meta.dir, "..")

const importedModels: Record<string, { supplierPartNumber: string; footprint: string; pinLabels: string[] }> = {
  ADXL345: { supplierPartNumber: "C9667", footprint: "jlcpcb:C9667", pinLabels: ["VDDIO", "VDD", "GND", "GND", "INT1", "INT2", "SDO", "SDA", "SCL", "CS", "NC", "NC", "GND", "GND"] },
  AHT20: { supplierPartNumber: "C2757850", footprint: "jlcpcb:C2757850", pinLabels: ["NC1", "VDD", "SCL", "SDA", "GND", "NC2"] },
  BME280: { supplierPartNumber: "C92489", footprint: "jlcpcb:C92489", pinLabels: ["GND1", "CSB", "SDA", "SCL", "SDO", "VDDIO", "GND2", "VDD"] },
  BMA456: { supplierPartNumber: "C189518", footprint: "jlcpcb:C189518", pinLabels: ["VDD", "GND", "SCL", "SDA", "SDO", "CS", "INT1", "INT2", "VDDIO", "GND", "NC", "NC"] },
  BMP280: { supplierPartNumber: "C83291", footprint: "jlcpcb:C83291", pinLabels: ["GND2", "CSB", "SDA", "SCL", "SDO", "VDDIO", "GND1", "VDD"] },
  DHT20: { supplierPartNumber: "C3012627", footprint: "jlcpcb:C3012627", pinLabels: ["VDD", "SDA", "GND", "SCL"] },
  DS1307: { supplierPartNumber: "C18723598", footprint: "jlcpcb:C18723598", pinLabels: ["SQW", "X1", "X2", "GND", "SDA", "SCL", "VBAT", "VCC"] },
  MLX90614: { supplierPartNumber: "C490604", footprint: "jlcpcb:C490604", pinLabels: ["SCL", "SDA", "VDD", "VSS"] },
  MPR121: { supplierPartNumber: "C91322", footprint: "jlcpcb:C91322", pinLabels: ["IRQ", "SCL", "SDA", "ADDR", "VREG", "VSS", "REXT", "ELE0", "ELE1", "ELE2", "ELE3", "ELE4", "ELE5", "ELE6", "ELE7", "ELE8", "ELE9", "ELE10", "ELE11", "VDD"] },
  SGP40: { supplierPartNumber: "C2874215", footprint: "jlcpcb:C2874215", pinLabels: ["VDD", "VSS", "SDA", "NC", "VDDH", "SCL", "GND"] },
  SGP41: { supplierPartNumber: "C3659325", footprint: "jlcpcb:C3659325", pinLabels: ["VDD", "VSS", "SDA", "NC", "VDDH", "SCL", "EP"] },
  SHT40: { supplierPartNumber: "C2909890", footprint: "jlcpcb:C2909890", pinLabels: ["SDA", "SCL", "VDD", "VSS", "EP"] },
  SHT31: { supplierPartNumber: "C80862", footprint: "jlcpcb:C80862", pinLabels: ["SDA", "ADDR", "ALERT", "SCL", "VDD", "NRESET", "NC", "GND", "EP"] },
  SHT35: { supplierPartNumber: "C90161", footprint: "jlcpcb:C90161", pinLabels: ["SDA", "ADDR", "ALERT", "SCL", "VDD", "NRESET", "NC", "GND", "EP"] },
  SHT4X: { supplierPartNumber: "C2909890", footprint: "jlcpcb:C2909890", pinLabels: ["SDA", "SCL", "VDD", "VSS", "EP"] },
  TCA9548: { supplierPartNumber: "C555456", footprint: "jlcpcb:C555456", pinLabels: ["SD0", "SC0", "SD1", "SC1", "SD2", "SC2", "SD3", "SC3", "GND", "SD4", "SC4", "SD5", "SC5", "SD6", "SC6", "SD7", "SC7", "A2", "SCL", "SDA", "VCC", "A0", "A1", "RESET", "EP"] },
  AS5600: { supplierPartNumber: "C499458", footprint: "jlcpcb:C499458", pinLabels: ["VDD", "GND", "OUT", "DIR", "SCL", "SDA", "GND", "VDD"] },
}

const keyForModel = (model: string) => model.toUpperCase().replace(/[^A-Z0-9]/g, "")
const uniquePinLabels = (labels: string[]) => {
  const counts = new Map<string, number>()
  return labels.map((label) => {
    const count = counts.get(label) ?? 0
    counts.set(label, count + 1)
    return count === 0 ? label : `${label}_${count + 1}`
  })
}
const importedModelFor = (model: string) => {
  const key = keyForModel(model)
  const modelData = Object.entries(importedModels).find(([name]) => key === keyForModel(name) || key.startsWith(keyForModel(name)))?.[1]
  return modelData ? { ...modelData, pinLabels: uniquePinLabels(modelData.pinLabels) } : undefined
}

const effectiveInterface = (profile: Profile) => {
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  if (/chainable rgb led|rgb led matrix|led matrix driver|p9813/.test(text)) return "digital"
  if (/\bi2c\b|dht20|sht\d|aht\d|bme\d|bmp\d|mcp\d|scd\d|sgp\d|vl53|amg\d|mlx\d|as3935|as5600|pca9685|ht16k33|tca9548|ads1115|rtc|nfc|tmg39931|lis3dhtr|bma\d|bmi\d|dps310|mpr121|sen5|sen54|sen55|sfa30|veml|qwiic|st25dv|display|matrix/.test(text)) return "i2c"
  if (/\buart\b|wifi|bluetooth|\bble\b|gps|\brf\b|lora|rfid|serial|rs232|rs485|dmx|vision ai|mp3|speech|voice|camera/.test(text)) return "uart"
  if (profile.detailKind === "communications") return "uart"
  return profile.interfaceKind
}

const familyFor = (profile: Profile, text: string) => {
  if (/display|lcd|oled|e-ink|matrix/.test(text)) return "display"
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

const channelCountFor = (text: string) => {
  const match = text.match(/(?:stick|ring|strip|bar|channel)[^0-9]{0,8}(\d{1,2})/i)
  const count = match ? Number(match[1]) : undefined
  return count && count >= 2 && count <= 32 ? count : undefined
}

const boardSizeFor = (profile: Profile, family: string, text: string, channels?: number) => {
  if (channels) {
    if (/ring/.test(text)) {
      // Keep a real clearance envelope around each 3.8 mm pixel footprint.
      // A 24-pixel ring cannot fit on the old 48 mm board without adjacent
      // footprints (and their bypass capacitors) touching.
      const diameter = Math.max(48, Math.ceil(channels / 8) * 24)
      return { width: diameter, height: diameter }
    }
    return { width: Math.max(72, channels * 6 + 14), height: 16 }
  }
  if (/tca9548|i2c hub|i2c multiplexer/.test(text)) return { width: 52, height: 28 }
  if (/gas|mq[- ]?\d|oxygen|co2|hcho|air quality|dust|formaldehyde|sen5[45]|bme688/.test(text)) return { width: 60, height: 38 }
  if (/thermal imaging|ir array|camera|vision ai|fingerprint|nfc|rfid|lora|wifi|bluetooth|serial rf/.test(text)) return { width: 52, height: 30 }
  if (/relay|motor driver|mini motor|servo|speaker|buzzer|fan|atomization|electromagnet/.test(text)) return { width: 52, height: 28 }
  if (/lcd|oled|e-ink|ips display|display/.test(text)) return { width: /16x?2|lcd/.test(text) ? 80 : 32, height: /16x?2|lcd/.test(text) ? 36 : 30 }
  if (/mpr121|capacitive.*touch/.test(text)) return { width: 40, height: 24 }
  if (/joystick|keypad|keycap|touch slider|track ball|dip switch/.test(text)) return { width: 42, height: 32 }
  if (/distance|proximity|ultrasonic|lidar|radar/.test(text)) return { width: 40, height: 26 }
  if (/accelerometer|gyroscope|compass|imu|motion|step counter/.test(text)) return { width: 34, height: 28 }
  if (/temperature|humidity|pressure|barometer|environmental|light sensor|color sensor|proximity/.test(text)) return { width: 30, height: 24 }
  if (family === "input") return { width: 30, height: 20 }
  return { width: 40, height: 20 }
}

const mainNeeds3v3 = (text: string) => /aht20|sht\d|bme\d|bmp\d|adxl\d|dps310|mcp9808|mcp9600|sgp\d|scd\d|sen5|sfa30|vl53|amg8833|mlx\d|as5600|mpr121|pca9685|ads1115|tca9548|lis3d|bma\d|bmi\d|icm\d|ak099|tmg39931|veml|qwiic|st25dv/.test(text)

const signalLabels = (interfaceKind: string) => interfaceKind === "i2c" ? ["SCL", "SDA"] : interfaceKind === "uart" ? ["RX", "TX"] : ["SIG", "NC"]
const ident = (value: string) => value.replace(/[^A-Za-z0-9_$]/g, "_").replace(/^[^A-Za-z_$]/, "_")
const q = (value: string) => JSON.stringify(value)
const mm = (value: number) => Number(value.toFixed(3))
const compact = (value: string, max = 30) => {
  const text = value.replace(/^grove\s*[-–—:]?\s*/i, "").replace(/\s+/g, " ").trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

const passiveMpn = (kind: "R" | "C" | "L", value: string, size = "0603") => {
  const key = value.toLowerCase().replace(/\s+/g, "").replace(/Ω/g, "")
  const r: Record<string, string> = { "0": "RC0603JR-070RL", "0r": "RC0603JR-070RL", "33": "RC0603JR-0733RL", "100": "RC0603JR-07100RL", "220": "RC0603JR-07220RL", "330": "RC0603JR-07330RL", "470": "RC0603JR-07470RL", "1k": "RC0603FR-071KL", "2k2": "RC0603FR-072K2L", "4.7k": "RC0603FR-074K7L", "4k7": "RC0603FR-074K7L", "10k": "RC0603FR-0710KL", "22k": "RC0603FR-0722KL", "47k": "RC0603FR-0747KL", "620k": "RC0603FR-07620KL", "1m": "RC0603FR-071ML" }
  const c: Record<string, string> = { "10pf": "CC0603JRNPO9BN100", "22pf": "CC0603JRNPO9BN220", "100pf": "CC0603JRNPO9BN101", "470pf": "CC0603JRNPO9BN471", "10nf": "CC0603KRX7R9BB103", "100nf": "CC0603KRX7R9BB104", "1uf": "CC0603ZRY5V8BB105", "4.7uf": "CC0603ZRY5V8BB475", "10uf": "CC0805ZRY5V8BB106", "22uf": "CC0805ZRY5V8BB226", "100uf": "EEH-ZA1E101P" }
  const l: Record<string, string> = { "4.7uh": "LQH3NPN4R7M23L", "10uh": "LQH3NPN100M53L", "22uh": "LQH3NPN220M53L", "100uh": "LQH3NPN101M53L" }
  return (kind === "R" ? r[key] : kind === "C" ? c[key] : l[key]) ?? `${kind}-${size}-${key.toUpperCase()}`
}

const referenceLike = (component: any) => {
  const value = String(component.value ?? "").trim()
  return !value || value === component.name || /^(?:N\$?\d*|[RCLD]\d*|U\$?\d+|Q\d+|J\d+|P\d{1,2}|CON\d+)$/i.test(value)
}

const componentKind = (component: any) => {
  const name = String(component.name).trim()
  const value = String(component.value ?? "")
  if (/^R\d*$/i.test(name)) return "R"
  if (/^C\d*$/i.test(name)) return "C"
  if (/^L\d*$/i.test(name)) return "L"
  if (/^D\d*$/i.test(name) && /led|green|red|blue|yellow|white/i.test(`${value} ${component.package}`)) return "LED"
  if (/^D\d*$/i.test(name) || /1n4148|1n5819|bzt|diode/i.test(value)) return "D"
  return "chip"
}

const padsFor = (pkg: any) => (pkg?.pads ?? []).filter((pad: any) => pad.kind !== "hole")
const componentPort = (component: any, index: number) => {
  const kind = componentKind(component)
  if (kind === "R" || kind === "C" || kind === "L") return `pin${index + 1}`
  if (kind === "D" || kind === "LED") return index === 0 ? "anode" : "cathode"
  return `P${index + 1}`
}

const sourceBoardMap = (profile: Profile) => {
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  if (/tb6612/.test(text)) return undefined
  if (groveEagleSpecs[profile.name]) return groveEagleSpecs[profile.name]
  const target = /buzzer/.test(text)
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

const renderFootprintData = (spec: EagleSpec, names: string[]) => {
  const packages: Record<string, any> = {}
  for (const component of spec.components) {
    if (names.includes(component.package)) packages[component.package] = spec.packages[component.package]
  }
  return JSON.stringify(packages)
}

const signalName = (value: string) => value.trim().replace(/[^A-Za-z0-9_]/g, "_").replace(/^[^A-Za-z_]/, "N_") || "N_UNNAMED"

const emitEagleBoard = (profile: Profile, spec: EagleSpec) => {
  const fn = ident(profile.componentName)
  const connector = spec.components.find((component: any) => component.name === "J1")
  const connectorPackage = connector ? spec.packages[connector.package] : undefined
  const connectorPads = padsFor(connectorPackage).filter((pad: any) => !/^SS\d*$/i.test(pad.name))
  // Keep connector references in the same port namespace used by the jumper
  // (`J1.pin1`, `J1.pin2`, ...). The old `PIN1` form did not match the
  // jumper's `pin1` connection keys and left source nets disconnected.
  const connectorsByPad = new Map(connectorPads.map((pad: any, index: number) => [pad.name, `pin${index + 1}`]))
  const netNames = new Map<string, string>()
  const used = new Set<string>()
  for (const signal of spec.signals) {
    const base = signalName(signal.name)
    let candidate = base
    let n = 2
    while (used.has(candidate)) candidate = `${base}_${n++}`
    used.add(candidate)
    netNames.set(signal.name, candidate)
  }
  const otherComponents = spec.components.filter((component: any) => component.name !== "J1")
  const mainName = otherComponents
    .filter((component: any) => !component.value && padsFor(spec.packages[component.package]).length >= 4 && !/^(?:SW|J|LED|BUZ|INT|SYNC|RESET|POWER|RST|IN|OUT|PWR)\d*$/i.test(component.name))
    .sort((a: any, b: any) => padsFor(spec.packages[b.package]).length - padsFor(spec.packages[a.package]).length)[0]?.name
  const serializedComponents = otherComponents.map((component: any) => {
    const pkg = spec.packages[component.package]
    const pads = padsFor(pkg)
    const kind = componentKind(component)
    const sourceName = component.name
    const outputName = kind === "chip" && /^R[A-Z]/i.test(sourceName) ? `U_${sourceName}` : sourceName
    const value = String(component.value ?? "").trim()
    let display = value
    let mpn = value
    if (kind === "R") { display = value || "10k"; mpn = passiveMpn("R", display, component.package) }
    else if (kind === "C") { display = value || "100nF"; mpn = passiveMpn("C", display, component.package) }
    else if (kind === "L") { display = value || "10uH"; mpn = passiveMpn("L", display, component.package) }
    else if (!value || referenceLike(component)) {
      if (component.name === mainName) { display = profile.primaryModel; mpn = profile.manufacturerPartNumber }
      else if (/^Q\d+$/i.test(component.name)) { display = "2N7002"; mpn = "2N7002" }
      else if (/^U\d+$/i.test(component.name) && /sot-?23/i.test(component.package)) { display = "XC6206P332MR-G"; mpn = "XC6206P332MR-G" }
      else if (/^BUZ\d*$/i.test(component.name)) { display = "YMD12065"; mpn = "YMD12065" }
      else if (/^SW\d*$/i.test(component.name)) { display = "B3F-1000"; mpn = "B3F-1000" }
      else if (/^PSR$/i.test(component.name)) { display = "PT12-21C/TR8"; mpn = "PT12-21C/TR8" }
      else if (/^(?:J|CON|P)\d+$/i.test(component.name)) { display = pads.length >= 4 ? "B4B-PH-K-S" : `HEADER-1X${pads.length}`; mpn = display }
      else { display = `UNSPECIFIED-${component.name}`; mpn = display }
    }
    const signalPins: Record<string, string> = {}
    for (const signal of spec.signals) {
      for (const [element, pad] of signal.pins) {
        if (element !== component.name) continue
        const index = pads.findIndex((candidate: any) => candidate.name === pad)
        if (index >= 0) signalPins[componentPort(component, index)] = `net.${netNames.get(signal.name) ?? signalName(signal.name)}`
      }
    }
    const pinAttrs: Record<string, any> = {}
    for (let index = 0; index < pads.length; index++) {
      const pin = `P${index + 1}`
      const connectedSignal = spec.signals.find((signal: any) => signal.pins.some(([element, pad]: [string, string]) => element === component.name && pads[index]?.name === pad))
      if (!connectedSignal || /^NC(?:$|[_-])/i.test(connectedSignal.name)) pinAttrs[pin] = { doNotConnect: true }
      else if (/^(?:GND|AGND|DGND|VSS|0V|GROUND|COM)/i.test(connectedSignal.name)) pinAttrs[pin] = { requiresGround: true, mustBeConnected: true }
      else if (/^(?:\+?(?:VCC|VDD|VIN|VBAT|3V3|5V|9V|12V)|PWR|POWER)/i.test(connectedSignal.name)) pinAttrs[pin] = { requiresPower: true, mustBeConnected: true }
      else pinAttrs[pin] = { mustBeConnected: true }
    }
    return {
      name: outputName,
      sourceName,
      kind,
      display,
      mpn,
      package: component.package,
      pins: pads.map((pad: any) => pad.name),
      connections: signalPins,
      pinAttributes: pinAttrs,
      x: mm(component.x - spec.originX),
      y: mm(component.y - spec.originY),
      rotation: component.rotation ?? 0,
      mirrored: !!component.mirrored,
    }
  })
  const connectorLabels = uniquePinLabels(connectorPads.map((pad: any, index: number) => {
    const signal = spec.signals.find((candidate: any) => candidate.pins.some(([element, pin]: [string, string]) => element === "J1" && pin === pad.name))
    const raw = signal ? signalName(signal.name) : index === 0 ? "SIG" : index === 1 ? "NC" : index === 2 ? "VCC" : "GND"
    return /^N_\d+$/i.test(raw) ? (index === 0 ? "SIG" : index === 1 ? "NC" : index === 2 ? "VCC" : "GND") : raw
  }))
  const signalData = spec.signals
    .filter((signal: any) => signal.pins.length >= 2)
    .map((signal: any) => ({
      name: netNames.get(signal.name) ?? signalName(signal.name),
      originalName: signal.name,
      refs: signal.pins.map(([element, pad]: [string, string]) => {
        if (element === "J1") {
          const label = connectorsByPad.get(pad)
          return label ? `J1.${label}` : undefined
        }
        const component = serializedComponents.find((candidate: any) => candidate.sourceName === element || candidate.name === element)
        if (!component) return undefined
        const index = component.pins.indexOf(pad)
        if (index < 0) return undefined
        return `${component.name}.${componentPort(component, index)}`
      }).filter(Boolean),
    }))
    .filter((signal: any) => signal.refs.length >= 2)
  const packageNames = [...new Set(spec.components.map((component: any) => component.package))]
  const componentJson = JSON.stringify(serializedComponents)
  const signalJson = JSON.stringify(signalData)
  const connectorPackageJson = JSON.stringify(connectorPackage ?? { pads: [], graphics: [] })
  return `import { GroveMountingHoles } from "../_shared/GroveParts"
import { HandAuthoredFootprint } from "../_shared/HandAuthoredParts"

const packages: any = ${renderFootprintData(spec, packageNames)}
const components: any[] = ${componentJson}
const signals: any[] = ${signalJson}
const connectorPads: any[] = ${connectorPackageJson}.pads
const connectorLabels: string[] = ${JSON.stringify(connectorLabels)}

const ${fn} = () => (
  <board
    name={${q(profile.componentName)}}
    title={${q(profile.title)}}
    width={${q(`${mm(spec.width)}mm`)}}
    height={${q(`${mm(spec.height)}mm`)}}
    borderRadius="1mm"
    solderMaskColor="blue"
  >
    {signals.map((signal) => <net name={signal.name} isPowerNet={/^(?:VCC|VDD|VIN|3V3|5V|2V5)/i.test(signal.originalName)} isGroundNet={/^GND/i.test(signal.originalName)} />)}
    <GroveMountingHoles x={${Math.max(10, spec.width / 2 - 4)}} y={${Math.max(7, spec.height / 2 - 3)}} />
    <jumper
      name="J1"
      displayName="Grove 4-pin"
      manufacturerPartNumber="B4B-PH-K-S"
      pinLabels={Object.fromEntries(connectorLabels.map((label, index) => ["pin" + (index + 1), label]))}
      pinAttributes={Object.fromEntries(connectorLabels.map((label) => [label, /^GND/i.test(label) ? { requiresGround: true, mustBeConnected: true } : /^(?:VCC|VDD|VIN|3V3|5V)/i.test(label) ? { requiresPower: true, requiresVoltage: ${q(profile.powerVoltage)}, mustBeConnected: true } : /^NC/i.test(label) ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }]))}
      footprint={<HandAuthoredFootprint name="J1" pads={connectorPads} excludePadNames={["SS1", "SS2"]} />}
      pcbX={${mm((connector?.x ?? -spec.width / 2 + 5) - spec.originX)}}
      pcbY={${mm((connector?.y ?? 0) - spec.originY)}}
      pcbRotation={${connector?.rotation ?? 0}}
      schX={-10}
      schY={0}
      schPinArrangement={{ rightSide: [...connectorLabels] }}
      schDirection="right"
      schWidth="1.3mm"
      schHeight="0.6mm"
    />
    {components.map((component, index) => {
      const footprint = <HandAuthoredFootprint name={component.name} pads={packages[component.package as keyof typeof packages].pads} graphics={packages[component.package as keyof typeof packages].graphics} />
      const common: any = { name: component.name, displayName: component.display, manufacturerPartNumber: component.mpn, footprint, pcbX: component.x, pcbY: component.y, pcbRotation: component.rotation, layer: component.mirrored ? "bottom" : "top", schX: -5 + (index % 4) * 3.6, schY: (Math.floor(index / 4) - 1) * 4.2, pinAttributes: component.pinAttributes }
      if (component.kind === "R") return <resistor {...common} resistance={component.display} />
      if (component.kind === "C") return <capacitor {...common} capacitance={component.display} maxDecouplingTraceLength="100mm" schOrientation="vertical" />
      if (component.kind === "L") return <inductor {...common} inductance={component.display} />
      if (component.kind === "D") return <diode {...common} pinLabels={{ pin1: "anode", pin2: "cathode" }} />
      if (component.kind === "LED") return <led {...common} color={/green/i.test(component.display) ? "green" : /blue/i.test(component.display) ? "blue" : /yellow/i.test(component.display) ? "yellow" : "red"} pinLabels={{ pin1: "anode", pin2: "cathode" }} />
      return <chip {...common} schWidth="1.6mm" schHeight="0.4mm" pinLabels={Object.fromEntries(component.pins.map((_: any, pinIndex: number) => ["pin" + (pinIndex + 1), "P" + (pinIndex + 1)]))} noConnect={component.pins.filter((_: any, pinIndex: number) => component.pinAttributes["P" + (pinIndex + 1)]?.doNotConnect).map((_: any, pinIndex: number) => "pin" + (pinIndex + 1))} schPinArrangement={{ leftSide: component.pins.slice(0, Math.ceil(component.pins.length / 2)).map((_: any, pinIndex: number) => "P" + (pinIndex + 1)), rightSide: component.pins.slice(Math.ceil(component.pins.length / 2)).map((_: any, pinIndex: number) => "P" + (pinIndex + Math.ceil(component.pins.length / 2) + 1)) }} />
    })}
    {signals.map((signal) => signal.refs.length >= 2 ? <trace name={"SRC_" + signal.name} path={[...signal.refs]} /> : null)}
    <silkscreentext text={${q(compact(profile.title, 32))}} pcbX={0} pcbY={${mm(spec.height / 2 - 1.5)}} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED NETLIST" pcbX={0} pcbY={${mm(-spec.height / 2 + 1.5)}} fontSize="0.45mm" />
  </board>
)

export { ${fn} }
export default ${fn}
`
}

const emitGenericBoard = (profile: Profile) => {
  const fn = ident(profile.componentName)
  const text = `${profile.title} ${profile.primaryModel}`.toLowerCase()
  const interfaceKind = effectiveInterface(profile)
  const family = familyFor(profile, text)
  // Only addressable LED families have a serial pixel chain.  Names such as
  // “8 Channel I2C Hub” must not be mistaken for LED channel counts.
  const channels = family === "led" ? channelCountFor(text) : undefined
  const size = boardSizeFor(profile, family, text, channels)
  const imported = importedModelFor(profile.primaryModel)
  const power3v3 = mainNeeds3v3(text)
  const mainPins = imported?.pinLabels ?? (interfaceKind === "i2c" ? ["SDA", "SCL", power3v3 ? "VDD" : "VCC", "GND", "ADDR", "INT"] : interfaceKind === "uart" ? ["RX", "TX", "VCC", "GND", "CTS", "RTS"] : ["SIG", "VCC", "GND", "AUX"])
  const signal = signalLabels(interfaceKind)
  const mainPin = (label: string) => {
    if (mainPins.includes(label)) return label
    const aliases: Record<string, string[]> = { VCC: ["VCC", "VDD", "VDDIO", "VIN"], VDD: ["VDD", "VDDIO", "VCC", "VIN"], GND: ["GND", "VSS", "GND1", "GND2"], SIG: ["SIG", "OUT", "OUTA", "INT1", "IRQ"], SCL: ["SCL", "SCK"], SDA: ["SDA", "SDI"] }
    return aliases[label]?.find((candidate) => mainPins.includes(candidate)) ?? label
  }
  // Keep imported supplier numbers in the BOM, but use a deterministic
  // board-local package footprint for the rendered draft. A named `soic` or
  // `qfn` package has a fixed pad count; many imported parts have 9–25 pins,
  // which leaves some source ports without a PCB pad and crashes autorouting.
  // Emit an exact-count two-row package instead so every hand-authored pin is
  // physically represented.
  const leftPadCount = Math.ceil(mainPins.length / 2)
  const rightPadCount = mainPins.length - leftPadCount
  const footprintHeight = Math.max(4, Math.max(leftPadCount, rightPadCount) * 1.27 + 1)
  const mainFootprint = `<footprint>${mainPins.map((_, index) => {
    const onLeft = index < leftPadCount
    const sideCount = onLeft ? leftPadCount : rightPadCount
    const sideIndex = onLeft ? index : index - leftPadCount
    const y = mm((sideIndex - (sideCount - 1) / 2) * 1.27)
    const x = onLeft ? -2.5 : 2.5
    return `<smtpad shape="rect" width="1mm" height="0.6mm" pcbX={${x}} pcbY={${y}} portHints={["pin${index + 1}"]} />`
  }).join("")}<silkscreenrect width="4mm" height="${mm(footprintHeight)}mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>`
  const nets = ["VCC", "VDD", "GND", "SCL", "SDA", "RX", "TX", "RX_MCU", "TX_MCU", "SIG", "STATUS", "EMITTER", "LOAD_NEG"].filter((name) => name !== "VDD" || power3v3)
  const powerPins = mainPins.filter((label) => /^(?:VCC|VDD|VDDIO|VDDH|VIN|VM)$/i.test(label))
  const groundPins = mainPins.filter((label) => /^(?:GND|VSS|GND\d+|EP|EPAD)$/i.test(label))
  const primaryPowerPin = mainPin(powerPins[0] ?? (power3v3 ? "VDD" : "VCC"))
  const primaryGroundPin = mainPin(groundPins[0] ?? "GND")
  const mainSignalPin = mainPin(signal[0])
  const mainPcbX = /tca9548|i2c hub|i2c multiplexer/.test(text) ? 8 : family === "display" ? 1 : 4
  const environmentalCapX = Math.min(10, size.width / 2 - 8)
  const environmentalCapY = Math.min(8, size.height / 2 - 5)
  const c1PcbX = /mpr121/.test(text) ? 12 : family === "input" ? 8 : -5
  const c1PcbY = family === "input" ? -6 : 0
  const inputRailRefs = power3v3 ? ["J1.VCC", "U2.VIN", "C2.pin1"] : []
  const activeRailRefs = power3v3 ? ["U2.VOUT", ...powerPins.map((pin) => `U1.${pin}`), "C1.pin1"] : ["J1.VCC", ...powerPins.map((pin) => `U1.${pin}`), "C1.pin1"]
  const groundRailRefs = ["J1.GND", ...groundPins.map((pin) => `U1.${pin}`), ...(power3v3 ? ["U2.GND", "C2.pin2"] : []), "C1.pin2"]
  if (interfaceKind === "i2c") activeRailRefs.push("R1.pin1", "R2.pin1")
  if (interfaceKind === "analog") {
    groundRailRefs.push("R1.pin2")
  }
  if (family === "environmental" || family === "motion") {
    activeRailRefs.push(`C_${family.toUpperCase()}.pin1`)
    groundRailRefs.push(`C_${family.toUpperCase()}.pin2`)
  }
  if (family === "audio") {
    activeRailRefs.push("U4.VCC", "C_AUDIO.pin1")
    groundRailRefs.push("U4.GND", "C_AUDIO.pin2")
  }
  if (family === "power") {
    activeRailRefs.push("R_STATUS.pin1")
    groundRailRefs.push("D_STATUS.cathode")
    if (/relay|motor|fan|speaker|buzzer|servo|atomization|electromagnet/.test(text)) {
      activeRailRefs.push("U3.POS", "D1.cathode")
      groundRailRefs.push("Q1.source", "U3.GND")
    }
  }
  if (family === "gas") {
    activeRailRefs.push("R_HEAT.pin1")
    groundRailRefs.push("R_HEAT.pin2")
  }
  if (family === "optical" && interfaceKind !== "i2c") {
    activeRailRefs.push("R_EMITTER.pin1")
    groundRailRefs.push("D_EMITTER.cathode")
  }
  if (family === "distance") {
    activeRailRefs.push("U3.VCC", "U4.VCC")
    groundRailRefs.push("U3.GND", "U4.GND")
  }
  if (family === "display") {
    activeRailRefs.push("U3.VCC")
    groundRailRefs.push("U3.GND")
  }
  if (family === "input" && /button|switch/.test(text)) activeRailRefs.push("SW1.pin1")
  const signalRailRefs: Array<[string, string[]]> = family === "distance"
    ? [["DISTANCE_DRIVE_TRACE", [`J1.${signal[0]}`, "U3.IN"]], ["DISTANCE_SENSE_TRACE", ["U4.OUT", `U1.${mainSignalPin}`]]]
    : interfaceKind === "i2c"
      ? [["I2C_SCL", ["J1.SCL", `U1.${mainPin("SCL")}`, "R1.pin2"]], ["I2C_SDA", ["J1.SDA", `U1.${mainPin("SDA")}`, "R2.pin2"]]]
    : interfaceKind === "uart"
      ? [["UART_RX_IN", ["J1.RX", "R1.pin1"]], ["UART_RX_OUT", ["R1.pin2", `U1.${mainPin("RX")}`]], ["UART_TX_IN", ["J1.TX", "R2.pin1"]], ["UART_TX_OUT", ["R2.pin2", `U1.${mainPin("TX")}`]]]
      : [["SIGNAL_RAIL", [`J1.${signal[0]}`, `U1.${mainSignalPin}`]]]
  if (interfaceKind === "analog") signalRailRefs[0][1].push("R1.pin1")
  if (family === "audio") signalRailRefs[0][1].push("U4.OUT")
  if (family === "input" && /button|switch/.test(text)) signalRailRefs[0][1].push("SW1.pin2")
  if (interfaceKind === "analog" && family === "input" && /potentiometer|rotary|slide pot|joystick/.test(text)) {
    activeRailRefs.push("RV1.pin1")
    groundRailRefs.push("RV1.pin3")
    signalRailRefs[0][1].push("RV1.pin2")
  }
  if (family === "display") {
    if (interfaceKind === "i2c") {
      signalRailRefs[0][1].push("U3.SCL")
      signalRailRefs[1][1].push("U3.SDA")
    } else {
      signalRailRefs[0][1].push("U3.DATA")
    }
  }
  if (family === "power" && /relay|motor|fan|speaker|buzzer|servo|atomization|electromagnet/.test(text)) {
    const gateRail = interfaceKind === "i2c" ? signalRailRefs[1] : signalRailRefs[0]
    gateRail[1].push("Q1.gate")
  }
  const tracePath = (name: string, refs: string[]) => {
    // Component `connections` props assign each endpoint to the canonical
    // net before source diagnostics run. Keep the visible routed path made
    // only of physical ports so it is also available to the PCB autorouter.
    return `    <trace name="${name}" path={${JSON.stringify(refs)}} />`
  }
  const attrFor = (label: string) => {
    if (/^(?:VCC|VDD|VDDIO|VDDH|VIN|VM)$/i.test(label)) return `{ requiresPower: true, ${power3v3 && /^(?:VCC|VIN)$/i.test(label) ? `requiresVoltage: ${q(profile.powerVoltage)}, ` : ""}mustBeConnected: true }`
    if (/^(?:GND|VSS|GND\d+|EP|EPAD)$/i.test(label)) return `{ requiresGround: true, mustBeConnected: true }`
    if ([...signal, "SIG", "OUT", "OUTA", "OUTB"].includes(label)) return `{ mustBeConnected: true, isGpio: true }`
    return `{ doNotConnect: true }`
  }
  const mainNetFor = (label: string) => {
    if (/^(?:GND|VSS|GND\d+|GND_\d+|EP|EPAD)$/i.test(label)) return "GND"
    if (/^(?:VCC|VIN|VM)$/i.test(label)) return "VCC"
    if (/^(?:VDD|VDDIO|VDDH)$/i.test(label)) return power3v3 ? "VDD" : "VCC"
    if (/^SCL$/i.test(label)) return "SCL"
    if (/^SDA$/i.test(label)) return "SDA"
    if (/^RX$/i.test(label)) return interfaceKind === "uart" ? "RX_MCU" : "RX"
    if (/^TX$/i.test(label)) return interfaceKind === "uart" ? "TX_MCU" : "TX"
    if (family === "distance" && /^IN$/i.test(label)) return "DISTANCE_DRIVE"
    if (family === "distance" && /^OUT$/i.test(label)) return "DISTANCE_SENSE"
    return "SIG"
  }
  const mainConnections = mainPins
    .filter((label) => !attrFor(label).includes("doNotConnect"))
    .map((label) => `${q(label)}: ${q(`net.${mainNetFor(label)}`)}`)
    .join(", ")
  const lines: string[] = []
  lines.push(`import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"`)
  lines.push("")
  lines.push(`const ${fn} = () => (`)
  lines.push(`  <board name={${q(profile.componentName)}} title={${q(profile.title)}} width={${q(`${size.width}mm`)}} height={${q(`${size.height}mm`)}} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">`)
  for (const net of nets) lines.push(`    <net name="${net}"${net === "VCC" || net === "VDD" ? " isPowerNet" : net === "GND" ? " isGroundNet" : ""} />`)
  lines.push(`    <GroveMountingHoles x={${Math.max(10, size.width / 2 - 4)}} y={${Math.max(7, size.height / 2 - 3)}} />`)
  // Channel boards use the same canonical power/data nets as the rest of the
  // catalogue. This keeps the LED rail traces electrically connected while
  // leaving the unused downstream data pins explicitly no-connect.
  lines.push(`    <GroveConnector kind="${interfaceKind}" powerVoltage={${q(profile.powerVoltage)}} connectToNets pcbX={${-size.width / 2 + 6}} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />`)

  if (channels) {
    const ring = /ring/i.test(profile.title)
    const ringRadius = Math.min(size.width, size.height) / 2 - 8
    const pixelConnections = `connections={index === 0 ? { VCC: "net.VCC", GND: "net.GND", DIN: "net.SIG" } : { VCC: "net.VCC", GND: "net.GND" }}`
    lines.push(`    {Array.from({ length: ${channels} }, (_, index) => {`)
    lines.push(`      const name = \`PIX\${index + 1}\``)
    lines.push(`      const angle = (index / ${channels}) * Math.PI * 2 - Math.PI / 2`)
    lines.push(`      const x = ${ring ? `3 + Math.cos(angle) * ${ringRadius}` : `${-size.width / 2 + 12} + index * 6`}`)
    lines.push(`      const y = ${ring ? `Math.sin(angle) * ${ringRadius}` : "0"}`)
    lines.push(`      const capX = ${ring ? `x - Math.cos(angle) * 8` : "x"}`)
    lines.push(`      const capY = ${ring ? `y - Math.sin(angle) * 8` : "y + 4"}`)
    lines.push(`      return <Fragment key={name}>`)
      lines.push(`        <chip name={name} displayName={${q(profile.primaryModel)}} manufacturerPartNumber={${q(profile.manufacturerPartNumber)}} pinLabels={{ pin1: "DIN", pin2: "DOUT", pin3: "VCC", pin4: "GND" }} pinAttributes={{ DIN: index === 0 ? { mustBeConnected: true, isGpio: true } : { doNotConnect: true }, DOUT: { doNotConnect: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} ${pixelConnections} noConnect={index === 0 ? ["DOUT"] : ["DIN", "DOUT"]} footprint={<footprint><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={-1.3} portHints={["pin1"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={1.3} portHints={["pin3"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={1.7} pcbY={1.3} portHints={["pin4"]} /><silkscreenrect width="3.8mm" height="3.8mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.2mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["DIN", "VCC"], rightSide: ["DOUT", "GND"] }} />`)
      lines.push(`        <capacitor name={\`C\${index + 1}\`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength={${Math.max(120, size.width * 2)} + "mm"} connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={capX} pcbY={capY} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />`)
    lines.push(`      </Fragment>`)
    lines.push(`    })}`)
    lines.push(tracePath("DATA_IN", ["J1.SIG", "PIX1.DIN"]))
    const ledRefs = Array.from({ length: channels }, (_, index) => [`PIX${index + 1}.VCC`, `C${index + 1}.pin1`]).flat()
    const groundRefs = Array.from({ length: channels }, (_, index) => [`PIX${index + 1}.GND`, `C${index + 1}.pin2`]).flat()
    lines.push(tracePath("LED_VCC_RAIL", ["J1.VCC", ...ledRefs]))
    lines.push(tracePath("LED_GND_RAIL", ["J1.GND", ...groundRefs]))
  } else {
    lines.push(`    <chip name="U1" displayName={${q(profile.primaryModel)}} manufacturerPartNumber={${q(profile.manufacturerPartNumber)}}${imported ? ` supplierPartNumbers={{ jlcpcb: [${q(imported.supplierPartNumber)}] }}` : ""} pinLabels={{ ${mainPins.map((label, index) => `pin${index + 1}: ${q(label)}`).join(", ")} }} pinAttributes={{ ${mainPins.map((label) => `${label}: ${attrFor(label)}`).join(", ")} }} connections={{ ${mainConnections} }} noConnect={[${mainPins.filter((label) => attrFor(label).includes("doNotConnect")).map((label) => q(label)).join(", ")}]} footprint={${mainFootprint}} pcbX={${mainPcbX}} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ${JSON.stringify(mainPins.slice(0, Math.ceil(mainPins.length / 2)))}, rightSide: ${JSON.stringify(mainPins.slice(Math.ceil(mainPins.length / 2)))} }} />`)
    if (power3v3) {
      lines.push(`    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: ${q(profile.powerVoltage)}, mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />`)
      lines.push(`    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />`)
    }
    lines.push(`    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.GND" }} pcbX={${c1PcbX}} pcbY={${c1PcbY}} schX={5} schY={4} schOrientation="vertical" />`)
    if (interfaceKind === "i2c") {
      lines.push(`    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />`)
      lines.push(`    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.SDA" }} pcbX={-8} pcbY={${power3v3 ? -8 : -5}} schX={-3} schY={-5} />`)
    } else if (interfaceKind === "uart") {
      lines.push(`    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.RX", pin2: "net.RX_MCU" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />`)
      lines.push(`    <resistor name="R2" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.TX", pin2: "net.TX_MCU" }} pcbX={-10} pcbY={-5} schX={-3} schY={-5} />`)
    } else if (interfaceKind === "analog") {
      lines.push(`    <resistor name="R1" resistance="${profile.detailKind === "sensor" ? "10k" : "1k"}" tolerance="1%" manufacturerPartNumber="${profile.detailKind === "sensor" ? "RC0603FR-0710KL" : "RC0603FR-071KL"}" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />`)
    }

    if (family === "input" && /button|switch/.test(text)) {
      lines.push(`    <pushbutton name="SW1" displayName="B3F-1000 tactile switch" manufacturerPartNumber="B3F-1000" pinAttributes={{ pin1: { requiresPower: true, mustBeConnected: true }, pin2: { mustBeConnected: true } }} connections={{ pin1: "net.VCC", pin2: "net.SIG" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={-3.25} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={3.25} pcbY={0} portHints={["pin2"]} /><silkscreenrect width="6mm" height="6mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={${size.width / 2 - 5}} pcbY={5} schX={6} schY={0} schWidth="1.2mm" schHeight="0.4mm" />`)
    }
    if (interfaceKind === "analog" && family === "input" && /potentiometer|rotary|slide pot|joystick/.test(text)) {
      lines.push(`    <potentiometer name="RV1" displayName="WH09-2-103" manufacturerPartNumber="WH09-2-103" maxResistance="10k" pinVariant="three_pin" connections={{ pin1: "net.VCC", pin2: "net.SIG", pin3: "net.GND" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={-4} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={4} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="10mm" height="10mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={9} pcbY={4} schX={6} schY={0} />`)
    }
    if (family === "power") {
      lines.push(`    <led name="D_STATUS" displayName="red status LED" manufacturerPartNumber="LTST-C190KRKT" color="red" connections={{ anode: "net.STATUS", cathode: "net.GND" }} footprint="0603" pcbX={-2} pcbY={7} schX={7.6} schY={-4} /><resistor name="R_STATUS" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.STATUS" }} pcbX={2} pcbY={7} schX={10.4} schY={-4} />`)
      if (/relay|motor|fan|speaker|buzzer|servo|atomization|electromagnet/.test(text)) {
        lines.push(`    <mosfet name="Q1" displayName="2N7002 load switch" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" connections={{ gate: ${q(`net.${interfaceKind === "i2c" ? "SDA" : "SIG"}`)}, source: "net.GND", drain: "net.LOAD_NEG" }} footprint="sot23" pcbX={10} pcbY={-5} schX={6} schY={-3} /><chip name="U3" displayName={${q(profile.primaryModel + " load stage")}} manufacturerPartNumber={${q(profile.manufacturerPartNumber)}} pinLabels={{ pin1: "POS", pin2: "NEG", pin3: "GND" }} pinAttributes={{ POS: { requiresPower: true, mustBeConnected: true }, NEG: { mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ POS: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, NEG: "net.LOAD_NEG", GND: "net.GND" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-3} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={3} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="8mm" height="6mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={${size.width / 2 - 8}} pcbY={4} schX={9.2} schY={3} schWidth="1.2mm" schHeight="0.4mm" /><diode name="D1" displayName="1N4148W flyback diode" manufacturerPartNumber="1N4148W" connections={{ anode: "net.LOAD_NEG", cathode: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)} }} footprint="0603" pcbX={10} pcbY={2} schX={4.8} schY={3} />`)
      }
    }
    if (family === "distance") {
      lines.push(`    <chip name="U3" displayName={${q(/ultrasonic/.test(text) ? "40 kHz ultrasonic transmitter" : "IR transmitter")}} manufacturerPartNumber={${q(/ultrasonic/.test(text) ? "TCT40-16T" : "VSMY1850")}} pinLabels={{ pin1: "IN", pin2: "VCC", pin3: "GND" }} pinAttributes={{ IN: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ IN: "net.DISTANCE_DRIVE", VCC: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, GND: "net.GND" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-3} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={3} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="8mm" height="8mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={-4} pcbY={8} schX={-4} schY={2} schWidth="1.2mm" schHeight="0.4mm" /><chip name="U4" displayName={${q(/ultrasonic/.test(text) ? "40 kHz ultrasonic receiver" : "IR receiver")}} manufacturerPartNumber={${q(/ultrasonic/.test(text) ? "TCT40-16R" : "GP1UXC41QS")}} pinLabels={{ pin1: "OUT", pin2: "VCC", pin3: "GND" }} pinAttributes={{ OUT: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ OUT: "net.DISTANCE_SENSE", VCC: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, GND: "net.GND" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-3} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={3} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="8mm" height="8mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={10} pcbY={8} schX={1} schY={2} schWidth="1.2mm" schHeight="0.4mm" />`)
    }
    if (family === "optical" && interfaceKind !== "i2c") {
      lines.push(`    <led name="D_EMITTER" displayName="IR/optical emitter" manufacturerPartNumber="IR333-A" color="infrared" connections={{ anode: "net.EMITTER", cathode: "net.GND" }} footprint="0603" pcbX={-5} pcbY={7} schX={-4} schY={3} /><resistor name="R_EMITTER" resistance="100" tolerance="1%" manufacturerPartNumber="RC0603JR-07100RL" footprint="0603" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.EMITTER" }} pcbX={0} pcbY={7} schX={-1} schY={3} />${tracePath("EMITTER_LIMIT", ["R_EMITTER.pin2", "D_EMITTER.anode"])}`)
    }
    if (family === "audio") {
      lines.push(`    <chip name="U4" displayName="electret microphone capsule" manufacturerPartNumber="CMA-4544PF-W" pinLabels={{ pin1: "VCC", pin2: "OUT", pin3: "GND" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, OUT: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ VCC: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, OUT: "net.SIG", GND: "net.GND" }} footprint="to92" pcbX={-5} pcbY={4} schX={-4} schY={3} schWidth="1.2mm" schHeight="0.4mm" /><capacitor name="C_AUDIO" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.GND" }} pcbX={-1} pcbY={6} schX={-1} schY={4} schOrientation="vertical" />`)
    }
    if (family === "environmental" || family === "motion") {
      lines.push(`    <capacitor name="C_${family.toUpperCase()}" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.GND" }} pcbX={${environmentalCapX}} pcbY={${environmentalCapY}} schX={8} schY={4} schOrientation="vertical" />`)
    }
    if (family === "gas") {
      lines.push(`    <resistor name="R_HEAT" resistance="33" tolerance="5%" manufacturerPartNumber="RC1206JR-0733RL" footprint="1206" connections={{ pin1: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, pin2: "net.GND" }} pcbX={10} pcbY={-5} schX={8} schY={-5} />`)
    }
    if (family === "display") {
      if (interfaceKind === "i2c") {
        lines.push(`    <chip name="U3" displayName={${q(`${profile.primaryModel} display panel`)}} manufacturerPartNumber={${q(profile.manufacturerPartNumber)}} pinLabels={{ pin1: "VCC", pin2: "GND", pin3: "SCL", pin4: "SDA" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, SCL: { mustBeConnected: true, isGpio: true }, SDA: { mustBeConnected: true, isGpio: true } }} connections={{ VCC: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, GND: "net.GND", SCL: "net.SCL", SDA: "net.SDA" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-3.75} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-1.25} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={1.25} pcbY={0} portHints={["pin3"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={3.75} pcbY={0} portHints={["pin4"]} /><silkscreenrect width="10mm" height="6mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={11} pcbY={0} schX={7} schY={0} schWidth="1.2mm" schHeight="0.4mm" />`)
      } else {
        lines.push(`    <chip name="U3" displayName={${q(`${profile.primaryModel} display panel`)}} manufacturerPartNumber={${q(profile.manufacturerPartNumber)}} pinLabels={{ pin1: "VCC", pin2: "GND", pin3: "DATA" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, DATA: { mustBeConnected: true, isGpio: true } }} connections={{ VCC: ${q(`net.${power3v3 ? "VDD" : "VCC"}`)}, GND: "net.GND", DATA: "net.SIG" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-2.5} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={2.5} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="8mm" height="5mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={11} pcbY={0} schX={7} schY={0} schWidth="1.2mm" schHeight="0.4mm" />`)
      }
    }
    if (channels) {
      const ledRefs = Array.from({ length: channels }, (_, index) => [`PIX${index + 1}.VCC`, `C${index + 1}.pin1`]).flat()
      const groundRefs = Array.from({ length: channels }, (_, index) => [`PIX${index + 1}.GND`, `C${index + 1}.pin2`]).flat()
      lines.push(tracePath("LED_VCC_RAIL", ["J1.VCC", ...ledRefs]))
      lines.push(tracePath("LED_GND_RAIL", ["J1.GND", ...groundRefs]))
    } else {
      if (inputRailRefs.length > 1) lines.push(tracePath("INPUT_RAIL", inputRailRefs))
      lines.push(tracePath(power3v3 ? "REGULATED_RAIL" : "POWER_RAIL", activeRailRefs))
      lines.push(tracePath("GROUND_RAIL", groundRailRefs))
      for (const [name, refs] of signalRailRefs) lines.push(tracePath(name, refs))
      if (family === "power") lines.push(tracePath("STATUS_RAIL", ["R_STATUS.pin2", "D_STATUS.anode"]))
      if (family === "power" && /relay|motor|fan|speaker|buzzer|servo|atomization|electromagnet/.test(text)) {
        lines.push(tracePath("LOAD_RAIL", ["Q1.drain", "U3.NEG", "D1.anode"]))
      }
    }
  }
  lines.push(`    <silkscreentext text={${q(compact(profile.title, 32))}} pcbX={0} pcbY={${size.height / 2 - 1.5}} fontSize="0.6mm" />`)
  lines.push(`    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={${-size.height / 2 + 1.5}} fontSize="0.45mm" />`)
  lines.push("  </board>")
  lines.push(")")
  lines.push("")
  lines.push(`export { ${fn} }`)
  lines.push(`export default ${fn}`)
  return `import { Fragment } from "react"\n${lines.join("\n")}\n`
}

const main = async () => {
  let changed = 0
  for (const profile of groveCatalogueManifest) {
    const sourcePath = join(repoRoot, "boards", profile.directory, `${profile.directory}.circuit.tsx`)
    const next = emitGenericBoard(profile)
    await writeFile(sourcePath, next)
    changed++
  }
  console.log(`Materialized ${changed} board-local TSX sources.`)
}

await main()
