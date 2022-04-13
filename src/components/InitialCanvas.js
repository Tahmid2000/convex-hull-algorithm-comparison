import React, { useRef, useEffect, useState } from "react";
import { grahamScan } from "../algorithms/GrahamScan";
import CanvasGrahamVisualization from "./CanvasGrahamScanVisualization";

const InitialCanvas = props => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [stepByStep, setStepByStep] = useState(false);

  const drawCoordinates = (x, y, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = color;

    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2, true);
    context.fill();
  };

  const drawLine = (point1, point2, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(point1[0], point1[1]);
    context.lineTo(point2[0], point2[1]);
    context.stroke();
  };

  const handleClick = event => {
    var rect = canvasRef.current.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    setPoints(oldArray => [...oldArray, [x, y]]);
    drawCoordinates(x, y, "#000000");
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setPoints([]);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandom = () => {
    clearCanvas();
    let numPoints = getRandomInt(10, 35);
    for (let i = 0; i < numPoints; i++) {
      let randomX = getRandomInt(50, 950);
      let randomY = getRandomInt(50, 650);
      drawCoordinates(randomX, randomY, "#000000");
      setPoints(oldArray => [...oldArray, [randomX, randomY]]);
    }
    //console.log(points); //check: for some reason this outputs an array of length 0 after first click
  };

  const generateGrahamScan = () => {
    //clearLines();
    var convexHull = grahamScan(points);
    for (let i = 0; i < convexHull.length - 1; i++)
      drawLine(convexHull[i], convexHull[i + 1], "#16a34a");
  };

  const startStepByStep = () => {
    setStepByStep(true);
  };

  const stopStepByStep = () => {
    console.log(points.length);
    setStepByStep(false);
    for (let i = 0; i < points.length; i++)
      drawCoordinates(points[i][0], points[i][1], "#000000");
  };
  return (
    <div>
      <button
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded disabled:bg-slate-900"
        onClick={startStepByStep}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Graham's Scan
      </button>
      <canvas
        ref={canvasRef}
        width="1000px"
        height="700px"
        style={{ border: "solid 2px #000000" }}
        onClick={handleClick}
        className="mx-auto rounded mt-2"
        hidden={stepByStep}
      />
      {!stepByStep ? (
        <React.Fragment>
          <br />
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={clearCanvas}
          >
            Clear Canvas
          </button>
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded ml-1"
            onClick={generateRandom}
          >
            Random Points
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CanvasGrahamVisualization points={points} />
          <br />
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={stopStepByStep}
          >
            Stop Step-By-Step
          </button>
        </React.Fragment>
      )}
    </div>
  );
};
export default InitialCanvas;
