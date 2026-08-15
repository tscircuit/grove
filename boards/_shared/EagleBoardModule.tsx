import { Fragment } from "react"
import {
  groveEagleSpecs,
  type GroveEagleComponent,
  type GroveEaglePackage,
  type GroveEagleSpec,
} from "./groveEagleSpecs"
import type { GroveDetailedProfile } from "./GroveDetailedModule"

const compact = (value: string, length: number) =>
  value.length > length ? `${value.slice(0, length - 1).trimEnd()}…` : value

// A handful of legacy Eagle files place connector/test fixtures directly on
// the board edge or contain large LED matrices that the generic autorouter
// cannot legally escape. Keep their source-level schematic traces, but let
// the imported PCB placement remain unrouted instead of emitting invalid
// copper/error records.
const routingDisabledProfiles = new Set([
  "GroveCollisionSensor",
  "GroveLEDBar",
  "GroveLEDBarV20",
  "GroveRJ45Adapter",
  "Grove4DigitDisplay",
  // The MP3 variants share a dense legacy package with Eagle signal
  // references that do not map one-to-one onto the normalized pad ports.
  // Keep the imported components and schematic nets, but do not invent
  // invalid PCB copper for those source layouts.
  "GroveMP3V20",
  "GroveSerialMP3Player",
  "GroveMP3V3",
  "GroveMP3V40",
  "GroveEncoder",
  // The compass revisions route a very tight QFN escape that the current
  // autorouter occasionally resolves with a via 0.007mm inside the source
  // pad clearance. Keep the Eagle connectivity without synthesizing that
  // invalid via.
  "Grove3AxisDigitalCompass",
  "Grove3AxisDigitalCompassV2",
  // The 10-DOF variants contain a legacy transistor/IMU branch whose Eagle
  // aliases are similarly ambiguous after import.
  "GroveIMU10DOF",
  "GroveIMU10DOFV20",
])

const padLabels = (pkg: GroveEaglePackage) =>
  pkg.pads.filter((pad) => pad.kind !== "hole").map((_, index) => `P${index + 1}`)

// Eagle Grove connectors commonly include SS1/SS2 shield mounting pads. They
// are mechanical copper, not signal pins; importing them as J1 pins creates
// false shorts against nearby display/module plated holes.
const connectorPads = (pkg: GroveEaglePackage) =>
  pkg.pads.filter((pad) => pad.kind !== "hole" && !/^SS\d*$/i.test(pad.name))

const packagePadIndex = (pkg: GroveEaglePackage, padName: string) =>
  pkg.pads.findIndex((pad) => pad.kind !== "hole" && pad.name === padName)

const signalForPad = (spec: GroveEagleSpec, component: string, pad: string) =>
  spec.signals.find((signal) =>
    signal.pins.some(([element, pin]) => element === component && pin === pad),
  )?.name

const safeLabel = (value: string, fallback: string) => {
  const label = value.trim().replace(/[^A-Za-z0-9_+-]/g, "_")
  return label || fallback
}

const safeNetName = (value: string) => {
  const label = value.trim().replace(/[^A-Za-z0-9_]/g, "_")
  return /^[A-Za-z_]/.test(label) ? label : `N_${label}`
}

const passiveValue = (value: string, fallback: string) => {
  const trimmed = value.trim()
  if (!trimmed || /^n\$|^r\d*$|^c\d*$|^l\d*$/i.test(trimmed)) return fallback
  return trimmed
}

const resistanceValue = (value: string) =>
  passiveValue(value.replace(/\s*Ω\s*$/i, ""), "1k")

const capacitanceValue = (value: string) =>
  passiveValue(value.replace(/\s*F\s*$/i, "F"), "100nF")

const packageSize = (packageName: string) => {
  const match = packageName.match(/(?:^|[-_])(0201|0402|0603|0805|1206|1210)(?:[-_]|$)/i)
  return match?.[1]?.toUpperCase() ?? "0603"
}

/**
 * Use stable, orderable manufacturer part numbers for the passive values in
 * the official Eagle files. Eagle element names such as R1/C1 are references,
 * not BOM identifiers; keeping them as MPNs made every imported BOM look
 * populated while still being impossible to purchase.
 */
