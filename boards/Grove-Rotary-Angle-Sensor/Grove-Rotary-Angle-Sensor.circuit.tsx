import { GroveConnector, GroveMountingHoles } from "../_shared/GroveParts"

export const GroveRotaryAngleSensor = () => (
  <board
    name="GroveRotaryAngleSensor"
    title="Grove - Rotary Angle Sensor v1.2"
    width="20mm"
    height="20mm"
    borderRadius="1mm"
    solderMaskColor="blue"
  >
    <GroveMountingHoles />
    <GroveConnector kind="analog" pcbX={0} pcbY={-6.6} schX={-5} schY={0} />
    <potentiometer
      name="ROTATION"
      displayName="WH09-2-103"
      manufacturerPartNumber="WH09-2-103"
      maxResistance="10k"
      pinVariant="three_pin"
      footprint="potentiometer_pth_9mm"
      pcbX={0}
      pcbY={2.5}
      schX={1.5}
      schY={0}
    />
    <trace from="J1.VCC" to="ROTATION.pin1" />
    <trace from="J1.GND" to="ROTATION.pin2" />
    <trace from="J1.SIG" to="ROTATION.pin3" />
    <silkscreentext text="ROTARY v1.2" pcbX={0} pcbY={7.2} fontSize="0.75mm" />
  </board>
)

export default GroveRotaryAngleSensor
