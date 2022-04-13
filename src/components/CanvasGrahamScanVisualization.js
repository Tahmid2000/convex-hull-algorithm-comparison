import React, { useEffect, useState } from "react";
import { grahamScanVisualization } from "../algorithms/GrahamScan";
import Canvas from "./Canvas";

const CanvasGrahamScanVisualization = props => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const scanned = grahamScanVisualization(props.points);

  const handlePageChange = increment => {
    if (!(step + increment < 0 || step + increment >= scanned.length))
      setStep(step + increment);
  };

  useEffect(() => {
    let interval = null;
    if (step < scanned.length - 1 && animating) {
      interval = setInterval(() => {
        setStep(step + 1);
      }, 1500);
    } else {
      //setStep(step - step);
      setAnimating(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [animating, step]);

  return (
    <div>
      <Canvas points={props.points} toDraw={scanned[step]} />
      <button
        onClick={() => handlePageChange(step * -1)}
        hidden={animating ? true : false}
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(-1)}
        hidden={animating ? true : false}
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
      >
        {"<"}
      </button>
      <button
        onClick={() => handlePageChange(1)}
        hidden={animating ? true : false}
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(scanned.length - step - 1)}
        hidden={animating ? true : false}
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mr-2"
      >
        {">>"}
      </button>
      {!animating ? (
        <button
          onClick={() => setAnimating(true)}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
        >
          Animate
        </button>
      ) : (
        <button
          onClick={() => setAnimating(false)}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
        >
          Stop Animation
        </button>
      )}
    </div>
  );
};
export default CanvasGrahamScanVisualization;
// var points = [
//   [315, 507],
//   [572, 248],
//   [354, 644],
//   [714, 74],
//   [505, 316],
//   [452, 575],
//   [561, 553],
//   [432, 520],
//   [738, 374],
//   [721, 545]
// ];
// var points = [
//   [928, 511],
//   [64, 428],
//   [789, 119],
//   [813, 507],
//   [641, 526],
//   [626, 491],
//   [576, 390],
//   [109, 537],
//   [361, 150],
//   [486, 428],
//   [566, 90],
//   [359, 478],
//   [669, 475],
//   [104, 155],
//   [313, 100],
//   [326, 411],
//   [206, 327],
//   [710, 192],
//   [389, 482],
//   [505, 609],
//   [847, 627],
//   [613, 370],
//   [798, 559],
//   [228, 159],
//   [160, 456],
//   [418, 433],
//   [452, 647],
//   [346, 254],
//   [471, 218]
// ];