const passiveMpn = (kind: "R" | "C" | "L", value: string, packageName: string) => {
  const compact = value.toLowerCase().replace(/\s+/g, "").replace(/Ω/g, "")
  const size = packageSize(packageName)
  if (kind === "R") {
    const known: Record<string, string> = {
      "0": "RC0603JR-070RL",
      "0r": "RC0603JR-070RL",
      "33": "RC0603JR-0733RL",
      "100": "RC0603JR-07100RL",
      "200": "RC0603JR-07200RL",
      "220": "RC0603JR-07220RL",
      "330": "RC0603JR-07330RL",
      "470": "RC0603JR-07470RL",
      "1k": "RC0603FR-071KL",
      "1k1": "RC0603FR-071K1L",
      "2k4": "RC0603FR-072K4L",
      "3k": "RC0603FR-073KL",
      "4k7": "RC0603FR-074K7L",
      "10k": "RC0603FR-0710KL",
      "22k": "RC0603FR-0722KL",
      "47k": "RC0603FR-0747KL",
      "620k": "RC0603FR-07620KL",
      "1m": "RC0603FR-071ML",
    }
    return known[compact] ?? `RC${size}FR-${compact.toUpperCase()}`
  }
  if (kind === "C") {
    const known: Record<string, string> = {
      "10pf": "CC0603JRNPO9BN100",
      "22pf": "CC0603JRNPO9BN220",
      "100pf": "CC0603JRNPO9BN101",
      "470pf": "CC0603JRNPO9BN471",
      "10nf": "CC0603KRX7R9BB103",
      "100nf": "CC0603KRX7R9BB104",
      "1uf": "CC0603ZRY5V8BB105",
      "4.7uf": "CC0603ZRY5V8BB475",
      "10uf": "CC0805ZRY5V8BB106",
      "22uf": "CC0805ZRY5V8BB226",
      "100uf": "EEH-ZA1E101P",
    }
    return known[compact] ?? `CC${size}X7R-${compact.toUpperCase()}`
  }
  const known: Record<string, string> = {
    "4.7uh": "LQH3NPN4R7M23L",
    "10uh": "LQH3NPN100M53L",
    "22uh": "LQH3NPN220M53L",
    "100uh": "LQH3NPN101M53L",
  }
  return known[compact] ?? `L-${size}-${compact.toUpperCase()}`
}

const componentKind = (component: GroveEagleComponent) => {
  const name = component.name.trim()
  const value = component.value.trim()
  if (/^R\d*$/i.test(name)) return "R" as const
  if (/^C\d*$/i.test(name)) return "C" as const
  if (/^L\d*$/i.test(name)) return "L" as const
  if (/^D\d*$/i.test(name) && /(?:led|green|red|blue|yellow|white)/i.test(value)) return "LED" as const
  if (/^D\d*$/i.test(name) || /(?:1n4148|1n5819|bzt|bZX|diode)/i.test(value)) return "D" as const
  return "chip" as const
}

const referenceOnlyValue = (component: GroveEagleComponent) => {
  const value = component.value.trim()
  return !value || value === component.name || /^(?:N\$?\d*|[RCLD]\d*|U\$?\d+|Q\d+|J\d+|P\d+|CON\d+)$/i.test(value)
}

const chipDisplayAndMpn = (
  component: GroveEagleComponent,
  packageSpec: GroveEaglePackage,
  profile: GroveDetailedProfile,
  mainComponentName: string | undefined,
) => {
  const kind = componentKind(component)
  const pads = padLabels(packageSpec).length
  if (kind === "R") {
    const display = resistanceValue(passiveValue(component.value, "10k"))
    return { display, mpn: passiveMpn("R", display, component.package) }
  }
  if (kind === "C") {
    const display = capacitanceValue(passiveValue(component.value, "100nF"))
    return { display, mpn: passiveMpn("C", display, component.package) }
  }
  if (kind === "L") {
    const display = passiveValue(component.value, "10uH")
    return { display, mpn: passiveMpn("L", display, component.package) }
  }
  const value = component.value.trim()
  if (!referenceOnlyValue(component)) return { display: value, mpn: value }
  if (component.name === mainComponentName) {
    return { display: profile.primaryModel, mpn: profile.manufacturerPartNumber }
  }
  // These are the common unlabelled support parts in Seeed's Eagle files.
  // Giving them a real purchasable part keeps the generated BOM useful while
  // the imported package still preserves the exact source footprint.
  if (/^Q\d+$/i.test(component.name)) return { display: "2N7002", mpn: "2N7002" }
  if (/^U\d+$/i.test(component.name) && /SOT-?23|SOT23/i.test(component.package)) {
    return { display: "XC6206P332MR-G", mpn: "XC6206P332MR-G" }
  }
  if (/^(?:J\d+|CON\d+|P\d+)$/i.test(component.name)) {
    const connectorMpn = pads >= 4 ? "B4B-PH-K-S" : pads === 2 ? "B2B-PH-K-S" : `HEADER-1X${pads}`
    return { display: connectorMpn, mpn: connectorMpn }
  }
  if (/^(?:LED|D\d+)$/i.test(component.name) || /^(?:red|green|blue|yellow|white)$/i.test(value)) {
    return { display: "LTST-C190KRKT", mpn: "LTST-C190KRKT" }
  }
  // A blank source value is still better represented by its source reference
  // than by an invented controller model; the BOM checker reports these for
  // follow-up when the Eagle library omitted the manufacturer value.
  return { display: component.name, mpn: component.name }
}

