import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveRecorderV30 = () => (
  <board name={"GroveRecorderV30"} title={"Grove Recorder v3 0"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <chip name="U1" displayName={"ISD1820P"} manufacturerPartNumber={"ISD1820P"} supplierPartNumbers={{ jlcpcb: ["C117051"] }} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ "SIG": "net.SIG", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["AUX"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin4"]} /><silkscreenrect width="4mm" height="4mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SIG","VCC"], rightSide: ["GND","AUX"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    {/* JLCPCB footprint import: footprint="jlcpcb:C5446" */}
    <chip name="U4" displayName="electret microphone capsule" manufacturerPartNumber="CMA-4544PF-W" supplierPartNumbers={{ jlcpcb: ["C5446"] }} pinLabels={{ pin1: "VCC", pin2: "OUT", pin3: "GND" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, OUT: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ VCC: "net.VCC", OUT: "net.SIG", GND: "net.GND" }} footprint="to92" pcbX={-5} pcbY={4} schX={-4} schY={3} schWidth="1.2mm" schHeight="0.4mm" /><capacitor name="C_AUDIO" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={6} schX={-1} schY={4} schOrientation="vertical" />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VCC","C1.pin1","U4.VCC","C_AUDIO.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2","U4.GND","C_AUDIO.pin2"]} />
    <trace name="SIGNAL_RAIL" path={["J1.SIG","U1.SIG","U4.OUT"]} />
    <silkscreentext text={"Recorder v3 0"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveRecorderV30 }
export default GroveRecorderV30
