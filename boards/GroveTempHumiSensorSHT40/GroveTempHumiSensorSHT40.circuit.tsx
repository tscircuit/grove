import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveTempHumiSensorSHT40 = () => (
  <board name={"GroveTempHumiSensorSHT40"} title={"Grove Temp Humi Sensor SHT40"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={16} y={7} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C2909890", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="i2c" powerVoltage={"5V"} connectToNets pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C2909890" */}
    <chip name="U1" displayName={"SHT4x"} manufacturerPartNumber={"SHT4x"} supplierPartNumbers={{ jlcpcb: ["C2909890"] }} pinLabels={{ pin1: "SDA", pin2: "SCL", pin3: "VDD", pin4: "VSS", pin5: "EP" }} pinAttributes={{ SDA: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, VDD: { requiresPower: true, mustBeConnected: true }, VSS: { requiresGround: true, mustBeConnected: true }, EP: { requiresGround: true, mustBeConnected: true } }} connections={{ "SDA": "net.SDA", "SCL": "net.SCL", "VDD": "net.VDD", "VSS": "net.GND", "EP": "net.GND" }} noConnect={[]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.27} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.27} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin5"]} /><silkscreenrect width="4mm" height="4.81mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SDA","SCL","VDD"], rightSide: ["VSS","EP"] }} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C5446", footprint="jlcpcb:C15849" */}
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" supplierPartNumbers={{ jlcpcb: ["C5446"] }} pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" supplierPartNumbers={{ jlcpcb: ["C15849"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-8} schX={-3} schY={-5} />
    <capacitor name="C_ENVIRONMENTAL" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={10} pcbY={5} schX={8} schY={4} schOrientation="vertical" />
    <trace name="INPUT_RAIL" path={["J1.VCC","U2.VIN","C2.pin1"]} />
    <trace name="REGULATED_RAIL" path={["U2.VOUT","U1.VDD","C1.pin1","R1.pin1","R2.pin1","C_ENVIRONMENTAL.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.VSS","U1.EP","U2.GND","C2.pin2","C1.pin2","C_ENVIRONMENTAL.pin2"]} />
    <trace name="I2C_SCL" path={["J1.SCL","U1.SCL","R1.pin2"]} />
    <trace name="I2C_SDA" path={["J1.SDA","U1.SDA","R2.pin2"]} />
    <silkscreentext text={"Temp Humi Sensor SHT40"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveTempHumiSensorSHT40 }
export default GroveTempHumiSensorSHT40
