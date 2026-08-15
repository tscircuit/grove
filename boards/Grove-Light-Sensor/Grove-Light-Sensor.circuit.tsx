import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

export const GroveLightSensor = () => (
  <board
    name="GroveLightSensor"
    title="Grove - Light Sensor v1.2"
    width="20mm"
    height="20mm"
    borderRadius="1mm"
    solderMaskColor="blue"
  >
    <GroveMountingHoles />
    <GroveConnector kind="analog" pcbX={0} pcbY={-6.6} schX={-6} schY={0} />
    <resistor
      name="LIGHT"
      displayName="GL5528 photoresistor"
      manufacturerPartNumber="GL5528"
      resistance="10k"
      footprint={
        <footprint>
          <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.8mm" pcbX={-2.5} pcbY={0} portHints={["pin1"]} />
          <platedhole shape="circle" holeDiameter="0.9mm" outerDiameter="1.8mm" pcbX={2.5} pcbY={0} portHints={["pin2"]} />
          <silkscreencircle pcbX={0} pcbY={0} radius="3mm" strokeWidth="0.2mm" />
        </footprint>
      }
      pcbX={0}
      pcbY={4.2}
      schX={-1}
      schY={2}
    />
    <resistor
      name="R1"
      resistance="10k"
      manufacturerPartNumber="RC0603FR-0710KL"
      footprint="0603"
      pcbX={4}
      pcbY={0}
      schX={-1}
      schY={-2}
    />
    <opamp
      name="U1"
      displayName="LM358"
      manufacturerPartNumber="LM358"
      footprint="soic8"
      pcbX={-3.5}
      pcbY={0}
      schX={3}
      schY={0}
    />
    <trace from="J1.VCC" to="LIGHT.pin2" />
    <trace from="LIGHT.pin1" to="R1.pin2" />
    <trace from="R1.pin1" to="J1.GND" />
    <trace from="LIGHT.pin1" to="U1.non_inverting_input" />
    <trace from="U1.output" to="U1.inverting_input" />
    <trace from="U1.output" to="J1.SIG" />
    <trace from="U1.positive_supply" to="J1.VCC" />
    <trace from="U1.negative_supply" to="J1.GND" />
    <silkscreentext text="LIGHT v1.2" pcbX={0} pcbY={8} fontSize="0.7mm" />
  </board>
)

export default GroveLightSensor
