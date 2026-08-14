export interface GroveConnectorProps {
  name?: string
  kind?: "digital" | "analog" | "i2c" | "uart"
  pcbX?: number
  pcbY?: number
  pcbRotation?: number
  schX?: number
  schY?: number
  schRotation?: number
}

const GroveConnectorFootprint = () => (
  <footprint insertionDirection="from_bottom">
    <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.6mm" pcbX={-3} pcbY={0} portHints={["pin1"]} />
    <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.6mm" pcbX={-1} pcbY={0} portHints={["pin2"]} />
    <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.6mm" pcbX={1} pcbY={0} portHints={["pin3"]} />
    <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.6mm" pcbX={3} pcbY={0} portHints={["pin4"]} />
    <silkscreenrect
      pcbX={0}
      pcbY={0}
      width="9.8mm"
      height="5.8mm"
      stroke="solid"
      strokeWidth="0.2mm"
      filled={false}
    />
    <silkscreentext text="GROVE" pcbX={0} pcbY={1.9} fontSize="0.75mm" />
  </footprint>
)

export const TactileButton = ({
  name,
  pcbX,
  pcbY,
  schX,
  schY,
}: {
  name: string
  pcbX: number
  pcbY: number
  schX: number
  schY: number
}) => (
  <chip
    name={name}
    displayName="6 mm tactile button"
    pinLabels={{ pin1: "A", pin2: "B" }}
    footprint={
      <footprint>
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={-3.25} pcbY={0} portHints={["pin1"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={3.25} pcbY={0} portHints={["pin2"]} />
        <silkscreenrect width="6mm" height="6mm" stroke="solid" strokeWidth="0.25mm" filled={false} />
      </footprint>
    }
    pcbX={pcbX}
    pcbY={pcbY}
    schX={schX}
    schY={schY}
  />
)

export const GroveConnector = ({
  name = "J1",
  kind = "digital",
  pcbX,
  pcbY,
  pcbRotation,
  schX,
  schY,
  schRotation,
}: GroveConnectorProps) => {
  const signal1 =
    kind === "i2c" ? "SCL" : kind === "uart" ? "RX" : "SIG"
  const signal2 =
    kind === "i2c" ? "SDA" : kind === "uart" ? "TX" : "NC"

  return (
    <jumper
      name={name}
      displayName="Grove 4-pin"
      manufacturerPartNumber="B4B-PH-K-S"
      pinLabels={{
        pin1: signal1,
        pin2: signal2,
        pin3: "VCC",
        pin4: "GND",
      }}
      footprint={<GroveConnectorFootprint />}
      pcbX={pcbX}
      pcbY={pcbY}
      pcbRotation={pcbRotation}
      schX={schX}
      schY={schY}
      schRotation={schRotation}
      schWidth="3.5mm"
      schHeight="2.5mm"
      schPinArrangement={{
        rightSide: [signal1, signal2, "VCC", "GND"],
      }}
      schDirection="right"
    />
  )
}

export const GroveMountingHoles = ({
  x = 8,
  y = 8,
  diameter = "2.2mm",
}: {
  x?: number
  y?: number
  diameter?: string
}) => (
  <>
    <hole name="H1" diameter={diameter} pcbX={-x} pcbY={-y} />
    <hole name="H2" diameter={diameter} pcbX={x} pcbY={-y} />
    <hole name="H3" diameter={diameter} pcbX={x} pcbY={y} />
    <hole name="H4" diameter={diameter} pcbX={-x} pcbY={y} />
  </>
)

export const TwoPinModule = ({
  name,
  label,
  width,
  height,
  pcbX,
  pcbY,
  schX,
  schY,
}: {
  name: string
  label: string
  width: number
  height: number
  pcbX: number
  pcbY: number
  schX: number
  schY: number
}) => (
  <chip
    name={name}
    displayName={label}
    pinLabels={{ pin1: "POS", pin2: "NEG" }}
    footprint={
      <footprint>
        <platedhole
          shape="circle"
          holeDiameter="1mm"
          outerDiameter="2mm"
          pcbX={-width / 4}
          pcbY={0}
          portHints={["pin1"]}
        />
        <platedhole
          shape="circle"
          holeDiameter="1mm"
          outerDiameter="2mm"
          pcbX={width / 4}
          pcbY={0}
          portHints={["pin2"]}
        />
        <silkscreenrect
          width={`${width}mm`}
          height={`${height}mm`}
          stroke="solid"
          strokeWidth="0.25mm"
          filled={false}
        />
      </footprint>
    }
    pcbX={pcbX}
    pcbY={pcbY}
    schX={schX}
    schY={schY}
  />
)
