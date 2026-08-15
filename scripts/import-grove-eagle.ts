import { mkdir, readdir, readFile } from "node:fs/promises"
import { dirname, join, relative } from "node:path"
import { XMLParser } from "fast-xml-parser"
import { groveCatalogueManifest } from "../boards/catalogue-manifest"

/**
 * Convert the official Seeed Grove-Eagle archive into compact, renderable
 * component/footprint data.  The archive is intentionally kept outside this
 * repository (it is a source reference, not a runtime dependency); the
 * generated TypeScript is checked in so builds remain deterministic.
 */

const EAGLE_ROOT = process.env.GROVE_EAGLE_ROOT ?? "/private/tmp/Grove-Eagle"
const OUT = join(import.meta.dir, "../boards/_shared/groveEagleSpecs.ts")

type AnyRecord = Record<string, any>

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) =>
    [
      "library",
      "package",
      "element",
      "signal",
      "contactref",
      "smd",
      "pad",
      "hole",
      "wire",
      "circle",
      "rectangle",
      "text",
      "polygon",
      "via",
    ].includes(name),
})

const asArray = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value]

const normalizeElementName = (value: string) =>
  /^\d+$/.test(value) ? `LED${value}` : value

const number = (value: unknown, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const rotation = (value: unknown) => {
  const raw = String(value ?? "0")
  const match = raw.match(/(\d+(?:\.\d+)?)$/)
  return number(match?.[1], 0)
}

const mirrored = (value: unknown) => String(value ?? "").startsWith("M")

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/grove/g, "")
    .replace(/seeedstudio/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(v|version|rev|revision)\s*\d+(?:\.\d+)?[a-z]?\b/g, " ")
    .replace(/\b(?:sensor|module|board|kit|the|and|with|for|pro|mini)\b/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 1)

const tokenScore = (title: string, candidate: string) => {
  const a = new Set(normalise(title))
  const b = new Set(normalise(candidate))
  let intersection = 0
  for (const token of a) if (b.has(token)) intersection++
  return intersection / Math.max(1, Math.min(a.size, b.size))
}

