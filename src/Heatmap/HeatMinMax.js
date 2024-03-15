import React from 'react';
import * as d3 from 'd3';
import ColorLegend from './ColorLegend'; // Import the ColorLegend component

const MARGIN = { top: 20, right: 5, bottom: 80, left: 150 };

const HeatMinMaxcells = ({ data }) => {
  // Define constants and scales

  const width = 580;
  const height = 470;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = [...new Set(data.map((d) => d.y))];
  const allXGroups = [...new Set(data.map((d) => d.x))];

  const xScale = d3.scaleBand().range([0, boundsWidth]).domain(allXGroups).padding(0.05);
  const yScale = d3.scaleBand().range([boundsHeight, 0]).domain(allYGroups).padding(0.05);

  // Define color scales for min and max values
  const minValue = d3.min(data, d => d.value);
  const maxValue = d3.max(data, d => d.value);

  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([minValue, maxValue]);

  const strokeScale = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([3, 3.5]); // Adjust stroke thickness based on value

  const highlightedRects = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);
    const width = xScale.bandwidth();
    const height = yScale.bandwidth();
    const value = d.value.toFixed(2);

    const contrastColor = d3.lab(colorScale(d.value)).l > 50 ? '#000000' : '#ffffff';
    const cellColor = colorScale(d.value);
    const strokeWidth = strokeScale(d.value);

    let strokeColor = 'none';
    if (d.value === minValue) {
      strokeColor = '#0000FF'; // Blue stroke for min value
    } else if (d.value === maxValue) {
      strokeColor = '#FF00FF'; // Red stroke for max value
      // strokeColor = '#00FF00'; // Green stroke for max value   -- NEW
    }

    return (
      <g key={i}>
        <rect
          r={4}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={cellColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          rx={5}
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={13}
          fill={contrastColor}
        >
          {value}
        </text>
      </g>
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    // Split the label text into main label and unit
  const [mainLabel, ...unitParts] = name.split(/ (?![^(]*\))/); // Split based on space, but ignore spaces inside parentheses
  
  return (
    <g key={i}>
     {/* First line for the main label */}
     <text
       x={xPos + xScale.bandwidth() / 2}
       y={boundsHeight + MARGIN.bottom / 3}
       textAnchor="middle"
       dominantBaseline="middle"
       fontSize={12}
     >
       {mainLabel}
     </text>
     {/* Second line for the unit */}
     <text
       x={xPos + xScale.bandwidth() / 2 -2}
       y={boundsHeight + (MARGIN.bottom / 4) * 2} // Adjust the y position for the second line
       textAnchor="middle"
       dominantBaseline="middle"
       fontSize={12} // Adjust font size for the unit
       fill="#000" // Adjust color for the unit if needed
     >
      {unitParts} 
       {/* Join the unit parts with space and include parentheses */}

     </text>
     </g>
   );
 });

 const yLabels = allYGroups.map((name, i) => {
   const yPos = yScale(name) ?? 0;
   return (
     <text
       key={i}
       x={-MARGIN.left / 9}
       y={yPos + yScale.bandwidth() / 2}
       textAnchor="end"
       dominantBaseline="middle"
       fontSize={12}
     >
       {name}
     </text>
   );
 });

 // Add x-axis line and label
 const xAxisLine = <line x1={-20} x2={boundsWidth} y1={boundsHeight+10} y2={boundsHeight+10} stroke="black" />;
 const xAxisLabel = (
   <text
     x={boundsWidth / 2}
     y={boundsHeight + MARGIN.bottom - 7}
     textAnchor="middle"
     dominantBaseline="middle"
     fontWeight="bold"
     fontSize={14}
   >
   CHANNEL TYPE 
   </text>
 );

 // Add y-axis line and label
 const yAxisLine = <line x1={-10} x2={-10} y1={0} y2={boundsHeight +20} stroke="black" />;
 const yAxisLabel = (
   <text x={-MARGIN.left +120 / 2} y={boundsHeight / 45} textAnchor="middle" fontSize={14} fontWeight="bold" transform="rotate(-1800)">
     COUNTRIES
   </text>
 );
// Add title
const title = (
  <text x={width / 3} y={MARGIN.top-40} textAnchor="middle" dominantBaseline="hanging" fontWeight="bold" fontSize={15}>
   (Avg. subscribers in millions)
  </text>
);

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {highlightedRects}
          {xLabels}
          {yLabels}
          {xAxisLine}
          {xAxisLabel}
          {yAxisLine}
          {yAxisLabel}
          {title}
        </g>
      </svg>
      <ColorLegend data={data} />
    </div>
  );
};

export default HeatMinMaxcells;
