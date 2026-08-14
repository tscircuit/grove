import { mkdir } from "node:fs/promises"
import { join } from "node:path"

type InterfaceKind = "digital" | "analog" | "i2c" | "uart"

interface CatalogueEntry {
  title: string
  category: string
  sourceUrl: string
  interfaceKind: InterfaceKind
  directory?: string
  componentName?: string
  detailed?: boolean
}

type DetailKind =
  | "sensor"
  | "actuator"
  | "display"
  | "communications"
  | "input"
  | "utility"

const ROOT = new URL("..", import.meta.url).pathname
const BOARDS_DIR = join(ROOT, "boards")

const GUIDE_SOURCES = [
  {
    url: "https://wiki.seeedstudio.com/Grove_Sensor_Intro/",
    fallbackCategory: "Sensors",
  },
  {
    url: "https://wiki.seeedstudio.com/Grove_network_module_intro/",
    fallbackCategory: "Communications",
  },
  {
    url: "https://wiki.seeedstudio.com/Grove_Accessories_Intro/",
    fallbackCategory: "Accessories",
  },
] as const

const EXISTING_BOARDS: CatalogueEntry[] = [
  {
    title: "Grove - Button v1.0",
    category: "Switch & Button",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Button/",
    interfaceKind: "digital",
    directory: "Grove-Button",
    componentName: "GroveButton",
    detailed: true,
  },
  {
    title: "Grove - Buzzer v1.1b",
    category: "Actuator",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Buzzer/",
    interfaceKind: "digital",
    directory: "Grove-Buzzer",
    componentName: "GroveBuzzer",
    detailed: true,
  },
  {
    title: "Grove - Capacitive Moisture Sensor (Corrosion Resistant)",
    category: "Moisture",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-Capacitive_Moisture_Sensor-Corrosion-Resistant/",
    interfaceKind: "analog",
    directory: "Grove-Capacitive-Moisture",
    componentName: "GroveCapacitiveMoisture",
    detailed: true,
  },
  {
    title: "Grove - Temperature & Humidity Sensor DHT20 v2.1",
    category: "Temp & Humi",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-Temperature-Humidity-Sensor-DH20/",
    interfaceKind: "i2c",
    directory: "Grove-DHT20",
    componentName: "GroveDht20",
    detailed: true,
  },
  {
    title: "Grove - Digital PIR Motion Sensor v1.0",
    category: "Motion",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Digital-PIR-Sensor/",
    interfaceKind: "digital",
    directory: "Grove-Digital-PIR",
    componentName: "GroveDigitalPir",
    detailed: true,
  },
  {
    title: "Grove - LCD RGB Backlight v5.0",
    category: "Display",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/",
    interfaceKind: "i2c",
    directory: "Grove-LCD-RGB-Backlight",
    componentName: "GroveLcdRgbBacklight",
    detailed: true,
  },
  {
    title: "Grove - Light Sensor v1.2",
    category: "Light",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Light_Sensor/",
    interfaceKind: "analog",
    directory: "Grove-Light-Sensor",
    componentName: "GroveLightSensor",
    detailed: true,
  },
  {
    title: "Grove - OLED Display 0.96 inch (SSD1315) v1.0",
    category: "Display",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-OLED-Display-0.96-SSD1315/",
    interfaceKind: "i2c",
    directory: "Grove-OLED-SSD1315",
    componentName: "GroveOledSsd1315",
    detailed: true,
  },
  {
    title: "Grove - Relay v1.2",
    category: "Actuator",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Relay/",
    interfaceKind: "digital",
    directory: "Grove-Relay",
    componentName: "GroveRelay",
    detailed: true,
  },
  {
    title: "Grove - RGB LED Stick (10 WS2813 Mini)",
    category: "LED",
    sourceUrl:
      "https://wiki.seeedstudio.com/Grove-RGB_LED_Stick-10-WS2813_Mini/",
    interfaceKind: "digital",
    directory: "Grove-RGB-LED-Stick",
    componentName: "GroveRgbLedStick",
    detailed: true,
  },
  {
    title: "Grove - Rotary Angle Sensor v1.2",
    category: "Touch",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/",
    interfaceKind: "analog",
    directory: "Grove-Rotary-Angle-Sensor",
    componentName: "GroveRotaryAngleSensor",
    detailed: true,
  },
  {
    title: "Grove - Ultrasonic Ranger v2.0",
    category: "Proximity",
    sourceUrl: "https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/",
    interfaceKind: "digital",
    directory: "Grove-Ultrasonic-Ranger",
    componentName: "GroveUltrasonicRanger",
    detailed: true,
  },
]

