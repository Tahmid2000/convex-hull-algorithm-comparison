const sortAscendingPoints = (a, b) => {
  if (a[0] === b[0]) return 0;
  else return a[0] < b[0] ? -1 : 1;
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

const orientation = (p, topOfStack, secondOfStack) => {
  var matrix = [
    [1, p[0], p[1]],
    [1, topOfStack[0], topOfStack[1]],
    [1, secondOfStack[0], secondOfStack[1]]
  ];
  return determinant(matrix);
};

const lowerHull = points => {
  if (points.length < 2) return;
  points.sort(sortAscendingPoints);
  var stack = [];
  stack.push(points[0]);
  stack.push(points[1]);
  for (let i = 2; i < points.length; i++) {
    while (
      stack.length >= 2 &&
      orientation(
        points[i],
        stack[stack.length - 1],
        stack[stack.length - 2]
      ) <= 0
    )
      stack.pop();
    stack.push(points[i]);
  }
  return stack;
};

const sortDescendingPoints = (a, b) => {
  if (a[0] === b[0]) return 0;
  else return a[0] > b[0] ? -1 : 1;
};

const upperHull = points => {
  if (points.length < 2) return;
  points.sort(sortDescendingPoints);
  var stack = [];
  stack.push(points[0]);
  stack.push(points[1]);
  for (let i = 2; i < points.length; i++) {
    while (
      stack.length >= 2 &&
      orientation(
        points[i],
        stack[stack.length - 1],
        stack[stack.length - 2]
      ) <= 0
    )
      stack.pop();
    stack.push(points[i]);
  }
  return stack;
};

const grahamScan = points => {
  var lower = lowerHull(points);
  var upper = upperHull(points);
  for (let i = 0; i < upper.length; i++) lower.push(upper[i]);
  return lower;
};

export default grahamScan;
