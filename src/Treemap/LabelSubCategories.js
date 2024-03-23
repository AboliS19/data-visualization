import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const LabelSubCategories = ({ data }) => {
  const [svgRendered, setSvgRendered] = useState(false);

  useEffect(() => {
    if (!svgRendered && data && data.length > 0) {
      const margin = { top: 50, right: 25, bottom: 45, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      let svg = d3.select("#label-sub-categories").select("svg");

      if (svg.empty()) {
        svg = d3.select("#label-sub-categories")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      }

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

      svg.selectAll("*").remove();

      const cell = svg.selectAll("g")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      cell.append("rect")
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
          else if (d.depth===2){
            return "gray";
          }
        })
        .attr("rx", 5)
        .attr("stroke", "black");

      // Render text for the outermost rectangle (depth 0)
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(root.data.title);

        cell.append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", (d) => d.depth === 0 ? "white" : "black")
        .text((d) => d.data.title);

    //   cell.filter((d) => d.depth !== 2) // Filter out elements at depth 2
    //     .append("text")
    //     .attr("x", (d) => (d.x1 - d.x0) / 2)
    //     .attr("y", 20)
    //     .attr("text-anchor", "middle")
    //     .attr("fill", (d) => d.depth === 0 ? "white" : "black")
    //     .text((d) => d.data.title);

      setSvgRendered(true);
    }
  }, [data, svgRendered]);

  return (
    <div id="label-sub-categories"></div>
  );
}

export default LabelSubCategories;
