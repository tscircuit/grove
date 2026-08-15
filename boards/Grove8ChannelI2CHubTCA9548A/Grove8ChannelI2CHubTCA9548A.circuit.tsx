import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove8ChannelI2CHubTCA9548A = () => (
  <board name={"Grove8ChannelI2CHubTCA9548A"} title={"Grove 8 Channel I2C Hub TCA9548A"} width={"52mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={22} y={11} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C555456", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="i2c" powerVoltage={"5V"} connectToNets pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {/* JLCPCB footprint import: footprint="jlcpcb:C555456" */}
    <chip name="U1" displayName={"TCA9548A"} manufacturerPartNumber={"TCA9548A"} supplierPartNumbers={{ jlcpcb: ["C555456"] }} pinLabels={{ pin1: "SD0", pin2: "SC0", pin3: "SD1", pin4: "SC1", pin5: "SD2", pin6: "SC2", pin7: "SD3", pin8: "SC3", pin9: "GND", pin10: "SD4", pin11: "SC4", pin12: "SD5", pin13: "SC5", pin14: "SD6", pin15: "SC6", pin16: "SD7", pin17: "SC7", pin18: "A2", pin19: "SCL", pin20: "SDA", pin21: "VCC", pin22: "A0", pin23: "A1", pin24: "RESET", pin25: "EP" }} pinAttributes={{ SD0: { doNotConnect: true }, SC0: { doNotConnect: true }, SD1: { doNotConnect: true }, SC1: { doNotConnect: true }, SD2: { doNotConnect: true }, SC2: { doNotConnect: true }, SD3: { doNotConnect: true }, SC3: { doNotConnect: true }, GND: { requiresGround: true, mustBeConnected: true }, SD4: { doNotConnect: true }, SC4: { doNotConnect: true }, SD5: { doNotConnect: true }, SC5: { doNotConnect: true }, SD6: { doNotConnect: true }, SC6: { doNotConnect: true }, SD7: { doNotConnect: true }, SC7: { doNotConnect: true }, A2: { doNotConnect: true }, SCL: { mustBeConnected: true, isGpio: true }, SDA: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, A0: { doNotConnect: true }, A1: { doNotConnect: true }, RESET: { doNotConnect: true }, EP: { requiresGround: true, mustBeConnected: true } }} connections={{ "GND": "net.GND", "SCL": "net.SCL", "SDA": "net.SDA", "VCC": "net.VCC", "EP": "net.GND" }} noConnect={["SD0", "SC0", "SD1", "SC1", "SD2", "SC2", "SD3", "SC3", "SD4", "SC4", "SD5", "SC5", "SD6", "SC6", "SD7", "SC7", "A2", "A0", "A1", "RESET"]} footprint={<footprint><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-7.62} portHints={["pin1"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-6.35} portHints={["pin2"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-5.08} portHints={["pin3"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-3.81} portHints={["pin4"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-2.54} portHints={["pin5"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={-1.27} portHints={["pin6"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={0} portHints={["pin7"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={1.27} portHints={["pin8"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={2.54} portHints={["pin9"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={3.81} portHints={["pin10"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={5.08} portHints={["pin11"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={6.35} portHints={["pin12"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={-2.5} pcbY={7.62} portHints={["pin13"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-6.985} portHints={["pin14"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-5.715} portHints={["pin15"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-4.445} portHints={["pin16"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-3.175} portHints={["pin17"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-1.905} portHints={["pin18"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={-0.635} portHints={["pin19"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={0.635} portHints={["pin20"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={1.905} portHints={["pin21"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={3.175} portHints={["pin22"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={4.445} portHints={["pin23"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={5.715} portHints={["pin24"]} /><smtpad shape="rect" width="1mm" height="0.6mm" pcbX={2.5} pcbY={6.985} portHints={["pin25"]} /><silkscreenrect width="4mm" height="17.51mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={8} pcbY={0} schX={2} schY={0} schWidth="1.6mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["SD0","SC0","SD1","SC1","SD2","SC2","SD3","SC3","GND","SD4","SC4","SD5","SC5"], rightSide: ["SD6","SC6","SD7","SC7","A2","SCL","SDA","VCC","A0","A1","RESET","EP"] }} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C5446", footprint="jlcpcb:C15849" */}
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" supplierPartNumbers={{ jlcpcb: ["C5446"] }} pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-4} schY={-4} schWidth="1.2mm" schHeight="0.4mm" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" supplierPartNumbers={{ jlcpcb: ["C15849"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-9} schX={-1.5} schY={-4} schOrientation="vertical" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength="100mm" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={5} schY={4} schOrientation="vertical" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} />
    <resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" supplierPartNumbers={{ jlcpcb: ["C23162"] }} footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-8} schX={-3} schY={-5} />
    <trace name="INPUT_RAIL" path={["J1.VCC","U2.VIN","C2.pin1"]} />
    <trace name="REGULATED_RAIL" path={["U2.VOUT","U1.VCC","C1.pin1","R1.pin1","R2.pin1"]} />
    <trace name="GROUND_RAIL" path={["J1.GND","U1.GND","U1.EP","U2.GND","C2.pin2","C1.pin2"]} />
    <trace name="I2C_SCL" path={["J1.SCL","U1.SCL","R1.pin2"]} />
    <trace name="I2C_SDA" path={["J1.SDA","U1.SDA","R2.pin2"]} />
    <silkscreentext text={"8 Channel I2C Hub TCA9548A"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { Grove8ChannelI2CHubTCA9548A }
export default Grove8ChannelI2CHubTCA9548A
