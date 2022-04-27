import React, { useRef, useState } from "react";
// import { grahamScan } from "../algorithms/GrahamScan";
import CanvasGrahamVisualization from "./CanvasGrahamScanVisualization";
import CanvasJarvisVisualization from "./CanvasJarvisMarchVisualization";
import CanvasChanVisualization from "./CanvasChanVisualization";
import { chanAlgorithmVisualization } from "../algorithms/ChanAlgorithm";
import { grahamScanVisualization } from "../algorithms/GrahamScan";
import { jarvisMarchVisualization } from "../algorithms/JarvisMarch";
const InitialCanvas = props => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [stepByStep, setStepByStep] = useState(0);
  var pp = [
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
  var points2 = [
    [928, 511],
    [64, 428],
    [789, 119],
    [813, 507],
    [641, 526],
    [626, 491],
    [576, 390],
    [109, 537],
    [361, 150],
    [486, 428],
    [566, 90],
    [359, 478],
    [669, 475],
    [104, 155],
    [313, 100],
    [326, 411],
    [206, 327],
    [710, 192],
    [389, 482],
    [505, 609],
    [847, 627],
    [613, 370],
    [798, 559],
    [228, 159],
    [160, 456],
    [418, 433],
    [452, 647],
    [346, 254],
    [471, 218]
  ];
  const drawCoordinates = (x, y, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = color;

    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2, true);
    context.fill();
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
  };

  const startStepByStepGraham = () => {
    setStepByStep(1);
  };
  const startStepByStepJarvis = () => {
    setStepByStep(2);
  };

  const startStepByStepChan = () => {
    setStepByStep(3);
  };

  const stopStepByStep = () => {
    setStepByStep(0);
    for (let i = 0; i < points.length; i++)
      drawCoordinates(points[i][0], points[i][1], "#000000");
  };

  return (
    <div>
      <button
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded disabled:bg-slate-900 mr-1"
        onClick={startStepByStepGraham}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Graham's Scan
      </button>
      <button
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded disabled:bg-slate-900 mr-1"
        onClick={startStepByStepJarvis}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Jarvis's March
      </button>
      <button
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded disabled:bg-slate-900"
        onClick={startStepByStepChan}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Chan's Algorithm
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
      {stepByStep === 0 ? (
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
      ) : stepByStep === 1 ? (
        <React.Fragment>
          <CanvasGrahamVisualization
            points={points}
            scanned={grahamScanVisualization(points)}
          />
          <br />
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={stopStepByStep}
          >
            Stop Step-By-Step
          </button>
        </React.Fragment>
      ) : stepByStep === 2 ? (
        <React.Fragment>
          <CanvasJarvisVisualization
            points={points}
            scanned={jarvisMarchVisualization(points)}
          />
          <br />
          <button
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={stopStepByStep}
          >
            Stop Step-By-Step
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CanvasChanVisualization
            points={points2}
            scanned={chanAlgorithmVisualization(points2)}
          />
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
