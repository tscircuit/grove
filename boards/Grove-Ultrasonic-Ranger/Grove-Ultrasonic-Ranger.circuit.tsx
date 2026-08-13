import { GroveConnector, TwoPinModule } from "../_shared/GroveParts"

export const GroveUltrasonicRanger = () => (
  <board name="GroveUltrasonicRanger" title="Grove - Ultrasonic Ranger v2.0" width="50mm" height="25mm" borderRadius="1.5mm" solderMaskColor="blue" placementDrcChecksDisabled>
    <GroveConnector pcbX={-20} pcbY={0} pcbRotation={90} schX={-9} schY={0} />
    <chip
      name="U1"
      displayName="Ultrasonic control MCU"
      pinLabels={{ pin1: "SIG", pin2: "TX_DRIVE", pin3: "RX_SENSE", pin4: "VCC", pin5: "GND" }}
      footprint="sot23_5"
      pcbX={-10}
      pcbY={0}
      schX={0}
      schY={0}
      schWidth={3.5}
      schHeight={4}
    />
    <transistor name="Q1" displayName="TX driver" type="npn" footprint="sot23" pcbX={-5} pcbY={-5} schX={4} schY={3} />
    <resistor name="R1" resistance="1k" footprint="0603" pcbX={-7} pcbY={-8} schX={2} schY={3} />
    <resistor name="R2" resistance="10k" footprint="0603" pcbX={-7} pcbY={7} schX={3} schY={-3} />
    <capacitor name="C14" capacitance="10uF" footprint="0805" pcbX={-13} pcbY={7} schX={-4} schY={4} />
    <capacitor name="C1" capacitance="100nF" footprint="0603" pcbX={-10} pcbY={7} schX={-2} schY={4} />
    <TwoPinModule name="TX1" label="40 kHz transmitter" width={16} height={16} pcbX={5} pcbY={0} schX={8} schY={3} />
    <TwoPinModule name="RX1" label="40 kHz receiver" width={16} height={16} pcbX={17} pcbY={0} schX={8} schY={-3} />
    <trace from="J1.VCC" to="U1.VCC" />
    <trace from="J1.VCC" to="C14.pin1" />
    <trace from="J1.VCC" to="C1.pin1" />
    <trace from="C14.pin2" to="J1.GND" />
    <trace from="C1.pin2" to="J1.GND" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="J1.SIG" to="U1.SIG" />
    <trace from="U1.TX_DRIVE" to="R1.pin1" />
    <trace from="R1.pin2" to="Q1.base" />
    <trace from="Q1.emitter" to="J1.GND" />
    <trace from="Q1.collector" to="TX1.NEG" />
    <trace from="TX1.POS" to="J1.VCC" />
    <trace from="RX1.POS" to="U1.RX_SENSE" />
    <trace from="RX1.POS" to="R2.pin1" />
    <trace from="R2.pin2" to="J1.GND" />
    <trace from="RX1.NEG" to="J1.GND" />
    <silkscreentext text="ULTRASONIC RANGER v2.0" pcbX={0} pcbY={11} fontSize="0.7mm" />
  </board>
)

export default GroveUltrasonicRanger
