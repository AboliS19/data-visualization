import { useMemo } from 'react';
import * as d3 from 'd3';
import ColorLegend from './QuizcolorLegend'; // Import the ColorLegend component

const MARGIN = { top: 10, right: 5, bottom: 70, left: 150 };

export const HeatGraphQuiz = ({ data }) => {
  const width = 580,
    height = 470;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, boundsWidth]).domain(allXGroups).padding(0.01);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3.scaleBand().range([boundsHeight, 0]).domain(allYGroups).padding(0.01);
  }, [data, height]);

  // Calculate min and max values excluding zero values
const filteredData = useMemo(() => data.filter(d => d.value !== 0), [data]);
const [min, max] = d3.extent(filteredData.map(d => d.value));


  if (!min || !max) {
    return null;
  }

  const colorScale = d3.scaleSequential().interpolator(d3.interpolateYlOrRd).domain([min, max]);

  const allRects = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);
    const width = xScale.bandwidth();
    const height = yScale.bandwidth();
    const value = d.value.toFixed();

    const contrastColor = d3.lab(colorScale(d.value)).l > 50 ? '#000000' : '#ffffff';

    return (
      <g key={i}>
        <rect
          r={4}
          x={x}
          y={y}
          width={width}
          height={height}
          opacity={1}
          fill={colorScale(d.value)}
          rx={5}
          stroke={'white'}
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={0} // to not dispaly the values
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
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + (MARGIN.bottom / 4) * 2} // Adjust the y position for the second line
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11} // Adjust font size for the unit
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
        fontSize={13}
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
      y={boundsHeight + MARGIN.bottom - 12}
      textAnchor="middle"
      dominantBaseline="middle"
      fontWeight="bold"
      fontSize={13}
    >
      Popluation in the given years 
    </text>
  );

  // Add y-axis line and label
  const yAxisLine = <line x1={-10} x2={-10} y1={0} y2={boundsHeight +20} stroke="black" />;
  const yAxisLabel = (
    <text x={-MARGIN.left +120 / 2} y={boundsHeight / 45} textAnchor="middle" fontSize={15} fontWeight="bold" transform="rotate(-1800)">
      COUNTRIES
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
          {allRects}
          {xLabels}
          {yLabels}
          {xAxisLine}
          {xAxisLabel}
          {yAxisLine}
          {yAxisLabel}
        </g>
      </svg>
      <ColorLegend data={data} />
    </div>
  );
};
