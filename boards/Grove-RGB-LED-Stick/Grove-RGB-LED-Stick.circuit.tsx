import { GroveConnector } from "../_shared/GroveParts"
import { Fragment } from "react"

const Ws2813Mini = ({ name, pcbX, schX, isLast }: { name: string; pcbX: number; schX: number; isLast?: boolean }) => (
  <chip
    name={name}
    displayName={name}
    pinLabels={{ pin1: "VDD", pin2: "DO", pin3: "GND", pin4: "DIN", pin5: "BIN", pin6: "VCC" }}
    pinAttributes={{
      VDD: { requiresPower: true, mustBeConnected: true },
      DO: isLast ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true },
      GND: { requiresGround: true, mustBeConnected: true },
      DIN: { mustBeConnected: true, isGpio: true },
      BIN: { mustBeConnected: true, isGpio: true },
      VCC: { requiresPower: true, mustBeConnected: true },
    }}
    footprint={
      <footprint>
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={-1.7} pcbY={1.3} portHints={["pin1"]} />
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={-1.7} pcbY={0} portHints={["pin2"]} />
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={-1.7} pcbY={-1.3} portHints={["pin3"]} />
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={1.7} pcbY={-1.3} portHints={["pin4"]} />
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={1.7} pcbY={0} portHints={["pin5"]} />
        <smtpad shape="rect" width="0.7mm" height="1mm" pcbX={1.7} pcbY={1.3} portHints={["pin6"]} />
        <silkscreenrect width="3.5mm" height="3.5mm" stroke="solid" strokeWidth="0.15mm" filled={false} />
      </footprint>
    }
    connections={{ VDD: "net.VCC_RGB", VCC: `net.${name}_VCC`, GND: "net.GND" }}
    pcbX={pcbX}
    pcbY={0}
    schX={schX}
    schY={0}
    schPinArrangement={{
      leftSide: ["DIN", "BIN", "VDD", "VCC"],
      rightSide: ["DO", "GND"],
    }}
    schWidth="1.2mm"
    schHeight="0.6mm"
  />
)

const ledPositions = [-27, -21, -15, -9, -3, 3, 9, 15, 21, 27]
const getLedSchX = (index: number) => index * 4 - 8

export const GroveRgbLedStick = () => (
  <board name="GroveRgbLedStick" title="Grove - RGB LED Stick (10 WS2813 Mini)" width="80mm" height="10mm" borderRadius="2mm" solderMaskColor="blue">
    <net name="VCC_RGB" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="LED1_VCC" />
    <net name="LED2_VCC" />
    <net name="LED3_VCC" />
    <net name="LED4_VCC" />
    <net name="LED5_VCC" />
    <net name="LED6_VCC" />
    <net name="LED7_VCC" />
    <net name="LED8_VCC" />
    <net name="LED9_VCC" />
    <net name="LED10_VCC" />
    <GroveConnector pcbX={-35} pcbY={0} pcbRotation={-90} schX={-14} schY={0} />
    {ledPositions.map((pcbX, index) => (
      <Ws2813Mini key={`LED${index + 1}`} name={`LED${index + 1}`} pcbX={pcbX} schX={getLedSchX(index)} isLast={index === ledPositions.length - 1} />
    ))}
    {ledPositions.map((pcbX, index) => (
      <capacitor key={`C${index + 1}`} name={`C${index + 1}`} capacitance="100nF" footprint="0402" connections={{ pin1: `net.LED${index + 1}_VCC`, pin2: "net.GND" }} pcbX={pcbX} pcbY={3.3} schX={getLedSchX(index)} schY={4} schOrientation="vertical" />
    ))}
    {ledPositions.map((pcbX, index) => (
      <resistor key={`R${index + 1}`} name={`R${index + 1}`} resistance="200" footprint="0402" connections={{ pin1: "net.VCC_RGB", pin2: `net.LED${index + 1}_VCC` }} pcbX={pcbX} pcbY={-3.3} schX={getLedSchX(index)} schY={-4} />
    ))}
    <resistor name="RIN" resistance="220" footprint="0402" pcbX={-30.5} pcbY={-3.2} schX={-10.8} schY={-4} />
    <capacitor name="CIN" capacitance="10uF" footprint="0805" connections={{ pin1: "net.VCC_RGB", pin2: "net.GND" }} pcbX={33} pcbY={2} schX={32} schY={4} schOrientation="vertical" />
    <capacitor name="CBULK" capacitance="220uF" footprint="1206" connections={{ pin1: "net.VCC_RGB", pin2: "net.GND" }} pcbX={35} pcbY={-2} schX={34} schY={4} schOrientation="vertical" />
    <trace from="J1.SIG" to="RIN.pin1" />
    <trace from="J1.VCC" to="net.VCC_RGB" />
    <trace from="J1.GND" to="net.GND" />
    <trace from="RIN.pin2" to="LED1.DIN" />
    <trace from="RIN.pin2" to="LED1.BIN" />
    {ledPositions.slice(0, -1).map((_, index) => (
      <Fragment key={`data-${index}`}>
        <trace name={`DATA_${index + 1}_${index + 2}`} from={`LED${index + 1}.DO`} to={`LED${index + 2}.DIN`} />
      </Fragment>
    ))}
    {ledPositions.slice(0, -1).map((_, index) => (
      <Fragment key={`backup-${index}`}>
        <trace name={`BACKUP_${index + 2}`} from={index === 0 ? "LED1.DIN" : `LED${index}.DO`} to={`LED${index + 2}.BIN`} />
      </Fragment>
    ))}
    <silkscreentext text="RGB LED STICK · 10 × WS2813-MINI" pcbX={0} pcbY={4.2} fontSize="0.55mm" />
  </board>
)

export default GroveRgbLedStick
