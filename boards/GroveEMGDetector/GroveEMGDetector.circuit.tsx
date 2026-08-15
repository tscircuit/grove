import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveEMGDetector = () => (
  <board name={"GroveEMGDetector"} title={"Grove - EMG Detector"} width={"40mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
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
    <chip name="U1" displayName={"INA331"} manufacturerPartNumber={"INA331"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <chip name="MIC1" displayName="electret microphone capsule" manufacturerPartNumber="CMA-4544PF-W" pinLabels={{ pin1: "VCC", pin2: "OUT", pin3: "GND" }} pinAttributes={{ VCC: { requiresPower: true, mustBeConnected: true }, OUT: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true, mustBeConnected: true } }} footprint="microphone" pcbX={-5} pcbY={4} schX={-4} schY={3} /><capacitor name="C_AUDIO" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-1} pcbY={6} schX={-1} schY={4} schOrientation="vertical" /><trace name="MIC_POWER" from="J1.VCC" to="MIC1.VCC" /><trace name="MIC_SIGNAL" from="MIC1.OUT" to="U1.SIG" /><trace name="MIC_GND" from="MIC1.GND" to="J1.GND" />
    <silkscreentext text={"EMG Detector"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveEMGDetector }
export default GroveEMGDetector
