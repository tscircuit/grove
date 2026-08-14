import { GroveConnector, GroveMountingHoles } from "./GroveParts"

export type GroveInterfaceKind = "digital" | "analog" | "i2c" | "uart"

export interface GroveCatalogueModuleProps {
  /** Stable board/component name used by tscircuit and the snapshot filenames. */
  name: string
  /** Product name from the Seeed catalogue or Grove guide. */
  title: string
  /** Grove guide or inferred catalogue family. */
  category: string
  /** Public upstream page recorded in the board README. */
  sourceUrl: string
  /** Electrical interface exposed by the four-pin Grove connector. */
  interfaceKind: GroveInterfaceKind
}

const compactLabel = (value: string) => {
  const withoutPrefix = value
    .replace(/^grove\s*[-–—:]?\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
  return withoutPrefix.length > 25
    ? `${withoutPrefix.slice(0, 24).trimEnd()}…`
    : withoutPrefix
}

const signalLabels = (interfaceKind: GroveInterfaceKind) => {
  if (interfaceKind === "i2c") return ["SCL", "SDA"] as const
  if (interfaceKind === "uart") return ["RX", "TX"] as const
  return ["SIG", "NC"] as const
}

/**
 * A compact, interface-level Grove board representation.
 *
 * This is intentionally small and deterministic so every catalogue entry can
 * be reviewed in the same PCB and schematic snapshot format. The detailed
 * recreations in sibling directories remain the source of truth when a board
 * has been reverse-engineered beyond its public four-pin interface.
 */
export const GroveCatalogueModule = ({
  name,
  title,
  category,
  sourceUrl,
  interfaceKind,
}: GroveCatalogueModuleProps) => {
  const [signal1, signal2] = signalLabels(interfaceKind)
  const displayName = compactLabel(title)
  const categoryLabel = compactLabel(category)

  // Keep the source URL as a real input to the component contract. It is
  // recorded in each generated README and makes catalogue entries traceable.
  void sourceUrl

  return (
    <board
      name={name}
      title={title}
      width="40mm"
      height="20mm"
      borderRadius="1mm"
      solderMaskColor="blue"
      placementDrcChecksDisabled
    >
      <GroveMountingHoles x={17} y={7.5} />
      <GroveConnector
        kind={interfaceKind}
        pcbX={-14}
        pcbY={0}
        pcbRotation={90}
        schX={-8}
        schY={0}
      />
      <chip
        name="U1"
        displayName={displayName}
        pinLabels={{
          pin1: signal1,
          pin2: signal2,
          pin3: "VCC",
          pin4: "GND",
        }}
        schPinArrangement={{
          leftSide: [signal1, signal2],
          rightSide: ["VCC", "GND"],
        }}
        schWidth="4mm"
        schHeight="2.5mm"
        footprint={
          <footprint>
            <smtpad
              shape="rect"
              width="1.2mm"
              height="0.8mm"
              pcbX={-2.3}
              pcbY={-1.5}
              portHints={["pin1"]}
            />
            <smtpad
              shape="rect"
              width="1.2mm"
              height="0.8mm"
              pcbX={-2.3}
              pcbY={1.5}
              portHints={["pin2"]}
            />
            <smtpad
              shape="rect"
              width="1.2mm"
              height="0.8mm"
              pcbX={2.3}
              pcbY={1.5}
              portHints={["pin3"]}
            />
            <smtpad
              shape="rect"
              width="1.2mm"
              height="0.8mm"
              pcbX={2.3}
              pcbY={-1.5}
              portHints={["pin4"]}
            />
            <silkscreenrect
              width="7mm"
              height="5mm"
              stroke="solid"
              strokeWidth="0.2mm"
              filled={false}
            />
          </footprint>
        }
        pcbX={7}
        pcbY={0}
        schX={2}
        schY={0}
      />
      <trace from={`J1.${signal1}`} to="U1.pin1" />
      <trace from={`J1.${signal2}`} to="U1.pin2" />
      <trace from="J1.VCC" to="U1.pin3" />
      <trace from="J1.GND" to="U1.pin4" />
      <silkscreentext
        text={displayName}
        pcbX={0}
        pcbY={8.5}
        fontSize="0.7mm"
      />
      <silkscreentext
        text={categoryLabel}
        pcbX={0}
        pcbY={-8.5}
        fontSize="0.65mm"
      />
    </board>
  )
}
