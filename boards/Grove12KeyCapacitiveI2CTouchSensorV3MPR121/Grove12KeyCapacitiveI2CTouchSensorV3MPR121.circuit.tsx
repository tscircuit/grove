import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove12KeyCapacitiveI2CTouchSensorV3MPR121 = () => (
  <board name={"Grove12KeyCapacitiveI2CTouchSensorV3MPR121"} title={"Grove - 12 Key Capacitive I2C Touch Sensor V3 (MPR121)"} width={"30mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="VDD" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={11} y={7} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-9} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"MPR121"} manufacturerPartNumber={"MPR121"} supplierPartNumbers={{ jlcpcb: ["C91322"] }} pinLabels={{ pin1: "IRQ", pin2: "SCL", pin3: "SDA", pin4: "ADDR", pin5: "VREG", pin6: "VSS", pin7: "REXT", pin8: "ELE0", pin9: "ELE1", pin10: "ELE2", pin11: "ELE3", pin12: "ELE4", pin13: "ELE5", pin14: "ELE6", pin15: "ELE7", pin16: "ELE8", pin17: "ELE9", pin18: "ELE10", pin19: "ELE11", pin20: "VDD" }} pinAttributes={{ IRQ: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, SDA: { mustBeConnected: true, isGpio: true }, ADDR: { doNotConnect: true }, VREG: { doNotConnect: true }, VSS: { requiresGround: true, mustBeConnected: true }, REXT: { doNotConnect: true }, ELE0: { doNotConnect: true }, ELE1: { doNotConnect: true }, ELE2: { doNotConnect: true }, ELE3: { doNotConnect: true }, ELE4: { doNotConnect: true }, ELE5: { doNotConnect: true }, ELE6: { doNotConnect: true }, ELE7: { doNotConnect: true }, ELE8: { doNotConnect: true }, ELE9: { doNotConnect: true }, ELE10: { doNotConnect: true }, ELE11: { doNotConnect: true }, VDD: { requiresPower: true, mustBeConnected: true } }} connections={{ IRQ: "net.SIG", SCL: "net.SCL", SDA: "net.SDA", VSS: "net.GND", VDD: "net.VDD" }} noConnect={["ADDR", "VREG", "REXT", "ELE0", "ELE1", "ELE2", "ELE3", "ELE4", "ELE5", "ELE6", "ELE7", "ELE8", "ELE9", "ELE10", "ELE11"]} footprint={"jlcpcb:C91322"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-3} schY={-4} />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-4} schX={-3} schY={-4} schOrientation="vertical" />
    <trace name="REG_IN" from="J1.VCC" to="U2.VIN" /><trace name="REG_GND" from="U2.GND" to="J1.GND" /><trace name="REG_OUT" from="U2.VOUT" to="U1.VDD" /><trace name="REG_CAP" from="C2.pin1" to="U2.VIN" /><trace name="REG_CAP_GND" from="C2.pin2" to="U2.GND" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={7} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VDD" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.VSS" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <pushbutton name="SW1" displayName="B3F-1000 tactile switch" manufacturerPartNumber="B3F-1000" pinAttributes={{ pin1: { requiresPower: true, mustBeConnected: true }, pin2: { mustBeConnected: true } }} footprint="button_6mm" pcbX={10} pcbY={0} schX={6} schY={0} /><trace name="SWITCH_FEED" from="J1.VCC" to="SW1.pin1" /><trace name="SWITCH_SIGNAL" from="SW1.pin2" to="J1.SIG" />
    <silkscreentext text={"12 Key Capacitive I2C Touch Sen…"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { Grove12KeyCapacitiveI2CTouchSensorV3MPR121 }
export default Grove12KeyCapacitiveI2CTouchSensorV3MPR121
