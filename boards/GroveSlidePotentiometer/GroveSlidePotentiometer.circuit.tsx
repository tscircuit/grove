import { GroveMountingHoles } from "../_shared/GroveParts"
import { HandAuthoredFootprint } from "../_shared/HandAuthoredParts"

const packages: any = {"4P-2.0":{"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]},"3P-SQUA-11X9.8X12H":{"pads":[{"name":"1","kind":"platedhole","x":0,"y":2.5,"drill":1,"diameter":1.8,"shape":"round","rotation":0},{"name":"2","kind":"platedhole","x":0,"y":0,"drill":1,"diameter":1.8,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":0,"y":-2.5,"drill":1,"diameter":1.8,"shape":"round","rotation":0},{"name":"P2","kind":"platedhole","x":7,"y":-4.75,"drill":1.8,"diameter":3,"shape":"round","rotation":0},{"name":"P1","kind":"platedhole","x":7,"y":4.75,"drill":1.8,"diameter":3,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":1.27,"y1":4.9,"x2":12.27,"y2":4.9},{"kind":"line","x1":12.27,"y1":4.9,"x2":12.27,"y2":-4.9},{"kind":"line","x1":12.27,"y1":-4.9,"x2":1.27,"y2":-4.9},{"kind":"line","x1":1.27,"y1":-4.9,"x2":1.27,"y2":4.9},{"kind":"line","x1":5.715,"y1":0.635,"x2":6.35,"y2":1.27},{"kind":"line","x1":6.35,"y1":1.27,"x2":8.255,"y2":-0.635},{"kind":"line","x1":8.255,"y1":-0.635,"x2":7.62,"y2":-1.27},{"kind":"line","x1":7.62,"y1":-1.27,"x2":5.715,"y2":0.635},{"kind":"circle","x":2.54,"y":-3.175,"radius":0.635},{"kind":"circle","x":11.049,"y":3.175,"radius":0.635},{"kind":"circle","x":6.985,"y":0,"radius":2.568415625},{"kind":"circle","x":6.985,"y":0,"radius":1.905}]}}
const components: any[] = [{"name":"ROTATION","kind":"chip","display":"WH09-2-103","mpn":"WH09-2-103","package":"3P-SQUA-11X9.8X12H","pins":["1","2","3","P2","P1"],"connections":{"P1":"net.VCC","P3":"net.GND","P2":"net.N_2"},"pinAttributes":{"P1":{"requiresPower":true,"mustBeConnected":true},"P2":{"mustBeConnected":true},"P3":{"requiresGround":true,"mustBeConnected":true},"P4":{"doNotConnect":true},"P5":{"doNotConnect":true}},"x":-2.54,"y":-0.05,"rotation":0,"mirrored":false}]
const signals: any[] = [{"name":"VCC","originalName":"VCC","refs":["J1.pin3","ROTATION.P1"]},{"name":"GND","originalName":"GND","refs":["J1.pin4","ROTATION.P3"]},{"name":"N_2","originalName":"N$2","refs":["J1.pin1","ROTATION.P2"]}]
const connectorPads: any[] = {"pads":[{"name":"1","kind":"platedhole","x":-3,"y":0,"drill":0.8,"diameter":1.27,"shape":"square","rotation":0},{"name":"2","kind":"platedhole","x":-1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":1,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":3,"y":0,"drill":0.8,"diameter":1.27,"shape":"round","rotation":0}],"graphics":[{"kind":"line","x1":-5,"y1":1,"x2":-5,"y2":-1},{"kind":"line","x1":5,"y1":1.5,"x2":5,"y2":-1.5},{"kind":"line","x1":-5,"y1":2.2,"x2":-5,"y2":-2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":5,"y2":-2.2},{"kind":"line","x1":5,"y1":-2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":2.2,"x2":5,"y2":2.2},{"kind":"line","x1":-5,"y1":-2.2,"x2":-5,"y2":-2.8},{"kind":"line","x1":-5,"y1":-2.8,"x2":-3.2,"y2":-2.8},{"kind":"line","x1":-3.2,"y1":-2.8,"x2":-3.2,"y2":-2.2},{"kind":"line","x1":-3.2,"y1":-2.2,"x2":3.2,"y2":-2.2},{"kind":"line","x1":3.2,"y1":-2.2,"x2":3.2,"y2":-2.8},{"kind":"line","x1":3.2,"y1":-2.8,"x2":5,"y2":-2.8},{"kind":"line","x1":5,"y1":-2.8,"x2":5,"y2":-2.2}]}.pads
const connectorLabels: string[] = ["N$2","NC","VCC","GND"]

const GroveSlidePotentiometer = () => (
  <board
    name={"GroveSlidePotentiometer"}
    title={"Grove - Slide Potentiometer"}
    width={"22mm"}
    height={"22.5mm"}
    borderRadius="1mm"
    solderMaskColor="blue"
    routingDisabled={false}
  >
    {signals.map((signal) => <net name={signal.name} isPowerNet={/^(?:VCC|VDD|VIN|3V3|5V|2V5)/i.test(signal.originalName)} isGroundNet={/^GND/i.test(signal.originalName)} />)}
    <GroveMountingHoles x={10} y={8.25} />
    <jumper
      name="J1"
      displayName="Grove 4-pin"
      manufacturerPartNumber="B4B-PH-K-S"
      pinLabels={Object.fromEntries(connectorLabels.map((label, index) => ["pin" + (index + 1), label]))}
      pinAttributes={Object.fromEntries(connectorLabels.map((label) => [label, /^GND/i.test(label) ? { requiresGround: true, mustBeConnected: true } : /^(?:VCC|VDD|VIN|3V3|5V)/i.test(label) ? { requiresPower: true, requiresVoltage: "5V", mustBeConnected: true } : /^NC/i.test(label) ? { doNotConnect: true } : { mustBeConnected: true, isGpio: true }]))}
      connections={Object.fromEntries(signals.flatMap((signal: any) => signal.refs.filter((ref: any) => ref.startsWith("J1.")).map((ref: any) => [ref.replace("J1.", "") , "net." + signal.name] )))}
      footprint={<HandAuthoredFootprint name="J1" pads={connectorPads} excludePadNames={["SS1", "SS2"]} />}
      pcbX={-6.35}
      pcbY={-0.05}
      pcbRotation={90}
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
    <silkscreentext text={"Slide Potentiometer"} pcbX={0} pcbY={9.75} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED NETLIST" pcbX={0} pcbY={-9.75} fontSize="0.45mm" />
  </board>
)

export { GroveSlidePotentiometer }
export default GroveSlidePotentiometer
