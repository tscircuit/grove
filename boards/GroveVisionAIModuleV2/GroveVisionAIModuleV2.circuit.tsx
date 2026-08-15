import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveVisionAIModuleV2 = () => (
  <board name={"GroveVisionAIModuleV2"} title={"Grove Vision AI Module V2"} width={"52mm"} height={"30mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={22} y={12} />
    <GroveConnector kind="uart" powerVoltage={"5V"} pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"WiseEye2"} manufacturerPartNumber={"WiseEye2"} pinLabels={{ pin1: "RX", pin2: "TX", pin3: "VCC", pin4: "GND", pin5: "CTS", pin6: "RTS" }} pinAttributes={{ RX: { mustBeConnected: true, isGpio: true }, TX: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, CTS: { doNotConnect: true }, RTS: { doNotConnect: true } }} connections={{ RX: "net.RX", TX: "net.TX", VCC: "net.VCC", GND: "net.GND" }} noConnect={["CTS", "RTS"]} footprint={"soic8"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.RX", pin2: "net.RX" }} pcbX={-6} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.TX", pin2: "net.TX" }} pcbX={-6} pcbY={-5} schX={-3} schY={-5} />
    <trace name="UART_RX" from="J1.RX" to="U1.RX" /><trace name="UART_TX" from="J1.TX" to="U1.TX" /><trace name="SERIES_RX" from="J1.RX" to="R1.pin1" /><trace name="SERIES_TX" from="J1.TX" to="R2.pin1" />
    <silkscreentext text={"Vision AI Module V2"} pcbX={0} pcbY={13.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-13.5} fontSize="0.45mm" />
  </board>
)

export { GroveVisionAIModuleV2 }
export default GroveVisionAIModuleV2
