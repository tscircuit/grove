import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveGasSensorMQ5 = () => (
  <board name={"GroveGasSensorMQ5"} title={"Grove Gas Sensor MQ5"} width={"60mm"} height={"38mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={26} y={16} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-24} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"MQ-5"} manufacturerPartNumber={"MQ-5"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <resistor name="R_HEAT" resistance="33" tolerance="5%" manufacturerPartNumber="RC1206JR-0733RL" footprint="1206" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={10} pcbY={-5} schX={7} schY={-5} />
    <silkscreentext text={"Gas Sensor MQ5"} pcbX={0} pcbY={17.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-17.5} fontSize="0.45mm" />
  </board>
)

export { GroveGasSensorMQ5 }
export default GroveGasSensorMQ5
