import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveDht20 = () => (
  <board name={"GroveDht20"} title={"Grove - Temperature & Humidity Sensor DHT20 v2.1"} width={"30mm"} height={"24mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={11} y={9} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C3012627", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="i2c" powerVoltage={"5V"} connectToNets pcbX={-9} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C3012627" */}
    <chip name="U1" displayName={"DHT20"} manufacturerPartNumber={"DHT20"} supplierPartNumbers={{ jlcpcb: ["C3012627"] }} pinLabels={{ pin1: "VDD", pin2: "SDA", pin3: "GND", pin4: "SCL" }} pinAttributes={{ VDD: { requiresPower: true, mustBeConnected: true }, SDA: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true }, SCL: { mustBeConnected: true, isGpio: true } }} connections={{ "VDD": "net.VCC", "SDA": "net.SDA", "GND": "net.GND", "SCL": "net.SCL" }} noConnect={[]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin4"]} /><silkscreenrect width="4mm" height="4mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["VDD","SDA"], rightSide: ["GND","SCL"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <capacitor name="C_ENVIRONMENTAL" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={7} pcbY={7} schX={8} schY={4} schOrientation="vertical" />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VDD","C1.pin1","R1.pin1","R2.pin1","C_ENVIRONMENTAL.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2","C_ENVIRONMENTAL.pin2"]} />
    <trace name="I2C_SCL" path={["J1.SCL","U1.SCL","R1.pin2"]} />
    <trace name="I2C_SDA" path={["J1.SDA","U1.SDA","R2.pin2"]} />
    <silkscreentext text={"Temperature & Humidity Sensor D…"} pcbX={0} pcbY={10.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-10.5} fontSize="0.45mm" />
  </board>
)

export { GroveDht20 }
export default GroveDht20
