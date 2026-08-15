import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove12BitMagneticRotaryPositionSensorEncoderAS5600 = () => (
  <board name={"Grove12BitMagneticRotaryPositionSensorEncoderAS5600"} title={"Grove - 12-bit Magnetic Rotary Position Sensor / Encoder (AS5600)"} width={"30mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
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
    <chip name="U1" displayName={"AS5600"} manufacturerPartNumber={"AS5600"} supplierPartNumbers={{ jlcpcb: ["C499458"] }} pinLabels={{ pin1: "VDD", pin2: "GND", pin3: "OUT", pin4: "DIR", pin5: "SCL", pin6: "SDA", pin7: "GND_2", pin8: "VDD_2" }} pinAttributes={{ VDD: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, OUT: { mustBeConnected: true, isGpio: true }, DIR: { doNotConnect: true }, SCL: { mustBeConnected: true, isGpio: true }, SDA: { mustBeConnected: true, isGpio: true }, GND_2: { doNotConnect: true }, VDD_2: { doNotConnect: true } }} connections={{ VDD: "net.VDD", GND: "net.GND", OUT: "net.SIG", SCL: "net.SCL", SDA: "net.SDA" }} noConnect={["DIR", "GND_2", "VDD_2"]} footprint={"jlcpcb:C499458"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-3} schY={-4} />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-4} schX={-3} schY={-4} schOrientation="vertical" />
    <trace name="REG_IN" from="J1.VCC" to="U2.VIN" /><trace name="REG_GND" from="U2.GND" to="J1.GND" /><trace name="REG_OUT" from="U2.VOUT" to="U1.VDD" /><trace name="REG_CAP" from="C2.pin1" to="U2.VIN" /><trace name="REG_CAP_GND" from="C2.pin2" to="U2.GND" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={7} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VDD" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <potentiometer name="RV1" displayName="WH09-2-103" manufacturerPartNumber="WH09-2-103" maxResistance="10k" pinVariant="three_pin" footprint="potentiometer_pth_9mm" pcbX={10} pcbY={0} schX={6} schY={0} /><trace name="POT_VCC" from="J1.VCC" to="RV1.pin1" /><trace name="POT_SIGNAL" from="RV1.pin2" to="J1.SIG" /><trace name="POT_GND" from="RV1.pin3" to="J1.GND" />
    <silkscreentext text={"12-bit Magnetic Rotary Position…"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { Grove12BitMagneticRotaryPositionSensorEncoderAS5600 }
export default Grove12BitMagneticRotaryPositionSensorEncoderAS5600
