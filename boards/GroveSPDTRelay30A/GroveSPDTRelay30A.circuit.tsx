import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveSPDTRelay30A = () => (
  <board name={"GroveSPDTRelay30A"} title={"Grove - SPDT Relay(30A)"} width={"52mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={22} y={11} />
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"HLS8L-DC3V-S-C"} manufacturerPartNumber={"HLS8L-DC3V-S-C"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ "SIG": "net.SIG", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["AUX"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin4"]} /><silkscreenrect width="4mm" height="4mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SIG","VCC"], rightSide: ["GND","AUX"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />
    <led name="D_STATUS" displayName="red status LED" manufacturerPartNumber="LTST-C190KRKT" color="red" connections={{ anode: "net.STATUS", cathode: "net.GND" }} footprint="0603" pcbX={-2} pcbY={7} schX={7.6} schY={-4} /><resistor name="R_STATUS" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.STATUS" }} pcbX={2} pcbY={7} schX={10.4} schY={-4} />
    <mosfet name="Q1" displayName="2N7002 load switch" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" connections={{ gate: "net.SIG", source: "net.GND", drain: "net.LOAD_NEG" }} footprint="sot23" pcbX={10} pcbY={-5} schX={6} schY={-3} /><chip name="U3" displayName={"HLS8L-DC3V-S-C load stage"} manufacturerPartNumber={"HLS8L-DC3V-S-C"} pinLabels={{ pin1: "POS", pin2: "NEG", pin3: "GND" }} pinAttributes={{ POS: { requiresPower: true, mustBeConnected: true }, NEG: { mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={{ POS: "net.VCC", NEG: "net.LOAD_NEG", GND: "net.GND" }} footprint={<footprint><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={-3} pcbY={0} portHints={["pin1"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={0} pcbY={0} portHints={["pin2"]} /><platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.6mm" pcbX={3} pcbY={0} portHints={["pin3"]} /><silkscreenrect width="8mm" height="6mm" stroke="solid" strokeWidth="0.2mm" filled={false} /></footprint>} pcbX={18} pcbY={4} schX={9.2} schY={3} schWidth="1.2mm" schHeight="0.4mm" /><diode name="D1" displayName="1N4148W flyback diode" manufacturerPartNumber="1N4148W" connections={{ anode: "net.LOAD_NEG", cathode: "net.VCC" }} footprint="0603" pcbX={10} pcbY={2} schX={4.8} schY={3} />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VCC","C1.pin1","R_STATUS.pin1","U3.POS","D1.cathode"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2","R1.pin2","D_STATUS.cathode","Q1.source","U3.GND"]} />
    <trace name="SIGNAL_RAIL" path={["J1.SIG","U1.SIG","R1.pin1","Q1.gate"]} />
    <trace name="STATUS_RAIL" path={["R_STATUS.pin2","D_STATUS.anode"]} />
    <trace name="LOAD_RAIL" path={["Q1.drain","U3.NEG","D1.anode"]} />
    <silkscreentext text={"SPDT Relay(30A)"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { GroveSPDTRelay30A }
export default GroveSPDTRelay30A
