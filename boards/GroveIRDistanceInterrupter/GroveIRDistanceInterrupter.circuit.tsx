import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveIRDistanceInterrupter = () => (
  <board name={"GroveIRDistanceInterrupter"} title={"Grove IR Distance Interrupter"} width={"40mm"} height={"26mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={16} y={10} />
    <GroveConnector kind="digital" powerVoltage={"5V"} pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"LM393"} manufacturerPartNumber={"LM393"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <chip name="TX1" displayName={"IR transmitter"} manufacturerPartNumber={"VSMY1850"} pinLabels={{ pin1: "IN", pin2: "GND" }} pinAttributes={{ IN: { mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} footprint={"led_5mm"} pcbX={-4} pcbY={8} schX={-4} schY={2} /><chip name="RX1" displayName={"IR receiver"} manufacturerPartNumber={"GP1UXC41QS"} pinLabels={{ pin1: "OUT", pin2: "GND" }} pinAttributes={{ OUT: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true } }} footprint={"soic8"} pcbX={10} pcbY={8} schX={1} schY={2} /><trace name="DISTANCE_DRIVE" from="U1.SIG" to="TX1.IN" /><trace name="DISTANCE_SENSE" from="RX1.OUT" to="U1.SIG" /><trace name="DISTANCE_TX_GND" from="TX1.GND" to="J1.GND" /><trace name="DISTANCE_RX_GND" from="RX1.GND" to="J1.GND" />
    <silkscreentext text={"IR Distance Interrupter"} pcbX={0} pcbY={11.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-11.5} fontSize="0.45mm" />
  </board>
)

export { GroveIRDistanceInterrupter }
export default GroveIRDistanceInterrupter