const EXCLUDED_PRODUCT_WORDS = [
  "category/",
  "groves-au",
  "groves-us",
  "grove-compatible",
  "grove30",
  "grove10",
  "celebration",
  "kit",
  "cable",
  "shield",
  "base",
  "wrapper",
  "case",
  "pack",
  "starter",
  "developer",
  "commercial",
  "carrier",
  "cape",
  "hat",
  "wing",
  "conversion",
  "jumper",
  "adapter",
  "connector",
  "dash",
  "brick",
  "nunchuck",
  "physics",
  "mixer",
  "bee-socket",
  "seeeduino",
  "micro-bit",
  "linkit",
  "azure",
  "wio",
  "respeaker",
  "uf0",
  "arduino",
  "mkr",
  "beginner",
  "inventor",
  "maker",
  "grovepi",
  "grove-for-scratch",
  "female-header",
  "smd-grove",
]

const cleanHtmlText = (value: string) =>
  value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;#34;|&#34;|&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&plusmn;/gi, "±")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim()

const inferInterface = (title: string): InterfaceKind => {
  const value = title.toLowerCase()
  if (
    /\bi2c\b|sht\d|aht\d|bme\d|bmp\d|mcp\d|scd\d|sgp\d|vl53|amg\d|mlx\d|as3935|as5600|pca9685|ht16k33|tca9548|ads1115|rtc|nfc|tmg39931|lis3dhtr|bma400|bmi088|icm20600|ak09918|dps310|mpr121|sen5|sen54|sen55|sfa30|sht4|sht3|sht41|sht40|color sensor|fm receiver|i2c hub|oled|lcd|display/.test(
      value,
    )
  ) {
    return "i2c"
  }
  if (
    /\buart\b|wifi|bluetooth|ble|gps|\brf\b|lora|rfid|serial|rs232|rs485|dmx|vision ai|mp3|speech|voice|camera/.test(
      value,
    )
  ) {
    return "uart"
  }
  if (
    /analog|gas|moisture|water|light sensor|luminance|flame|sound|loudness|microphone|force|voltage|current|tds|turbidity|pressure|temperature sensor|humidity|accelerometer|emg|gsr|heart rate|oxygen|hcho|air quality|dust|barometer|touch|potentiometer|joystick|hall|tilt|vibration|reed|alcohol|electricity|ultrasonic|pir|proximity|gesture|rotary|encoder|switch|button|led|buzzer|relay|speaker|motor|servo|fan|atomization|electromagnet/.test(
      value,
    )
  ) {
    return "analog"
  }
  return "digital"
}

const inferCategory = (title: string, fallback = "Catalogue") => {
  const value = title.toLowerCase()
  if (/display|lcd|oled|e-ink|matrix/.test(value)) return "Display"
  if (/relay|buzzer|speaker|motor|servo|fan|atomization|electromagnet/.test(value)) {
    return "Actuator"
  }
  if (/led|light|luminance|uv|flame|infrared/.test(value)) return "Light & LED"
  if (/wifi|bluetooth|ble|gps|rf|lora|rfid|nfc|serial|rs232|rs485|dmx/.test(value)) {
    return "Communications"
  }
  if (/button|switch|joystick|touch|rotary|encoder|potentiometer/.test(value)) {
    return "Input"
  }
  if (/sensor|accelerometer|gyroscope|temperature|humidity|gas|pressure|water|moisture/.test(value)) {
    return "Sensor"
  }
  return fallback
}

