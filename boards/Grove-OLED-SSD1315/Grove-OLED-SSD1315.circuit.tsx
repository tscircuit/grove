import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const OledPanel = () => (
  <chip
    name="U2"
    displayName="SSD1315 128x64 OLED"
    pinLabels={{
      pin1: "VSS",
      pin2: "VDD",
      pin3: "SCL",
      pin4: "SDA",
      pin5: "RESET",
      pin6: "IREF",
      pin7: "VCOMH",
      pin8: "VCC",
      pin9: "VBAT",
      pin10: "ADDR",
      pin11: "C1P",
      pin12: "C1N",
      pin13: "C2P",
      pin14: "C2N",
    }}
    footprint={
      <footprint>
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-6.5} pcbY={-7} portHints={["pin1"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-5.5} pcbY={-7} portHints={["pin2"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-4.5} pcbY={-7} portHints={["pin3"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-3.5} pcbY={-7} portHints={["pin4"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-2.5} pcbY={-7} portHints={["pin5"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-1.5} pcbY={-7} portHints={["pin6"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={-0.5} pcbY={-7} portHints={["pin7"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={0.5} pcbY={-7} portHints={["pin8"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={1.5} pcbY={-7} portHints={["pin9"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={2.5} pcbY={-7} portHints={["pin10"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={3.5} pcbY={-7} portHints={["pin11"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={4.5} pcbY={-7} portHints={["pin12"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={5.5} pcbY={-7} portHints={["pin13"]} />
        <smtpad shape="rect" width="0.7mm" height="2mm" pcbX={6.5} pcbY={-7} portHints={["pin14"]} />
        <silkscreenrect width="25mm" height="16mm" stroke="solid" strokeWidth="0.25mm" filled={false} />
        <silkscreenrect width="21mm" height="11mm" stroke="solid" strokeWidth="0.15mm" filled={false} />
      </footprint>
    }
    pcbX={6}
    pcbY={0}
    schX={8}
    schY={0}
    schWidth={4}
    schHeight={8}
  />
)

export const GroveOledSsd1315 = () => (
  <board name="GroveOledSsd1315" title="Grove - OLED Display 0.96 inch (SSD1315) v1.0" width="40mm" height="20mm" borderRadius="1mm" solderMaskColor="blue" placementDrcChecksDisabled>
    <GroveMountingHoles x={18} y={8} />
    <GroveConnector kind="i2c" pcbX={-14} pcbY={0} pcbRotation={90} schX={-11} schY={0} />
    <OledPanel />
    <chip name="U1" displayName="XC6206P332MR" pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }} footprint="sot23" pcbX={-8} pcbY={0} schX={-6} schY={5} />
    <mosfet name="Q1" displayName="CJ2102" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={-3} pcbY={3} schX={0} schY={3} />
    <mosfet name="Q2" displayName="CJ2102" channelType="n" mosfetMode="enhancement" footprint="sot23" pcbX={-3} pcbY={-3} schX={0} schY={-3} />
    <resistor name="R1" resistance="4.7k" footprint="0402" pcbX={-6} pcbY={6} schX={-3} schY={6} />
    <resistor name="R2" resistance="4.7k" footprint="0402" pcbX={-2} pcbY={6} schX={3} schY={6} />
    <resistor name="R3" resistance="4.7k" footprint="0402" pcbX={-6} pcbY={-6} schX={-3} schY={-6} />
    <resistor name="R4" resistance="4.7k" footprint="0402" pcbX={-2} pcbY={-6} schX={3} schY={-6} />
    <resistor name="R5" resistance="4.7k" footprint="0402" pcbX={3} pcbY={7} schX={7} schY={6} />
    <resistor name="R6" resistance="620k" footprint="0402" pcbX={7} pcbY={7} schX={12} schY={5} />
    <capacitor name="C1" capacitance="10uF" footprint="0603" pcbX={-10} pcbY={5} schX={-7} schY={8} />
    <capacitor name="C2" capacitance="10uF" footprint="0603" pcbX={-10} pcbY={0} pcbRotation={90} schX={-5} schY={8} />
    <capacitor name="C3" capacitance="1uF" footprint="0402" pcbX={11} pcbY={7} schX={13} schY={2} />
    <capacitor name="C4" capacitance="1uF" footprint="0402" pcbX={14} pcbY={7} schX={13} schY={0} />
    <capacitor name="C5" capacitance="10uF" footprint="0603" pcbX={5.5} pcbY={-8.1} pcbRotation={-90} schX={13} schY={-3} />
    <trace from="J1.VCC" to="U1.VIN" />
    <trace from="J1.VCC" to="R1.pin1" />
    <trace from="J1.VCC" to="R3.pin1" />
    <trace from="J1.VCC" to="C1.pin1" />
    <trace from="C1.pin2" to="J1.GND" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="U1.VOUT" to="C2.pin1" />
    <trace from="C2.pin2" to="U1.GND" />
    <trace from="U1.VOUT" to="U2.VDD" />
    <trace from="U1.VOUT" to="Q1.gate" />
    <trace from="U1.VOUT" to="Q2.gate" />
    <trace from="U1.VOUT" to="R2.pin1" />
    <trace from="U1.VOUT" to="R4.pin1" />
    <trace from="U1.VOUT" to="R5.pin1" />
    <trace from="J1.SCL" to="Q1.drain" />
    <trace from="J1.SCL" to="R1.pin2" />
    <trace from="Q1.source" to="U2.SCL" />
    <trace from="Q1.source" to="R2.pin2" />
    <trace from="J1.SDA" to="Q2.drain" />
    <trace from="J1.SDA" to="R3.pin2" />
    <trace from="Q2.source" to="U2.SDA" />
    <trace from="Q2.source" to="R4.pin2" />
    <trace from="R5.pin2" to="U2.RESET" />
    <trace from="U2.IREF" to="R6.pin1" />
    <trace from="R6.pin2" to="J1.GND" />
    <trace from="U2.C1P" to="C3.pin1" />
    <trace from="U2.C1N" to="C3.pin2" />
    <trace from="U2.C2P" to="C4.pin1" />
    <trace from="U2.C2N" to="C4.pin2" />
    <trace from="U2.VCOMH" to="C5.pin1" />
    <trace from="C5.pin2" to="R6.pin2" />
    <trace from="U2.VSS" to="J1.GND" />
    <trace from="U2.VCC" to="U1.VOUT" />
    <trace from="U2.VBAT" to="U1.VOUT" />
    <trace from="U2.ADDR" to="J1.GND" />
    <silkscreentext text="OLED 0.96 SSD1315" pcbX={6} pcbY={8.5} fontSize="0.65mm" />
  </board>
)

export default GroveOledSsd1315