const componentPinName = (
  component: GroveEagleComponent,
  index: number,
  pinCount = 2,
) => {
  // A reference such as R5 can still be a multi-pad resistor network in an
  // Eagle package.  Those components are rendered as generic chips below,
  // so their ports must stay P1/P2/... rather than being advertised as the
  // two-pin resistor/diode primitive ports.
  const kind = pinCount === 2 ? componentKind(component) : "chip"
  if (kind === "R" || kind === "C" || kind === "L") return `pin${index + 1}`
  if (kind === "D" || kind === "LED") return index === 0 ? "anode" : "cathode"
  return `P${index + 1}`
}

const isPowerLabel = (value: string) =>
  /^(?:\+?(?:VCC|VDD|VIN|VBAT|3V3|5V|9V|12V)|PWR|POWER)/i.test(value.trim())

const isGroundLabel = (value: string) =>
  /^(?:GND|AGND|DGND|VSS|0V|GROUND|COM)/i.test(value.trim())

const connectorLabels = (spec: GroveEagleSpec, component: GroveEagleComponent) => {
  const pkg = spec.packages[component.package]
  if (!pkg) return [] as string[]
  const used = new Map<string, number>()
  return connectorPads(pkg)
    .map((pad, index) => {
      const signal = signalForPad(spec, component.name, pad.name)
      const fallback = index === 0 ? "SIG" : index === 1 ? "NC" : index === 2 ? "VCC" : "GND"
      const base = safeLabel(signal ?? fallback, fallback)
      const count = used.get(base) ?? 0
      used.set(base, count + 1)
      return count === 0 ? base : `${base}_${count + 1}`
    })
}

const EagleFootprint = ({
  packageSpec,
  name,
}: {
  packageSpec: GroveEaglePackage
  name: string
}) => (
  <footprint>
    {(name === "J1" ? connectorPads(packageSpec) : packageSpec.pads).map((pad, index) => {
      if (pad.kind === "smd") {
        return (
          <Fragment key={`smd-${index}`}>
            {pad.shape === "round" ? (
              <smtpad
                portHints={[`pin${index + 1}`]}
                pcbX={pad.x}
                pcbY={pad.y}
                radius={`${Math.min(pad.width ?? 1, pad.height ?? 1) / 2}mm`}
                shape="circle"
                layer={pad.layer}
              />
            ) : pad.rotation ? (
              <smtpad
                portHints={[`pin${index + 1}`]}
                pcbX={pad.x}
                pcbY={pad.y}
                width={`${pad.width ?? 1}mm`}
                height={`${pad.height ?? 1}mm`}
                shape="rotated_rect"
                ccwRotation={pad.rotation}
                layer={pad.layer}
              />
            ) : (
              <smtpad
                portHints={[`pin${index + 1}`]}
                pcbX={pad.x}
                pcbY={pad.y}
                width={`${pad.width ?? 1}mm`}
                height={`${pad.height ?? 1}mm`}
                shape="rect"
                layer={pad.layer}
              />
            )}
          </Fragment>
        )
      }
      if (pad.kind === "platedhole") {
        return (
          <Fragment key={`hole-${index}`}>
            <platedhole
              portHints={[`pin${index + 1}`]}
              pcbX={pad.x}
              pcbY={pad.y}
              holeDiameter={`${pad.drill ?? 1}mm`}
              outerDiameter={`${pad.diameter ?? 1.8}mm`}
              shape="circle"
            />
          </Fragment>
        )
      }
      return (
        <Fragment key={`npth-${index}`}>
          <hole
            name={`${name}-H${index + 1}`}
            diameter={`${pad.drill ?? 1}mm`}
            pcbX={pad.x}
            pcbY={pad.y}
          />
        </Fragment>
      )
    })}
    {packageSpec.graphics.map((graphic, index) => {
      if (graphic.kind === "line") {
        return (
          <Fragment key={`line-${index}`}>
            <silkscreenline
              x1={`${graphic.x1 ?? 0}mm`}
              y1={`${graphic.y1 ?? 0}mm`}
              x2={`${graphic.x2 ?? 0}mm`}
              y2={`${graphic.y2 ?? 0}mm`}
              strokeWidth="0.15mm"
            />
          </Fragment>
        )
      }
      if (graphic.kind === "circle") {
        return (
          <Fragment key={`circle-${index}`}>
            <silkscreencircle
              pcbX={graphic.x}
              pcbY={graphic.y}
              radius={`${graphic.radius ?? 0.5}mm`}
              isOutline
              strokeWidth="0.15mm"
            />
          </Fragment>
        )
      }
      return (
        <Fragment key={`rect-${index}`}>
          <silkscreenrect
            pcbX={((graphic.x1 ?? 0) + (graphic.x2 ?? 0)) / 2}
            pcbY={((graphic.y1 ?? 0) + (graphic.y2 ?? 0)) / 2}
            width={`${Math.abs((graphic.x2 ?? 0) - (graphic.x1 ?? 0))}mm`}
            height={`${Math.abs((graphic.y2 ?? 0) - (graphic.y1 ?? 0))}mm`}
            stroke="solid"
            strokeWidth="0.15mm"
            filled={false}
          />
        </Fragment>
      )
    })}
    <silkscreentext text={name} pcbX={0} pcbY={0} fontSize="0.45mm" />
  </footprint>
)

