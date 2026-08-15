import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove3AxisDigitalAccelerometer = () => (
  <board name={"Grove3AxisDigitalAccelerometer"} title={"Grove - 3-Axis Digital Accelerometer"} width={"34mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    {/* JLCPCB footprint imports: footprint="jlcpcb:C9667", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-11} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C9667" */}
    <chip name="U1" displayName={"ADXL345"} manufacturerPartNumber={"ADXL345"} supplierPartNumbers={{ jlcpcb: ["C9667"] }} pinLabels={{ pin1: "VDDIO", pin2: "VDD", pin3: "GND", pin4: "GND_2", pin5: "INT1", pin6: "INT2", pin7: "SDO", pin8: "SDA", pin9: "SCL", pin10: "CS", pin11: "NC", pin12: "NC_2", pin13: "GND_3", pin14: "GND_4" }} pinAttributes={{ VDDIO: { requiresPower: true, mustBeConnected: true }, VDD: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, GND_2: { doNotConnect: true }, INT1: { doNotConnect: true }, INT2: { doNotConnect: true }, SDO: { doNotConnect: true }, SDA: { doNotConnect: true }, SCL: { doNotConnect: true }, CS: { doNotConnect: true }, NC: { mustBeConnected: true, isGpio: true }, NC_2: { doNotConnect: true }, GND_3: { doNotConnect: true }, GND_4: { doNotConnect: true } }} connections={{ "VDDIO": "net.VDD", "VDD": "net.VDD", "GND": "net.GND", "NC": "net.SIG" }} noConnect={["GND_2", "INT1", "INT2", "SDO", "SDA", "SCL", "CS", "NC_2", "GND_3", "GND_4"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-3.81} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-2.54} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.27} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.27} portHints={["pin5"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={2.54} portHints={["pin6"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={3.81} portHints={["pin7"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-3.81} portHints={["pin8"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-2.54} portHints={["pin9"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-1.27} portHints={["pin10"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0} portHints={["pin11"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={1.27} portHints={["pin12"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={2.54} portHints={["pin13"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={3.81} portHints={["pin14"]} /><silkscreenrect width="4mm" height="9.89mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["VDDIO","VDD","GND","GND_2","INT1","INT2","SDO"], rightSide: ["SDA","SCL","CS","NC","NC_2","GND_3","GND_4"] }} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C5446", footprint="jlcpcb:C15849" */}
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" supplierPartNumbers={{ jlcpcb: ["C5446"] }} pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" supplierPartNumbers={{ jlcpcb: ["C15849"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" supplierPartNumbers={{ jlcpcb: ["C98220"] }} footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-10} pcbY={5} schX={-3} schY={5} />
    <capacitor name="C_MOTION" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={9} pcbY={8} schX={8} schY={4} schOrientation="vertical" />
    <trace name="INPUT_RAIL" path={["J1.VCC","U2.VIN","C2.pin1"]} />
    <trace name="REGULATED_RAIL" path={["U2.VOUT","U1.VDDIO","U1.VDD","C1.pin1","C_MOTION.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","U2.GND","C2.pin2","C1.pin2","R1.pin2","C_MOTION.pin2"]} />
    <trace name="SIGNAL_RAIL" path={["J1.SIG","U1.INT1","R1.pin1"]} />
    <silkscreentext text={"3-Axis Digital Accelerometer"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { Grove3AxisDigitalAccelerometer }
export default Grove3AxisDigitalAccelerometer
