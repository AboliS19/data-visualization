import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TreeDivideRectangle = ({ data }) => {
  useEffect(() => {
    const margin = { top: 50, right: 25, bottom: 45, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#outer-rectangle-divided-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleOrdinal(d3.schemePaired);
    svg.selectAll("*").remove();

    const root = d3.hierarchy(data[0])
      .sum((d) => d.magnitude)
      .sort((a, b) => b.value - a.value);

    const treemapLayout = d3.treemap()
      .size([width, height])
      .paddingOuter(10)
      .paddingTop(30)
      .paddingInner(3)
      .round(true);

    treemapLayout(root);

    const cell = svg.selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    // Filter out the third level
    const filteredData = root.descendants().filter(d => d.depth < 2);

    cell.filter(d => filteredData.includes(d)).append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "white"; // Root category color
        } else if (d.depth === 1) {
          // Change color based on specific category titles
          if (d.data.title === "Finance") {
            return "lightgray";
          } else if (d.data.title === "Shopping") {
            return "lightgray";
          } else {
            return "lightgray"; // Default color for other categories
          }
        }
      })
      .attr("rx", 5)
      .attr("stroke", "black");

    // cell.filter(d => filteredData.includes(d)).append("text")
    //   .attr("x", (d) => (d.x1 - d.x0) / 2)
    //   .attr("y", 20)
    //   .attr("text-anchor", "middle")
    //   .attr("fill", (d) => d.depth === 0 ? "black" : "black")
    //   .text((d) => d.data.title);

  }, [data]);

  return (
    <div id="outer-rectangle-divided-container"></div>
  );
}

export default TreeDivideRectangle;
