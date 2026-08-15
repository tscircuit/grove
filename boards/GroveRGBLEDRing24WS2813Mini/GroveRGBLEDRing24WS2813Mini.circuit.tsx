import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveRGBLEDRing24WS2813Mini = () => (
  <board name={"GroveRGBLEDRing24WS2813Mini"} title={"Grove RGB LED Ring 24 WS2813 Mini"} width={"79mm"} height={"79mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm" routingDisabled={true}>
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
    <GroveMountingHoles x={35.5} y={36.5} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C965558", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-33.5} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 24 }, (_, index) => {
      const name = `PIX${index + 1}`
      const angle = (index / 24) * Math.PI * 2 - Math.PI / 2
      const x = 3 + Math.cos(angle) * 31.5
      const y = Math.sin(angle) * 31.5
      const capX = x - Math.cos(angle) * 8
      const capY = y - Math.sin(angle) * 8
      return <Fragment key={name}>
        {/* JLCPCB footprint import: footprint="jlcpcb:C965558" */}<chip name={name} displayName={"WS2813"} manufacturerPartNumber={"WS2813"} supplierPartNumbers={{ jlcpcb: ["C965558"] }} footprint={<footprint><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={1.6} portHints={["pin1"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={-1.6} portHints={["pin3"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={-1.6} portHints={["pin4"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={0} portHints={["pin5"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={1.6} portHints={["pin6"]} /><silkscreenrect width="6.5mm" height="5.5mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pinLabels={{ pin1: "BI", pin2: "VCC", pin3: "DOUT", pin4: "DIN", pin5: "GND", pin6: "BO" }} pinAttributes={{ BI: { doNotConnect: true }, VCC: index === 0 ? { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } : { doNotConnect: true }, DOUT: { doNotConnect: true }, DIN: index === 0 ? { mustBeConnected: true, isGpio: true } : { doNotConnect: true }, GND: index === 0 ? { requiresGround: true, mustBeConnected: true } : { doNotConnect: true }, BO: { doNotConnect: true } }} connections={index === 0 ? { VCC: "net.VCC", GND: "net.GND", DIN: "net.SIG" } : {}} noConnect={index === 0 ? ["BI", "DOUT", "BO"] : ["BI", "VCC", "DIN", "DOUT", "GND", "BO"]} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.2mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["BI", "VCC", "DOUT"], rightSide: ["DIN", "GND", "BO"] }} />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" maxDecouplingTraceLength={158 + "mm"} pcbX={capX} pcbY={capY} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
      </Fragment>
    })}
    <trace name="DATA_IN" path={["J1.SIG","PIX1.DIN"]} />
    <silkscreentext text={"RGB LED Ring 24 WS2813 Mini"} pcbX={0} pcbY={38} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-38} fontSize="0.45mm" />
  </board>
)

export { GroveRGBLEDRing24WS2813Mini }
export default GroveRGBLEDRing24WS2813Mini
