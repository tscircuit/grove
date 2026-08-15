import { GroveMountingHoles } from "../_shared/GroveParts"
import { HandAuthoredFootprint } from "../_shared/HandAuthoredParts"

const packages: any = {"5P-13.75X11.7X6.5H":{"pads":[{"name":"1","kind":"platedhole","x":-2.5,"y":-7.5,"drill":1.2,"diameter":1.8,"shape":"round","rotation":0},{"name":"2","kind":"platedhole","x":0,"y":-7.5,"drill":1.2,"diameter":1.8,"shape":"round","rotation":0},{"name":"3","kind":"platedhole","x":2.5,"y":-7.5,"drill":1.2,"diameter":1.8,"shape":"round","rotation":0},{"name":"4","kind":"platedhole","x":2.5,"y":7,"drill":1.2,"diameter":1.8,"shape":"round","rotation":0},{"name":"5","kind":"platedhole","x":-2.5,"y":7,"drill":1.2,"diameter":1.8,"shape":"round","rotation":0},{"name":"P1","kind":"platedhole","x":-5.5,"y":0,"drill":1.5,"diameter":2,"shape":"round","rotation":90},{"name":"P2","kind":"platedhole","x":5.5,"y":0,"drill":1.5,"diameter":2,"shape":"round","rotation":90}],"graphics":[{"kind":"line","x1":-5.85,"y1":7.25,"x2":5.85,"y2":7.25},{"kind":"line","x1":5.85,"y1":7.25,"x2":5.85,"y2":-6.5},{"kind":"line","x1":5.85,"y1":-6.5,"x2":-5.85,"y2":-6.5},{"kind":"line","x1":-5.85,"y1":-6.5,"x2":-5.85,"y2":7.25},{"kind":"circle","x":0,"y":0,"radius":3.5},{"kind":"circle","x":0,"y":0,"radius":5},{"kind":"circle","x":0,"y":0,"radius":3}]},"R0603":{"pads":[{"name":"1","kind":"smd","x":-0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"},{"name":"2","kind":"smd","x":0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"}],"graphics":[{"kind":"line","x1":-1.397,"y1":0.635,"x2":1.397,"y2":0.635},{"kind":"line","x1":1.397,"y1":0.635,"x2":1.397,"y2":-0.635},{"kind":"line","x1":1.397,"y1":-0.635,"x2":-1.397,"y2":-0.635},{"kind":"line","x1":-1.397,"y1":-0.635,"x2":-1.397,"y2":0.635}]},"C0603":{"pads":[{"name":"1","kind":"smd","x":-0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"},{"name":"2","kind":"smd","x":0.762,"y":0,"width":0.889,"height":0.889,"shape":"round","rotation":0,"layer":"top"}],"graphics":[{"kind":"line","x1":-1.397,"y1":0.635,"x2":1.397,"y2":0.635},{"kind":"line","x1":1.397,"y1":0.635,"x2":1.397,"y2":-0.635},{"kind":"line","x1":1.397,"y1":-0.635,"x2":-1.397,"y2":-0.635},{"kind":"line","x1":-1.397,"y1":-0.635,"x2":-1.397,"y2":0.635}]},"4P-SMD-2.0":{"pads":[{"name":"1","kind":"smd","x":-3,"y":0,"width":2.54,"height":0.9652,"shape":"rect","rotation":90,"layer":"top"},{"name":"2","kind":"smd","x":-1,"y":0,"width":2.54,"height":0.9652,"shape":"rect","rotation":90,"layer":"top"},{"name":"3","kind":"smd","x":1,"y":0,"width":2.54,"height":0.9652,"shape":"rect","rotation":90,"layer":"top"},{"name":"4","kind":"smd","x":3,"y":0,"width":2.54,"height":0.9652,"shape":"rect","rotation":90,"layer":"top"}],"graphics":[{"kind":"line","x1":-6.1,"y1":1.5,"x2":-3.8,"y2":1.5},{"kind":"line","x1":3.8,"y1":1.5,"x2":6.1,"y2":1.5},{"kind":"line","x1":-6.1,"y1":5.4,"x2":6.1,"y2":5.4},{"kind":"line","x1":-6.1,"y1":1.5,"x2":-6.1,"y2":0.2},{"kind":"line","x1":-6.1,"y1":0.2,"x2":-3.8,"y2":0.2},{"kind":"line","x1":-3.8,"y1":0.2,"x2":-3.8,"y2":1.5},{"kind":"line","x1":-3.8,"y1":1.5,"x2":3.8,"y2":1.5},{"kind":"line","x1":3.8,"y1":1.5,"x2":3.8,"y2":0.1},{"kind":"line","x1":3.8,"y1":0.1,"x2":6.1,"y2":0.1},{"kind":"line","x1":6.1,"y1":0.1,"x2":6.1,"y2":1.5},{"kind":"line","x1":-6.1,"y1":5.4,"x2":-6.1,"y2":4.7},{"kind":"line","x1":-6.1,"y1":1.5,"x2":-6.1,"y2":2.1},{"kind":"line","x1":6.1,"y1":5.4,"x2":6.1,"y2":4.7},{"kind":"line","x1":6.1,"y1":1.5,"x2":6.1,"y2":2.1}]}}
const components: any[] = [{"name":"U1","kind":"chip","display":"Encoder","mpn":"Encoder","package":"5P-13.75X11.7X6.5H","pins":["1","2","3","4","5","P1","P2"],"connections":{"P4":"net.GND","P2":"net.GND","P5":"net.SW","P1":"net.SA","P3":"net.SB"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"requiresGround":true,"mustBeConnected":true},"P3":{"mustBeConnected":true},"P4":{"requiresGround":true,"mustBeConnected":true},"P5":{"mustBeConnected":true},"P6":{"doNotConnect":true},"P7":{"doNotConnect":true}},"x":-0.635,"y":0,"rotation":90,"mirrored":false},{"name":"R1","kind":"R","display":"3.3k","mpn":"R-R0603-3.3K","package":"R0603","pins":["1","2"],"connections":{"pin1":"net.SIGA","pin2":"net.SA"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":4.445,"y":-7.62,"rotation":0,"mirrored":true},{"name":"R2","kind":"R","display":"3.3k","mpn":"R-R0603-3.3K","package":"R0603","pins":["1","2"],"connections":{"pin1":"net.SIGB","pin2":"net.SB"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":4.445,"y":7.62,"rotation":180,"mirrored":true},{"name":"R3","kind":"R","display":"3.3k","mpn":"R-R0603-3.3K","package":"R0603","pins":["1","2"],"connections":{"pin2":"net.SA","pin1":"net.VCC"},"pinAttributes":{"P1":{"requiresPower":true,"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":4.445,"y":-5.08,"rotation":0,"mirrored":true},{"name":"R4","kind":"R","display":"3.3k","mpn":"R-R0603-3.3K","package":"R0603","pins":["1","2"],"connections":{"pin2":"net.SB","pin1":"net.VCC"},"pinAttributes":{"P1":{"requiresPower":true,"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":4.445,"y":5.207,"rotation":180,"mirrored":true},{"name":"R5","kind":"R","display":"3.3k","mpn":"R-R0603-3.3K","package":"R0603","pins":["1","2"],"connections":{"pin1":"net.SW","pin2":"net.SA"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"mustBeConnected":true}},"x":-6.985,"y":-8.255,"rotation":180,"mirrored":true},{"name":"C1","kind":"C","display":"100nF","mpn":"CC0603KRX7R9BB104","package":"C0603","pins":["1","2"],"connections":{"pin1":"net.GND","pin2":"net.VCC"},"pinAttributes":{"P1":{"requiresGround":true,"mustBeConnected":true},"P2":{"requiresPower":true,"mustBeConnected":true}},"x":3.683,"y":-1.778,"rotation":90,"mirrored":true},{"name":"J2","kind":"chip","display":"B4B-PH-K-S","mpn":"B4B-PH-K-S","package":"4P-SMD-2.0","pins":["1","2","3","4"],"connections":{"P2":"net.SIGB","P4":"net.GND","P1":"net.SIGA","P3":"net.VCC"},"pinAttributes":{"P1":{"mustBeConnected":true},"P2":{"mustBeConnected":true},"P3":{"requiresPower":true,"mustBeConnected":true},"P4":{"requiresGround":true,"mustBeConnected":true}},"x":-1.016,"y":0,"rotation":270,"mirrored":true}]
const signals: any[] = [{"name":"SIGB","originalName":"SIGB","refs":["R2.pin1","J2.P2"]},{"name":"GND","originalName":"GND","refs":["U1.P4","U1.P2","C1.pin1","J2.P4"]},{"name":"SIGA","originalName":"SIGA","refs":["R1.pin1","J2.P1"]},{"name":"SW","originalName":"SW","refs":["U1.P5","R5.pin1"]},{"name":"SA","originalName":"SA","refs":["R1.pin2","U1.P1","R3.pin2","R5.pin2"]},{"name":"SB","originalName":"SB","refs":["U1.P3","R2.pin2","R4.pin2"]},{"name":"VCC","originalName":"VCC","refs":["R3.pin1","R4.pin1","C1.pin2","J2.P3"]}]
const connectorPads: any[] = {"pads":[],"graphics":[]}.pads
const connectorLabels: string[] = []

const GroveOpticalRotaryEncoderTCUT1600X01 = () => (
  <board
    name={"GroveOpticalRotaryEncoderTCUT1600X01"}
    title={"Grove - Optical Rotary Encoder(TCUT1600X01)"}
    width={"26.2mm"}
    height={"22mm"}
    borderRadius="1mm"
    solderMaskColor="blue"
    routingDisabled={true}
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
      pcbX={-8.1}
      pcbY={0}
      pcbRotation={0}
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
    <silkscreentext text={"Optical Rotary Encoder(TCUT1600…"} pcbX={0} pcbY={9.5} fontSize="0.6mm" />
    <silkscreentext text="HAND-AUTHORED NETLIST" pcbX={0} pcbY={-9.5} fontSize="0.45mm" />
  </board>
)

export { GroveOpticalRotaryEncoderTCUT1600X01 }
export default GroveOpticalRotaryEncoderTCUT1600X01
