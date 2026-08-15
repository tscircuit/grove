import { Fragment } from "react"

export type HandAuthoredPad = {
  name: string
  kind: "smd" | "platedhole" | "hole"
  x: number
  y: number
  width?: number
  height?: number
  shape?: string
  rotation?: number
  layer?: string
  drill?: number
  diameter?: number
}

export type HandAuthoredGraphic =
  | { kind: "line"; x1?: number; y1?: number; x2?: number; y2?: number }
  | { kind: "circle"; x: number; y: number; radius?: number }
  | { kind: "rect"; x1?: number; y1?: number; x2?: number; y2?: number }

/**
 * Render one board-local footprint from the source pad geometry. The board
 * file owns the pad/graphic data; this helper only keeps the repetitive JSX
 * needed to turn that data into tscircuit primitives readable.
 */
export const HandAuthoredFootprint = ({
  name,
  pads,
  graphics = [],
  excludePadNames = [],
}: {
  name: string
  pads: readonly HandAuthoredPad[]
  graphics?: readonly HandAuthoredGraphic[]
  excludePadNames?: readonly string[]
}) => {
  const excluded = new Set(excludePadNames)
  const visiblePads = pads.filter((pad) => !excluded.has(pad.name))
  let signalIndex = 0
  return (
    <footprint name={name}>
      {visiblePads.map((pad, index) => {
        if (pad.kind === "hole") {
          return (
            <hole
              name={`${name}-H${index + 1}`}
              diameter={`${pad.drill ?? pad.diameter ?? 1}mm`}
              pcbX={pad.x}
              pcbY={pad.y}
            />
          )
        }
        const portHint = `pin${++signalIndex}`
        if (pad.kind === "platedhole") {
          return (
            <platedhole
              shape="circle"
              holeDiameter={`${pad.drill ?? 1}mm`}
              outerDiameter={`${pad.diameter ?? 1.8}mm`}
              pcbX={pad.x}
              pcbY={pad.y}
              portHints={[portHint]}
            />
          )
        }
        const shape = /round|circle/i.test(pad.shape ?? "") ? "circle" : pad.rotation ? "rotated_rect" : "rect"
        const common = {
          width: `${pad.width ?? 1}mm`,
          height: `${pad.height ?? 1}mm`,
          pcbX: pad.x,
          pcbY: pad.y,
          layer: pad.layer === "bottom" ? "bottom" as const : "top" as const,
          portHints: [portHint],
        }
        if (shape === "rotated_rect") return <smtpad shape="rotated_rect" {...common} ccwRotation={pad.rotation ?? 0} />
        if (shape === "circle") return <smtpad shape="circle" radius={`${Math.min(pad.width ?? 1, pad.height ?? 1) / 2}mm`} pcbX={pad.x} pcbY={pad.y} layer={common.layer} portHints={common.portHints} />
        return <smtpad shape="rect" {...common} />
      })}
      {graphics.map((graphic, index) => {
        if (graphic.kind === "line") {
          return (
            <Fragment key={`line-${index}`}>
              <silkscreenline
                x1={`${graphic.x1 ?? 0}mm`}
                y1={`${graphic.y1 ?? 0}mm`}
                x2={`${graphic.x2 ?? 0}mm`}
                y2={`${graphic.y2 ?? 0}mm`}
                strokeWidth="0.15mm"
              />
            </Fragment>
          )
        }
        if (graphic.kind === "circle") {
          return (
            <Fragment key={`circle-${index}`}>
              <silkscreencircle
                pcbX={graphic.x}
                pcbY={graphic.y}
                radius={`${graphic.radius ?? 0.5}mm`}
                isOutline
                strokeWidth="0.15mm"
              />
            </Fragment>
          )
        }
        return (
          <Fragment key={`rect-${index}`}>
            <silkscreenrect
              pcbX={((graphic.x1 ?? 0) + (graphic.x2 ?? 0)) / 2}
              pcbY={((graphic.y1 ?? 0) + (graphic.y2 ?? 0)) / 2}
              width={`${Math.abs((graphic.x2 ?? 0) - (graphic.x1 ?? 0))}mm`}
              height={`${Math.abs((graphic.y2 ?? 0) - (graphic.y1 ?? 0))}mm`}
              stroke="solid"
              strokeWidth="0.15mm"
              filled={false}
            />
          </Fragment>
        )
      })}
      <silkscreentext text={name} pcbX={0} pcbY={0} fontSize="0.45mm" />
    </footprint>
  )
}