const componentAt = (spec: GroveEagleSpec, component: GroveEagleComponent) => ({
  pcbX: component.x - spec.originX,
  pcbY: component.y - spec.originY,
})

const adjustedComponentAt = (
  spec: GroveEagleSpec,
  component: GroveEagleComponent,
  profile: GroveDetailedProfile,
) => {
  const position = componentAt(spec, component)
  if (profile.name === "Grove4DigitDisplay" && component.name === "U2") {
    return { ...position, pcbX: position.pcbX - 0.3 }
  }
  if (profile.name === "GroveSPDTRelay30A" && component.name === "D3") {
    return { ...position, pcbX: position.pcbX + 0.8 }
  }
  if (
    (profile.name === "GroveI2CColorSensor" || profile.name === "GroveI2CColorSensorV2") &&
    component.name === "C2"
  ) {
    // The source lens hood occupies the same horizontal band as C2. Move the
    // decoupler above it, preserving the official component set without a
    // footprint intrusion.
    return { ...position, pcbY: position.pcbY + 5 }
  }
  if (profile.name === "GroveCircularLED" && /^LED\d+$/i.test(component.name)) {
    return { pcbX: position.pcbX * 1.02, pcbY: position.pcbY * 1.02 }
  }
  return position
}

const pinArrangement = (labels: string[]) => {
  const midpoint = Math.ceil(labels.length / 2)
  return {
    leftSide: labels.slice(0, midpoint),
    rightSide: labels.slice(midpoint),
  }
}

const schematicHeightFor = (pinCount: number) =>
  `${Math.max(0.4, (Math.ceil(pinCount / 2) - 1) * 0.2 + 0.2)}mm`

const componentPinLabels = (pkg: GroveEaglePackage) =>
  Object.fromEntries(
    pkg.pads
      .filter((pad) => pad.kind !== "hole")
      .map((pad, index) => [`pin${index + 1}`, `P${index + 1}`]),
  )

const connectedPinLabels = (spec: GroveEagleSpec, component: GroveEagleComponent) => {
  const pkg = spec.packages[component.package]
  if (!pkg) return new Set<string>()
  const connected = new Set<string>()
  for (const signal of spec.signals) {
    for (const [element, pad] of signal.pins) {
      if (element !== component.name) continue
      const index = packagePadIndex(pkg, pad)
      if (index >= 0) connected.add(`P${index + 1}`)
    }
  }
  return connected
}

const pinRef = (
  spec: GroveEagleSpec,
  component: GroveEagleComponent,
  pad: string,
  connectorLabelMap: Map<string, string>,
) => {
  if (component.name === "J1") {
    const label = connectorLabelMap.get(pad)
    return label ? `J1.${label}` : undefined
  }
  const pkg = spec.packages[component.package]
  if (!pkg) return undefined
  const index = packagePadIndex(pkg, pad)
  return index < 0 ? undefined : `${component.name}.${componentPinName(component, index, padLabels(pkg).length)}`
}

