import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

export const GroveDigitalPir = () => (
  <board name="GroveDigitalPir" title="Grove - Digital PIR Motion Sensor v1.0" width="20mm" height="20mm" borderRadius="1mm" solderMaskColor="blue">
    <GroveMountingHoles />
    <GroveConnector pcbX={0} pcbY={-6.6} schX={-9} schY={0} />
    <chip
      name="U2"
      displayName="AS312 PIR"
      manufacturerPartNumber="AS312"
      pinLabels={{ pin1: "VDD", pin2: "REL", pin3: "VSS" }}
      pinAttributes={{ VDD: { requiresPower: true, requiresVoltage: "5V" }, REL: { mustBeConnected: true, isGpio: true }, VSS: { requiresGround: true } }}
      footprint="to92"
      pcbX={0}
      pcbY={4}
      schX={4}
      schY={0}
      schHeight="0.4mm"
    />
    <chip name="U1" displayName="XC6206P332MR" manufacturerPartNumber="XC6206P332MR" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} pinAttributes={{ GND: { requiresGround: true }, VOUT: { mustBeConnected: true }, VIN: { requiresPower: true, requiresVoltage: "5V" } }} footprint="sot23" pcbX={-4.5} pcbY={0} schX={-4} schY={3} schHeight="0.4mm" />
    <mosfet name="Q1" displayName="CJ2102" manufacturerPartNumber="CJ2102" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={4} pcbY={0} schX={4} schY={-3.5} />
    <resistor name="R1" resistance="4.7k" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" pcbX={0} pcbY={0} schX={0} schY={-4.5} />
    <resistor name="R2" resistance="4.7k" manufacturerPartNumber="RC0603FR-074K7L" footprint="0603" pcbX={5} pcbY={-3.5} schX={7} schY={-4.5} />
    <capacitor name="C1" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" pcbX={-7.5} pcbY={0} pcbRotation={-90} schX={-4} schY={6} schOrientation="vertical" maxDecouplingTraceLength="10mm" />
    <capacitor name="C2" capacitance="100nF" manufacturerPartNumber="CC0402KRX7R9BB104" footprint="0402" pcbX={-4.5} pcbY={5} pcbRotation={180} schX={1} schY={3} schOrientation="vertical" maxDecouplingTraceLength="10mm" />
    <capacitor name="C3" capacitance="10uF" manufacturerPartNumber="CC0402ZRY5V8BB106" footprint="0402" pcbX={4.5} pcbY={5.5} pcbRotation={180} schX={3} schY={3} schOrientation="vertical" maxDecouplingTraceLength="10mm" />
    <capacitor name="C4" capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" pcbX={-5} pcbY={-3.5} schX={-5} schY={-3} schOrientation="vertical" maxDecouplingTraceLength="10mm" />
    <capacitor name="C5" capacitance="10uF" manufacturerPartNumber="CC0603ZRY5V8BB106" footprint="0603" pcbX={-2} pcbY={-3.5} schX={-3} schY={-3} schOrientation="vertical" maxDecouplingTraceLength="10mm" />
    <trace from="J1.VCC" to="U1.VIN" />
    <trace from="J1.VCC" to="R2.pin2" />
    <trace from="J1.VCC" to="C4.pin2" />
    <trace from="J1.VCC" to="C5.pin2" />
    <trace from="C4.pin1" to="J1.GND" />
    <trace from="C5.pin1" to="J1.GND" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="U1.VOUT" to="U2.VDD" />
    <trace from="U1.VOUT" to="Q1.gate" />
    <trace from="U1.VOUT" to="R1.pin2" />
    <trace from="U1.VOUT" to="C1.pin2" />
    <trace from="U2.VDD" to="C2.pin2" />
    <trace from="U2.VDD" to="C3.pin2" />
    <trace from="C1.pin1" to="U1.GND" />
    <trace from="C2.pin1" to="U2.VSS" />
    <trace from="C3.pin1" to="U2.VSS" />
    <trace from="U2.VSS" to="J1.GND" />
    <trace from="U2.REL" to="Q1.source" />
    <trace from="U2.REL" to="R1.pin1" />
    <trace from="Q1.drain" to="J1.SIG" />
    <trace from="Q1.drain" to="R2.pin1" />
    <silkscreentext text="DIGITAL PIR" pcbX={0} pcbY={8} fontSize="0.7mm" />
  </board>
)

export default GroveDigitalPir
