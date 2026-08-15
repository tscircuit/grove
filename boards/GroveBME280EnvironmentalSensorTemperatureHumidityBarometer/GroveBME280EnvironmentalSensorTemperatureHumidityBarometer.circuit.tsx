import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveBME280EnvironmentalSensorTemperatureHumidityBarometer = () => (
  <board name={"GroveBME280EnvironmentalSensorTemperatureHumidityBarometer"} title={"Grove BME280 Environmental Sensor Temperature Humidity Barometer"} width={"30mm"} height={"24mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
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
    <GroveMountingHoles x={11} y={9} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-9} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"BME280"} manufacturerPartNumber={"BME280"} supplierPartNumbers={{ jlcpcb: ["C92489"] }} pinLabels={{ pin1: "GND1", pin2: "CSB", pin3: "SDA", pin4: "SCL", pin5: "SDO", pin6: "VDDIO", pin7: "GND2", pin8: "VDD" }} pinAttributes={{ GND1: { requiresGround: true, mustBeConnected: true }, CSB: { doNotConnect: true }, SDA: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, SDO: { doNotConnect: true }, VDDIO: { requiresPower: true, mustBeConnected: true }, GND2: { requiresGround: true, mustBeConnected: true }, VDD: { requiresPower: true, mustBeConnected: true } }} connections={{ GND1: "net.GND", SDA: "net.SDA", SCL: "net.SCL", VDDIO: "net.VDD", GND2: "net.GND", VDD: "net.VDD" }} noConnect={["CSB", "SDO"]} footprint={"jlcpcb:C92489"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <chip name="U2" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true, mustBeConnected: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } }} connections={{ GND: "net.GND", VOUT: "net.VDD", VIN: "net.VCC" }} footprint="sot23" pcbX={-5} pcbY={-5} schX={-3} schY={-4} />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0603ZRY5V8BB105" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={-4} schX={-3} schY={-4} schOrientation="vertical" />
    <trace name="REG_IN" from="J1.VCC" to="U2.VIN" /><trace name="REG_GND" from="U2.GND" to="J1.GND" /><trace name="REG_OUT" from="U2.VOUT" to="U1.VDD" /><trace name="REG_CAP" from="C2.pin1" to="U2.VIN" /><trace name="REG_CAP_GND" from="C2.pin2" to="U2.GND" />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VDD" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND1" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <capacitor name="C_ENVIRONMENTAL" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VDD", pin2: "net.GND" }} pcbX={10} pcbY={6} schX={7} schY={4} schOrientation="vertical" />
    <silkscreentext text={"BME280 Environmental Sensor Tem…"} pcbX={0} pcbY={10.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-10.5} fontSize="0.45mm" />
  </board>
)

export { GroveBME280EnvironmentalSensorTemperatureHumidityBarometer }
export default GroveBME280EnvironmentalSensorTemperatureHumidityBarometer
