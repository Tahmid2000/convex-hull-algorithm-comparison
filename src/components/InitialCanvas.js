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
    let numPoints = getRandomInt(15, 45);
    for (let i = 0; i < numPoints; i++) {
      let randomX = getRandomInt(50, 1250);
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
        className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded disabled:bg-red-900 mr-1"
        onClick={startStepByStepGraham}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Graham's Scan
      </button>
      <button
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded disabled:bg-indigo-900 mr-1"
        onClick={startStepByStepJarvis}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Jarvis's March
      </button>
      <button
        className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded disabled:bg-pink-900"
        onClick={startStepByStepChan}
        style={{ marginTop: "2rem" }}
        disabled={points.length < 2 || stepByStep}
      >
        Chan's Algorithm
      </button>
      <canvas
        ref={canvasRef}
        width="1300px"
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
            className="transition duration-200 ease-in-out bg-black hover:bg-white text-white hover:text-black hover:bg-white border-black border-2 font-bold py-2 px-4 rounded-lg mr-1"
            onClick={clearCanvas}
          >
            Clear Canvas
          </button>
          <button
            className="transition duration-200 ease-in-out bg-black hover:bg-white text-white hover:text-black hover:bg-white border-black border-2 font-bold py-2 px-4 rounded-lg ml-1"
            onClick={generateRandom}
          >
            Random Points
          </button>
        </React.Fragment>
      ) : stepByStep === 1 ? (
        <React.Fragment>
          <CanvasGrahamVisualization
            points={[...points]}
            scanned={grahamScanVisualization([...points])}
            stopFunction={stopStepByStep}
          />
        </React.Fragment>
      ) : stepByStep === 2 ? (
        <React.Fragment>
          <CanvasJarvisVisualization
            points={[...points]}
            scanned={jarvisMarchVisualization([...points])}
            stopFunction={stopStepByStep}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CanvasChanVisualization
            points={[...points]}
            scanned={chanAlgorithmVisualization([...points])}
            stopFunction={stopStepByStep}
          />
        </React.Fragment>
      )}
    </div>
  );
};
export default InitialCanvas;
