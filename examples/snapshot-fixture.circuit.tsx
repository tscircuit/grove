export const SnapshotFixture = () => (
  <board name="SnapshotFixture" width="20mm" height="20mm">
    <resistor
      name="R1"
      resistance="1k"
      footprint="0402"
      pcbX={-2}
      pcbY={0}
      schX={-2}
      schY={0}
    />
    <capacitor
      name="C1"
      capacitance="1uF"
      footprint="0402"
      pcbX={2}
      pcbY={0}
      schX={2}
      schY={0}
    />
    <trace name="LOOP_A" from="R1.pin1" to="C1.pin1" />
    <trace name="LOOP_B" from="R1.pin2" to="C1.pin2" />
  </board>
)

export default SnapshotFixture
