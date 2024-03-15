// ColorLegend.js
import React from 'react';
import * as d3 from 'd3';

const legendWidth = 50; // Increased legend width for better visibility
const legendHeight = 400;
const numColors = 100;
const marginTop = 10;
const marginLeft = 50;
const marginRight = 200;
const marginBottom = 70; // to adjust the alignment of the color legend w.r.t the heatmap graph

const ColorLegend = ({ data }) => {
  const fixedMin = 0;
  const fixedMax = 245;
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([fixedMax, fixedMin]);

  const colorDomain = d3.range(numColors).map((d) => (d / (numColors - 1)) * (fixedMax - fixedMin) + fixedMin);

  const colorHeight = legendHeight / numColors;

  return (
    <svg width={legendWidth + marginLeft + marginRight} height={legendHeight + marginTop + marginBottom}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {/* Display "Color Legend" vertically on the right side */}
        {/* {["C", "O", "L", "O", "R", " ", "L", "E", "G", "E", "N", "D"].map((char, i) => (
          <text
            key={i}
            x={legendHeight / 5}
            y={(legendWidth / 2) + (i * 30)}
            textAnchor="start"
            fontWeight="bold"
            transform={`rotate(-1800, ${legendHeight / 2}, ${legendWidth})`}
          >
            {char}
          </text>
        ))} */}
        {colorDomain.map((d, i) => (
          <g key={i} transform={`translate(0, ${i * colorHeight})`}>
            <rect width={legendWidth - 25} height={colorHeight} fill={colorScale(d)} />
          </g>
        ))}
        <g transform={`translate(${legendWidth - 20}, 0)`}>
          <text x={10} y={5} textAnchor="start" fontSize="10">
            {fixedMax.toFixed()}
          </text>
          <text x={10} y={legendHeight - 10} textAnchor="start" fontSize="10">
            {fixedMin.toFixed()}
          </text>
          <line x1={0} x2={0} y1={0} y2={legendHeight} stroke="black" />
        </g>
      </g>
    </svg>
  );
};

export default ColorLegend;
