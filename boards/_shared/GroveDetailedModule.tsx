import { GroveConnector, GroveMountingHoles } from "./GroveParts"

export type GroveInterfaceKind = "digital" | "analog" | "i2c" | "uart"
export type GroveDetailKind =
  | "sensor"
  | "actuator"
  | "display"
  | "communications"
  | "input"
  | "utility"

export interface GroveDetailedProfile {
  name: string
  title: string
  category: string
  sourceUrl: string
  interfaceKind: GroveInterfaceKind
  detailKind: GroveDetailKind
  primaryModel: string
  manufacturerPartNumber: string
  powerVoltage: "3.3V" | "5V"
}

const signalLabels = (interfaceKind: GroveInterfaceKind) => {
  if (interfaceKind === "i2c") return ["SCL", "SDA"] as const
  if (interfaceKind === "uart") return ["RX", "TX"] as const
  return ["SIG", "NC"] as const
}

const compactLabel = (value: string, maxLength = 24) => {
  const compact = value
    .replace(/^grove\s*[-–—:]?\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
  return compact.length > maxLength
    ? `${compact.slice(0, maxLength - 1).trimEnd()}…`
    : compact
}

const controllerPinAttributes = (
  interfaceKind: GroveInterfaceKind,
  powerVoltage: string,
) => {
  const [signal1, signal2] = signalLabels(interfaceKind)
  const activeSecondSignal = interfaceKind === "i2c" || interfaceKind === "uart"
  return {
    [signal1]: { mustBeConnected: true, isGpio: true },
    [signal2]: activeSecondSignal
      ? { mustBeConnected: true, isGpio: true }
      : { doNotConnect: true },
    VCC: { requiresPower: true, requiresVoltage: powerVoltage },
    GND: { requiresGround: true },
    AUX1: { doNotConnect: true },
    AUX2: { doNotConnect: true },
    EN: { doNotConnect: true },
    TEST: { doNotConnect: true },
  }
}

const ControllerFootprint = () => (
  <footprint>
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={-2.5} pcbY={-2.5} portHints={["pin1"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={-2.5} pcbY={-0.85} portHints={["pin2"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={-2.5} pcbY={0.85} portHints={["pin3"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={-2.5} pcbY={2.5} portHints={["pin4"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={2.5} pcbY={2.5} portHints={["pin5"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={2.5} pcbY={0.85} portHints={["pin6"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={2.5} pcbY={-0.85} portHints={["pin7"]} />
    <smtpad shape="rect" width="1.2mm" height="0.8mm" pcbX={2.5} pcbY={-2.5} portHints={["pin8"]} />
    <silkscreenrect width="7mm" height="6mm" stroke="solid" strokeWidth="0.2mm" filled={false} />
  </footprint>
)

export const GroveDetailedModule = ({
  profile,
}: {
  profile: GroveDetailedProfile
}) => {
  const { interfaceKind, powerVoltage, detailKind } = profile
  const [signal1, signal2] = signalLabels(interfaceKind)
  const signal2IsActive = interfaceKind === "i2c" || interfaceKind === "uart"
  const ledResistorName = signal2IsActive ? "R3" : "R2"
  const displayName = compactLabel(profile.primaryModel)
  const boardLabel = compactLabel(profile.title, 28)

  return (
    <board
      name={profile.name}
      title={profile.title}
      width="40mm"
      height="20mm"
      borderRadius="1mm"
      solderMaskColor="blue"
    >
      <GroveMountingHoles x={17} y={7.5} />
      <GroveConnector
        kind={interfaceKind}
        pcbX={-14}
        pcbY={0}
        pcbRotation={-90}
        schX={-7}
        schY={0}
      />
      <chip
        name="U1"
        displayName={displayName}
        manufacturerPartNumber={profile.manufacturerPartNumber}
        datasheetUrl={profile.sourceUrl}
        pinLabels={{
          pin1: signal1,
          pin2: signal2,
          pin3: "VCC",
          pin4: "GND",
          pin5: "AUX1",
          pin6: "AUX2",
          pin7: "EN",
          pin8: "TEST",
        }}
        pinAttributes={controllerPinAttributes(interfaceKind, powerVoltage)}
        noConnect={[
          ...(signal2IsActive ? [] : [signal2]),
          "AUX1",
          "AUX2",
          "EN",
          "TEST",
        ]}
        schPinArrangement={{
          leftSide: [signal1, signal2, "VCC", "GND"],
          rightSide: ["AUX1", "AUX2", "EN", "TEST"],
        }}
        schWidth="1.8mm"
        schHeight="1mm"
        footprint={<ControllerFootprint />}
        pcbX={4}
        pcbY={0}
        schX={2}
        schY={0}
      />
      <capacitor
        name="C1"
        capacitance="100nF"
        maxVoltageRating={powerVoltage}
        footprint="0402"
        pcbX={11}
        pcbY={5}
        schX={8}
        schY={4}
        schOrientation="vertical"
        pinAttributes={{
          pin1: { requiresPower: true },
          pin2: { requiresGround: true },
        }}
      />
      {interfaceKind === "i2c" && (
        <>
          <resistor
            name="R1"
            resistance="4.7k"
            tolerance="1%"
            footprint="0402"
            pcbX={-4}
            pcbY={5}
            schX={-3}
            schY={4}
          />
          <resistor
            name="R2"
            resistance="4.7k"
            tolerance="1%"
            footprint="0402"
            pcbX={-4}
            pcbY={-5}
            schX={-3}
            schY={-4}
          />
        </>
      )}
      {interfaceKind === "uart" && (
        <>
          <resistor
            name="R1"
            resistance="1k"
            tolerance="1%"
            footprint="0402"
            pcbX={-4}
            pcbY={5}
            schX={-3}
            schY={4}
          />
          <resistor
            name="R2"
            resistance="1k"
            tolerance="1%"
            footprint="0402"
            pcbX={-4}
            pcbY={-5}
            schX={-3}
            schY={-4}
          />
        </>
      )}
      {(interfaceKind === "analog" || interfaceKind === "digital") && (
        <>
          <resistor
            name="R1"
            resistance={detailKind === "actuator" ? "1k" : "10k"}
            tolerance="1%"
            footprint="0402"
            pcbX={-4}
            pcbY={5}
            schX={-3}
            schY={4}
          />
          {detailKind === "actuator" && (
            <resistor
              name={ledResistorName}
              resistance="1k"
              tolerance="1%"
              footprint="0402"
              pcbX={8}
              pcbY={-5}
              schX={6.55}
              schY={-4}
              schRotation={180}
            />
          )}
        </>
      )}
      {detailKind === "actuator" && signal2IsActive && (
        <resistor
          name={ledResistorName}
          resistance="1k"
          tolerance="1%"
          footprint="0402"
          pcbX={8}
          pcbY={-5}
          schX={6.55}
          schY={-4}
          schRotation={180}
        />
      )}
      {detailKind === "actuator" && (
        <led
          name="D1"
          color="green"
          footprint="0603"
          pcbX={11}
          pcbY={-5}
          schX={8.45}
          schY={-4}
          schRotation={180}
          pinAttributes={{
            anode: { mustBeConnected: true },
            cathode: { mustBeConnected: true },
          }}
        />
      )}
      <trace from={`J1.${signal1}`} to="U1.pin1" />
      {signal2IsActive ? (
        <trace from={`J1.${signal2}`} to="U1.pin2" />
      ) : null}
      <trace from="J1.VCC" to="U1.pin3" />
      <trace from="J1.GND" to="U1.pin4" />
      <trace from="J1.VCC" to="C1.pin1" />
      <trace from="C1.pin2" to="J1.GND" />
      {interfaceKind === "i2c" && (
        <>
          <trace from="J1.VCC" to="R1.pin1" />
          <trace from="R1.pin2" to="J1.SCL" />
          <trace from="J1.VCC" to="R2.pin1" />
          <trace from="R2.pin2" to="J1.SDA" />
        </>
      )}
      {interfaceKind === "uart" && (
        <>
          <trace from="J1.RX" to="R1.pin1" />
          <trace from="R1.pin2" to="U1.pin1" />
          <trace from="J1.TX" to="R2.pin1" />
          <trace from="R2.pin2" to="U1.pin2" />
        </>
      )}
      {(interfaceKind === "analog" || interfaceKind === "digital") && (
        <>
          <trace from={`J1.${signal1}`} to="R1.pin1" />
          <trace from="R1.pin2" to="J1.GND" />
        </>
      )}
      {detailKind === "actuator" && (
        <>
          <trace from="J1.VCC" to="D1.anode" />
          <trace from="D1.cathode" to={`${ledResistorName}.pin1`} />
          <trace from={`${ledResistorName}.pin2`} to="J1.GND" />
        </>
      )}
      <silkscreentext text={boardLabel} pcbX={0} pcbY={8.5} fontSize="0.7mm" />
      <silkscreentext text={compactLabel(profile.category)} pcbX={0} pcbY={-8.5} fontSize="0.65mm" />
    </board>
  )
}
