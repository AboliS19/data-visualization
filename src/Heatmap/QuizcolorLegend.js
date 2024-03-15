import React from 'react';
import * as d3 from 'd3';

const legendWidth = 50; // Increased legend width for better visibility
const legendHeight = 400;
const marginTop = 10;
const marginLeft = 50;
const marginRight = 200;
const marginBottom = 70; // to adjust the alignment of the color legend w.r.t the heatmap graph

const ColorLegend = ({ data }) => {
  // Extracting the 'value' field from each data point
  const values = data.map(d => d.value);
  const minValue = d3.min(values); // Find the minimum xvalue
  const maxValue = d3.max(values); // Find the maximum value
  
  const numColors = 10; // Number of colors in the color scale

  // Define the color scale range using appropriate colors
  const colorScale = d3
    .scaleSequential(d3.interpolateYlOrRd)
    // .interpolate(d3.interpolateYlOrRd) // Use YlOrRd color scheme
    .domain([maxValue, minValue]); // Set the domain based on the min and max values

  const colorDomain = d3.range(numColors).map((d) => (d / (numColors - 1)) * (maxValue - minValue) + minValue);

  const colorHeight = legendHeight / numColors ;

  return (
    <svg width={legendWidth + marginLeft + marginRight} height={legendHeight + marginTop + marginBottom}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {colorDomain.map((d, i) => (
          <g key={i} transform={`translate(0, ${i * colorHeight})`}>
            <rect width={legendWidth - 25} height={colorHeight} fill={colorScale(d)} />
          </g>
        ))}
        <g transform={`translate(${legendWidth - 20}, 0)`}>
          <text x={10} y={5} textAnchor="start" fontSize="10">
            {maxValue.toFixed()}
          </text>
          <text x={10} y={legendHeight - 10} textAnchor="start" fontSize="10">
            {minValue.toFixed()}
          </text>
          <line x1={0} x2={0} y1={0} y2={legendHeight} stroke="black" />
        </g>
      </g>
    </svg>
  );
};

export default ColorLegend;
