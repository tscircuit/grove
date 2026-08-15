import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove12KeyCapacitiveI2CTouchSensorV3MPR121 = () => (
  <board name={"Grove12KeyCapacitiveI2CTouchSensorV3MPR121"} title={"Grove - 12 Key Capacitive I2C Touch Sensor V3 (MPR121)"} width={"40mm"} height={"24mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={16} y={9} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} connectToNets pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"MPR121"} manufacturerPartNumber={"MPR121"} supplierPartNumbers={{ jlcpcb: ["C91322"] }} pinLabels={{ pin1: "IRQ", pin2: "SCL", pin3: "SDA", pin4: "ADDR", pin5: "VREG", pin6: "VSS", pin7: "REXT", pin8: "ELE0", pin9: "ELE1", pin10: "ELE2", pin11: "ELE3", pin12: "ELE4", pin13: "ELE5", pin14: "ELE6", pin15: "ELE7", pin16: "ELE8", pin17: "ELE9", pin18: "ELE10", pin19: "ELE11", pin20: "VDD" }} pinAttributes={{ IRQ: { doNotConnect: true }, SCL: { mustBeConnected: true, isGpio: true }, SDA: { mustBeConnected: true, isGpio: true }, ADDR: { doNotConnect: true }, VREG: { doNotConnect: true }, VSS: { requiresGround: true, mustBeConnected: true }, REXT: { doNotConnect: true }, ELE0: { doNotConnect: true }, ELE1: { doNotConnect: true }, ELE2: { doNotConnect: true }, ELE3: { doNotConnect: true }, ELE4: { doNotConnect: true }, ELE5: { doNotConnect: true }, ELE6: { doNotConnect: true }, ELE7: { doNotConnect: true }, ELE8: { doNotConnect: true }, ELE9: { doNotConnect: true }, ELE10: { doNotConnect: true }, ELE11: { doNotConnect: true }, VDD: { requiresPower: true, mustBeConnected: true } }} connections={{ "SCL": "net.SCL", "SDA": "net.SDA", "VSS": "net.GND", "VDD": "net.VDD" }} noConnect={["IRQ", "ADDR", "VREG", "REXT", "ELE0", "ELE1", "ELE2", "ELE3", "ELE4", "ELE5", "ELE6", "ELE7", "ELE8", "ELE9", "ELE10", "ELE11"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-5.715} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-4.445} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-3.175} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.905} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-0.635} portHints={["pin5"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0.635} portHints={["pin6"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.905} portHints={["pin7"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={3.175} portHints={["pin8"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={4.445} portHints={["pin9"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={5.715} portHints={["pin10"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-5.715} portHints={["pin11"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-4.445} portHints={["pin12"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-3.175} portHints={["pin13"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-1.905} portHints={["pin14"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin15"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin16"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={1.905} portHints={["pin17"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={3.175} portHints={["pin18"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={4.445} portHints={["pin19"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={5.715} portHints={["pin20"]} /><silkscreenrect width="4mm" height="13.7mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={4} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["IRQ","SCL","SDA","ADDR","VREG","VSS","REXT","ELE0","ELE1","ELE2"], rightSide: ["ELE3","ELE4","ELE5","ELE6","ELE7","ELE8","ELE9","ELE10","ELE11","VDD"] }} />
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={12} pcbY={-6} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-8} schX={-3} schY={-5} />
    <trace name="INPUT_RAIL" path={["J1.VCC","U2.VIN","C2.pin1"]} />
    <trace name="REGULATED_RAIL" path={["U2.VOUT","U1.VDD","C1.pin1","R1.pin1","R2.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.VSS","U2.GND","C2.pin2","C1.pin2"]} />
    <trace name="I2C_SCL" path={["J1.SCL","U1.SCL","R1.pin2"]} />
    <trace name="I2C_SDA" path={["J1.SDA","U1.SDA","R2.pin2"]} />
    <silkscreentext text={"12 Key Capacitive I2C Touch Sen…"} pcbX={0} pcbY={10.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-10.5} fontSize="0.45mm" />
  </board>
)

export { Grove12KeyCapacitiveI2CTouchSensorV3MPR121 }
export default Grove12KeyCapacitiveI2CTouchSensorV3MPR121