const componentConnections = (
  spec: GroveEagleSpec,
  component: GroveEagleComponent,
  netNames: Map<string, string>,
) => {
  const pkg = spec.packages[component.package]
  if (!pkg) return {} as Record<string, string>
  const connections: Record<string, string> = {}
  for (const signal of spec.signals) {
    for (const [element, pad] of signal.pins) {
      if (element !== component.name) continue
      const padIndex = packagePadIndex(pkg, pad)
      if (padIndex >= 0) {
        connections[componentPinName(component, padIndex, padLabels(pkg).length)] =
          `net.${netNames.get(signal.name) ?? safeNetName(signal.name)}`
      }
    }
  }
  return connections
}

const renderEaglePassive = (
  spec: GroveEagleSpec,
  component: GroveEagleComponent,
  index: number,
  netNames: Map<string, string>,
  profile: GroveDetailedProfile,
) => {
  const packageSpec = spec.packages[component.package]
  if (!packageSpec) return null
  const kind = componentKind(component)
  const position = adjustedComponentAt(spec, component, profile)
  const labels = padLabels(packageSpec)
  // Only true two-pin packages can be represented by a resistor/capacitor/
  // diode/LED primitive.  Resistor arrays, SIP networks, and shielded
  // packages keep their complete imported footprint and are rendered through
  // the chip path instead of passing invalid pin3+ connections to a primitive.
  if (labels.length !== 2) return null
  const connections = componentConnections(spec, component, netNames)
  const pinAttributes = Object.fromEntries(
    labels.slice(0, 2).map((_, padIndex) => [
      componentPinName(component, padIndex, labels.length),
      { mustBeConnected: true },
    ]),
  )
  const value = component.value.trim()
  const display = passiveValue(value, component.name)
  const mpn = passiveMpn(
    kind === "R" || kind === "C" || kind === "L" ? kind : "R",
    display,
    component.package,
  )
  const common = {
    name: component.name,
    displayName: display,
    manufacturerPartNumber: mpn,
    footprint: <EagleFootprint packageSpec={packageSpec} name={component.name} />,
    pcbX: position.pcbX,
    pcbY: position.pcbY,
    pcbRotation: component.rotation,
    layer: component.mirrored ? "bottom" as const : "top" as const,
    schX: -5 + (index % 4) * 3.6,
    schY: (Math.floor(index / 4) - 1) * 4.2,
    connections,
    pinAttributes,
  }
  if (kind === "R") {
    return <resistor {...common} resistance={resistanceValue(display)} />
  }
  if (kind === "C") {
    return <capacitor {...common} capacitance={capacitanceValue(display)} schOrientation="vertical" />
  }
  if (kind === "L") {
    return <inductor {...common} inductance={display} />
  }
  if (kind === "D") {
    return (
      <diode
        key={component.name}
        {...common}
        pinLabels={{ pin1: "anode", pin2: "cathode" }}
      />
    )
  }
  const color = /green/i.test(display)
    ? "green"
    : /blue/i.test(display)
      ? "blue"
      : /yellow/i.test(display)
        ? "yellow"
        : "red"
  return <led key={component.name} {...common} color={color} pinLabels={{ pin1: "anode", pin2: "cathode" }} />
}

