import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveSolidStateRelayV2 = () => (
  <board name={"GroveSolidStateRelayV2"} title={"Grove Solid State Relay V2"} width={"52mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={22} y={11} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"HLS8L-DC3V-S-C"} manufacturerPartNumber={"HLS8L-DC3V-S-C"} pinLabels={{ pin1: "SIG", pin2: "VCC", pin3: "GND", pin4: "AUX" }} pinAttributes={{ SIG: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, AUX: { doNotConnect: true } }} connections={{ SIG: "net.SIG", VCC: "net.VCC", GND: "net.GND" }} noConnect={["AUX"]} footprint={"sot23"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.SIG", pin2: "net.GND" }} pcbX={-4} pcbY={5} schX={-3} schY={5} />
    <trace name="SIGNAL" from="J1.SIG" to="U1.SIG" /><trace name="SIGNAL_BIAS" from="J1.SIG" to="R1.pin1" /><trace name="SIGNAL_RETURN" from="R1.pin2" to="J1.GND" />
    <led name="D_STATUS" displayName="red status LED" manufacturerPartNumber="LTST-C190KRKT" color="red" footprint="0603" pcbX={-2} pcbY={7} schX={-1} schY={-4} /><resistor name="R_STATUS" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.STATUS" }} pcbX={2} pcbY={7} schX={2} schY={-4} /><trace name="STATUS_LED" from="R_STATUS.pin2" to="D_STATUS.anode" /><trace name="STATUS_RETURN" from="D_STATUS.cathode" to="J1.GND" />
    <mosfet name="Q1" displayName="2N7002 load switch" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={10} pcbY={-5} schX={6} schY={-3} /><chip name="LOAD1" displayName={"HLS8L-DC3V-S-C load stage"} manufacturerPartNumber={"UNSPECIFIED-LOAD-GroveSolidStateRelayV2"} pinLabels={{ pin1: "POS", pin2: "NEG" }} pinAttributes={{ POS: { requiresPower: true, mustBeConnected: true }, NEG: { requiresGround: true, mustBeConnected: true } }} footprint="power_module" pcbX={18} pcbY={4} schX={8} schY={3} /><diode name="D1" displayName="1N4148W flyback diode" manufacturerPartNumber="1N4148W" footprint="0603" pcbX={10} pcbY={2} schX={6} schY={3} /><trace name="LOAD_GATE" from="J1.SIG" to="Q1.gate" /><trace name="LOAD_SOURCE" from="Q1.source" to="J1.GND" /><trace name="LOAD_NEG" from="Q1.drain" to="LOAD1.NEG" /><trace name="LOAD_POS" from="LOAD1.POS" to="J1.VCC" /><trace name="LOAD_FLYBACK_A" from="LOAD1.POS" to="D1.anode" /><trace name="LOAD_FLYBACK_K" from="D1.cathode" to="LOAD1.NEG" />
    <silkscreentext text={"Solid State Relay V2"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { GroveSolidStateRelayV2 }
export default GroveSolidStateRelayV2