const explicitAliases: Array<[RegExp, RegExp]> = [
  [/button\s+p/i, /Button\/v1\.0b/],
  [/buzzer/i, /Buzzer\/v1\.1b/],
  [/relay\s+v1\.2/i, /Relay\/v1\.2/],
  [/rotary\s+angle\s+sensor\s+v1\.2/i, /Rotary Angle Sensor\/v1\.2/],
  [/3\s*axis.*16g/i, /3-Axis Digital Accelerometer\(±16g\)\/v1\.3/],
  [/3\s*axis.*1\.?5g/i, /3-Axis Digital Accelerometer\(±1\.5g\)\/v1\.2b/],
  [/3\s*axis.*400g/i, /3-Axis Digital Accelerometer\(±400g\)/],
  [/3\s*axis.*analog.*adxl335/i, /3-Axis Analog Accelerometer\/v1\.1/],
  [/digital\s+light.*tsl2561/i, /Digital Light Sensor\/v0\.9b/],
  [/light\s+sensor\s+v1\.2/i, /Light Sensor\/v0\.9b/],
  [/temperature.*humidity.*dht22/i, /Temperature & Humidity Sensor Pro\/v0\.9b/],
  [/temperature.*humidity.*dht11/i, /Temperature & Humidity Sensor\/v0\.9b/],
  [/temperature.*humidity.*high.*accuracy/i, /Temperature & Humidity Sensor \(High-Accuracy & Mini\)/],
  [/i2c\s+fm/i, /I2C FM Receiver\/v1\.1/],
  [/fm\s+receiver/i, /FM Receiver\/v1\.0/],
  [/gps/i, /GPS\/v1\.1/],
  [/i2c\s+motor.*v1\.3/i, /I2C Motor Driver\/v1\.2/],
  [/i2c\s+motor/i, /I2C Motor Driver\/v1\.2/],
  [/led\s+bar/i, /LED Bar\/v1\.0/],
  [/chainable\s+rgb/i, /Chainable RGB LED\/v0\.9b/],
  [/variable\s+color\s+led/i, /Variable Color LED\/v0\.9b/],
  [/solid\s+state\s+relay/i, /Solid State Relay\/v0\.9b/],
  [/dry[- ]reed\s+relay/i, /Dry-Reed Relay\/v1\.0b/],
  [/30a/i, /SPDT Relay\(30A\)\/v1\.0b/],
  [/air\s+quality/i, /Air Quality Sensor\/v1\.3/],
  [/gas\s+sensor.*mq2/i, /Gas Sensor\(MQ2\)/],
  [/gas\s+sensor.*mq3/i, /Gas Sensor\(MQ3\)/],
  [/gas\s+sensor.*mq5/i, /Gas Sensor\(MQ5\)/],
  [/gas\s+sensor.*mq9/i, /Gas Sensor\(MQ9\)/],
  [/gas\s+sensor.*o2/i, /Gas Sensor\(O2\)/],
  [/moisture/i, /Moisture Sensor\/v1\.2/],
  [/water\s+level|water\s+sensor/i, /Water Sensor\/v0\.9b/],
  [/sound\s+sensor/i, /Sound Sensor\/v1\.3/],
  [/loudness/i, /Loudness Sensor\/v0\.9b/],
  [/gsr/i, /GSR Sensor\/v1\.0/],
  [/emg/i, /EMG Detector\/v1\.1/],
  [/flame/i, /Flame Sensor\/v1\.0/],
  [/infrared\s+reflective/i, /Infrared Reflective Sensor\/v1\.0/],
  [/infrared\s+receiver/i, /Infrared Receiver\/v1\.0/],
  [/line\s+finder/i, /Line Finder\/v1\.0/],
  [/pir/i, /PIR Motion Sensor\/v1\.2/],
  [/collision/i, /Collision Sensor\/v2\.0/],
  [/i2c\s+color/i, /I2C Color Sensor\/v1\.2/],
  [/i2c\s+touch/i, /I2C Touch Sensor\/v1\.1/],
  [/q\s+touch/i, /Q Touch Sensor\/v1\.0/],
  [/rotary\s+angle/i, /Rotary Angle Sensor\/v1\.2/],
  [/slide\s+pot/i, /Slide Potentiometer\/v1\.0/],
  [/ultrasonic/i, /Ultrasonic Ranger\/v1\.0/],
  [/digital\s+gyro/i, /3-Axis Digital Gyro\/v1\.2b/],
  [/digital\s+compass/i, /3-Axis Digital Compass\/v1\.2/],
  [/6\s*axis.*compass/i, /6-Axis Accelerometer & Compass\/v2\.0/],
  [/imu\s*9dof/i, /IMU 9DOF\/v1\.0/],
  [/imu\s*10dof/i, /IMU 10DOF\/v1\.0/],
  [/4\s*digit/i, /4-Digit Display\/v1\.0/],
  [/serial\s+lcd/i, /Serial LCD\/v1\.0b/],
  [/lcd/i, /LCD RGB Backlight\/v1\.0/],
  [/speaker/i, /Speaker\/v1\.0b/],
  [/vibration\s+motor/i, /Vibration Motor\/v1\.2a/],
  [/haptic/i, /Vibration Motor\/v1\.2a/],
  [/mini\s+fan/i, /Mini Fan\/v1\.0/],
  [/electromagnet/i, /Electromagnet\/v1\.0/],
  [/dmx/i, /DMX512\/v1\.0/],
  [/serial\s+mp3|mp3/i, /Serial MP3 Player\/v1\.0b/],
  [/nfc/i, /NFC\/v1\.0/],
  [/fingerprint/i, /Fingerprint Sensor\/v1\.0/],
]