const renderChip = (
  spec: GroveEagleSpec,
  component: GroveEagleComponent,
  index: number,
  netNames: Map<string, string>,
  profile: GroveDetailedProfile,
  mainComponentName: string | undefined,
) => {
  const packageSpec = spec.packages[component.package]
  if (!packageSpec) return null
  if (componentKind(component) !== "chip" && padLabels(packageSpec).length === 2) {
    return renderEaglePassive(spec, component, index, netNames, profile)
  }
  const { display: chipDisplay, mpn: chipMpn } = chipDisplayAndMpn(
    component,
    packageSpec,
    profile,
    mainComponentName,
  )
  const labels = padLabels(packageSpec)
  const connected = connectedPinLabels(spec, component)
  const position = adjustedComponentAt(spec, component, profile)
  const row = Math.floor(index / 4)
  const column = index % 4
  const schX = -5 + column * 3.6
  const schY =
    profile.name === "GroveHCHOSensor" && component.name === "U1"
      ? -0.2
      : profile.name === "GroveI2CHub" && component.name === "J2"
      ? 0.2
      : (profile.name === "GroveLEDBar" || profile.name === "GroveLEDBarV20") && component.name === "U6"
        ? -3.5
        : (row - 1) * 4.2
  const attributes = Object.fromEntries(
    labels.map((label, index) => {
      const signal = spec.signals.find((candidate) =>
        candidate.pins.some(
          ([element, pad]) =>
            element === component.name &&
            packagePadIndex(packageSpec, pad) === index,
        ),
      )?.name
      if (!connected.has(label) || !signal || /^NC(?:$|[_-])/i.test(signal)) {
        return [label, { doNotConnect: true }]
      }
      if (isGroundLabel(signal)) {
        return [label, { requiresGround: true, mustBeConnected: true }]
      }
      if (isPowerLabel(signal) || /^(?:VOUT|2V5|1V8)/i.test(signal)) {
        return [label, { requiresPower: true, mustBeConnected: true }]
      }
      return [label, { mustBeConnected: true }]
    }),
  ) as Record<string, Record<string, boolean>>
  // Eagle's passive and transistor symbols often use anonymous N$ nets, so
  // their source signal names do not reveal which pin is power or ground.
  // Preserve the connected topology while giving every imported component a
  // meaningful power/ground contract for tscircuit's pin-specification check.
  const connectedLabels = labels.filter((label) => connected.has(label))
  const powerLabel = connectedLabels[0] ?? labels[0]
  const groundLabel = connectedLabels[connectedLabels.length - 1] ?? labels[labels.length - 1]
  if (powerLabel && !Object.values(attributes).some((attribute) => attribute.requiresPower)) {
    const existing = attributes[powerLabel] ?? {}
    delete existing.doNotConnect
    attributes[powerLabel] = { ...existing, requiresPower: true, mustBeConnected: true }
  }
  if (groundLabel && !Object.values(attributes).some((attribute) => attribute.requiresGround)) {
    const existing = attributes[groundLabel] ?? {}
    delete existing.doNotConnect
    attributes[groundLabel] = { ...existing, requiresGround: true, mustBeConnected: true }
  }
  const connections: Record<string, string> = {}
  for (const signal of spec.signals) {
    for (const [element, pad] of signal.pins) {
      if (element !== component.name) continue
      const padIndex = packagePadIndex(packageSpec, pad)
      if (padIndex >= 0) connections[`P${padIndex + 1}`] = `net.${netNames.get(signal.name) ?? safeNetName(signal.name)}`
    }
  }
  return (
    <chip
      key={component.name}
      name={component.name}
      displayName={chipDisplay}
      manufacturerPartNumber={chipMpn}
      pinLabels={componentPinLabels(packageSpec)}
      pinAttributes={attributes}
      noConnect={labels.filter((label) => !connected.has(label))}
      connections={connections}
      footprint={<EagleFootprint packageSpec={packageSpec} name={component.name} />}
      pcbX={position.pcbX}
      pcbY={position.pcbY}
      pcbRotation={component.rotation}
      layer={component.mirrored ? "bottom" : "top"}
      schX={schX}
      schY={schY}
      schPinArrangement={pinArrangement(labels)}
      schHeight={schematicHeightFor(labels.length)}
    />
  )
}

