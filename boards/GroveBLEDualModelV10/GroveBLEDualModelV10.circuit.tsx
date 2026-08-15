import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveBLEDualModelV10 = () => (
  <board name={"GroveBLEDualModelV10"} title={"Grove - BLE (dual model) v1.0"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="RX_MCU" />
    <net name="TX_MCU" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <net name="LOAD_NEG" />
    <GroveMountingHoles x={16} y={7} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C7394039", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="uart" powerVoltage={"5V"} connectToNets pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C7394039" */}
    <chip name="U1" displayName={"HM-13"} manufacturerPartNumber={"HM-13"} supplierPartNumbers={{ jlcpcb: ["C7394039"] }} pinLabels={{ pin1: "RX", pin2: "TX", pin3: "VCC", pin4: "GND", pin5: "CTS", pin6: "RTS" }} pinAttributes={{ RX: { mustBeConnected: true, isGpio: true }, TX: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, CTS: { doNotConnect: true }, RTS: { doNotConnect: true } }} connections={{ "RX": "net.RX_MCU", "TX": "net.TX_MCU", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["CTS", "RTS"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.27} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.27} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-1.27} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0} portHints={["pin5"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={1.27} portHints={["pin6"]} /><silkscreenrect width="4mm" height="4.81mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["RX","TX","VCC"], rightSide: ["GND","CTS","RTS"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" supplierPartNumbers={{ jlcpcb: ["C21190"] }} footprint="0603" connections={{ pin1: "net.RX", pin2: "net.RX_MCU" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" supplierPartNumbers={{ jlcpcb: ["C21190"] }} footprint="0603" connections={{ pin1: "net.TX", pin2: "net.TX_MCU" }} pcbX={-10} pcbY={-5} schX={-3} schY={-5} />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VCC","C1.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2"]} />
    <trace name="UART_RX_IN" path={["J1.RX","R1.pin1"]} />
    <trace name="UART_RX_OUT" path={["R1.pin2","U1.RX"]} />
    <trace name="UART_TX_IN" path={["J1.TX","R2.pin1"]} />
    <trace name="UART_TX_OUT" path={["R2.pin2","U1.TX"]} />
    <silkscreentext text={"BLE (dual model) v1.0"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveBLEDualModelV10 }
export default GroveBLEDualModelV10
