import { GroveConnector, GroveMountingHoles, TwoPinModule } from "../_shared/GroveParts"

export const GroveBuzzer = () => (
  <board
    name="GroveBuzzer"
    title="Grove - Buzzer v1.1b"
    width="20mm"
    height="20mm"
    borderRadius="1mm"
    solderMaskColor="blue"
  >
    <GroveMountingHoles />
    <GroveConnector pcbX={0} pcbY={-6.6} schX={-6} schY={0} />
    <transistor
      name="Q1"
      displayName="S9013"
      type="npn"
      footprint="sot23"
      pcbX={4.5}
      pcbY={0}
      schX={1}
      schY={-1.5}
    />
    <resistor
      name="R1"
      resistance="1k"
      footprint="0603"
      pcbX={0}
      pcbY={-1}
      schX={-1.8}
      schY={-1.5}
    />
    <TwoPinModule
      name="BUZ1"
      label="YMD12065 buzzer"
      width={9}
      height={9}
      pcbX={0}
      pcbY={4.2}
      schX={4.2}
      schY={1.5}
    />
    <trace from="J1.SIG" to="R1.pin1" />
    <trace from="R1.pin2" to="Q1.base" />
    <trace from="Q1.emitter" to="J1.GND" />
    <trace from="Q1.collector" to="BUZ1.NEG" />
    <trace from="BUZ1.POS" to="J1.VCC" />
    <silkscreentext text="BUZZER v1.1b" pcbX={0} pcbY={8.2} fontSize="0.65mm" />
  </board>
)

export default GroveBuzzer
