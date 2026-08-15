import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveNFCPN532 = () => (
  <board name={"GroveNFCPN532"} title={"Grove - NFC(PN532)"} width={"52mm"} height={"30mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={22} y={12} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} connectToNets pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"PN532"} manufacturerPartNumber={"PN532"} pinLabels={{ pin1: "SDA", pin2: "SCL", pin3: "VCC", pin4: "GND", pin5: "ADDR", pin6: "INT" }} pinAttributes={{ SDA: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, ADDR: { doNotConnect: true }, INT: { doNotConnect: true } }} connections={{ "SDA": "net.SDA", "SCL": "net.SCL", "VCC": "net.VCC", "GND": "net.GND" }} noConnect={["ADDR", "INT"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.27} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.27} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-1.27} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0} portHints={["pin5"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={1.27} portHints={["pin6"]} /><silkscreenrect width="4mm" height="4.81mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SDA","SCL","VCC"], rightSide: ["GND","ADDR","INT"] }} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="POWER_RAIL" path={["J1.VCC","U1.VCC","C1.pin1","R1.pin1","R2.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","C1.pin2"]} />
    <trace name="I2C_SCL" path={["J1.SCL","U1.SCL","R1.pin2"]} />
    <trace name="I2C_SDA" path={["J1.SDA","U1.SDA","R2.pin2"]} />
    <silkscreentext text={"NFC(PN532)"} pcbX={0} pcbY={13.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-13.5} fontSize="0.45mm" />
  </board>
)

export { GroveNFCPN532 }
export default GroveNFCPN532
