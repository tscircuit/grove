import { GroveMountingHoles } from "../_shared/GroveParts"
import { HandAuthoredFootprint } from "../_shared/HandAuthoredParts"

const packages: any = {"4P-D9.4-7.5H":{"pads":[{"name":"1","kind":"platedhole","x":1.55,"y":-1.55,"drill":0.9,"diameter":1.6,"shape":"round","rotation":0},{"name":"2","kind":"platedhole","x":-1.55,"y":-1.55,"drill":0.9,"diameter":1.6,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1.55,"y":1.55,"drill":0.9,"diameter":1.6,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":-1.55,"y":1.498,"drill":0.9,"diameter":1.6,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-0.508,"y1":-4.699,"x2":-0.508,"y2":-5.715},{"kind":"line","x1":-0.508,"y1":-5.715,"x2":0.508,"y2":-5.715},{"kind":"line","x1":0.508,"y1":-5.715,"x2":0.508,"y2":-4.699},{"kind":"circle","x":0,"y":0,"radius":4},{"kind":"circle","x":0,"y":0,"radius":4.7}]},"4P-2.0":{"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]},"3P-SQUA-7X6.8":{"pads":[{"name":"1","kind":"platedhole","x":-2.54,"y":-0.25,"drill":0.8,"diameter":1.35,"shape":"round","rotation":0},{"name":"2","kind":"platedhole","x":2.54,"y":-0.25,"drill":0.8,"diameter":1.35,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":0,"y":2.25,"drill":0.8,"diameter":1.35,"shape":"square","rotation":0}],"graphics":[{"kind":"line","x1":-3.4,"y1":3.5,"x2":3.4,"y2":3.5},{"kind":"line","x1":3.4,"y1":3.5,"x2":3.4,"y2":-3.5},{"kind":"line","x1":3.4,"y1":-3.5,"x2":-3.4,"y2":-3.5},{"kind":"line","x1":-3.4,"y1":-3.5,"x2":-3.4,"y2":3.5}]},"C0603":{"pads":[{"name":"1","kind":"smd","x":-0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"},{"name":"2","kind":"smd","x":0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"}],"graphics":[{"kind":"line","x1":-1.397,"y1":0.635,"x2":1.397,"y2":0.635},{"kind":"line","x1":1.397,"y1":0.635,"x2":1.397,"y2":-0.635},{"kind":"line","x1":1.397,"y1":-0.635,"x2":-1.397,"y2":-0.635},{"kind":"line","x1":-1.397,"y1":-0.635,"x2":-1.397,"y2":0.635}]}}
const components: any[] = [{"name":"U1","kind":"chip","display":"WSP2110","mpn":"WSP2110","package":"4P-D9.4-7.5H","pins":["1","2","3","4"],"connections":{"P4":"net.SIG","P1":"net.VCC","P3":"net.VCC","P2":"net.GND"},"pinAttributes":{"P1":{"requiresPower":true,"mustBeConnected":true},"P2":{"requiresGround":true,"mustBeConnected":true},"P3":{"requiresPower":true,"mustBeConnected":true},"P4":{"mustBeConnected":true}},"x":-35.555,"y":35.56,"rotation":270,"mirrored":false},{"name":"R1","kind":"R","display":"10K","mpn":"RC0603FR-0710KL","package":"3P-SQUA-7X6.8","pins":["1","2","3"],"connections":{"pin2":"net.SIG","pin1":"net.GND","pin3":"net.GND"},"pinAttributes":{"P1":{"requiresGround":true,"mustBeConnected":true},"P2":{"mustBeConnected":true},"P3":{"requiresGround":true,"mustBeConnected":true}},"x":-34.285,"y":45.72,"rotation":180,"mirrored":false},{"name":"C1","kind":"C","display":"100nF","mpn":"CC0603KRX7R9BB104","package":"C0603","pins":["1","2"],"connections":{"pin2":"net.VCC","pin1":"net.GND"},"pinAttributes":{"P1":{"requiresGround":true,"mustBeConnected":true},"P2":{"requiresPower":true,"mustBeConnected":true}},"x":-40.635,"y":41.275,"rotation":270,"mirrored":false}]
const signals: any[] = [{"name":"SIG","originalName":"SIG","refs":["J1.pin1","U1.P4","R1.pin2"]},{"name":"VCC","originalName":"VCC","refs":["J1.pin3","U1.P1","U1.P3","C1.pin2"]},{"name":"GND","originalName":"GND","refs":["J1.pin4","U1.P2","R1.pin1","R1.pin3","C1.pin1"]}]
const connectorPads: any[] = {"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]}.pads
const connectorLabels: string[] = ["SIG","NC","VCC","GND"]

const GroveFormaldehydeSensor = () => (
  <board
    name={"GroveFormaldehydeSensor"}
    title={"Grove - Formaldehyde sensor"}
    width={"102mm"}
    height={"106.21mm"}
    borderRadius="1mm"
    solderMaskColor="blue"
    routingDisabled={false}
  >
    {signals.map((signal) => <net name={signal.name} isPowerNet={/^(?:VCC|VDD|VIN|3V3|5V|2V5)/i.test(signal.originalName)} isGroundNet={/^GND/i.test(signal.originalName)} />)}
    <GroveMountingHoles x={47} y={50.105} />
    <jumper
      name="J1"
      displayName="Grove 4-pin"
      manufacturerPartNumber="B4B-PH-K-S"
      pinLabels={Object.fromEntries(connectorLabels.map((label, index) => ["pin" + (index + 1), label]))}
      pinAttributes={Object.fromEntries(connectorLabels.map((label) => [label, /^GND/i.test(label) ? { requiresGround: true, mustBeConnected: true } : /^(?:VCC|VDD|VIN|3V3|5V)/i.test(label) ? { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } : /^NC/i.test(label) ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }]))}
      connections={Object.fromEntries(signals.flatMap((signal: any) => signal.refs.filter((ref: any) => ref.startsWith("J1.")).map((ref: any) => [ref.replace("J1.", "") , "net." + signal.name] )))}
      footprint={<HandAuthoredFootprint name="J1" pads={connectorPads} excludePadNames={["SS1", "SS2"]} />}
      pcbX={-45.08}
      pcbY={40.005}
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
    <silkscreentext text={"Formaldehyde sensor"} pcbX={0} pcbY={51.605} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED NETLIST" pcbX={0} pcbY={-51.605} fontSize="0.45mm" />
  </board>
)

export { GroveFormaldehydeSensor }
export default GroveFormaldehydeSensor
