import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveTemperatureHumiditySensorV20DHT20 = () => (
  <board name={"GroveTemperatureHumiditySensorV20DHT20"} title={"Grove Temperature Humidity Sensor V2 0 DHT20"} width={"30mm"} height={"24mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={11} y={9} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-9} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"DHT20"} manufacturerPartNumber={"DHT20"} supplierPartNumbers={{ jlcpcb: ["C3012627"] }} pinLabels={{ pin1: "VDD", pin2: "SDA", pin3: "GND", pin4: "SCL" }} pinAttributes={{ VDD: { requiresPower: true, mustBeConnected: true }, SDA: { doNotConnect: true }, GND: { requiresGround: true, mustBeConnected: true }, SCL: { doNotConnect: true } }} connections={{ VDD: "net.VCC", SDA: "net.SDA", GND: "net.GND", SCL: "net.SCL" }} noConnect={["SDA", "SCL"]} footprint={"jlcpcb:C3012627"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VDD" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <capacitor name="C_ENVIRONMENTAL" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={10} pcbY={6} schX={7} schY={4} schOrientation="vertical" />
    <silkscreentext text={"Temperature Humidity Sensor V2…"} pcbX={0} pcbY={10.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-10.5} fontSize="0.45mm" />
  </board>
)

export { GroveTemperatureHumiditySensorV20DHT20 }
export default GroveTemperatureHumiditySensorV20DHT20
