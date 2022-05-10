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
  if (val === 0) return 0;
  else if (val < 0) return -1;
  return 1;
};

// var mod = function(n, m) {
//   var remain = n % m;
//   return Math.floor(remain >= 0 ? remain : remain + m);
// };

const tangentPoint = (pointi, pointi1, hull, visualize) => {
  var bestPt = pointi1;
  let visualizations = [];
  if (hull.length === 1) {
    // if (visualize)
    //   visualizations.push({
    //     pointsToColor: hull[0],
    //     bestPointToColor: hull[0],
    //     phase: "Phase 3: Jarvis March",
    //     message:
    //       "Find the tangent point of each hull which creates the minimum turning angle with the last segment in the partial hull. Green highlighted point is the current best point."
    //   });
    return [hull[0], visualizations];
  }
  for (let i = 0; i < hull.length - 1; i++) {
    if (hull[i] === pointi) continue;
    if (i !== 0 && hull[i] === hull[i - 1]) continue;
    if (hull[i] === undefined) {
      console.log(`${i}, ${hull.length}`);
      console.log(hull);
    }
    var curOr = orientation(hull[i], pointi, bestPt);
    // if (visualize) {
    //   visualizations.push({
    //     pointsToColor: hull[i],
    //     bestPointToColor: bestPt,
    //     phase: "Phase 3: Jarvis March",
    //     message:
    //       "Find the tangent point of each hull which creates the minimum turning angle with the last segment in the partial hull. Green highlighted point is the current best point."
    //   });
    // }
    if (curOr > 0) bestPt = hull[i];
  }
  return [bestPt, visualizations];
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
      message: `Partition points into multiple groups of at most ${h} points. `,
      partitions: [...partitions],
      color: [...colors]
    });
  }
  let k = partitions.length;
  let grahams = [];
  let prevHulls = [];
  for (let i = 0; i < k; i++) {
    if (partitions[i].length <= 1) grahams[i] = [...partitions[i]];
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
  let bottom = findBottomPoint(points);
  let v = [[bottom[0] - 1, bottom[1]], bottom]; //[Number.MIN_SAFE_INTEGER, 0],
  if (visualize) {
    visualizations.push({
      partitions: [...partitions],
      color: [...colors],
      pointsToColor: [...v[0]],
      phase: "Phase 3: Jarvis March",
      message: "Locate the lowest point and add it to the partial hull.",
      prevLines: [...prevHulls]
    });
  }
  let bestPts = [];
  for (let i = 0; i < h; i++) {
    let bestPt = [];
    for (let j = 0; j < k; j++) {
      let tangent = tangentPoint(
        v[v.length - 1],
        v[v.length - 2],
        grahams[j],
        visualize
      );
      let tempPoint = tangent[0];
      // if (visualize) {
      //   for (let k = 0; k < tangent[1].length; k++) {
      //     tangent[1][k].partitions = [...partitions];
      //     tangent[1][k].color = [...colors];
      //     tangent[1][k].prevLines = [...prevHulls];
      //     tangent[1][k].selectedPrevHull = j;
      //     tangent[1][k].lines = [...v, tangent[1][k].pointsToColor];
      //     tangent[1][k].lineColors = ["#b91c1c", "#16a34a"];
      //   }
      //   visualizations = visualizations.concat(tangent[1]);
      // }
      bestPts.push(tempPoint);
      if (bestPt.length === 0) bestPt = [...tempPoint];
      else if (orientation(tempPoint, v[v.length - 1], bestPt) > 0)
        bestPt = [...tempPoint];
    }
    if (visualize) {
      visualizations.push({
        partitions: [...partitions],
        color: [...colors],
        bestPoints: [...bestPts],
        bestPointToColor: bestPt,
        phase: "Phase 3: Jarvis March",
        message:
          "Using the right tangent points from each mini-hull with respect to the current partial hull (highlighted in yellow), add the best point to the hull (highlighted in green).",
        prevLines: [...prevHulls],
        lines: [...v],
        lineColors: ["#b91c1c", "#16a34a"]
      });
    }
    bestPts = [];
    v.push(bestPt);
    if (bestPt[0] === v[1][0] && bestPt[1] === v[1][1]) {
      if (visualize) {
        visualizations.push({
          partitions: [...partitions],
          color: [...colors],
          phase: "Phase 3: Jarvis March",
          message: "Convex hull complete!",
          prevLines: [...prevHulls],
          lines: [...v],
          lineColors: ["#16a34a", "#16a34a"]
        });
      }
      return [true, visualizations, v];
    }
  }
  visualizations.push({
    phase: "Phase 4: Restart",
    message: `It was not possible to build a convex hull with ${h} points, so the process restarts with ${Math.min(
      h ** 2,
      points.length
    )} points.`
  });
  return [false, visualizations, null];
};

const generateHull = (points, visualize) => {
  var visualizations = [];
  if (visualize) {
    visualizations.push({
      phase: "Phase 0: Initial Points",
      message:
        "Initial Points. First, attempt to build a convex hull with at most 4 points."
    });
  }
  let h = 2;
  let status = false;
  let stack = [];
  while (!status) {
    h = Math.min(h ** 2, points.length);
    let res = partialHull(points, h, visualize);
    if (visualize) visualizations = visualizations.concat(res[1]);
    status = res[0];
    if (status) stack = [...res[2]];
  }
  return [stack, visualizations];
};

const chanAlgorithm = points => {
  return generateHull(points, false)[0];
};

const chanAlgorithmVisualization = points => {
  return generateHull(points, true)[1];
};

export { chanAlgorithm, chanAlgorithmVisualization, generateHull };