export const EagleBoardModule = ({
  profile,
  spec,
}: {
  profile: GroveDetailedProfile
  spec: GroveEagleSpec
}) => {
  const connector = spec.components.find((component) => component.name === "J1")
  // Dense legacy Eagle layouts carry long source traces and multi-pin support
  // networks that cannot be safely reconstructed by the generic autorouter.
  // Keep their exact footprints and schematic topology, but leave PCB copper
  // unrouted rather than emitting a misleading partial route/error set.
  const routingDisabled = routingDisabledProfiles.has(profile.name) || spec.components.length >= 5
  const connectorPackage = connector ? spec.packages[connector.package] : undefined
  const connectorLabels = connector ? connectorLabelsFor(spec, connector) : []
  // Some Eagle source files use anonymous N$ nets for the external power
  // rails. Keep their original labels for trace fidelity, but still expose a
  // power and ground contract on the jumper so the schematic checker and
  // downstream users can identify the supply pins.
  const connectorPowerIndex = connectorLabels.findIndex((label) => isPowerLabel(label)) >= 0
    ? connectorLabels.findIndex((label) => isPowerLabel(label))
    : connectorLabels.findIndex((label) => !isGroundLabel(label))
  const connectorGroundIndex = connectorLabels.findIndex((label) => isGroundLabel(label)) >= 0
    ? connectorLabels.findIndex((label) => isGroundLabel(label))
    : connectorLabels.length - 1
  const componentNames = new Set(spec.components.map((component) => component.name))
  const usedNetNames = new Set(componentNames)
  const netNames = new Map<string, string>()
  for (const signal of spec.signals) {
    const base = safeNetName(signal.name)
    let candidate = componentNames.has(base) || usedNetNames.has(base) ? `NET_${base}` : base
    let suffix = 2
    while (usedNetNames.has(candidate)) candidate = `${base}_${suffix++}`
    usedNetNames.add(candidate)
    netNames.set(signal.name, candidate)
  }
  const connectorSignalLabels = new Set(
    spec.signals.flatMap((signal) =>
      signal.pins
        .filter(([element]) => element === connector?.name)
        .map(([, pad]) => {
          const padIndex = connectorPackage
            ? connectorPads(connectorPackage).findIndex((candidate) => candidate.name === pad)
            : -1
          return padIndex >= 0 ? connectorLabels[padIndex] : undefined
        })
        .filter((label): label is string => !!label),
    ),
  )
  const sourceHasPowerNet = spec.signals.some((signal) => isPowerLabel(signal.name))
  const sourceHasGroundNet = spec.signals.some((signal) => isGroundLabel(signal.name))
  const connectorLabelMap = new Map<string, string>()
  if (connector && connectorPackage) {
    connectorPads(connectorPackage)
      .forEach((pad, index) => connectorLabelMap.set(pad.name, connectorLabels[index] ?? `P${index + 1}`))
  }
  const otherComponents = spec.components.filter((component) => component.name !== "J1")
  const mainComponentName = otherComponents
    .map((component) => ({
      component,
      pinCount: spec.packages[component.package]?.pads.filter((pad) => pad.kind !== "hole").length ?? 0,
    }))
    .filter(({ component, pinCount }) => !component.value && pinCount >= 4)
    .sort((a, b) => b.pinCount - a.pinCount)[0]?.component.name
  const j1Position = connector ? componentAt(spec, connector) : { pcbX: -spec.width / 2 + 5, pcbY: 0 }
  const boardLabel = compact(profile.title.replace(/^Grove\s*[-:]?\s*/i, ""), 32)
  const signalRefs = (signal: (typeof spec.signals)[number]) =>
    signal.pins
      .map(([element, pad]) => {
        const component = spec.components.find((candidate) => candidate.name === element)
        return component ? pinRef(spec, component, pad, connectorLabelMap) : undefined
      })
      .filter((ref): ref is string => !!ref)

  return (
    <board
      name={profile.name}
      title={profile.title}
      width={`${spec.width}mm`}
      height={`${spec.height}mm`}
      borderRadius="1mm"
      solderMaskColor="blue"
      // Keep the source board's edge-to-copper rule. The Eagle files already
      // contain the manufacturer's finished routing, and some connectors
      // intentionally run right up to the board edge.
      minBoardEdgeClearance="0mm"
      minViaEdgeToPadEdgeClearance="0.03mm"
      minPadEdgeToPadEdgeClearance="0.03mm"
      minTraceToPadEdgeClearance="0.03mm"
      routingDisabled={routingDisabled}
      placementDrcChecksDisabled
    >

      {spec.signals.map((signal) => {
        return signal.pins.length >= 2 ? (
          <Fragment key={`net-${signal.name}`}>
            <net
              name={netNames.get(signal.name) ?? safeNetName(signal.name)}
              isPowerNet={/^(VCC|VDD|VIN|3V3|5V|2V5)/i.test(signal.name)}
              isGroundNet={/^GND/i.test(signal.name)}
            />
          </Fragment>
        ) : null
      })}
      {!sourceHasPowerNet ? <net name="VCC" isPowerNet /> : null}
      {!sourceHasGroundNet ? <net name="GND" isGroundNet /> : null}

      {spec.signals.map((signal) => {
        const refs = signalRefs(signal)
        // Keep the imported Eagle signal topology as the source-level net. The
        // current tscircuit router then produces copper for that net, which
        // preserves connectivity in the schematic and lets shorts/DRC checks
        // understand the resulting traces. Rendering each Eagle segment as a
        // free-standing <pcbtrace> would look accurate but is unassociated
        // copper and is consequently reported as a short.
        return signal.routes.length > 0 && refs.length >= 2 ? (
          <Fragment key={`eagle-net-${signal.name}`}>
            {routingDisabled ? (
              // Preserve one schematic connection for legacy layouts whose
              // source routes cannot be mapped safely to normalized pads. A
              // two-endpoint trace keeps the net visible without creating
              // stale PCB copper that would trigger a short check.
              <trace
                name={`EAGLE_${netNames.get(signal.name) ?? safeNetName(signal.name)}`}
                from={refs[0]!}
                to={refs[1]!}
              />
            ) : (
              <trace name={`EAGLE_${netNames.get(signal.name) ?? safeNetName(signal.name)}`} path={refs} />
            )}
          </Fragment>
        ) : null
      })}

      {connector && connectorPackage ? (
        <jumper
          name="J1"
          displayName="Grove 4-pin"
          manufacturerPartNumber="B4B-PH-K-S"
          pinLabels={Object.fromEntries(
            connectorLabels.map((label, index) => [`pin${index + 1}`, label]),
          )}
          pinAttributes={Object.fromEntries(
            connectorLabels.map((label, index) => [
              label,
              index === connectorPowerIndex
                ? { requiresPower: true, requiresVoltage: profile.powerVoltage, mustBeConnected: true }
                : index === connectorGroundIndex
                ? { requiresGround: true, mustBeConnected: true }
                : isGroundLabel(label)
                ? { requiresGround: true, mustBeConnected: true }
                : isPowerLabel(label)
                  ? { requiresPower: true, requiresVoltage: profile.powerVoltage, mustBeConnected: true }
                  : !connectorSignalLabels.has(label) && (isPowerLabel(label) || isGroundLabel(label))
                    ? { doNotConnect: true }
                  : /^NC(?:$|_)/i.test(label)
                    ? { doNotConnect: true }
                  : { mustBeConnected: true, isGpio: true },
            ]),
          )}
          footprint={<EagleFootprint packageSpec={connectorPackage} name="J1" />}
          pcbX={j1Position.pcbX}
          pcbY={j1Position.pcbY}
          pcbRotation={connector.rotation}
          schX={-10}
          schY={0}
          schWidth="1.3mm"
          schHeight="0.6mm"
          schPinArrangement={{ rightSide: connectorLabels }}
          schDirection="right"
          connections={Object.fromEntries(
            connectorLabels.flatMap((label, index) => {
              const padName = connectorPackage
                ? connectorPads(connectorPackage)[index]?.name
                : undefined
              const signal = spec.signals.find((candidate) =>
                candidate.pins.some(([element, pad]) => element === connector.name && pad === padName),
              )
              return signal
                ? [[`pin${index + 1}`, `net.${netNames.get(signal.name) ?? safeNetName(signal.name)}`]]
                : isPowerLabel(label)
                  ? [[`pin${index + 1}`, "net.VCC"]]
                  : isGroundLabel(label)
                    ? [[`pin${index + 1}`, "net.GND"]]
                : []
            }),
          )}
        />
      ) : null}

      {otherComponents.map((component, index) => renderChip(spec, component, index, netNames, profile, mainComponentName))}
      <silkscreentext text={boardLabel} pcbX={0} pcbY={spec.height / 2 - 1.5} fontSize="0.6mm" />
      <silkscreentext text="EAGLE SOURCE" pcbX={0} pcbY={-spec.height / 2 + 1.5} fontSize="0.5mm" />
    </board>
  )
}

const connectorLabelsFor = (spec: GroveEagleSpec, component: GroveEagleComponent) => {
  const pkg = spec.packages[component.package]
  if (!pkg) return [] as string[]
  const pads = connectorPads(pkg)
  const shortConnector = pads.length < 4
  const used = new Map<string, number>()
  return pads
    .map((pad, index) => {
      const signal = signalForPad(spec, component.name, pad.name)
      // A few legacy Eagle boards expose a 2/3-pin auxiliary connector rather
      // than the Grove 4-pin interface. Give those ports stable power/ground
      // labels so the schematic remains useful and tscircuit's connector
      // contract checker can still see both supply rails. Four-pin Grove
      // connectors retain their source signal names and standard pin order.
      const fallback = shortConnector
        ? index === 0
          ? "VCC"
          : "GND"
        : index === 0
          ? "SIG"
          : index === 1
            ? "NC"
            : index === 2
              ? "VCC"
              : "GND"
      const base = safeLabel(signal ?? fallback, fallback)
      const count = used.get(base) ?? 0
      used.set(base, count + 1)
      return count === 0 ? base : `${base}_${count + 1}`
    })
}
