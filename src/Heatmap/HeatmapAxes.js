import React from 'react';
import * as d3 from 'd3';

const MARGIN = { top: 20, right: 5, bottom: 80, left: 150 };

const HeatmapAxes = ({ data }) => {
  const width = 580;
  const height = 470;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = [...new Set(data.map((d) => d.y))];
  const allXGroups = [...new Set(data.map((d) => d.x))];

  const xScale = d3.scaleBand().range([0, boundsWidth]).domain(allXGroups).padding(0.05);
  const yScale = d3.scaleBand().range([boundsHeight, 0]).domain(allYGroups).padding(0.05);

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    const [mainLabel, ...unitParts] = name.split(/ (?![^(]*\))/);

    return (
      <g key={i}>
        <text x={xPos + xScale.bandwidth() / 2} y={boundsHeight + MARGIN.bottom / 3} textAnchor="middle" dominantBaseline="middle" fontSize={13}>
          {mainLabel}
        </text>
        <text x={xPos + xScale.bandwidth() / 2} y={boundsHeight + (MARGIN.bottom / 4) * 2} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#000">
          {unitParts.join(' ')}
        </text>
      </g>
    );
  });

  const yLabels = allYGroups.map((name, i) => (
    <text key={i} x={-MARGIN.left / 9} y={yScale(name) + yScale.bandwidth() / 2} textAnchor="end" dominantBaseline="middle" fontSize={13}>
      {name}
    </text>
  ));

  // Add x-axis line and label
  const xAxisLine = <line x1={-20} x2={boundsWidth} y1={boundsHeight + 10} y2={boundsHeight + 10} stroke="blue" strokeWidth={3}/>;
  const xAxisLabel = (
    <text x={boundsWidth / 2} y={boundsHeight + MARGIN.bottom - 8} textAnchor="middle" dominantBaseline="middle" fontWeight="bold" fontSize={15}>
      CHANNEL TYPES
    </text>
  );

  // Add y-axis line and label
  const yAxisLine = <line x1={-10} x2={-10} y1={0} y2={boundsHeight + 20} stroke="red" strokeWidth={3}/>;
  const yAxisLabel = (
    <text x={-MARGIN.left + 120 / 2} y={boundsHeight / 45} textAnchor="middle" fontSize={15} fontWeight="bold" transform="rotate(-1800)">
      COUNTRIES
    </text>
  );

  return (
    <svg width={width} height={height}>
      <g width={boundsWidth} height={boundsHeight} transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}>
        {xLabels}
        {yLabels}
        {xAxisLine}
        {xAxisLabel}
        {yAxisLine}
        {yAxisLabel}
      </g>
    </svg>
  );
};

export default HeatmapAxes;
