import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove6PositionDIPSwitch = () => (
  <board name={"Grove6PositionDIPSwitch"} title={"Grove 6 Position DIP Switch"} width={"42mm"} height={"32mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={17} y={13} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-15} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"B3F-1000"} manufacturerPartNumber={"B3F-1000"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={7} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <pushbutton name="SW1" displayName="B3F-1000 tactile switch" manufacturerPartNumber="B3F-1000" pinAttributes={{ pin1: { requiresPower: true, mustBeConnected: true }, pin2: { mustBeConnected: true } }} footprint="button_6mm" pcbX={16} pcbY={0} schX={6} schY={0} /><trace name="SWITCH_FEED" from="J1.VCC" to="SW1.pin1" /><trace name="SWITCH_SIGNAL" from="SW1.pin2" to="J1.SIG" />
    <silkscreentext text={"6 Position DIP Switch"} pcbX={0} pcbY={14.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-14.5} fontSize="0.45mm" />
  </board>
)

export { Grove6PositionDIPSwitch }
export default Grove6PositionDIPSwitch
