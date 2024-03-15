import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const OuterRectangle = ({ rendered }) => {
  useEffect(() => {
    if (!rendered) {
      const margin = { top: 50, right: 25, bottom: 45, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select("#outer_rectangle")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const outerRectData = [
        {
          title: "Google Play Store",
          children: []
        }
      ];

      const root = d3.hierarchy(outerRectData[0]);

      const outerRectangle = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      // Adding CSS properties for the outermost rectangle
      outerRectangle.style("fill", "green");
      outerRectangle.style("opacity", "0.9"); // Example CSS property, adjust as needed
      
      // Add text label
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 10)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text("Google Play Store");

    }
  }, [rendered]);

  return (
    <div id="outer_rectangle"></div>
  );
}

export default OuterRectangle;
