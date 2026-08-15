import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveInfraredReceiver = () => (
  <board name={"GroveInfraredReceiver"} title={"Grove - Infrared Receiver"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    {/* JLCPCB footprint imports: footprint="jlcpcb:C117051", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="digital" powerVoltage={"5V"} connectToNets pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C117051" */}
    <chip name="U1" displayName={"TSOP38238"} manufacturerPartNumber={"TSOP38238"} supplierPartNumbers={{ jlcpcb: ["C117051"] }} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ "SIG": "net.SIG", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["AUX"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin4"]} /><silkscreenrect width="4mm" height="4mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SIG","VCC"], rightSide: ["GND","AUX"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <led name="D_EMITTER" displayName="IR/optical emitter" manufacturerPartNumber="IR333-A" supplierPartNumbers={{ jlcpcb: ["C264290"] }} color="infrared" connections={{ anode: "net.EMITTER", cathode: "net.GND" }} footprint="0603" pcbX={-5} pcbY={7} schX={-4} schY={3} /><resistor name="R_EMITTER" resistance="100" tolerance="1%" manufacturerPartNumber="RC0603JR-07100RL" supplierPartNumbers={{ jlcpcb: ["C22775"] }} footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.EMITTER" }} pcbX={0} pcbY={7} schX={-1} schY={3} />    <trace name="EMITTER_LIMIT" path={["R_EMITTER.pin2","D_EMITTER.anode"]} />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VCC","C1.pin1","R_EMITTER.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2","D_EMITTER.cathode"]} />
    <trace name="SIGNAL_RAIL" path={["J1.SIG","U1.SIG"]} />
    <silkscreentext text={"Infrared Receiver"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveInfraredReceiver }
export default GroveInfraredReceiver