const inferDetailKind = (entry: CatalogueEntry): DetailKind => {
  const value = `${entry.title} ${entry.category}`.toLowerCase()
  if (/display|lcd|oled|e-ink|matrix/.test(value)) return "display"
  if (/relay|buzzer|speaker|motor|servo|fan|atomization|electromagnet|led/.test(value)) {
    return "actuator"
  }
  if (/wifi|bluetooth|ble|gps|rf|lora|rfid|nfc|serial|rs232|rs485|dmx|camera|vision/.test(value)) {
    return "communications"
  }
  if (/button|switch|joystick|touch|rotary|encoder|potentiometer|keypad/.test(value)) {
    return "input"
  }
  if (/sensor|accelerometer|gyroscope|temperature|humidity|gas|pressure|water|moisture|light|sound|current|voltage/.test(value)) {
    return "sensor"
  }
  return "utility"
}

const primaryModelFor = (title: string, componentName: string) => {
  const knownModels: Array<[RegExp, string]> = [
    [/aht20/i, "AHT20"],
    [/sht35/i, "SHT35"],
    [/sht31/i, "SHT31"],
    [/sht4[01]/i, "SHT4x"],
    [/dht22|am2302/i, "DHT22"],
    [/dht20/i, "DHT20"],
    [/dht11/i, "DHT11"],
    [/bme688/i, "BME688"],
    [/bme680/i, "BME680"],
    [/bme280/i, "BME280"],
    [/bmp280/i, "BMP280"],
    [/mcp9808/i, "MCP9808"],
    [/mcp9600/i, "MCP9600"],
    [/sgp41/i, "SGP41"],
    [/sgp40/i, "SGP40"],
    [/sgp30/i, "SGP30"],
    [/scd41/i, "SCD41"],
    [/scd30/i, "SCD30"],
    [/vl53l0x/i, "VL53L0X"],
    [/as5600/i, "AS5600"],
    [/mpr121/i, "MPR121"],
    [/pca9685/i, "PCA9685"],
    [/ads1115/i, "ADS1115"],
    [/hx711/i, "HX711"],
    [/tca9548/i, "TCA9548A"],
    [/ht16k33/i, "HT16K33"],
    [/mlx9064[01]/i, "MLX9064x"],
    [/mlx9062[146]/i, "MLX9062x"],
    [/as3935/i, "AS3935"],
    [/lis3dhtr/i, "LIS3DHTR"],
    [/bma400/i, "BMA400"],
    [/bmi088/i, "BMI088"],
    [/bma456/i, "BMA456"],
    [/dps310/i, "DPS310"],
    [/tmg39931/i, "TMG39931"],
    [/paj7660|paj7620/i, "PAJ7620"],
    [/hm3301/i, "HM3301"],
    [/pca9685/i, "PCA9685"],
    [/ws2813/i, "WS2813"],
    [/ssd1315/i, "SSD1315"],
    [/ssd1306/i, "SSD1306"],
    [/sh1107/i, "SH1107"],
    [/l298p/i, "L298P"],
    [/tb6612/i, "TB6612FNG"],
    [/esp8285/i, "ESP8285"],
    [/air530/i, "Air530"],
    [/sim28/i, "SIM28"],
    [/pn532/i, "PN532"],
    [/st25dv/i, "ST25DV64"],
    [/bgt24ltr11/i, "BGT24LTR11"],
  ]
  for (const [pattern, model] of knownModels) {
    if (pattern.test(title)) return model
  }
  return `Grove ${componentName.replace(/^Grove/, "")} controller`
}

const manufacturerPartNumberFor = (model: string, componentName: string) =>
  /^[A-Z0-9-]+$/.test(model) ? model : `GROVE-${componentName.toUpperCase()}`

const powerVoltageFor = (title: string): "3.3V" | "5V" =>
  /3\.3\s*v|3v3|3\.3v/i.test(title) ? "3.3V" : "5V"

