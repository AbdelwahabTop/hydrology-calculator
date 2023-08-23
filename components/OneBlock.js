import React, { useRef, useEffect } from "react";
import HeightIcon from "@mui/icons-material/Height";

const OneBlock = (props) => {
  const canvasRef = useRef(null);
  const { rectwidth, rectheight, verticalspace } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Draw the rectangle
    const X = rectwidth;
    const Y = rectheight;
    const Z = verticalspace;
    const lineWidth = 0.5; // Adjust the line width as needed
    const lineSpacing = Z; // Set the distance between lines

    // Draw the rectangle
    ctx.strokeRect(0, 0, X, Y);

    // Draw the horizontal lines
    ctx.beginPath();
    for (let y = lineSpacing; y < Y; y += lineSpacing) {
      ctx.moveTo(0, y - lineWidth / 2);
      ctx.lineTo(X, y - lineWidth / 2);
    }
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }, [rectwidth, rectheight, verticalspace]);

  return (
    <div
      style={{
        position: "relative",
        width: rectwidth,
        marginTop: "16px",

        maxWidth: "80vw",
      }}
    >
      <div style={{ position: "relative", marginBottom: "15px" }}>
        <p style={{ margin: "0", textAlign: "center" }}>
          {Number(rectwidth).toFixed(2)}m
        </p>
        <div style={{ display: "flex" }}>
          <span
            style={{ width: "2px", backgroundColor: "black", height: "10px" }}
          ></span>
          <span
            style={{
              width: "98%",
              backgroundColor: "black",
              height: "3px",
              alignSelf: "center",
            }}
          ></span>
          <span
            style={{ width: "2px", backgroundColor: "black", height: "10px" }}
          ></span>
        </div>
      </div>
      <canvas
        width={rectwidth}
        height={rectheight}
        ref={canvasRef}
        {...props}
      />
      <div
        style={{
          position: "absolute",
          height: rectheight,
          rotate: "90deg",
          top: `${0.1111111111 * rectheight}px`,
          paddingTop: `${0.5 * rectwidth}px`,
        }}
      >
        <p style={{ margin: "0", textAlign: "center", width: rectheight }}>
          {rectheight}m
        </p>
        <div style={{ display: "flex", width: rectheight }}>
          <span
            style={{ width: "2px", backgroundColor: "black", height: "10px" }}
          ></span>
          <span
            style={{
              width: `${rectheight}px`,
              backgroundColor: "black",
              height: "2px",
              alignSelf: "center",
            }}
          ></span>
          <span
            style={{ width: "2px", backgroundColor: "black", height: "10px" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default OneBlock;
