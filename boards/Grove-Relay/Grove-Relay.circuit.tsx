import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Relay = () => (
  <chip
    name="K1"
    displayName="HLS8L-DC3V-S-C"
    pinLabels={{
      pin1: "COIL_POS",
      pin2: "COIL_NEG",
      pin3: "COM",
      pin4: "NO",
      pin5: "NC",
    }}
    footprint={
      <footprint>
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={-6} pcbY={-4} portHints={["pin1"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={6} pcbY={-4} portHints={["pin2"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={0} pcbY={4} portHints={["pin3"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={-6} pcbY={4} portHints={["pin4"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="2mm" pcbX={6} pcbY={4} portHints={["pin5"]} />
        <silkscreenrect width="15mm" height="10mm" stroke="solid" strokeWidth="0.25mm" filled={false} />
      </footprint>
    }
    pcbX={2}
    pcbY={1.8}
    schX={4}
    schY={0}
    schWidth={3}
    schHeight={4}
  />
)

const RelayTerminal = () => (
  <connector
    name="J2"
    displayName="NO / COM / NC"
    pinLabels={{ pin1: "NO", pin2: "COM", pin3: "NC" }}
    footprint={
      <footprint insertionDirection="from_top">
        <platedhole shape="circle" holeDiameter="1.2mm" outerDiameter="2.4mm" pcbX={-5} pcbY={0} portHints={["pin1"]} />
        <platedhole shape="circle" holeDiameter="1.2mm" outerDiameter="2.4mm" pcbX={0} pcbY={0} portHints={["pin2"]} />
        <platedhole shape="circle" holeDiameter="1.2mm" outerDiameter="2.4mm" pcbX={5} pcbY={0} portHints={["pin3"]} />
        <silkscreenrect width="15mm" height="6mm" stroke="solid" strokeWidth="0.25mm" filled={false} />
      </footprint>
    }
    pcbX={10}
    pcbY={-6}
    schX={9}
    schY={0}
  />
)

export const GroveRelay = () => (
  <board name="GroveRelay" title="Grove - Relay v1.2" width="40mm" height="20mm" borderRadius="1mm" solderMaskColor="blue" placementDrcChecksDisabled>
    <GroveMountingHoles x={18} y={8} />
    <GroveConnector pcbX={-14} pcbY={0} pcbRotation={90} schX={-9} schY={0} />
    <Relay />
    <RelayTerminal />
    <chip
      name="U1"
      displayName="XC6206P302MR"
      pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }}
      footprint="sot23"
      pcbX={-8}
      pcbY={4}
      schX={-4}
      schY={2}
    />
    <transistor name="Q1" displayName="S8050TL" type="npn" footprint="sot23" pcbX={-4} pcbY={-3.5} schX={0} schY={-2.5} />
    <resistor name="R1" resistance="4.7k" footprint="0603" pcbX={-8} pcbY={-3} schX={-3.5} schY={-2.5} />
    <resistor name="R2" resistance="470" footprint="0603" pcbX={7} pcbY={-3.5} schX={1} schY={3.5} />
    <resistor name="R3" resistance="47k" footprint="0603" pcbX={-5} pcbY={-6} schX={0} schY={-5} />
    <capacitor name="C1" capacitance="1uF" footprint="0603" pcbX={-9.1375} pcbY={4} pcbRotation={-90} schX={-4} schY={5} />
    <diode name="D1" displayName="1N4148" footprint="0603" pcbX={6} pcbY={5.5} schX={4} schY={4} />
    <led name="D2" color="red" footprint="0603" pcbX={10} pcbY={5.5} schX={4} schY={6} />
    <trace from="J1.VCC" to="U1.VIN" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="U1.VOUT" to="K1.COIL_POS" />
    <trace from="U1.VOUT" to="D1.cathode" />
    <trace from="U1.VOUT" to="R2.pin2" />
    <trace from="U1.VOUT" to="C1.pin2" />
    <trace from="C1.pin1" to="U1.GND" />
    <trace from="J1.SIG" to="R1.pin1" />
    <trace from="R1.pin2" to="Q1.base" />
    <trace from="Q1.base" to="R3.pin1" />
    <trace from="R3.pin2" to="J1.GND" />
    <trace from="Q1.emitter" to="J1.GND" />
    <trace from="Q1.collector" to="K1.COIL_NEG" />
    <trace from="Q1.collector" to="D1.anode" />
    <trace from="Q1.collector" to="D2.cathode" />
    <trace from="R2.pin1" to="D2.anode" />
    <trace from="K1.NO" to="J2.NO" />
    <trace from="K1.COM" to="J2.COM" />
    <trace from="K1.NC" to="J2.NC" />
    <silkscreentext text="GROVE RELAY v1.2" pcbX={0} pcbY={8.4} fontSize="0.7mm" />
  </board>
)

export default GroveRelay
