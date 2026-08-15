import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Dht20 = () => (
  <chip
    name="U2"
    displayName="DHT20"
    manufacturerPartNumber="DHT20"
    pinLabels={{ pin1: "SDA", pin2: "GND", pin3: "VDD", pin4: "SCL" }}
    pinAttributes={{ SDA: { mustBeConnected: true, isGpio: true }, GND: { requiresGround: true }, VDD: { requiresPower: true, requiresVoltage: "5V" }, SCL: { mustBeConnected: true, isGpio: true } }}
    footprint={
      <footprint>
        <smtpad shape="rect" width="0.7mm" height="1.5mm" pcbX={-0.8} pcbY={1.3} portHints={["pin1"]} />
        <smtpad shape="rect" width="0.7mm" height="1.5mm" pcbX={-0.8} pcbY={-1.3} portHints={["pin2"]} />
        <smtpad shape="rect" width="0.7mm" height="1.5mm" pcbX={0.8} pcbY={-1.3} portHints={["pin3"]} />
        <smtpad shape="rect" width="0.7mm" height="1.5mm" pcbX={0.8} pcbY={1.3} portHints={["pin4"]} />
        <silkscreenrect width="5mm" height="5mm" stroke="solid" strokeWidth="0.2mm" filled={false} />
      </footprint>
    }
    pcbX={10}
    pcbY={0}
    schX={7}
    schY={0}
  />
)

export const GroveDht20 = () => (
  <board name="GroveDht20" title="Grove - Temperature & Humidity Sensor DHT20 v2.1" width="40mm" height="20mm" borderRadius="1mm" solderMaskColor="blue">
    <GroveMountingHoles x={18} y={8} />
    <GroveConnector kind="i2c" pcbX={-14} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    <Dht20 />
    <chip name="U1" displayName="XC6206P332MR-G" manufacturerPartNumber="XC6206P332MR-G" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V" } }} footprint="sot23" pcbX={-7} pcbY={0} schX={-5} schY={4} schHeight="0.4mm" />
    <mosfet name="Q1" displayName="2N7002" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={1} pcbY={2.5} schX={1} schY={2.5} />
    <mosfet name="Q2" displayName="2N7002" manufacturerPartNumber="2N7002" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={1} pcbY={-2.5} schX={1} schY={-2.5} />
    <resistor name="R1" resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint="0402" pcbX={-3} pcbY={4.5} schX={-2} schY={5.5} />
    <resistor name="R2" resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint="0402" pcbX={4} pcbY={4.5} schX={4} schY={5.5} />
    <resistor name="R3" resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint="0402" pcbX={-3} pcbY={-4.5} schX={-2} schY={-5.5} />
    <resistor name="R4" resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint="0402" pcbX={4} pcbY={-4.5} schX={4} schY={-5.5} />
    <resistor name="R5" resistance="390" manufacturerPartNumber="RC0402JR-07390RL" footprint="0402" pcbX={7} pcbY={5} schX={7} schY={4} />
    <capacitor name="C1" capacitance="1uF" manufacturerPartNumber="CC0402ZRY5V8BB105" footprint="0402" pcbX={-10} pcbY={4.5} schX={-6} schY={6.3} schOrientation="vertical" />
    <capacitor name="C2" capacitance="1uF" manufacturerPartNumber="CC0402ZRY5V8BB105" footprint="0402" pcbX={-9.6} pcbY={0.5} pcbRotation={90} schX={-4} schY={6.3} schOrientation="vertical" maxDecouplingTraceLength="15mm" />
    <capacitor name="C3" capacitance="100nF" manufacturerPartNumber="CC0402KRX7R9BB104" footprint="0402" pcbX={13} pcbY={-1.3} pcbRotation={180} schX={10} schY={4} schOrientation="vertical" maxDecouplingTraceLength="15mm" />
    <trace from="J1.VCC" to="U1.VIN" />
    <trace from="J1.VCC" to="R1.pin1" />
    <trace from="J1.VCC" to="R3.pin1" />
    <trace from="J1.VCC" to="C1.pin1" />
    <trace from="C1.pin2" to="J1.GND" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="U1.VOUT" to="C2.pin1" />
    <trace from="C2.pin2" to="U1.GND" />
    <trace from="U1.VOUT" to="Q1.gate" />
    <trace from="U1.VOUT" to="Q2.gate" />
    <trace from="U1.VOUT" to="R2.pin1" />
    <trace from="U1.VOUT" to="R4.pin1" />
    <trace from="U1.VOUT" to="R5.pin1" />
    <trace from="R5.pin2" to="U2.VDD" />
    <trace from="U2.VDD" to="C3.pin1" />
    <trace from="C3.pin2" to="U2.GND" />
    <trace from="U2.GND" to="J1.GND" />
    <trace from="J1.SCL" to="Q1.drain" />
    <trace from="J1.SCL" to="R1.pin2" />
    <trace from="Q1.source" to="U2.SCL" />
    <trace from="Q1.source" to="R2.pin2" />
    <trace from="J1.SDA" to="Q2.drain" />
    <trace from="J1.SDA" to="R3.pin2" />
    <trace from="Q2.source" to="U2.SDA" />
    <trace from="Q2.source" to="R4.pin2" />
    <silkscreentext text="DHT20 v2.1" pcbX={0} pcbY={8.2} fontSize="0.75mm" />
  </board>
)

export default GroveDht20