const canonicalKey = (title: string) =>
  title
    .toLowerCase()
    .replace(/seeedstudio/g, "")
    .replace(/grove/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

const titleFromProductUrl = (url: string) => {
  const pathname = new URL(url).pathname
  const slug = decodeURIComponent(pathname.slice(pathname.lastIndexOf("/") + 1))
    .replace(/\.html?$/i, "")
    .replace(/-p-\d+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return slug.replace(/\bgrove\b/gi, "Grove")
}

const isProductUrl = (url: string) => {
  const lower = url.toLowerCase()
  if (!lower.startsWith("https://www.seeedstudio.com/")) return false
  if (!lower.includes("grove")) return false
  if (/-c-\d+\.html$/.test(lower)) return false
  if (EXCLUDED_PRODUCT_WORDS.some((word) => lower.includes(word))) return false
  const pathname = new URL(url).pathname
  return pathname.split("/").at(-1)?.length !== 0
}

const componentNameFor = (title: string, sourceUrl: string) => {
  const words = title.match(/[A-Za-z0-9]+/g) ?? ["Grove", "Module"]
  let value = words
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join("")
    .replace(/^[0-9]+/, "Grove")
  if (!value.startsWith("Grove")) value = `Grove${value}`
  if (value.length > 76) {
    let hash = 0
    for (const char of sourceUrl) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
    value = `${value.slice(0, 67)}${hash.toString(36).slice(0, 8)}`
  }
  return value
}

const parseGuide = (html: string, source: (typeof GUIDE_SOURCES)[number]) => {
  const entries: CatalogueEntry[] = []
  let category = source.fallbackCategory
  const headingPattern = /<h([34])[^>]*>([\s\S]*?)<\/h\1>/gi
  for (const match of html.matchAll(headingPattern)) {
    const headingLevel = match[1]
    const text = cleanHtmlText(match[2] ?? "")
    if (!text) continue
    if (headingLevel === "3") {
      category = text
      continue
    }
    if (headingLevel === "4" && /^grove\b|^one wire temperature/i.test(text)) {
      entries.push({
        title: text,
        category,
        sourceUrl: source.url,
        interfaceKind: inferInterface(text),
      })
    }
  }
  return entries
}

const readCatalogue = async () => {
  const guideEntries = (
    await Promise.all(
      GUIDE_SOURCES.map(async (source) =>
        parseGuide(await (await fetch(source.url)).text(), source),
      ),
    )
  ).flat()

  const sitemap = await (await fetch("https://www.seeedstudio.com/sitemap.xml")).text()
  const productEntries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url): url is string => !!url && isProductUrl(url))
    .map((sourceUrl) => {
      const title = titleFromProductUrl(sourceUrl)
      return {
        title,
        category: inferCategory(title),
        sourceUrl,
        interfaceKind: inferInterface(title),
      } satisfies CatalogueEntry
    })

  const entriesByKey = new Map<string, CatalogueEntry>()
  for (const entry of [...EXISTING_BOARDS, ...guideEntries, ...productEntries]) {
    const title = cleanHtmlText(entry.title)
    if (!title) continue
    const key = canonicalKey(title)
    if (!key || entriesByKey.has(key)) continue
    entriesByKey.set(key, { ...entry, title })
  }

  const entries = [...entriesByKey.values()]
  const existingDirectories = new Set(EXISTING_BOARDS.map((entry) => entry.directory))
  const usedNames = new Set(EXISTING_BOARDS.map((entry) => entry.componentName))
  for (const entry of entries) {
    if (entry.detailed) continue
    let componentName = componentNameFor(entry.title, entry.sourceUrl)
    let suffix = 2
    while (usedNames.has(componentName)) componentName = `${componentName}${suffix++}`
    usedNames.add(componentName)
    entry.componentName = componentName
    entry.directory = componentName
    if (existingDirectories.has(componentName)) {
      throw new Error(`Generated component collides with existing board: ${componentName}`)
    }
  }
  return entries
}

const moduleSource = (entry: CatalogueEntry) => {
  const detailKind = inferDetailKind(entry)
  const primaryModel = primaryModelFor(entry.title, entry.componentName ?? "GroveModule")
  const manufacturerPartNumber = manufacturerPartNumberFor(
    primaryModel,
    entry.componentName ?? "GroveModule",
  )
  const powerVoltage = powerVoltageFor(entry.title)
  return `import { GroveDetailedModule } from "../_shared/GroveDetailedModule"

export const ${entry.componentName} = () => (
  <GroveDetailedModule
    profile={{
      name: ${JSON.stringify(entry.componentName)},
      title: ${JSON.stringify(entry.title)},
      category: ${JSON.stringify(entry.category)},
      sourceUrl: ${JSON.stringify(entry.sourceUrl)},
      interfaceKind: ${JSON.stringify(entry.interfaceKind)},
      detailKind: ${JSON.stringify(detailKind)},
      primaryModel: ${JSON.stringify(primaryModel)},
      manufacturerPartNumber: ${JSON.stringify(manufacturerPartNumber)},
      powerVoltage: ${JSON.stringify(powerVoltage)},
    }}
  />
)

export default ${entry.componentName}
`
}

