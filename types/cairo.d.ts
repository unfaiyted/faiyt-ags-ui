// more types details - https://gitlab.gnome.org/GNOME/gjs/-/snippets/2990

declare module "cairo" {
  export enum Antialias {
    DEFAULT = 0,
    NONE = 1,
    GRAY = 2,
    SUBPIXEL = 3,
    FAST = 4,
    GOOD = 5,
    BEST = 6,
  }

  export enum FillRule {
    WINDING = 0,
    EVEN_ODD = 1,
  }

  export enum LineCap {
    BUTT = 0,
    ROUND = 1,
    SQUARE = 2,
  }

  export enum LineJoin {
    MITER = 0,
    ROUND = 1,
    BEVEL = 2,
  }

  interface Context {
    $dispose(): void;
    appendPath(savedPath: any): void;
    copyPath(): void;
    arc(
      xc: number,
      yc: number,
      radius: number,
      angle1: number,
      angle2: number,
    ): void;
    arcNegative(
      xc: number,
      yc: number,
      radius: number,
      angle1: number,
      angle2: number,
    ): void;
    curveTo(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
    ): void;
    clip(): void;
    clipPreserve(): void;
    clipExtents(): [number, number, number, number];
    closePath(): void;
    copyPage(): void;
    deviceToUser(x: number, y: number): [number, number];
    deviceToUserDistance(x: number, y: number): [number, number];
    fill(): void;
    fillPreserve(): void;
    fillExtents(): [number, number, number, number];
    getAntialias(): Antialias;
    getCurrentPoint(): [number, number];
    getDashCount(): number;
    getFillRule(): FillRule;
    getLineCap(): LineCap;
    getLineJoin(): LineJoin;
    getLineWidth(): number;
    getMiterLimit(): number;
    getOperator(): Operator;
    getTolerance(): number;
    hasCurrentPoint(): boolean;
    identityMatrix(): void;
    inFill(x: number, y: number): boolean;
    inStroke(x: number, y: number): boolean;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    newPath(): void;
    newSubPath(): void;
    paint(): void;
    paintWithAlpha(alpha: number): void;
    pathExtents(): [number, number, number, number];
    pushGroup(): void;
    pushGroupWithContent(content: number): void;
    popGroupToSource(): void;
    rectangle(x: number, y: number, width: number, height: number): void;
    relCurveTo(
      dx1: number,
      dy1: number,
      dx2: number,
      dy2: number,
      dx3: number,
      dy3: number,
    ): void;
    relLineTo(dx: number, dy: number): void;
    relMoveTo(dx: number, dy: number): void;
    resetClip(): void;
    restore(): void;
    rotate(angle: number): void;
    save(): void;
    scale(sx: number, sy: number): void;
    setAntialias(antialias: Antialias): void;
    setFillRule(fill_rule: FillRule): void;
    setFontSize(size: number): void;
    setLineCap(line_cap: LineCap): void;
    setLineJoin(line_join: LineJoin): void;
    setLineWidth(width: number): void;
    setMiterLimit(limit: number): void;
    setOperator(op: Operator): void;
    setTolerance(tolerance: number): void;
    setSourceRGB(red: number, green: number, blue: number): void;
    setSourceRGBA(
      red: number,
      green: number,
      blue: number,
      alpha: number,
    ): void;
    showPage(): void;
    stroke(): void;
    strokePreserve(): void;
    strokeExtents(): [number, number, number, number];
    translate(tx: number, ty: number): void;
    userToDevice(x: number, y: number): [number, number];
    userToDeviceDistance(x: number, y: number): [number, number];
  }

  enum Operator {
    CLEAR,
    SOURCE,
    OVER,
    IN,
    OUT,
    ATOP,
    DEST,
    DEST_OVER,
    DEST_IN,
    DEST_OUT,
    DEST_ATOP,
    XOR,
    ADD,
    SATURATE,
  }
}