const chooseFile = (title: string, files: string[]) => {
  for (const [titlePattern, pathPattern] of explicitAliases) {
    if (titlePattern.test(title)) {
      const matching = files.filter((file) => pathPattern.test(file))
      if (matching.length > 0) return matching.sort()[matching.length - 1]
    }
  }
  const ranked = files
    .map((file) => ({ file, score: tokenScore(title, file) }))
    .sort((a, b) => b.score - a.score)
  if (ranked[0]?.score >= 0.72) return ranked[0].file
  return undefined
}

interface PadSpec {
  name: string
  kind: "smd" | "platedhole" | "hole"
  x: number
  y: number
  width?: number
  height?: number
  drill?: number
  diameter?: number
  shape?: "rect" | "round" | "square" | "octagon"
  rotation?: number
  layer?: "top" | "bottom"
}

interface GraphicSpec {
  kind: "line" | "circle" | "rect"
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  x?: number
  y?: number
  radius?: number
  width?: number
  height?: number
}

interface PackageSpec {
  pads: PadSpec[]
  graphics: GraphicSpec[]
}

interface ComponentSpec {
  name: string
  value: string
  package: string
  x: number
  y: number
  rotation: number
  mirrored: boolean
}

interface SignalSpec {
  name: string
  pins: Array<[string, string]>
  routes: Array<{ x1: number; y1: number; x2: number; y2: number; width: number; layer: "top" | "bottom" }>
}

interface EagleSpec {
  source: string
  width: number
  height: number
  originX: number
  originY: number
  components: ComponentSpec[]
  packages: Record<string, PackageSpec>
  signals: SignalSpec[]
}

const parsePackage = (packageNode: AnyRecord, includeBoardOutline = false): PackageSpec => {
  const pads: PadSpec[] = []
  for (const smd of asArray(packageNode.smd)) {
    const padName = String(smd["@_name"])
    if (/^SS\d*$/i.test(padName)) continue
    pads.push({
      name: padName,
      kind: "smd",
      x: number(smd["@_x"]),
      y: number(smd["@_y"]),
      width: number(smd["@_dx"]),
      height: number(smd["@_dy"]),
      shape: smd["@_roundness"] ? "round" : "rect",
      rotation: rotation(smd["@_rot"]),
      layer: number(smd["@_layer"], 1) === 16 ? "bottom" : "top",
    })
  }
  for (const pad of asArray(packageNode.pad)) {
    const padName = String(pad["@_name"])
    if (/^SS\d*$/i.test(padName)) continue
    const drill = number(pad["@_drill"], 0.9)
    const diameter = number(pad["@_diameter"], Math.max(drill + 0.6, 1.6))
    pads.push({
      name: padName,
      kind: "platedhole",
      x: number(pad["@_x"]),
      y: number(pad["@_y"]),
      drill,
      diameter,
      shape: pad["@_shape"] === "square" ? "square" : "round",
      rotation: rotation(pad["@_rot"]),
    })
  }
  for (const hole of asArray(packageNode.hole)) {
    const drill = number(hole["@_drill"], 1)
    pads.push({
      name: `hole-${pads.length + 1}`,
      kind: "hole",
      x: number(hole["@_x"]),
      y: number(hole["@_y"]),
      drill,
      diameter: drill,
    })
  }

  const graphics: GraphicSpec[] = []
  for (const wire of asArray(packageNode.wire)) {
    const layer = number(wire["@_layer"])
    if (layer !== 21 && !(includeBoardOutline && layer === 20)) continue
    graphics.push({
      kind: "line",
      x1: number(wire["@_x1"]),
      y1: number(wire["@_y1"]),
      x2: number(wire["@_x2"]),
      y2: number(wire["@_y2"]),
    })
  }
  for (const circle of asArray(packageNode.circle)) {
    const layer = number(circle["@_layer"])
    if (layer !== 21 && !(includeBoardOutline && layer === 20)) continue
    graphics.push({
      kind: "circle",
      x: number(circle["@_x"]),
      y: number(circle["@_y"]),
      radius: number(circle["@_radius"]),
    })
  }
  for (const rectangle of asArray(packageNode.rectangle)) {
    const layer = number(rectangle["@_layer"])
    if (layer !== 21 && !(includeBoardOutline && layer === 20)) continue
    graphics.push({
      kind: "rect",
      x1: number(rectangle["@_x1"]),
      y1: number(rectangle["@_y1"]),
      x2: number(rectangle["@_x2"]),
      y2: number(rectangle["@_y2"]),
    })
  }
  return { pads, graphics }
}

