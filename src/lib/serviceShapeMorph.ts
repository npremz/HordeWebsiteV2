export type CornerRadii = [number, number, number, number];
export type ShapeRadii = CornerRadii[];

export const CELL_SIZE = 99;
export const CORNER_RADIUS = 49.5;
export const CELL_POSITIONS = [
  [3.5, 3.5],
  [102.5, 3.5],
  [201.5, 3.5],
  [3.5, 102.5],
  [102.5, 102.5],
  [201.5, 102.5],
  [3.5, 201.5],
  [102.5, 201.5],
  [201.5, 201.5],
] as const;

function radii(code: string): CornerRadii {
  return [0, 1, 2, 3].map((index) =>
    code[index] === "1" ? CORNER_RADIUS : 0,
  ) as CornerRadii;
}

function shape(cells: string[]): ShapeRadii {
  return cells.map(radii);
}

export const SERVICE_SHAPES = {
  neutral: shape(["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"]),
  audit: shape(["1111", "1100", "1111", "1001", "1111", "0110", "1111", "0011", "1111"]),
  refonte: shape(["0010", "1111", "0101", "0110", "1111", "1001", "0101", "1111", "1000"]),
  ecommerce: shape(["1111", "0010", "1110", "0010", "1010", "1000", "1011", "1000", "1111"]),
  landing: shape(["0101", "1111", "1010", "1001", "1111", "0110", "1010", "0011", "0101"]),
  sass: shape(["1101", "0011", "1110", "0110", "1111", "1001", "1011", "1100", "0111"]),
  opti: shape(["0010", "1011", "0001", "0111", "1111", "1101", "0100", "1110", "1000"]),
} satisfies Record<string, ShapeRadii>;

export type ServiceShapeName = keyof typeof SERVICE_SHAPES;

export function getServiceShapeName(shapeName: string | undefined): ServiceShapeName {
  return shapeName && shapeName in SERVICE_SHAPES
    ? (shapeName as ServiceShapeName)
    : "neutral";
}

export function roundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radii: CornerRadii,
) {
  const [tl, tr, br, bl] = radii;
  const right = x + width;
  const bottom = y + height;

  return [
    `M${x + tl} ${y}`,
    `H${right - tr}`,
    tr ? `A${tr} ${tr} 0 0 1 ${right} ${y + tr}` : `L${right} ${y}`,
    `V${bottom - br}`,
    br ? `A${br} ${br} 0 0 1 ${right - br} ${bottom}` : `L${right} ${bottom}`,
    `H${x + bl}`,
    bl ? `A${bl} ${bl} 0 0 1 ${x} ${bottom - bl}` : `L${x} ${bottom}`,
    `V${y + tl}`,
    tl ? `A${tl} ${tl} 0 0 1 ${x + tl} ${y}` : `L${x} ${y}`,
    "Z",
  ].join(" ");
}

export function getShapePathData(shapeName: ServiceShapeName) {
  const shape = SERVICE_SHAPES[shapeName];

  return shape.map((cell, index) => {
    const [x, y] = CELL_POSITIONS[index];
    return roundedRectPath(x, y, CELL_SIZE, CELL_SIZE, cell);
  });
}

function cloneShape(shape: ShapeRadii): ShapeRadii {
  return shape.map((cell) => [...cell] as CornerRadii);
}

function mixShape(from: ShapeRadii, to: ShapeRadii, progress: number): ShapeRadii {
  return from.map((cell, cellIndex) =>
    cell.map((value, cornerIndex) => {
      return value + (to[cellIndex][cornerIndex] - value) * progress;
    }) as CornerRadii,
  );
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function drawShape(cells: SVGPathElement[], shape: ShapeRadii) {
  cells.forEach((cell, index) => {
    const [x, y] = CELL_POSITIONS[index];
    cell.setAttribute("d", roundedRectPath(x, y, CELL_SIZE, CELL_SIZE, shape[index]));
  });
}

export function createServiceShapeAnimator(
  cells: Iterable<SVGPathElement>,
  initialShapeName: ServiceShapeName = "neutral",
) {
  const cellList = Array.from(cells);
  let currentShape = cloneShape(SERVICE_SHAPES[initialShapeName]);
  let animationFrame: number | null = null;

  drawShape(cellList, currentShape);

  function cancel() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function draw(shapeName: ServiceShapeName) {
    cancel();
    currentShape = cloneShape(SERVICE_SHAPES[shapeName]);
    drawShape(cellList, currentShape);
  }

  function animateTo(shapeName: ServiceShapeName, duration = 520) {
    const targetShape = SERVICE_SHAPES[shapeName];
    const startShape = cloneShape(currentShape);
    const startTime = performance.now();

    cancel();

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentShape = mixShape(startShape, targetShape, easeOutCubic(progress));
      drawShape(cellList, currentShape);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(frame);
      } else {
        currentShape = cloneShape(targetShape);
        animationFrame = null;
      }
    }

    animationFrame = requestAnimationFrame(frame);
  }

  return {
    animateTo,
    cancel,
    draw,
  };
}
