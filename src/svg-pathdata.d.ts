declare module 'svg-pathdata' {
  export interface SVGCommand {
    type: number;
    x?: number;
    x1?: number;
    x2?: number;
    y?: number;
    y1?: number;
    y2?: number;
  }

  export class SVGPathData {
    static readonly CLOSE_PATH: number;
    static readonly CURVE_TO: number;
    static readonly LINE_TO: number;
    static readonly MOVE_TO: number;

    commands: SVGCommand[];

    constructor(pathData: string);

    aToC(): this;
    normalizeHVZ(closePath?: boolean, horizontal?: boolean, vertical?: boolean): this;
    normalizeST(): this;
    qtToC(): this;
    sanitize(epsilon?: number): this;
    toAbs(): this;
  }
}
