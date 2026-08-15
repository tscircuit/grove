import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const GroveRGBLEDRing16WS2813Mini = () => (
  <board name={"GroveRGBLEDRing16WS2813Mini"} title={"Grove RGB LED Ring 16 WS2813 Mini"} width={"48mm"} height={"48mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={true}>
    <net name="VCC" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={20} y={21} />
    <GroveConnector kind="analog" powerVoltage={"5V"} pcbX={-18} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 16 }, (_, index) => {
      const name = `LED${index + 1}`
      const x = /ring/i.test("Grove RGB LED Ring 16 WS2813 Mini") ? 3 + Math.cos((index / 16) * Math.PI * 2 - Math.PI / 2) * 19 : -12 + index * 6
      const y = /ring/i.test("Grove RGB LED Ring 16 WS2813 Mini") ? Math.sin((index / 16) * Math.PI * 2 - Math.PI / 2) * 19 : 0
      return <Fragment key={name}>
        <chip name={name} displayName={"WS2813"} manufacturerPartNumber={"WS2813"} pinLabels={{ pin1: "DIN", pin2: "DOUT", pin3: "VCC", pin4: "GND" }} pinAttributes={{ DIN: { mustBeConnected: true, isGpio: true }, DOUT: index === 15 ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, requiresVoltage: "5V" }, GND: { requiresGround: true, mustBeConnected: true } }} noConnect={index === 15 ? ["DOUT"] : []} footprint={"led_5050"} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.6mm" schHeight="1mm" />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={x} pcbY={y + 2.2} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
        {index === 0 ? <trace name="DATA_IN" from="J1.SIG" to="LED1.DIN" /> : <trace name={`DATA_${index}_${index + 1}`} from={`LED${index}.DOUT`} to={`LED${index + 1}.DIN`} />}
        <trace name={`VCC_${index + 1}`} from={`LED${index + 1}.VCC`} to="J1.VCC" />
        <trace name={`GND_${index + 1}`} from={`LED${index + 1}.GND`} to="J1.GND" />
      </Fragment>
    })}
    <silkscreentext text={"RGB LED Ring 16 WS2813 Mini"} pcbX={0} pcbY={22.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-22.5} fontSize="0.45mm" />
  </board>
)

export { GroveRGBLEDRing16WS2813Mini }
export default GroveRGBLEDRing16WS2813Mini
