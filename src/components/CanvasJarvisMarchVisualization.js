import React, { useEffect, useState } from "react";
import { jarvisMarchVisualization } from "../algorithms/JarvisMarch";
import Canvas from "./Canvas";

const CanvasJarvisMarchVisualization = ({ points, scanned, stopFunction }) => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePageChange = increment => {
    if (!(step + increment < 0 || step + increment >= scanned.length))
      setStep(step + increment);
  };

  useEffect(() => {
    let interval = null;
    if (step < scanned.length - 1 && animating) {
      interval = setInterval(() => {
        setStep(step + 1);
      }, 500);
    } else {
      //setStep(step - step);
      setAnimating(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [animating, step, scanned.length]);

  return (
    <div>
      <Canvas points={points} toDraw={scanned[step]} />
      <button
        onClick={() => handlePageChange(step * -1)}
        hidden={animating ? true : false}
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(-1)}
        hidden={animating ? true : false}
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
      >
        {"<"}
      </button>
      <button
        onClick={() => handlePageChange(1)}
        hidden={animating ? true : false}
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(scanned.length - step - 1)}
        hidden={animating ? true : false}
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded mr-2"
      >
        {">>"}
      </button>
      {!animating ? (
        <button
          onClick={() => setAnimating(true)}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          Animate
        </button>
      ) : (
        <button
          onClick={() => setAnimating(false)}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          Stop Animation
        </button>
      )}
      <button
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={stopFunction}
      >
        Exit
      </button>
    </div>
  );
};
export default CanvasJarvisMarchVisualization;
