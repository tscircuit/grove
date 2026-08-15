import {
  GroveConnector,
  GroveMountingHoles,
  TactileButton,
} from "../_shared/GroveParts"

export const GroveButton = () => (
  <board
    name="GroveButton"
    title="Grove - Button v1.0"
    width="20mm"
    height="20mm"
    borderRadius="1mm"
    solderMaskColor="blue"
  >
    <GroveMountingHoles />
    <GroveConnector pcbX={0} pcbY={-6.6} schX={-5} schY={0} />
    <TactileButton
      name="S1"
      pcbX={0}
      pcbY={2.3}
      schX={1}
      schY={1.5}
    />
    <resistor
      name="R1"
      resistance="10k"
      manufacturerPartNumber="RC0603FR-0710KL"
      footprint="0603"
      pcbX={4.8}
      pcbY={0}
      schX={1}
      schY={-1.5}
    />
    <trace from="J1.VCC" to="S1.pin1" />
    <trace from="S1.pin2" to="J1.SIG" />
    <trace from="J1.SIG" to="R1.pin1" />
    <trace from="R1.pin2" to="J1.GND" />
    <silkscreentext text="BUTTON v1.0" pcbX={0} pcbY={7.2} fontSize="0.8mm" />
  </board>
)

export default GroveButton
