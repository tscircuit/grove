import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveI2CMotorDriverTB6612FNG = () => (
  <board name={"GroveI2CMotorDriverTB6612FNG"} title={"Grove - I2C Motor Driver (TB6612FNG)"} width={"52mm"} height={"28mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={false}>
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
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-20} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <chip name="U1" displayName={"TB6612FNG"} manufacturerPartNumber={"TB6612FNG"} pinLabels={{ pin1: "SDA", pin2: "SCL", pin3: "VCC", pin4: "GND", pin5: "ADDR", pin6: "INT" }} pinAttributes={{ SDA: { mustBeConnected: true, isGpio: true }, SCL: { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, ADDR: { doNotConnect: true }, INT: { doNotConnect: true } }} connections={{ SDA: "net.SDA", SCL: "net.SCL", VCC: "net.VCC", GND: "net.GND" }} noConnect={["ADDR", "INT"]} footprint={"soic8"} pcbX={4} pcbY={0} schX={2} schY={0} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={-5} pcbY={0} schX={7} schY={4} schOrientation="vertical" />
    <trace name="DECOUPLE_VCC" from="U1.VCC" to="C1.pin1" /><trace name="DECOUPLE_GND" from="C1.pin2" to="U1.GND" />
    <resistor name="R1" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SCL" }} pcbX={-8} pcbY={5} schX={-3} schY={5} /><resistor name="R2" resistance="4.7k" tolerance="1%" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.SDA" }} pcbX={-8} pcbY={-5} schX={-3} schY={-5} />
    <trace name="I2C_SCL" from="J1.SCL" to="U1.SCL" /><trace name="I2C_SDA" from="J1.SDA" to="U1.SDA" /><trace name="PULLUP_SCL" from="R1.pin2" to="J1.SCL" /><trace name="PULLUP_SDA" from="R2.pin2" to="J1.SDA" />
    <led name="D_STATUS" displayName="red status LED" manufacturerPartNumber="LTST-C190KRKT" color="red" footprint="0603" pcbX={-2} pcbY={7} schX={-1} schY={-4} /><resistor name="R_STATUS" resistance="1k" tolerance="1%" manufacturerPartNumber="RC0603FR-071KL" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.STATUS" }} pcbX={2} pcbY={7} schX={2} schY={-4} /><trace name="STATUS_LED" from="R_STATUS.pin2" to="D_STATUS.anode" /><trace name="STATUS_RETURN" from="D_STATUS.cathode" to="J1.GND" />
    <mosfet name="Q1" displayName="2N7002 load switch" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={10} pcbY={-5} schX={6} schY={-3} /><chip name="LOAD1" displayName={"TB6612FNG load stage"} manufacturerPartNumber={"UNSPECIFIED-LOAD-GroveI2CMotorDriverTB6612FNG"} pinLabels={{ pin1: "POS", pin2: "NEG" }} pinAttributes={{ POS: { requiresPower: true, mustBeConnected: true }, NEG: { requiresGround: true, mustBeConnected: true } }} footprint="power_module" pcbX={18} pcbY={4} schX={8} schY={3} /><diode name="D1" displayName="1N4148W flyback diode" manufacturerPartNumber="1N4148W" footprint="0603" pcbX={10} pcbY={2} schX={6} schY={3} /><trace name="LOAD_GATE" from="J1.SDA" to="Q1.gate" /><trace name="LOAD_SOURCE" from="Q1.source" to="J1.GND" /><trace name="LOAD_NEG" from="Q1.drain" to="LOAD1.NEG" /><trace name="LOAD_POS" from="LOAD1.POS" to="J1.VCC" /><trace name="LOAD_FLYBACK_A" from="LOAD1.POS" to="D1.anode" /><trace name="LOAD_FLYBACK_K" from="D1.cathode" to="LOAD1.NEG" />
    <silkscreentext text={"I2C Motor Driver (TB6612FNG)"} pcbX={0} pcbY={12.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-12.5} fontSize="0.45mm" />
  </board>
)

export { GroveI2CMotorDriverTB6612FNG }
export default GroveI2CMotorDriverTB6612FNG
