import React, { useRef, useEffect, useState } from "react";
import { grahamScanVisualization } from "../algorithms/GrahamScan";
import Canvas from "./Canvas";
const CanvasGrahamScanVisualization = props => {
  var points = [
    [315, 507],
    [572, 248],
    [354, 644],
    [714, 74],
    [505, 316],
    [452, 575],
    [561, 553],
    [432, 520],
    [738, 374],
    [721, 545]
  ];
  //   var points = [
  //     [928, 511],
  //     [64, 428],
  //     [789, 119],
  //     [813, 507],
  //     [641, 526],
  //     [626, 491],
  //     [576, 390],
  //     [109, 537],
  //     [361, 150],
  //     [486, 428],
  //     [566, 90],
  //     [359, 478],
  //     [669, 475],
  //     [104, 155],
  //     [313, 100],
  //     [326, 411],
  //     [206, 327],
  //     [710, 192],
  //     [389, 482],
  //     [505, 609],
  //     [847, 627],
  //     [613, 370],
  //     [798, 559],
  //     [228, 159],
  //     [160, 456],
  //     [418, 433],
  //     [452, 647],
  //     [346, 254],
  //     [471, 218]
  //   ];

  const executeVisualization = () => {
    var steps = grahamScanVisualization(points);
    console.log(steps);
    return steps;
  };

  const canvasList = executeVisualization().map(iter => {
    return (
      <div>
        <Canvas points={points} toDraw={iter} />
        <br />
      </div>
    );
  });
  return <div>{canvasList}</div>;
};
export default CanvasGrahamScanVisualization;

//phase: sorting and making a line between first 2 x coordinates
//4 phases: initial ascending sort, lower hull, second descending sort, upper hull
//store lines: different each time store description; array of points
//store color of lines: array
//stack
//description
