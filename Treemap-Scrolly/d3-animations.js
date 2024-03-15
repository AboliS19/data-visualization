// Set the dimensions and margins of the graph
const margin = { top: 50, right: 25, bottom: 45, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left-50 },${margin.top})`);

  
  const financeCategory = data[0].children.find(category => category.title === "Finance");

  const financeMin = Math.min(...financeCategory.children.map(child => child.magnitude));
  const financeMax = Math.max(...financeCategory.children.map(child => child.magnitude));
  const educationCategory = data[0].children.find(category => category.title === "Education");
const shoppingCategory = data[0].children.find(category => category.title === "Shopping");

const educationMin = Math.min(...educationCategory.children.map(child => child.magnitude));
const educationMax = Math.max(...educationCategory.children.map(child => child.magnitude));

const shoppingMin = Math.min(...shoppingCategory.children.map(child => child.magnitude));
const shoppingMax = Math.max(...shoppingCategory.children.map(child => child.magnitude));

const educationColorScale = d3.scaleSequential()
  .interpolator(d3.interpolateOranges)
  .domain([educationMin, educationMax]);

const shoppingColorScale = d3.scaleSequential()
  .interpolator(d3.interpolateGreens)
  .domain([shoppingMin, shoppingMax]);
  const financeColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([financeMin, financeMax]);

  
  svg.selectAll("*").remove(); 

  const root = d3.hierarchy(data[0])
    .sum((d) => d.magnitude)
    .sort((a, b) => b.value - a.value);

  // Create a treemap layout
  const treemapLayout = d3.treemap()
    .size([width, height])
    .paddingOuter(10)
    .paddingTop(30)
    .paddingInner(3)
    .round(true);

  // Compute treemap layout
  treemapLayout(root);

  // Create groups for each node
  const cell = svg.selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  // Draw rectangles for each node
  cell.append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => d.depth === 0 ? "white" : d.depth === 1 ? financeColorScale(d.data.magnitude) : "lightgreen")
    .attr("rx",5)
    .attr("stroke", "black");


    

  // Add text labels
  cell.append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill",(d) =>  "black")
    .text((d) => d.data.title);

  // Add labels for magnitudes
  cell.filter((d) => d.depth === 2)
    .append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", (d) => (d.y1 - d.y0) / 2+20)
    .attr("text-anchor", "middle")
    .text((d) => d.data.magnitude);

    function updateTreemap(index) {
      
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      //svg.selectAll("*").remove(); 
      const newData = d3.hierarchy(data[0])
        .sum((d) => d.magnitude)
        .sort((a, b) => b.value - a.value);
    
      // Calculate the maximum allowed depth based on the index
      const maxDepth = (index >= 9) ? 8 : index;
    
      const filteredData = newData.descendants().filter((d) => d.depth <= maxDepth);
    
      const treemapLayout = d3.treemap()
        .size([width, height])
        .paddingOuter(30)
        .paddingTop(40)
        .paddingInner(3)
        .round(true);
    
      treemapLayout(newData);
    
      // Create groups for each node
      const cell = svg.selectAll("g")
        .data(filteredData, (d) => d.data.title);
    
      // Exit old elements
      cell.exit().remove();
    
      // Enter new elements
      const enterCell = cell.enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);
    
    
      // Draw rectangles for each node
      enterCell.append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => {
          if (d.depth === 0) {
            return "black"; // Root category color
        } else if (d.depth === 1) {
            // Example: Change color based on specific category titles
            if (d.data.title === "Finance") {
                return "lightblue";
            } else if (d.data.title === "Shopping") {
                return "lightgreen";
            } else {
                return "orange"; // Default color for other categories
            }
        }else if (d.depth === 2) {
          // Example: Change color based on specific category titles
          if (d.parent.data.title === 'Finance' ) {
              return financeColorScale(d.data.magnitude);
          } else if (d.parent.data.title === "Shopping") {
              return shoppingColorScale(d.data.magnitude);
          } else if (d.parent.data.title === "Education"){
              return educationColorScale(d.data.magnitude); // Default color for other categories
          }
          else{
            return "orange";
          }
        }
        })
        .attr("rx",5)
        .attr("stroke", "black");

      // Add text labels
      enterCell.append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill",(d) => d.depth === 0 ? "white" : "black")
        .text((d) => d.data.title);

      // Add labels for magnitudes
      enterCell.filter((d) => d.depth === 2)
        .append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .text((d) => d.data.magnitude);
    }
    