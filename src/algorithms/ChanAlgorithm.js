import { grahamScan, grahamScanVisualization } from "./GrahamScan";

const findBottomPoint = points => {
  var bottomPoint = points[0];
  for (let i = 1; i < points.length; i++) {
    if (points[i][1] > bottomPoint[1]) {
      bottomPoint = points[i];
    }
  }
  return bottomPoint;
};

const generatePartitions = (points, h) => {
  let k = Math.ceil(points.length / h);
  let partitions = [];
  let pointsIndex = 0;
  for (let i = 0; i < k; i++) {
    let part = [];
    for (let j = 0; j < h && pointsIndex < points.length; j++) {
      part[j] = points[pointsIndex];
      pointsIndex++;
    }
    partitions.push(part);
  }
  return partitions;
};

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
  let val = determinant(matrix);
  if (val == 0) return 0;
  else if (val < 0) return -1;
  return 1;
};

const tangentPoint = (point, hull) => {
  let l = 0;
  let r = hull.length;
  let lprev = orientation(point, hull[0], hull[hull.length - 1]);
  let lnext = orientation(point, hull[0], hull[(l + 1) % r]);
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    let midPrev = orientation(point, hull[mid], hull[(mid - 1) % hull.length]);
    let midNext = orientation(point, hull[mid], hull[(mid + 1) % hull.length]);
    let midSide = orientation(point, hull[l], hull[mid]);
    if (midPrev >= 0 && midNext >= 0) return hull[mid];
    else if (
      (midSide > 0 && (lnext < 0 || lprev === lnext)) ||
      (midSide < 0 && midPrev < 0)
    )
      r = mid;
    else {
      l = mid + 1;
      lprev = -1 * midNext;
      lnext = orientation(point, hull[l], hull[(l + 1) % hull.length]);
    }
  }
  return hull[l];
};

const partialHull = (points, h, visualize) => {
  let partitions = generatePartitions(points, h);
  let visualizations = [];
  let colors = partitions.map(
    x => "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
  );
  if (visualize) {
    visualizations.push({
      phase: "Phase 1: Partition",
      message: "Partition points into multiple groups.",
      partitions: [...partitions],
      color: [...colors]
    });
  }
  let k = partitions.length;
  let grahams = [];
  let prevHulls = [];
  for (let i = 0; i < k; i++) {
    if (partitions[i].length <= 2) grahams[i] = [...partitions[i]];
    else {
      if (visualize) {
        let grahamVisualized = grahamScanVisualization(partitions[i]);
        grahamVisualized.shift();
        for (let j = 0; j < grahamVisualized.length; j++) {
          grahamVisualized[j].phase = "Phase 2: Graham Scan on each partition";
          grahamVisualized[j].prevLines = [...prevHulls];
          if (grahamVisualized[j].message === "Convex Hull complete!") {
            grahamVisualized[j].lineColors = [colors[i], colors[i]];
            prevHulls.push([...grahamVisualized[j].lines]);
          }
          grahamVisualized[j].partitions = [...partitions];
          grahamVisualized[j].color = [...colors];
        }
        visualizations = visualizations.concat(grahamVisualized);
      }
      grahams[i] = grahamScan(partitions[i]);
    }
  }
  let v = [findBottomPoint(points)]; //[Number.MIN_SAFE_INTEGER, 0],

  if (visualize) {
    visualizations.push({
      partitions: [...partitions],
      color: [...colors],
      pointsToColor: [...v[0]],
      phase: "Phase 3: Jarvis March",
      message: "Locate the lowest point and add it to the hull.",
      prevLines: [...prevHulls]
    });
  }
  // for (let i = 0; i < h; i++) {
  //   let bestPt = [];
  //   for (let j = 0; j < k; j++) {
  //     let tempPoint = tangentPoint(v[v.length - 1], grahams[j]);
  //     if (bestPt.length == 0) bestPt = [...tempPoint];
  //     else if (orientation(v[v.length - 1], bestPt, tempPoint) <= 0)
  //       bestPt = [...tempPoint];
  //   }
  //   v.push(bestPt);
  //   if (bestPt[0] === v[0][0] && bestPt[1] === v[0][1])
  //     return [true, visualizations, v];
  // }
  return [false, visualizations, null];
};

const generateHull = (points, visualize) => {
  var visualizations = [];
  if (visualize) {
    visualizations.push({
      phase: "Phase 0: Initial Points",
      message: "Initial Points"
    });
  }
  let h = 2;
  let status = false;
  let stack = [];
  while (!status && h <= 4) {
    h = Math.min(h ** 2, points.length);
    let res = partialHull(points, h, visualize);
    if (visualize) visualizations = visualizations.concat(res[1]);
    status = res[0];
    if (status) stack = [...res[2]];
  }
  console.log(stack);
  return [stack, visualizations];
};

const chanAlgorithm = points => {
  return generateHull(points, false)[0];
};

const chanAlgorithmVisualization = points => {
  return generateHull(points, true)[1];
};

export { chanAlgorithm, chanAlgorithmVisualization, generateHull };