const readmeSource = (entry: CatalogueEntry) => {
  const detailKind = inferDetailKind(entry)
  const primaryModel = primaryModelFor(entry.title, entry.componentName ?? "GroveModule")
  const manufacturerPartNumber = manufacturerPartNumberFor(
    primaryModel,
    entry.componentName ?? "GroveModule",
  )
  const powerVoltage = powerVoltageFor(entry.title)
  return `# ${entry.title}

Detailed Grove **${entry.category}** board model with a ${primaryModel} controller,
decoupling, interface conditioning, explicit footprints, mounting holes, and
routed nets.

- Interface: \`${entry.interfaceKind}\`
- Board family: \`${detailKind}\`
- Primary part: \`${primaryModel}\` (MPN: \`${manufacturerPartNumber}\`)
- Power rail: \`${powerVoltage}\`
- Source: [Seeed Studio catalogue or Grove guide](${entry.sourceUrl})

This board is independently defined in TSX and includes its own PCB and
schematic snapshots. The model is fabrication-oriented: every placed part has
an explicit footprint, every used pin is connected or intentionally marked
no-connect, and the board has a Grove connector, mounting holes, decoupling,
and routed interface nets. Verify the listed Seeed source and replace values or
geometry when a revision-specific Eagle/KiCad archive becomes available.
`
}

const manifestSource = (entries: CatalogueEntry[]) => `export type GroveCatalogueInterface = "digital" | "analog" | "i2c" | "uart"

export interface GroveCatalogueEntry {
  title: string
  category: string
  sourceUrl: string
  interfaceKind: GroveCatalogueInterface
  directory: string
  componentName: string
  detailed: boolean
  detailKind: "sensor" | "actuator" | "display" | "communications" | "input" | "utility"
  primaryModel: string
  manufacturerPartNumber: string
  powerVoltage: "3.3V" | "5V"
}

/**
 * Grove entries collected from Seeed's official Grove guides and product sitemap.
 * Every entry maps to one board directory with a TSX circuit and two snapshots.
 */
export const groveCatalogueManifest: GroveCatalogueEntry[] = ${JSON.stringify(
  entries.map((entry) => ({
    title: entry.title,
    category: entry.category,
    sourceUrl: entry.sourceUrl,
    interfaceKind: entry.interfaceKind,
    directory: entry.directory,
    componentName: entry.componentName,
    detailed: entry.detailed ?? false,
    detailKind: inferDetailKind(entry),
    primaryModel: primaryModelFor(entry.title, entry.componentName ?? "GroveModule"),
    manufacturerPartNumber: manufacturerPartNumberFor(
      primaryModelFor(entry.title, entry.componentName ?? "GroveModule"),
      entry.componentName ?? "GroveModule",
    ),
    powerVoltage: powerVoltageFor(entry.title),
  })),
  null,
  2,
)}
`

const main = async () => {
  const entries = await readCatalogue()
  let generated = 0
  for (const entry of entries) {
    if (entry.detailed || !entry.directory || !entry.componentName) continue
    const directory = join(BOARDS_DIR, entry.directory)
    await mkdir(directory, { recursive: true })
    await Bun.write(
      join(directory, `${entry.directory}.circuit.tsx`),
      moduleSource(entry),
    )
    await Bun.write(
      join(directory, "index.tsx"),
      `export { default, ${entry.componentName} } from "./${entry.directory}.circuit"
`,
    )
    await Bun.write(join(directory, "README.md"), readmeSource(entry))
    generated++
  }

  await Bun.write(join(BOARDS_DIR, "catalogue-manifest.ts"), manifestSource(entries))
  console.log(`Grove catalogue: ${entries.length} entries (${generated} generated, ${EXISTING_BOARDS.length} detailed)`)
}

await main()
