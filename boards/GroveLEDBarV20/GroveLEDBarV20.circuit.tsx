import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveLEDBarV20 = () => (
  <board name={"GroveLEDBarV20"} title={"Grove LED Bar v2 0"} width={"80mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={36} y={7} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C117051", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-34} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 2 }, (_, index) => {
      const name = `PIX${index + 1}`
      const angle = (index / 2) * Math.PI * 2 - Math.PI / 2
      const x = -28 + index * 7.5
      const y = 0
      const capX = x
      const capY = y + 6
      return <Fragment key={name}>
        {/* JLCPCB footprint import: footprint="jlcpcb:C7394039" */}<chip name={name} displayName={"MY9221"} manufacturerPartNumber={"MY9221"} supplierPartNumbers={{ jlcpcb: ["C7394039"] }} footprint={<footprint><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={1.6} portHints={["pin1"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={-1.6} portHints={["pin3"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={-1.6} portHints={["pin4"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={0} portHints={["pin5"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={1.6} portHints={["pin6"]} /><silkscreenrect width="6.5mm" height="5.5mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pinLabels={{ pin1: "BI", pin2: "VCC", pin3: "DOUT", pin4: "DIN", pin5: "GND", pin6: "BO" }} pinAttributes={{ BI: { doNotConnect: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, DOUT: { doNotConnect: true }, DIN: index === 0 ? { mustBeConnected: true, isGpio: true } : { doNotConnect: true }, GND: { requiresGround: true, mustBeConnected: true }, BO: { doNotConnect: true } }} connections={index === 0 ? { VCC: "net.VCC", GND: "net.GND", DIN: "net.SIG" } : { VCC: "net.VCC", GND: "net.GND" }} noConnect={index === 0 ? ["BI", "DOUT", "BO"] : ["BI", "DIN", "DOUT", "BO"]} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.2mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["BI", "VCC", "DOUT"], rightSide: ["DIN", "GND", "BO"] }} />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} maxDecouplingTraceLength={160 + "mm"} pcbX={capX} pcbY={capY} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
      </Fragment>
    })}
    <trace name="DATA_IN" path={["J1.SIG","PIX1.DIN"]} />
    <trace name="LED_VCC_RAIL" path={["J1.VCC","PIX1.VCC","C1.pin1","PIX2.VCC","C2.pin1"]} />
    <trace name="LED_GND_RAIL" path={["J1.GND","PIX1.GND","C1.pin2","PIX2.GND","C2.pin2"]} />
    <silkscreentext text={"LED Bar v2 0"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveLEDBarV20 }
export default GroveLEDBarV20
