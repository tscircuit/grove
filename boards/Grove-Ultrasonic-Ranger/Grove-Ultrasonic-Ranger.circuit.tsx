import { GroveConnector, TwoPinModule } from "../_shared/GroveParts"

export const GroveUltrasonicRanger = () => (
  <board name="GroveUltrasonicRanger" title="Grove - Ultrasonic Ranger v2.0" width="50mm" height="25mm" borderRadius="1.5mm" solderMaskColor="blue">
    <GroveConnector pcbX={-20} pcbY={0} pcbRotation={-90} schX={-9} schY={0} />
    <chip
      name="U1"
      displayName="ATmega328P"
      manufacturerPartNumber="ATmega328P-AU"
      pinLabels={{ pin1: "SIG", pin2: "TX_DRIVE", pin3: "RX_SENSE", pin4: "VCC", pin5: "GND" }}
      pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, TX_DRIVE: { mustBeConnected: true, isGpio: true }, RX_SENSE: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, requiresVoltage: "5V" }, GND: { requiresGround: true } }}
      footprint="sot23_5"
      pcbX={-10}
      pcbY={0}
      schX={0}
      schY={0}
      schHeight="0.6mm"
    />
    <transistor name="Q1" displayName="S9013" manufacturerPartNumber="S9013" type="npn" footprint="sot23" pcbX={-5} pcbY={-5} schX={4} schY={3} />
    <resistor name="R1" resistance="1k" footprint="0603" pcbX={-7} pcbY={-8} schX={2} schY={3} />
    <resistor name="R2" resistance="10k" footprint="0603" pcbX={-7} pcbY={7} schX={3} schY={-3} />
    <capacitor name="C14" capacitance="10uF" footprint="0805" pcbX={-15} pcbY={7} schX={-4} schY={3.5} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" footprint="0603" pcbX={-10} pcbY={7} schX={-2} schY={3.5} schOrientation="vertical" />
    <TwoPinModule name="TX1" label="40 kHz transmitter" manufacturerPartNumber="TCT40-16T" width={16} height={16} pcbX={5} pcbY={0} schX={8} schY={3} />
    <TwoPinModule name="RX1" label="40 kHz receiver" manufacturerPartNumber="TCT40-16R" width={16} height={16} pcbX={17} pcbY={0} schX={8} schY={-3} />
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
