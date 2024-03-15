// ColorLegend.js
import React from 'react';
import * as d3 from 'd3';
// import heatmapData from './heatmapData'; // Adjust the import path if necessary


const legendWidth = 100; // Increased legend width for better visibility
const legendHeight = 400;
const marginTop = 10;
const marginLeft = 50;
const marginRight = 200;
const marginBottom = 70; // to adjust the alignment of the color legend w.r.t the heatmap graph

const DiscreteLegend = ({ fixedMin, fixedMax }) => {
  const numColors = 10;
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([fixedMax, fixedMin]);

  const colorDomain = d3.range(numColors).map((d) => (d / (numColors - 1)) * (fixedMax - fixedMin) + fixedMin);

  const colorHeight = legendHeight / numColors;

  return (
    <g transform={`translate(${marginLeft}, ${marginTop})`}>
      {colorDomain.map((d, i) => (
        <g key={i} transform={`translate(0, ${i * colorHeight})`}>
          <rect width={legendWidth - 25} height={colorHeight} fill={colorScale(d)} />
        </g>
      ))}
    </g>
  );
};

const ContinuousLegend = ({ fixedMin, fixedMax }) => {
  const numColors = 100;
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([fixedMax, fixedMin]);

  const colorDomain = d3.range(numColors).map((d) => (d / (numColors - 1)) * (fixedMax - fixedMin) + fixedMin);

  const colorHeight = legendHeight / numColors;

  return (
    <g transform={`translate(${marginLeft + legendWidth}, ${marginTop})`}>
      {colorDomain.map((d, i) => (
        <g key={i} transform={`translate(0, ${i * colorHeight})`}>
          <rect width={legendWidth - 25} height={colorHeight} fill={colorScale(d)} />
        </g>
      ))}
    </g>
  );
};

const allLegends = ({ data }) => {
  const fixedMin = 0;
  const fixedMax = 180;

  return (
    <svg width={legendWidth * 2 + marginLeft + marginRight} height={legendHeight + marginTop + marginBottom}>
      <DiscreteLegend fixedMin={fixedMin} fixedMax={fixedMax} />
      <ContinuousLegend fixedMin={fixedMin} fixedMax={fixedMax} />
      <text x={marginLeft} y={marginTop + legendHeight + 20} textAnchor="middle">
        Discrete Legend
      </text>
      <text x={marginLeft + legendWidth + 10} y={marginTop + legendHeight + 20} textAnchor="middle">
        Continuous Legend
      </text>
    </svg>
  );
};

export default allLegends;
