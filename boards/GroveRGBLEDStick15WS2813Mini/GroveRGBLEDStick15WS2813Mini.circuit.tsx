import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveRGBLEDStick15WS2813Mini = () => (
  <board name={"GroveRGBLEDStick15WS2813Mini"} title={"Grove RGB LED Stick 15 WS2813 Mini"} width={"126.5mm"} height={"20mm"} borderRadius="1mm" solderMaskColor="blue" minViaEdgeToPadEdgeClearance="0.2mm" minViaPadDiameter="0.25mm">
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
    <GroveMountingHoles x={59.25} y={7} />
    {/* JLCPCB footprint imports: footprint="jlcpcb:C965558", footprint="jlcpcb:C131334", footprint="jlcpcb:C14663" */}
    <GroveConnector kind="analog" powerVoltage={"5V"} connectToNets pcbX={-57.25} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 15 }, (_, index) => {
      const name = `PIX${index + 1}`
      const angle = (index / 15) * Math.PI * 2 - Math.PI / 2
      const x = -51.25 + index * 7.5
      const y = 0
      const capX = x
      const capY = y + 6
      return <Fragment key={name}>
        {/* JLCPCB footprint import: footprint="jlcpcb:C965558" */}<chip name={name} displayName={"WS2813"} manufacturerPartNumber={"WS2813"} supplierPartNumbers={{ jlcpcb: ["C965558"] }} footprint={<footprint><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={1.6} portHints={["pin1"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={0} portHints={["pin2"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={-2.4} pcbY={-1.6} portHints={["pin3"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={-1.6} portHints={["pin4"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={0} portHints={["pin5"]} /><smtpad shape="rect" width="1.5mm" height="1mm" pcbX={2.4} pcbY={1.6} portHints={["pin6"]} /><silkscreenrect width="6.5mm" height="5.5mm" stroke="solid" strokeWidth="0.15mm" filled={false} /></footprint>} pinLabels={{ pin1: "BI", pin2: "VCC", pin3: "DOUT", pin4: "DIN", pin5: "GND", pin6: "BO" }} pinAttributes={{ BI: { doNotConnect: true }, VCC: { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true }, DOUT: { doNotConnect: true }, DIN: index === 0 ? { mustBeConnected: true, isGpio: true } : { doNotConnect: true }, GND: { requiresGround: true, mustBeConnected: true }, BO: { doNotConnect: true } }} connections={index === 0 ? { VCC: "net.VCC", GND: "net.GND", DIN: "net.SIG" } : { VCC: "net.VCC", GND: "net.GND" }} noConnect={index === 0 ? ["BI", "DOUT", "BO"] : ["BI", "DIN", "DOUT", "BO"]} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.2mm" schHeight="0.4mm" schPinArrangement={{ leftSide: ["BI", "VCC", "DOUT"], rightSide: ["DIN", "GND", "BO"] }} />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" supplierPartNumbers={{ jlcpcb: ["C14663"] }} footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} maxDecouplingTraceLength={253 + "mm"} pcbX={capX} pcbY={capY} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
      </Fragment>
    })}
    <trace name="DATA_IN" path={["J1.SIG","PIX1.DIN"]} />
    <trace name="LED_VCC_RAIL" path={["J1.VCC","PIX1.VCC","C1.pin1","PIX2.VCC","C2.pin1","PIX3.VCC","C3.pin1","PIX4.VCC","C4.pin1","PIX5.VCC","C5.pin1","PIX6.VCC","C6.pin1","PIX7.VCC","C7.pin1","PIX8.VCC","C8.pin1","PIX9.VCC","C9.pin1","PIX10.VCC","C10.pin1","PIX11.VCC","C11.pin1","PIX12.VCC","C12.pin1","PIX13.VCC","C13.pin1","PIX14.VCC","C14.pin1","PIX15.VCC","C15.pin1"]} />
    <trace name="LED_GND_RAIL" path={["J1.GND","PIX1.GND","C1.pin2","PIX2.GND","C2.pin2","PIX3.GND","C3.pin2","PIX4.GND","C4.pin2","PIX5.GND","C5.pin2","PIX6.GND","C6.pin2","PIX7.GND","C7.pin2","PIX8.GND","C8.pin2","PIX9.GND","C9.pin2","PIX10.GND","C10.pin2","PIX11.GND","C11.pin2","PIX12.GND","C12.pin2","PIX13.GND","C13.pin2","PIX14.GND","C14.pin2","PIX15.GND","C15.pin2"]} />
    <silkscreentext text={"RGB LED Stick 15 WS2813 Mini"} pcbX={0} pcbY={8.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-8.5} fontSize="0.45mm" />
  </board>
)

export { GroveRGBLEDStick15WS2813Mini }
export default GroveRGBLEDStick15WS2813Mini
