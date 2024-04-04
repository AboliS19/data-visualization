import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const QTreemap1 = ({ data }) => {
  const [svgRendered, setSvgRendered] = useState(false); // Set initial state to false

  useEffect(() => {
    if (!svgRendered && data && data.length > 0) { // Check if data is not empty
      const margin = { top: 50, right: 25, bottom: 45, left: 50 };
      const width = 1500 - margin.left - margin.right;
      const height = 800 - margin.top - margin.bottom;

      let svg = d3.select("#qtreemap-container").select("svg");

      if (svg.empty()) {
        svg = d3.select("#qtreemap-container")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      }
      
      const artsCategory = data[0].children.find(category => category.title === "Arts and Photography");
      const childrensBooksCategory = data[0].children.find(category => category.title === "Childrens books");
      const computersCategory = data[0].children.find(category => category.title === "Computers and Internet");
      const mysteryCategory = data[0].children.find(category => category.title === "Mystery");
      const nonFictionCategory = data[0].children.find(category => category.title === "NonFiction");
      const romanceCategory = data[0].children.find(category => category.title === "Romance");

      const artsMin = Math.min(...artsCategory.children.map(child => child.magnitude));
      const artsMax = Math.max(...artsCategory.children.map(child => child.magnitude));

      const childrensBooksChildren = childrensBooksCategory.children;

      const childrensBooksMin = Math.min(...childrensBooksChildren.map(child => child.magnitude));
      const childrensBooksMax = Math.max(...childrensBooksChildren.map(child => child.magnitude));


      const computersMin = Math.min(...computersCategory.children.map(child => child.magnitude));
      const computersMax = Math.max(...computersCategory.children.map(child => child.magnitude));

      const mysteryMin = Math.min(...mysteryCategory.children.map(child => child.magnitude));
      const mysteryMax = Math.max(...mysteryCategory.children.map(child => child.magnitude));

      const nonFictionMin = Math.min(...nonFictionCategory.children.map(child => child.magnitude));
      const nonFictionMax = Math.max(...nonFictionCategory.children.map(child => child.magnitude));

      const romanceMin = Math.min(...romanceCategory.children.map(child => child.magnitude));
      const romanceMax = Math.max(...romanceCategory.children.map(child => child.magnitude));

      const artsColorScale = d3.scaleSequential()
        .interpolator(d3.interpolateOranges)
        .domain([artsMin, artsMax]);

      const childrensBooksColorScale = d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([childrensBooksMin, childrensBooksMax]);

      const computersColorScale = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([computersMin, computersMax]);

      const mysteryColorScale = d3.scaleSequential()
        .interpolator(d3.interpolatePurples)
        .domain([mysteryMin, mysteryMax]);

      const nonFictionColorScale = d3.scaleSequential()
        .interpolator(d3.interpolateReds)
        .domain([nonFictionMin, nonFictionMax]);

      const romanceColorScale = d3.scaleSequential()
        .interpolator(d3.interpolatePurples)
        .domain([romanceMin, romanceMax]);

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
            if (d.data.title === "Arts and Photography") {
              return "orange";
            } else if (d.data.title === "Childrens books") {
              return "green";
            } else if (d.data.title === "Computers and Internet") {
              return "blue";
            } else if (d.data.title === "Mystery") {
              return "purple";
            } else if (d.data.title === "NonFiction") {
              return "red";
            } else if (d.data.title === "Romance") {
              return "pink";
            }
          } else if (d.depth === 2) {
            // Change color based on parent category
            if (d.parent.data.title === 'Arts and Photography') {
              return artsColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "Childrens books") {
              return childrensBooksColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "Computers and Internet") {
              return computersColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "Mystery") {
              return mysteryColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "NonFiction") {
              return nonFictionColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "Romance") {
              return romanceColorScale(d.data.magnitude);
            }
          }
        })
        .attr("rx", 5)
        .attr("stroke", "black");

      svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20) 
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "20px") 
      .style("font-weight", "bold") // Make the text bold
      .text(root.data.title);

      childrensBooksChildren.forEach((d, i) => {
        const childrensBooksGroup = cell.filter((cellData) => cellData.data.title === "Childrens Books");
        childrensBooksGroup.append("rect")
          .attr("x", d.x0)
          .attr("y", d.y0)
          .attr("width", d.x1 - d.x0)
          .attr("height", d.y1 - d.y0)
          .attr("fill", childrensBooksColorScale(d.magnitude))
          .attr("rx", 5)
          .style("font-size", "14px") 
          .attr("stroke", "black");
      });

      cell.append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
    //   .attr("fill", (d) => d.depth === 0 ? "white" : "black")
        .style("font-size",(d) => { if ((d) => d.depth === 1 ){
return "18px"
        }
      else{
        return "16px"
      }
      })
        .style("font-weight", "bold")
        .style("fill", (d) => {
          // Check if the text content is "hello"
          if (d.data.title === "Book Genre Sales" ) {
            return "white"; // Set color to red
        }
         else if (d.data.title === "Age 3-5" ) {
              return "white"; // Set color to red
          }
         else if (d.data.title === "Young Adult" ) {
            return "white"; // Set color to red
        }else if (d.data.title === "Fashion" ) {
          return "white"; // Set color to red
      } else if (d.data.title === "Fitness" ) {
        return "white"; // Set color to red
    } 
        else if (d.data.title === "Sports" ) {
          return "white"; // Set color to red
      } else if (d.data.title === "Crime" ) {
        return "white"; // Set color to red
    }else if (d.data.title === "How to Crafts" ) {
      return "white"; // Set color to red
  }
          else {
              return "black"; // Set default color to black
          }
      })
        .text((d) => d.data.title);
      // cell.filter((d) => d.depth === 2)
      //   .append("text")
      //   .attr("x", (d) => (d.x1 - d.x0) / 2)
      //   .attr("y", (d) => (d.y1 - d.y0) / 2 + 20)
      //   .attr("text-anchor", "middle")
      //   .text((d) => d.data.magnitude);

      setSvgRendered(true);
    }
  }, [data, svgRendered]);

  return (
    <div id="qtreemap-container"></div>
  );
}

export default QTreemap1;

