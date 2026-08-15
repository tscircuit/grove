import { GroveMountingHoles } from "../_shared/GroveParts"
import { HandAuthoredFootprint } from "../_shared/HandAuthoredParts"

const packages: any = {"2.0_1X4":{"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":-1.8,"y2":-2.2},{"kind":"line","x1":-1.8,"y1":-2.2,"x2":1.8,"y2":-2.2},{"kind":"line","x1":1.8,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]},"SOT23":{"pads":[{"name":"3","kind":"smd","x":0,"y":1.016,"width":1.016,"height":1.143,"shape":"rect","rotation":0,"layer":"top"},{"name":"2","kind":"smd","x":0.889,"y":-1.016,"width":1.016,"height":1.143,"shape":"rect","rotation":0,"layer":"top"},{"name":"1","kind":"smd","x":-0.889,"y":-1.016,"width":1.016,"height":1.143,"shape":"rect","rotation":180,"layer":"top"}],"graphics":[{"kind":"line","x1":-0.1905,"y1":-0.635,"x2":0.1905,"y2":-0.635},{"kind":"line","x1":1.4605,"y1":-0.254,"x2":1.4605,"y2":0.635},{"kind":"line","x1":1.4605,"y1":0.635,"x2":0.6985,"y2":0.635},{"kind":"line","x1":-0.6985,"y1":0.635,"x2":-1.4605,"y2":0.635},{"kind":"line","x1":-1.4605,"y1":0.635,"x2":-1.4605,"y2":-0.254}]},"R0603":{"pads":[{"name":"1","kind":"smd","x":-0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"},{"name":"2","kind":"smd","x":0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"}],"graphics":[{"kind":"line","x1":-1.397,"y1":0.635,"x2":1.397,"y2":0.635},{"kind":"line","x1":1.397,"y1":0.635,"x2":1.397,"y2":-0.635},{"kind":"line","x1":1.397,"y1":-0.635,"x2":-1.397,"y2":-0.635},{"kind":"line","x1":-1.397,"y1":-0.635,"x2":-1.397,"y2":0.635}]},"2P-7.6-D12X6.5H":{"pads":[{"name":"+","kind":"platedhole","x":-3.8,"y":0,"drill":0.9,"diameter":1.5,"shape":"round","rotation":0},{"name":"-","kind":"platedhole","x":3.8,"y":0,"drill":0.9,"diameter":1.5,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-4.445,"y1":1.905,"x2":-3.81,"y2":1.905},{"kind":"line","x1":-3.175,"y1":1.905,"x2":-3.81,"y2":1.905},{"kind":"line","x1":-3.81,"y1":1.905,"x2":-3.81,"y2":2.54},{"kind":"line","x1":-3.81,"y1":1.905,"x2":-3.81,"y2":1.27},{"kind":"circle","x":0,"y":0,"radius":6},{"kind":"circle","x":0,"y":0,"radius":1.3}]}}
const components: any[] = [{"name":"Q1","kind":"chip","display":"S9013","mpn":"S9013","package":"SOT23","pins":["3","2","1"],"connections":{"P2":"net.GND","P3":"net.N_2","P1":"net.DRI"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"requiresGround":true,"mustBeConnected":true},"P3":{"mustBeConnected":true}},"x":-4.445,"y":7.62,"rotation":270,"mirrored":false},{"name":"R1","kind":"R","display":"1K","mpn":"RC0603FR-071KL","package":"R0603","pins":["1","2"],"connections":{"pin1":"net.D1","pin2":"net.N_2"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":-7.62,"y":7.62,"rotation":90,"mirrored":false},{"name":"BUZ1","kind":"chip","display":"YMD12065","mpn":"YMD12065","package":"2P-7.6-D12X6.5H","pins":["+","-"],"connections":{"P1":"net.VCC","P2":"net.DRI"},"pinAttributes":{"P1":{"requiresPower":true,"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":2.54,"y":0,"rotation":90,"mirrored":false}]
const signals: any[] = [{"name":"GND","originalName":"GND","refs":["J1.pin4","Q1.P2"]},{"name":"VCC","originalName":"VCC","refs":["J1.pin3","BUZ1.P1"]},{"name":"D1","originalName":"D1","refs":["R1.pin1","J1.pin1"]},{"name":"N_2","originalName":"N$2","refs":["R1.pin2","Q1.P3"]},{"name":"DRI","originalName":"DRI","refs":["Q1.P1","BUZ1.P2"]}]
const connectorPads: any[] = {"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":-1.8,"y2":-2.2},{"kind":"line","x1":-1.8,"y1":-2.2,"x2":1.8,"y2":-2.2},{"kind":"line","x1":1.8,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]}.pads
const connectorLabels: string[] = ["D1","NC","VCC","GND"]

const GrovePassiveBuzzer = () => (
  <board
    name={"GrovePassiveBuzzer"}
    title={"Grove - Passive Buzzer"}
    width={"26.2mm"}
    height={"22mm"}
    borderRadius="1mm"
    solderMaskColor="blue"
    routingDisabled={false}
  >
    {signals.map((signal) => <net name={signal.name} isPowerNet={/^(?:VCC|VDD|VIN|3V3|5V|2V5)/i.test(signal.originalName)} isGroundNet={/^GND/i.test(signal.originalName)} />)}
    <GroveMountingHoles x={10} y={8} />
    <jumper
      name="J1"
      displayName="Grove 4-pin"
      manufacturerPartNumber="B4B-PH-K-S"
      pinLabels={Object.fromEntries(connectorLabels.map((label, index) => ["pin" + (index + 1), label]))}
      pinAttributes={Object.fromEntries(connectorLabels.map((label) => [label, /^GND/i.test(label) ? { requiresGround: true, mustBeConnected: true } : /^(?:VCC|VDD|VIN|3V3|5V)/i.test(label) ? { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } : /^NC/i.test(label) ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }]))}
      connections={Object.fromEntries(signals.flatMap((signal: any) => signal.refs.filter((ref: any) => ref.startsWith("J1.")).map((ref: any) => [ref.replace("J1.", "") , "net." + signal.name] )))}
      footprint={<HandAuthoredFootprint name="J1" pads={connectorPads} excludePadNames={["SS1", "SS2"]} />}
      pcbX={-6.35}
      pcbY={0}
      pcbRotation={270}
      schX={-10}
      schY={0}
      schPinArrangement={{ rightSide: [...connectorLabels] }}
      schDirection="right"
    />
    {components.map((component, index) => {
      const footprint = <HandAuthoredFootprint name={component.name} pads={packages[component.package as keyof typeof packages].pads} graphics={packages[component.package as keyof typeof packages].graphics} />
      const common: any = { name: component.name, displayName: component.display, manufacturerPartNumber: component.mpn, footprint, pcbX: component.x, pcbY: component.y, pcbRotation: component.rotation, layer: component.mirrored ? "bottom" : "top", schX: -5 + (index % 4) * 3.6, schY: (Math.floor(index / 4) - 1) * 4.2, connections: component.connections, pinAttributes: component.pinAttributes }
      if (component.kind === "R") return <resistor {...common} resistance={component.display} />
      if (component.kind === "C") return <capacitor {...common} capacitance={component.display} schOrientation="vertical" />
      if (component.kind === "L") return <inductor {...common} inductance={component.display} />
      if (component.kind === "D") return <diode {...common} pinLabels={{ pin1: "anode", pin2: "cathode" }} />
      if (component.kind === "LED") return <led {...common} color={/green/i.test(component.display) ? "green" : /blue/i.test(component.display) ? "blue" : /yellow/i.test(component.display) ? "yellow" : "red"} pinLabels={{ pin1: "anode", pin2: "cathode" }} />
      return <chip {...common} pinLabels={Object.fromEntries(component.pins.map((_: any, pinIndex: number) => ["pin" + (pinIndex + 1), "P" + (pinIndex + 1)]))} noConnect={component.pins.filter((_: any, pinIndex: number) => component.pinAttributes["P" + (pinIndex + 1)]?.doNotConnect).map((_: any, pinIndex: number) => "pin" + (pinIndex + 1))} schPinArrangement={{ leftSide: component.pins.slice(0, Math.ceil(component.pins.length / 2)).map((_: any, pinIndex: number) => "P" + (pinIndex + 1)), rightSide: component.pins.slice(Math.ceil(component.pins.length / 2)).map((_: any, pinIndex: number) => "P" + (pinIndex + Math.ceil(component.pins.length / 2) + 1)) }} />
    })}
    {signals.map((signal) => signal.refs.length >= 2 ? <trace name={"SRC_" + signal.name} path={[...signal.refs]} /> : null)}
    <silkscreentext text={"Passive Buzzer"} pcbX={0} pcbY={9.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED NETLIST" pcbX={0} pcbY={-9.5} fontSize="0.45mm" />
  </board>
)

export { GrovePassiveBuzzer }
export default GrovePassiveBuzzer
