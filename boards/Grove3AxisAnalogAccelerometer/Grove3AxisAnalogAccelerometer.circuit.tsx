import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove3AxisAnalogAccelerometer = () => (
  <board name={"Grove3AxisAnalogAccelerometer"} title={"Grove - 3-Axis Analog Accelerometer"} width={"34mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
    <net name="VCC" isPowerNet />
    <net name="VDD" isPowerNet />
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
    <GroveMountingHoles x={13} y={11} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C117051", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-11} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C117051" */}
    <chip name="U1" displayName={"ADXL335"} manufacturerPartNumber={"ADXL335"} supplierPartNumbers={{ jlcpcb: ["C117051"] }} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ "SIG": "net.SIG", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["AUX"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin4"]} /><silkscreenrect width="4mm" height="4mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SIG","VCC"], rightSide: ["GND","AUX"] }} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C5446", footprint="jlcpcb:C15849" */}
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" supplierPartNumbers={{ jlcpcb: ["C5446"] }} pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" supplierPartNumbers={{ jlcpcb: ["C15849"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" supplierPartNumbers={{ jlcpcb: ["C98220"] }} footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />
    <capacitor name="C_MOTION" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={9} pcbY={8} schX={8} schY={4} schOrientation="vertical" />
    <trace name="INPUT_RAIL" path={["J1.VCC","U2.VIN","C2.pin1"]} />
    <trace name="REGULATED_RAIL" path={["U2.VOUT","U1.VCC","C1.pin1","C_MOTION.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","U2.GND","C2.pin2","C1.pin2","R1.pin2","C_MOTION.pin2"]} />
    <trace name="SIGNAL_RAIL" path={["J1.SIG","U1.SIG","R1.pin1"]} />
    <silkscreentext text={"3-Axis Analog Accelerometer"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { Grove3AxisAnalogAccelerometer }
export default Grove3AxisAnalogAccelerometer
