import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveLEDBarV20 = () => (
  <board name={"GroveLEDBarV20"} title={"Grove LED Bar v2 0"} width={"72mm"} height={"16mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="RX_MCU" />
    <net name="TX_MCU" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <net name="LOAD_NEG" />
    <GroveMountingHoles x={32} y={7} />
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-30} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 2 }, (_, index) => {
      const name = `PIX${index + 1}`
      const angle = (index / 2) * Math.PI * 2 - Math.PI / 2
      const x = -24 + index * 6
      const y = 0
      const capX = x
      const capY = y + 4
      return <Fragment key={name}>
        <chip name={name} displayName={"MY9221"} manufacturerPartNumber={"MY9221"} pinLabels={{ pin1: "DIN", pin2: "DOUT", pin3: "VCC", pin4: "GND" }} pinAttributes={{ DIN: index === 0 ? { mustBeConnected: true, isGpio: true } : { doNotConnect: true }, DOUT: { doNotConnect: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true } }} connections={index === 0 ? { VCC: "net.VCC", GND: "net.GND", DIN: "net.SIG" } : { VCC: "net.VCC", GND: "net.GND" }} noConnect={index === 0 ? ["DOUT"] : ["DIN", "DOUT"]} footprint={<footprint><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={-1.3} portHints={["pin1"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={-1.7} pcbY={1.3} portHints={["pin3"]} /><smtpad shape="rect" width="0.8mm" height="0.9mm" pcbX={1.7} pcbY={1.3} portHints={["pin4"]} /><silkscreenrect width="3.8mm" height="3.8mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.2mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["DIN", "VCC"], rightSide: ["DOUT", "GND"] }} />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" maxDecouplingTraceLength={144 + "mm"} connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={capX} pcbY={capY} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
      </Fragment>
    })}
    <trace name="DATA_IN" path={["J1.SIG","PIX1.DIN"]} />
    <trace name="LED_VCC_RAIL" path={["J1.VCC","PIX1.VCC","C1.pin1","PIX2.VCC","C2.pin1"]} />
    <trace name="LED_GND_RAIL" path={["J1.GND","PIX1.GND","C1.pin2","PIX2.GND","C2.pin2"]} />
    <silkscreentext text={"LED Bar v2 0"} pcbX={0} pcbY={6.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-6.5} fontSize="0.45mm" />
  </board>
)

export { GroveLEDBarV20 }
export default GroveLEDBarV20
