import React from "react";
import './Image.css';

const Image = ({
  style={margin: "auto", background: "none", display: "block", shapeRendering: "auto"},
  fill = "#000",
  width = "100px",
  height = "100px",
  className = "",
  viewBox = "0 0 100 100"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
  <g transform="translate(50 42)">
    <g transform="scale(0.8)">
      <g transform="translate(-50 -50)">
        <polygon fill="#FF5EDF" points="72.5 50 50 11 27.5 50 50 50">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4.545454545454545s" values="0 50 38.5;360 50 38.5" keyTimes="0;1"></animateTransform>
        </polygon>
        <polygon fill="#04C8DE" points="5 89 50 89 27.5 50">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4.545454545454545s" values="0 27.5 77.5;360 27.5 77.5" keyTimes="0;1"></animateTransform>
        </polygon>
        <polygon fill="#000000" points="72.5 50 50 89 95 89">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4.545454545454545s" values="0 72.5 77.5;360 72 77.5" keyTimes="0;1"></animateTransform>
        </polygon>
      </g>
    </g>
  </g>
  </svg>
);

export default Image;