const parseBoard = (source: string, relativePath: string): EagleSpec => {
  const root = parser.parse(source) as AnyRecord
  const board = root.eagle?.drawing?.board
  if (!board) throw new Error(`No board node in ${relativePath}`)

  const outlinePoints: Array<[number, number]> = []
  for (const wire of asArray(board.plain?.wire)) {
    if (number(wire["@_layer"]) !== 20) continue
    outlinePoints.push([number(wire["@_x1"]), number(wire["@_y1"])] )
    outlinePoints.push([number(wire["@_x2"]), number(wire["@_y2"])] )
  }
  // Circular boards (for example the Circular LED) store their finished
  // outline as a plain circle rather than a wire loop.
  for (const circle of asArray(board.plain?.circle)) {
    if (number(circle["@_layer"]) !== 20) continue
    const x = number(circle["@_x"])
    const y = number(circle["@_y"])
    const radius = number(circle["@_radius"])
    outlinePoints.push([x - radius, y - radius], [x + radius, y + radius])
  }
  for (const rectangle of asArray(board.plain?.rectangle)) {
    if (number(rectangle["@_layer"]) !== 20) continue
    outlinePoints.push(
      [number(rectangle["@_x1"]), number(rectangle["@_y1"])],
      [number(rectangle["@_x2"]), number(rectangle["@_y2"])],
    )
  }

  const rawElements = asArray(board.elements?.element).map((element) => ({
      name: normalizeElementName(String(element["@_name"])),
      value: String(element["@_value"] ?? "").trim(),
      package: String(element["@_package"]),
      x: number(element["@_x"]),
      y: number(element["@_y"]),
      rotation: rotation(element["@_rot"]),
      mirrored: mirrored(element["@_rot"]),
    }))
  const elements = rawElements
    .filter((element) =>
      element.package &&
      !/^u\$|^tp\d+$/i.test(element.name) &&
      !/^TWIG\d*$/i.test(element.name) &&
      !/^(logo|moudle|mark|oshw|cooling-fin)$/i.test(element.package) &&
      !/^grove-test-platform/i.test(element.package) &&
      !/^round-mark/i.test(element.package) &&
      !/^(?:TP_|1P-)/i.test(element.package) &&
      // Dimensional drill/mounting fixtures are not BOM components and can
      // overlap the connector copper when normalized into a PCB footprint.
      !/(?:DIM|MARK).*DRILL/i.test(element.package) &&
      !/^dnp$/i.test(element.value) &&
      !/\(\s*dnp\s*\)/i.test(element.value) &&
      !/^(?:SILK|LOGO|MARK)/i.test(element.value),
    )
  // A number of Seeed files encode the actual board outline in a hidden
  // `2U-DIM-W/-DRILL` package element instead of `<plain>` geometry. Keep
  // those package definitions for dimension extraction while still omitting
  // the fixture from the rendered BOM and PCB.
  const dimensionElements = rawElements.filter((element) =>
    /(?:DIM|MARK).*DRILL/i.test(element.package),
  )
  const usedNames = new Set([
    ...elements.map((element) => element.package),
    ...dimensionElements.map((element) => element.package),
  ])

  const packageMap: Record<string, PackageSpec> = {}
  for (const library of asArray(board.libraries?.library)) {
    for (const packageNode of asArray(library.packages?.package)) {
      const packageName = String(packageNode["@_name"])
      if (usedNames.has(packageName)) {
        packageMap[packageName] = parsePackage(
          packageNode,
          dimensionElements.some((element) => element.package === packageName),
        )
      }
    }
  }

  const transformPoint = (
    x: number,
    y: number,
    element: (typeof rawElements)[number],
  ): [number, number] => {
    const mirroredX = element.mirrored ? -x : x
    const radians = (element.rotation * Math.PI) / 180
    return [
      element.x + mirroredX * Math.cos(radians) - y * Math.sin(radians),
      element.y + mirroredX * Math.sin(radians) + y * Math.cos(radians),
    ]
  }
  const dimensionPoints = dimensionElements.flatMap((element) => {
    const pkg = packageMap[element.package]
    if (!pkg) return [] as Array<[number, number]>
    const points: Array<[number, number]> = []
    for (const graphic of pkg.graphics) {
      if (graphic.kind === "line") {
        points.push(
          transformPoint(graphic.x1 ?? 0, graphic.y1 ?? 0, element),
          transformPoint(graphic.x2 ?? 0, graphic.y2 ?? 0, element),
        )
      } else if (graphic.kind === "circle") {
        const [x, y] = transformPoint(graphic.x ?? 0, graphic.y ?? 0, element)
        const radius = graphic.radius ?? 0
        points.push([x - radius, y - radius], [x + radius, y + radius])
      } else {
        points.push(
          transformPoint(graphic.x1 ?? 0, graphic.y1 ?? 0, element),
          transformPoint(graphic.x2 ?? 0, graphic.y2 ?? 0, element),
        )
      }
    }
    return points
  })

  const elementNames = new Set(elements.map((element) => element.name))
  const signals: SignalSpec[] = []
  for (const signal of asArray(board.signals?.signal)) {
    const pins = asArray(signal.contactref)
      .map((contact) => [normalizeElementName(String(contact["@_element"])), String(contact["@_pad"])] as [string, string])
      .filter(([element]) => elementNames.has(element))
    const routes = asArray(signal.wire)
      .map((wire) => ({
        x1: number(wire["@_x1"]),
        y1: number(wire["@_y1"]),
        x2: number(wire["@_x2"]),
        y2: number(wire["@_y2"]),
        width: number(wire["@_width"], 0.254),
        layer: number(wire["@_layer"], 1) === 16 ? "bottom" as const : "top" as const,
      }))
    if (pins.length >= 2) signals.push({ name: String(signal["@_name"]), pins, routes })
  }

  const componentPoints = elements.flatMap((element) => {
    const pkg = packageMap[element.package]
    if (!pkg) return [[element.x, element.y] as [number, number]]
    return pkg.pads.flatMap((pad) => {
      const halfWidth = (pad.width ?? pad.diameter ?? pad.drill ?? 0.5) / 2
      const halfHeight = (pad.height ?? pad.diameter ?? pad.drill ?? 0.5) / 2
      return [
        [element.x + pad.x - halfWidth, element.y + pad.y - halfHeight] as [number, number],
        [element.x + pad.x + halfWidth, element.y + pad.y + halfHeight] as [number, number],
      ]
    })
  })
  const componentXs = componentPoints.map(([x]) => x)
  const componentYs = componentPoints.map(([, y]) => y)
  const componentMinX = Math.min(...componentXs)
  const componentMaxX = Math.max(...componentXs)
  const componentMinY = Math.min(...componentYs)
  const componentMaxY = Math.max(...componentYs)
  const routePoints = signals.flatMap((signal) =>
    signal.routes.flatMap((route) => [
      [route.x1, route.y1] as [number, number],
      [route.x2, route.y2] as [number, number],
    ]),
  ).filter(([x, y]) =>
    x >= componentMinX - 4 && x <= componentMaxX + 4 &&
    y >= componentMinY - 4 && y <= componentMaxY + 4,
  )
  const allPoints = componentPoints.length > 0
    ? [...componentPoints, ...routePoints, ...outlinePoints, ...dimensionPoints]
    : outlinePoints
  const xs = allPoints.map(([x]) => x)
  const ys = allPoints.map(([, y]) => y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const copperMargin = 1.2
  const routeWidth = routePoints.length
    ? Math.max(...routePoints.map(([x]) => Math.abs(x - (minX + maxX) / 2) * 2 + copperMargin))
    : 0
  const routeHeight = routePoints.length
    ? Math.max(...routePoints.map(([, y]) => Math.abs(y - (minY + maxY) / 2) * 2 + copperMargin))
    : 0
  return {
    source: relativePath,
    // Leave a small fabrication-safe border around the Eagle outline. Eagle
    // package courtyards and connector shells routinely extend a fraction of
    // a millimetre beyond the drawn dimension, and tscircuit intentionally
    // reports those as placement errors when the outline is exact.
    width: Math.max(20, maxX - minX + 2, routeWidth),
    height: Math.max(15, maxY - minY + 2, routeHeight),
    originX: (minX + maxX) / 2,
    originY: (minY + maxY) / 2,
    components: elements,
    packages: packageMap,
    signals,
  }
}

const main = async () => {
  const files: string[] = []
  const walk = async (directory: string) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await walk(path)
      else if (entry.name.endsWith(".brd")) files.push(path)
    }
  }
  await walk(EAGLE_ROOT)
  const relativeFiles = files.map((file) => relative(EAGLE_ROOT, file))
  const specs: Record<string, EagleSpec> = {}
  let matched = 0
  for (const entry of groveCatalogueManifest) {
    if (entry.detailed) continue
    const selected = chooseFile(entry.title, relativeFiles)
    if (!selected) continue
    try {
      const spec = parseBoard(
        await readFile(join(EAGLE_ROOT, selected), "utf8"),
        selected,
      )
      if (spec.components.length < 2 || Object.keys(spec.packages).length === 0) continue
      specs[entry.directory] = spec
      matched++
    } catch (error) {
      console.warn(`Skipping ${entry.directory}: ${String(error)}`)
    }
  }
  await mkdir(dirname(OUT), { recursive: true })
  await Bun.write(
    OUT,
    `// Generated from Seeed-Studio/Grove-Eagle. Do not edit by hand.\nexport interface GroveEaglePad { name: string; kind: "smd" | "platedhole" | "hole"; x: number; y: number; width?: number; height?: number; drill?: number; diameter?: number; shape?: "rect" | "round" | "square" | "octagon"; rotation?: number; layer?: "top" | "bottom" }\nexport interface GroveEagleGraphic { kind: "line" | "circle" | "rect"; x1?: number; y1?: number; x2?: number; y2?: number; x?: number; y?: number; radius?: number }\nexport interface GroveEaglePackage { pads: GroveEaglePad[]; graphics: GroveEagleGraphic[] }\nexport interface GroveEagleComponent { name: string; value: string; package: string; x: number; y: number; rotation: number; mirrored: boolean }\nexport interface GroveEagleSignal { name: string; pins: Array<[string, string]>; routes: Array<{ x1: number; y1: number; x2: number; y2: number; width: number; layer: "top" | "bottom" }> }\nexport interface GroveEagleSpec { source: string; width: number; height: number; originX: number; originY: number; components: GroveEagleComponent[]; packages: Record<string, GroveEaglePackage>; signals: GroveEagleSignal[] }\nexport const groveEagleSpecs: Record<string, GroveEagleSpec> = ${JSON.stringify(specs)}\n`,
  )
  console.log(`Imported ${matched} official Eagle board layouts into ${OUT}`)
}

await main()
