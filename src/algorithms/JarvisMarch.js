const determinant = m =>
  m.length === 1
    ? m[0][0]
    : m.length === 2
    ? m[0][0] * m[1][1] - m[0][1] * m[1][0]
    : m[0].reduce(
        (r, e, i) =>
          r +
          (-1) ** (i + 2) *
            e *
            determinant(m.slice(1).map(c => c.filter((_, j) => i !== j))),
        0
      );

const orientation = (p, q, r) => {
  var matrix = [
    [1, p[0], p[1]],
    [1, q[0], q[1]],
    [1, r[0], r[1]]
  ];
  return determinant(matrix);
};

const findBottomPoint = points => {
  var bottomPoint = points[0];
  for (let i = 1; i < points.length; i++) {
    if (points[i][1] > bottomPoint[1]) {
      bottomPoint = points[i];
    }
  }
  return bottomPoint;
};

const generateHull = (points, visualize) => {
  if (points.length < 2) return;
  var visuliazation = [];
  var stack = [];
  if (visualize)
    visuliazation.push({
      lines: [],
      lineColors: [],
      phase: "Phase 0: Initial",
      message: "Initial Points",
      stack: [...stack]
    });
  var bottom = findBottomPoint(points);
  var placeHolder = [bottom[0] - 1, bottom[1]];
  stack.push(placeHolder);
  stack.push(bottom);
  if (visualize) {
    visuliazation.push({
      lines: [stack[stack.length - 2], stack[stack.length - 1]],
      lineColors: ["#b91c1c"],
      pointsToColor: bottom,
      phase: "Phase 1: Select bottom point",
      message: "Locate the lowest point and add it to the hull.",
      stack: [...stack]
    });
  }
  while (stack[stack.length - 1] !== stack[1] || stack.length === 2) {
    var bestPt = stack[stack.length - 2];
    for (let i = 0; i < points.length; i++) {
      if (points[i] === stack[stack.length - 1]) continue;
      var curOr = orientation(points[i], stack[stack.length - 1], bestPt);

      if (visualize) {
        visuliazation.push({
          lines: [...stack, points[i]],
          lineColors: ["#b91c1c", "#16a34a"],
          pointsToColor: points[i],
          bestPointToColor: bestPt,
          phase: "Phase 2: Creating Convex Hull",
          message: `${"Checking for point which forms minimum turning angle with the last segment in the partial hull. Green highlighted point is the current best point."}`,
          stack: [...stack]
        });
      }
      if (curOr > 0) {
        bestPt = points[i];
      }
    }
    stack.push(bestPt);
  }
  if (visualize) {
    visuliazation.push({
      lines: [...stack],
      lineColors: ["#16a34a", "#16a34a"],
      phase: "Phase 2: Finished",
      message: "Convex Hull complete!",
      stack: [...stack]
    });
  }
  return [stack, visuliazation];
};

const jarvisMarch = points => {
  var hull = generateHull(points, false)[0];
  return hull;
};

const jarvisMarchVisualization = points => {
  var hull = generateHull(points, true)[1];
  return hull;
};

export { jarvisMarch, jarvisMarchVisualization };
