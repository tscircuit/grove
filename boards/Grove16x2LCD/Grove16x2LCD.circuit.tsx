import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove16x2LCD = () => (
  <board name={"Grove16x2LCD"} title={"Grove - 16x2 LCD"} width={"80mm"} height={"36mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={36} y={15} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-34} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"HD44780"} manufacturerPartNumber={"HD44780"} pinLabels={{ pin1: "SDA", pin2: "SCL", pin3: "VCC", pin4: "GND", pin5: "ADDR", pin6: "INT" }} pinAttributes={{ SDA: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, ADDR: { doNotConnect: true }, INT: { doNotConnect: true } }} connections={{ SDA: "net.SDA", SCL: "net.SCL", VCC: "net.VCC", GND: "net.GND" }} noConnect={["ADDR", "INT"]} footprint={"soic8"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <chip name="DISP1" displayName={"HD44780 display panel"} manufacturerPartNumber={"UNSPECIFIED-DISPLAY-Grove16x2LCD"} pinLabels={{ pin1: "VCC", pin2: "GND", pin3: "DATA" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, DATA: { mustBeConnected: true, isGpio: true } }} footprint="display_module" pcbX={10} pcbY={0} schX={7} schY={0} /><trace name="DISPLAY_VCC" from="DISP1.VCC" to="J1.VCC" /><trace name="DISPLAY_GND" from="DISP1.GND" to="J1.GND" /><trace name="DISPLAY_DATA" from="U1.SCL" to="DISP1.DATA" />
    <silkscreentext text={"16x2 LCD"} pcbX={0} pcbY={16.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-16.5} fontSize="0.45mm" />
  </board>
)

export { Grove16x2LCD }
export default Grove16x2LCD
