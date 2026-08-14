import { GroveConnector } from "../_shared/GroveParts"

const ProbeElectrodes = () => (
    <capacitor
      name="CSENSE"
    displayName="Capacitive soil probe"
    capacitance="100pF"
    footprint={
      <footprint>
        <smtpad shape="rect" width="6mm" height="55mm" pcbX={-4} pcbY={0} portHints={["pin1"]} coveredWithSolderMask={false} />
        <smtpad shape="rect" width="6mm" height="55mm" pcbX={4} pcbY={0} portHints={["pin2"]} coveredWithSolderMask={false} />
      </footprint>
    }
      pcbX={0}
      pcbY={15}
      schX={1}
      schY={5}
      schOrientation="vertical"
  />
)

export const GroveCapacitiveMoisture = () => (
  <board name="GroveCapacitiveMoisture" title="Grove - Capacitive Moisture Sensor (Corrosion Resistant)" width="23.5mm" height="92.1mm" borderRadius="2mm" solderMaskColor="blue">
    <GroveConnector kind="analog" pcbX={0} pcbY={-41} schX={-11} schY={0} />
    <ProbeElectrodes />
    <chip
      name="U1"
      displayName="NE555DR"
      pinLabels={{ pin1: "GND", pin2: "TRIG", pin3: "OUT", pin4: "RESET", pin5: "CTRL", pin6: "THRESH", pin7: "DISCH", pin8: "VCC" }}
      pinAttributes={{
        GND: { requiresGround: true },
        TRIG: { mustBeConnected: true, isGpio: true },
        OUT: { mustBeConnected: true, isGpio: true },
        RESET: { mustBeConnected: true },
        CTRL: { mustBeConnected: true },
        THRESH: { mustBeConnected: true },
        DISCH: { mustBeConnected: true },
        VCC: { requiresPower: true, requiresVoltage: "5V" },
      }}
      footprint="soic8"
      pcbX={-4}
      pcbY={-29}
      schX={-4}
      schY={2}
    />
    <opamp name="U2" displayName="LMV358ID" footprint="soic8" pcbX={4} pcbY={-29} schX={7} schY={0} />
    <resistor name="R1" resistance="1.5k" footprint="0603" pcbX={-7} pcbY={-35} schX={-8} schY={5} />
    <resistor name="R2" resistance="2.4k" footprint="0603" pcbX={-2} pcbY={-35} schX={-4} schY={6} />
    <resistor name="R3" resistance="10k" footprint="0603" pcbX={3} pcbY={-35} schX={1} schY={2} />
    <resistor name="R4" resistance="0" footprint="0603" pcbX={7} pcbY={-35} schX={5} schY={-3} />
    <resistor name="R5" resistance="1M" footprint="0603" pcbX={8} pcbY={-25} schX={5} schY={2} />
    <resistor name="R6" resistance="100" footprint="0603" pcbX={8} pcbY={-21} schX={11} schY={-2} />
    <capacitor name="C1" capacitance="470pF" footprint="0603" pcbX={-7} pcbY={-25} schX={-5} schY={8} schOrientation="vertical" />
    <capacitor name="C2" capacitance="100nF" footprint="0603" pcbX={-7} pcbY={-21} schX={-8} schY={-3} schOrientation="vertical" />
    <capacitor name="C3" capacitance="10nF" footprint="0603" pcbX={-3} pcbY={-21} schX={-1} schY={-4} schOrientation="vertical" />
    <capacitor name="C4" capacitance="4.7uF" footprint="0603" pcbX={4} pcbY={-21} schX={12} schY={-5} schOrientation="vertical" />
    <diode name="D1" displayName="1N4148" footprint="0603" pcbX={0} pcbY={-25} schX={3} schY={2} />
    <trace from="J1.VCC" to="U1.VCC" />
    <trace from="J1.VCC" to="U1.RESET" />
    <trace from="J1.VCC" to="U2.positive_supply" />
    <trace from="J1.VCC" to="R1.pin2" />
    <trace from="J1.VCC" to="C2.pin2" />
    <trace from="C2.pin1" to="J1.GND" />
    <trace from="U1.GND" to="J1.GND" />
    <trace from="U2.negative_supply" to="J1.GND" />
    <trace from="R1.pin1" to="R2.pin2" />
    <trace from="R1.pin1" to="U1.DISCH" />
    <trace from="R2.pin1" to="U1.TRIG" />
    <trace from="R2.pin1" to="U1.THRESH" />
    <trace from="R2.pin1" to="C1.pin2" />
    <trace from="C1.pin1" to="J1.GND" />
    <trace from="U1.CTRL" to="C3.pin1" />
    <trace from="C3.pin2" to="J1.GND" />
    <trace from="U1.OUT" to="R3.pin1" />
    <trace from="R3.pin2" to="D1.anode" />
    <trace from="D1.cathode" to="U2.non_inverting_input" />
    <trace from="D1.cathode" to="R5.pin1" />
    <trace from="R5.pin2" to="J1.GND" />
    <trace from="U2.output" to="U2.inverting_input" />
    <trace from="U2.output" to="R4.pin1" />
    <trace from="R4.pin2" to="R6.pin1" />
    <trace from="R6.pin2" to="J1.SIG" />
    <trace from="J1.SIG" to="C4.pin1" />
    <trace from="C4.pin2" to="J1.GND" />
    <trace from="R2.pin1" to="CSENSE.pin1" />
    <trace from="CSENSE.pin2" to="J1.GND" />
    <silkscreentext text="CAPACITIVE MOISTURE" pcbX={0} pcbY={44} fontSize="0.65mm" />
  </board>
)

export default GroveCapacitiveMoisture
