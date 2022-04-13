import React, { useEffect, useRef } from "react";

const Canvas = props => {
  const canvasRef = useRef(null);

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
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(point1[0], point1[1]);
    context.lineTo(point2[0], point2[1]);
    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
    for (let i = 0; i < props.points.length; i++) {
      if (
        "pointsToColor" in props.toDraw &&
        props.points[i][0] === props.toDraw.pointsToColor[0] &&
        props.points[i][1] === props.toDraw.pointsToColor[1]
      )
        drawCoordinates(props.points[i][0], props.points[i][1], "#facc15");
      else drawCoordinates(props.points[i][0], props.points[i][1], "#000000");
    }
    for (let i = 0; i < props.toDraw.lines.length - 1; i++) {
      drawLine(
        props.toDraw.lines[i],
        props.toDraw.lines[i + 1],
        i >= props.toDraw.lines.length - 3
          ? props.toDraw.lineColors[0]
          : props.toDraw.lineColors[1]
      );
    }
  }, [props]);

  return (
    <div>
      <div className="">
        <canvas
          ref={canvasRef}
          width="1000px"
          height="700px"
          style={{ border: "solid 2px #000000" }}
          className="mx-auto rounded mt-2"
        ></canvas>
      </div>
      <div className="mt-1">
        <h1 class="font-extrabold">{props.toDraw.phase}</h1>
        <p>{props.toDraw.message}</p>
      </div>
    </div>
  );
};

export default Canvas;
