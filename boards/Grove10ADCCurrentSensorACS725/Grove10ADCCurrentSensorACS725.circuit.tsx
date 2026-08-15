import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove10ADCCurrentSensorACS725 = () => (
  <board name={"Grove10ADCCurrentSensorACS725"} title={"Grove - 10A DC Current Sensor (ACS725)"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={16} y={7} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"ACS725"} manufacturerPartNumber={"ACS725"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="10k" tolerance="1%" manufacturerPartNumber="RC0603FR-0710KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <led name="D_STATUS" displayName="red status LED" manufacturerPartNumber="LTST-C190KRKT" color="red" footprint="0603" pcbX={-2} pcbY={7} schX={-1} schY={-4} /><resistor name="R_STATUS" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.STATUS" }} pcbX={2} pcbY={7} schX={2} schY={-4} /><trace name="STATUS_LED" from="R_STATUS.pin2" to="D_STATUS.anode" /><trace name="STATUS_RETURN" from="D_STATUS.cathode" to="J1.GND" />
    <silkscreentext text={"10A DC Current Sensor (ACS725)"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { Grove10ADCCurrentSensorACS725 }
export default Grove10ADCCurrentSensorACS725
