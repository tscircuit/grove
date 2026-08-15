import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveSmartAirQualitySensorSGP41 = () => (
  <board name={"GroveSmartAirQualitySensorSGP41"} title={"Grove -Smart Air Quality Sensor (SGP41)"} width={"60mm"} height={"38mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
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
    <GroveMountingHoles x={26} y={16} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-24} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"SGP41"} manufacturerPartNumber={"SGP41"} supplierPartNumbers={{ jlcpcb: ["C3659325"] }} pinLabels={{ pin1: "VDD", pin2: "VSS", pin3: "SDA", pin4: "NC", pin5: "VDDH", pin6: "SCL", pin7: "EP" }} pinAttributes={{ VDD: { requiresPower: true, mustBeConnected: true }, VSS: { requiresGround: true, mustBeConnected: true }, SDA: { mustBeConnected: true, isGpio: true }, NC: { doNotConnect: true }, VDDH: { requiresPower: true, mustBeConnected: true }, SCL: { mustBeConnected: true, isGpio: true }, EP: { requiresGround: true, mustBeConnected: true } }} connections={{ VDD: "net.VDD", VSS: "net.GND", SDA: "net.SDA", VDDH: "net.VDD", SCL: "net.SCL", EP: "net.GND" }} noConnect={["NC"]} footprint={"jlcpcb:C3659325"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-3} schY={-4} />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-4} schX={-3} schY={-4} schOrientation="vertical" />
    <trace name="REG_IN" from="J1.VCC" to="U2.VIN" /><trace name="REG_GND" from="U2.GND" to="J1.GND" /><trace name="REG_OUT" from="U2.VOUT" to="U1.VDD" /><trace name="REG_CAP" from="C2.pin1" to="U2.VIN" /><trace name="REG_CAP_GND" from="C2.pin2" to="U2.GND" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VDD" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.VSS" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <silkscreentext text={"Smart Air Quality Sensor (SGP41)"} pcbX={0} pcbY={17.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-17.5} fontSize="0.45mm" />
  </board>
)

export { GroveSmartAirQualitySensorSGP41 }
export default GroveSmartAirQualitySensorSGP41
