import { Fragment } from "react"
import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

const Grove4Channel16BitADCADS1115 = () => (
  <board name={"Grove4Channel16BitADCADS1115"} title={"Grove - 4-Channel 16-bit ADC(ADS1115)"} width={"110mm"} height={"16mm"} borderRadius="1mm" solderMaskColor="blue" routingDisabled={true}>
    <net name="VCC" isPowerNet />
    <net name="VDD" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="SCL" />
    <net name="SDA" />
    <net name="RX" />
    <net name="TX" />
    <net name="SIG" />
    <net name="STATUS" />
    <net name="EMITTER" />
    <GroveMountingHoles x={51} y={7} />
    <GroveConnector kind="i2c" powerVoltage={"5V"} pcbX={-49} pcbY={0} pcbRotation={-90} schX={-10} schY={0} />
    {Array.from({ length: 16 }, (_, index) => {
      const name = `LED${index + 1}`
      const x = /ring/i.test("Grove - 4-Channel 16-bit ADC(ADS1115)") ? 3 + Math.cos((index / 16) * Math.PI * 2 - Math.PI / 2) * 3 : -43 + index * 6
      const y = /ring/i.test("Grove - 4-Channel 16-bit ADC(ADS1115)") ? Math.sin((index / 16) * Math.PI * 2 - Math.PI / 2) * 3 : 0
      return <Fragment key={name}>
        <chip name={name} displayName={"ADS1115"} manufacturerPartNumber={"ADS1115"} pinLabels={{ pin1: "DIN", pin2: "DOUT", pin3: "VCC", pin4: "GND" }} pinAttributes={{ DIN: { mustBeConnected: true, isGpio: true }, DOUT: index === 15 ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }, VCC: { requiresPower: true, requiresVoltage: "5V" }, GND: { requiresGround: true, mustBeConnected: true } }} noConnect={index === 15 ? ["DOUT"] : []} footprint={"led_5050"} pcbX={x} pcbY={y} schX={-7.8 + index * 2.2} schY={0} schWidth="1.6mm" schHeight="1mm" />
        <capacitor name={`C${index + 1}`} capacitance="100nF" manufacturerPartNumber="CC0603KRX7R9BB104" footprint="0603" connections={{ pin1: "net.VCC", pin2: "net.GND" }} pcbX={x} pcbY={y + 2.2} schX={-7.8 + index * 2.2} schY={4} schOrientation="vertical" />
        {index === 0 ? <trace name="DATA_IN" from="J1.SIG" to="LED1.DIN" /> : <trace name={`DATA_${index}_${index + 1}`} from={`LED${index}.DOUT`} to={`LED${index + 1}.DIN`} />}
        <trace name={`VCC_${index + 1}`} from={`LED${index + 1}.VCC`} to="J1.VCC" />
        <trace name={`GND_${index + 1}`} from={`LED${index + 1}.GND`} to="J1.GND" />
      </Fragment>
    })}
    <silkscreentext text={"4-Channel 16-bit ADC(ADS1115)"} pcbX={0} pcbY={6.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED" pcbX={0} pcbY={-6.5} fontSize="0.45mm" />
  </board>
)

export { Grove4Channel16BitADCADS1115 }
export default Grove4Channel16BitADCADS1115
