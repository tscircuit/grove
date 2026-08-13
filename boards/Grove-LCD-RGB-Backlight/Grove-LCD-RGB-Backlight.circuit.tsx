import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const LcdPanel = () => (
  <chip
    name="LCD1"
    displayName="16x2 RGB LCD"
    pinLabels={{
      pin1: "GND",
      pin2: "VCC",
      pin3: "CONTRAST",
      pin4: "RS",
      pin5: "RW",
      pin6: "E",
      pin7: "D4",
      pin8: "D5",
      pin9: "D6",
      pin10: "D7",
      pin11: "BL_COM",
      pin12: "BL_R",
      pin13: "BL_G",
      pin14: "BL_B",
    }}
    footprint={
      <footprint>
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-16.51} pcbY={-14.5} portHints={["pin1"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-13.97} pcbY={-14.5} portHints={["pin2"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-11.43} pcbY={-14.5} portHints={["pin3"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-8.89} pcbY={-14.5} portHints={["pin4"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-6.35} pcbY={-14.5} portHints={["pin5"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-3.81} pcbY={-14.5} portHints={["pin6"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={-1.27} pcbY={-14.5} portHints={["pin7"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={1.27} pcbY={-14.5} portHints={["pin8"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={3.81} pcbY={-14.5} portHints={["pin9"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={6.35} pcbY={-14.5} portHints={["pin10"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={8.89} pcbY={-14.5} portHints={["pin11"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={11.43} pcbY={-14.5} portHints={["pin12"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={13.97} pcbY={-14.5} portHints={["pin13"]} />
        <platedhole shape="circle" holeDiameter="1mm" outerDiameter="1.8mm" pcbX={16.51} pcbY={-14.5} portHints={["pin14"]} />
        <silkscreenrect width="72mm" height="28mm" stroke="solid" strokeWidth="0.3mm" filled={false} />
        <silkscreenrect width="51mm" height="14mm" stroke="solid" strokeWidth="0.2mm" filled={false} />
        <silkscreentext text="16 × 2" pcbX={0} pcbY={0} fontSize="1.5mm" />
      </footprint>
    }
    pcbX={0}
    pcbY={0}
    schX={11}
    schY={0}
    schWidth={4}
    schHeight={9}
  />
)

export const GroveLcdRgbBacklight = () => (
  <board name="GroveLcdRgbBacklight" title="Grove - LCD RGB Backlight v5.0" width="80mm" height="36mm" borderRadius="1.5mm" solderMaskColor="blue">
    <GroveMountingHoles x={37} y={15} diameter="2.8mm" />
    <GroveConnector kind="i2c" pcbX={-34} pcbY={0} pcbRotation={90} schX={-12} schY={0} />
    <LcdPanel />
    <chip name="U1" displayName="JHD1313 LCD controller" pinLabels={{ pin1: "GND", pin2: "VCC", pin3: "SCL", pin4: "SDA", pin5: "RS", pin6: "RW", pin7: "E", pin8: "D4", pin9: "D5", pin10: "D6", pin11: "D7", pin12: "CONTRAST" }} footprint="soic12" layer="bottom" pcbX={-12} pcbY={9} schX={-3} schY={1} schWidth={4} schHeight={8} />
    <chip name="U2" displayName="SGM31323 RGB driver" pinLabels={{ pin1: "GND", pin2: "VCC", pin3: "SCL", pin4: "SDA", pin5: "R", pin6: "G", pin7: "B" }} footprint="qfn16" layer="bottom" pcbX={8} pcbY={9} schX={3} schY={-6} schWidth={4} schHeight={6} />
    <resistor name="R1" resistance="4.7k" footprint="0603" layer="bottom" pcbX={-25} pcbY={10} schX={-7} schY={5} />
    <resistor name="R2" resistance="4.7k" footprint="0603" layer="bottom" pcbX={-21} pcbY={10} schX={-5} schY={5} />
    <resistor name="RR" resistance="100" footprint="0603" layer="bottom" pcbX={16} pcbY={11} schX={7} schY={-4} />
    <resistor name="RG" resistance="100" footprint="0603" layer="bottom" pcbX={20} pcbY={11} schX={8} schY={-6} />
    <resistor name="RB" resistance="100" footprint="0603" layer="bottom" pcbX={24} pcbY={11} schX={7} schY={-8} />
    <capacitor name="C1" capacitance="100nF" footprint="0603" layer="bottom" pcbX={-5} pcbY={10} schX={-1} schY={6} />
    <capacitor name="C2" capacitance="1uF" footprint="0603" layer="bottom" pcbX={3} pcbY={10} schX={3} schY={-10} />
    <trace from="J1.VCC" to="U1.VCC" />
    <trace from="J1.VCC" to="U2.VCC" />
    <trace from="J1.VCC" to="LCD1.VCC" />
    <trace from="J1.VCC" to="LCD1.BL_COM" />
    <trace from="J1.VCC" to="R1.pin1" />
    <trace from="J1.VCC" to="R2.pin1" />
    <trace from="J1.VCC" to="C1.pin1" />
    <trace from="J1.VCC" to="C2.pin1" />
    <trace from="C1.pin2" to="J1.GND" />
    <trace from="C2.pin2" to="J1.GND" />
    <trace from="J1.GND" to="U1.GND" />
    <trace from="J1.GND" to="U2.GND" />
    <trace from="J1.GND" to="LCD1.GND" />
    <trace from="J1.SCL" to="U1.SCL" />
    <trace from="J1.SCL" to="U2.SCL" />
    <trace from="J1.SCL" to="R1.pin2" />
    <trace from="J1.SDA" to="U1.SDA" />
    <trace from="J1.SDA" to="U2.SDA" />
    <trace from="J1.SDA" to="R2.pin2" />
    <trace from="U1.RS" to="LCD1.RS" />
    <trace from="U1.RW" to="LCD1.RW" />
    <trace from="U1.E" to="LCD1.E" />
    <trace from="U1.D4" to="LCD1.D4" />
    <trace from="U1.D5" to="LCD1.D5" />
    <trace from="U1.D6" to="LCD1.D6" />
    <trace from="U1.D7" to="LCD1.D7" />
    <trace from="U1.CONTRAST" to="LCD1.CONTRAST" />
    <trace from="U2.R" to="RR.pin1" />
    <trace from="RR.pin2" to="LCD1.BL_R" />
    <trace from="U2.G" to="RG.pin1" />
    <trace from="RG.pin2" to="LCD1.BL_G" />
    <trace from="U2.B" to="RB.pin1" />
    <trace from="RB.pin2" to="LCD1.BL_B" />
    <silkscreentext text="GROVE LCD RGB BACKLIGHT v5.0" pcbX={0} pcbY={17} fontSize="0.7mm" />
  </board>
)

export default GroveLcdRgbBacklight
