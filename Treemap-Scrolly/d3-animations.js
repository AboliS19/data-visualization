// Set the dimensions and margins of the graph
const margin = { top: 50, right: 25, bottom: 45, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("position", "absolute") // Set position to absolute
  .style("left", "250px") // Adjust these values based on your margin setup
  .style("top", "0px") // Adjust these values based on your margin setup
  .append("g")
  .attr("transform", `translate(${margin.left },${margin.top})`);

const svg2 = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right +2000)
  .attr("height", height + margin.top + margin.bottom+400)
  .style("position", "absolute") // Set position to absolute
  .style("left", "250px") // Ensure svg2 is in the exact same position as svg
  .style("top", "0px")
  .style("visibility", "hidden") // Initially hidden
  .append("g")
  .attr("transform", `translate(${margin.left },${margin.top})`);

  const imageSvg = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("position", "absolute")
  .style("left", "250px")
  .style("top", "0px")
  .style("visibility", "hidden"); // Set to hidden initially if needed

// Append an image to the SVG container
imageSvg.append("image")
  .attr("href", "treemapDataset.png") // Use 'href' for the image source
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("x", 0) // Set the x position
  .attr("y", 0); // Set the y position

  
  const financeCategory = data[0].children.find(category => category.title === "Finance");
  const financeMin = Math.min(...financeCategory.children.map(child => child.magnitude));
  const financeMax = Math.max(...financeCategory.children.map(child => child.magnitude));
  
  const educationCategory = data[0].children.find(category => category.title === "Education");
const shoppingCategory = data[0].children.find(category => category.title === "Shopping");

const educationMin = Math.min(...educationCategory.children.map(child => child.magnitude));
const educationMax = Math.max(...educationCategory.children.map(child => child.magnitude));

const shoppingMin = Math.min(...shoppingCategory.children.map(child => child.magnitude));
const shoppingMax = Math.max(...shoppingCategory.children.map(child => child.magnitude));

const NFCategory = data2[0].children.find(category => category.title === "NonFiction");
const NFMin = Math.min(...NFCategory.children.map(child => child.magnitude));
  const NFMax = Math.max(...NFCategory.children.map(child => child.magnitude));
  const NFColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([NFMin, NFMax]);

    const CBCategory = data2[0].children.find(category => category.title === "Childrens books");
const CBMin = Math.min(...CBCategory.children.map(child => child.magnitude));
  const CBMax = Math.max(...CBCategory.children.map(child => child.magnitude));
  const CBColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateReds)
    .domain([CBMin, CBMax]);

    const RCategory = data2[0].children.find(category => category.title === "Romance");
const RMin = Math.min(...RCategory.children.map(child => child.magnitude));
  const RMax = Math.max(...RCategory.children.map(child => child.magnitude));
  const RColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateGreens)
    .domain([RMin, RMax]);

    const MCategory = data2[0].children.find(category => category.title === "Mystery");
const MMin = Math.min(...MCategory.children.map(child => child.magnitude));
  const MMax = Math.max(...MCategory.children.map(child => child.magnitude));
  const MColorScale = d3.scaleSequential()
    .interpolator(d3.interpolatePurples)
    .domain([MMin, MMax]);

    const CICategory = data2[0].children.find(category => category.title === "Computers and Internet");
const CIMin = Math.min(...CICategory.children.map(child => child.magnitude));
  const CIMax = Math.max(...CICategory.children.map(child => child.magnitude));
  const CIColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([CIMin, CIMax]);

    const APCategory = data2[0].children.find(category => category.title === "Arts and Photography");
const APMin = Math.min(...APCategory.children.map(child => child.magnitude));
  const APMax = Math.max(...APCategory.children.map(child => child.magnitude));
  const APColorScale = d3.scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([APMin, APMax]);



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

    const root2 = d3.hierarchy(data2[0])
    .sum((d) => d.magnitude)
    .sort((a, b) => b.value - a.value);
    
  // Create a treemap layout
  const treemapLayout = d3.treemap()
    .size([width, height])
    .paddingOuter(10)
    .paddingTop(30)
    .paddingInner(3)
    .round(true);

    const treemapLayout2 = d3.treemap()
    .size([width, height])
    .paddingOuter(10)
    .paddingTop(30)
    .paddingInner(3)
    .round(true);

  // Compute treemap layout
  treemapLayout(root);
  treemapLayout(root2);

  // Create groups for each node
  const cell = svg.selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
    .data(root.descendants())
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => {
      if (d.depth === 0) {
        return "white"; // Root category color
    }if (d.depth === 1) {
        // Example: Change color based on specific category titles
        if (d.data.title === "Finance") {
            return "lightblue";
        } else if (d.data.title === "Shopping") {
            return "lightgreen";
            
        } else if (d.data.title === "Childrens books") {
          return "green";}
        else {
            return "orange"; // Default color for other categories
        }
    }if (d.depth === 2) {
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

    const cell2 = svg2.selectAll("g")
    .data(root2.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    cell2.append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => {
      if (d.depth === 0) {
        return "white"; // Root category color
    }if (d.depth === 1) {
        // Example: Change color based on specific category titles
        if (d.data.title === "Arts and Photography") {
            return "lightblue";
        } else if (d.data.title === "Childrens books") {
            return "lightgreen";
        } else {
            return "orange"; // Default color for other categories
        }
    }if (d.depth === 2) {
      // Example: Change color based on specific category titles
      if (d.parent.data.title === 'Arts and Photography' ) {
          return financeColorScale(d.data.magnitude);
      } else if (d.parent.data.title === "Childrens books") {
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
  cell.filter((d) => d.depth ==0).append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill",(d) =>  "black")
    .style("font-size", "21px")
    .attr("font-weight", "500")
    .text((d) => d.data.title);

    cell.filter((d) => d.depth ==1).append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill",(d) =>  "black")
    .style("font-size", "18px")
    .attr("font-weight", "450")
    .text((d) => d.data.title);



    cell.filter((d) => d.depth === 2)
    .append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("class", "sub-label")
    .style("fill",  (d) => d.data.magnitude < 21 ? "black" : "white")
    .style("font-size", "14px")
    .style("opacity", (d) => d.data.magnitude < 6 ? "0" : "1")
    .text((d) => d.data.title);
    

  // Add labels for magnitudes
  cell.filter((d) => d.depth === 2)
    .append("text")
    .attr("class", "magnitude-label")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", (d) => (d.y1 - d.y0) / 2+20)
    .attr("text-anchor", "middle")
    .text((d) => d.data.magnitude)
    .attr("fill", (d) => d.data.magnitude<21? "black":"white");



    cell2.filter((d) => d.depth ==0).append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill",(d) =>  "black")
    .style("font-size", "21px")
    .attr("font-weight", "500")
    .text((d) => d.data.title);

    cell2.filter((d) => d.depth ==1).append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill",(d) =>  "black")
    .style("font-size", "18px")
    .attr("font-weight", "450")
    .style("font-size", (d) => d.data.title == "Arts and Photography" || d.data.title == "Computers and Internet" ? "13px" : "18px")
    .text((d) => d.data.title);



    cell2.filter((d) => d.depth === 2)
    .append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("class", "sub-label2")
    .style("font-size", "14px")
    .style("opacity", (d) => d.data.magnitude > 5000 ? "1" : "0")
    .style("fill", (d) => d.data.magnitude<11100 || d.data.magnitude == 16092? "black":"white")
    .text((d) => d.data.title);
    

  // Add labels for magnitudes
  cell2.filter((d) => d.depth === 2)
    .append("text")
    .attr("class", "magnitude-label2")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", (d) => (d.y1 - d.y0) / 2+20)
    .attr("text-anchor", "middle")
    .text((d) => d.data.magnitude)
    .style("opacity", (d) => d.data.magnitude < 5000 ? "0" : "1")
    .style("fill", (d) => d.data.magnitude<11100? "black":"white");

function updateTreemap(index) {
  const svg = d3.select("#avicii_viz");

        svg.selectAll("rect") 
          .filter(function(d) { return d.depth === 1 || d.depth === 2; }) 
          .attr("fill", (d)=>{
            
            if(index==7){
              if (d.depth === 1) {
                // Example: Change color based on specific category titles
                if (d.data.title === "Finance") {
                    return "lightblue";
                } else if (d.data.title === "Shopping") {
                    return "lightgreen";
                } else {
                    return "orange"; // Default color for other categories
                }
              }
              else{return "white";}
            }
            
            else if (index < 8 && index !=0){
              return "white";
            }
            
            else{
              if (d.depth === 0) {
                return "white"; // Root category color
            }if (d.depth === 1) {
                // Example: Change color based on specific category titles
                if (d.data.title === "Finance") {
                    return "lightblue";
                } else if (d.data.title === "Shopping") {
                    return "lightgreen";
                } else {
                    return "orange"; // Default color for other categories
                }
            }if (d.depth === 2) {
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
            }
          });

          svg.selectAll(".sub-label")
    .style("fill", (d) =>{
      if(index ==0 ){
        
        console.log(d.data.magnitude);
        if(d.data.magnitude<21){
          
          return "black";
        } 
        else{
          return "white";
        }
      }
      else if(index ==6){
        return "black"; 
        
      }
      else if(index >7){
        if(d.data.magnitude<21){
          console.log(d.data.magnitude,"blck");
          return "black";
        } 
        else{
          console.log(d.data.magnitude);
          return "white";
        }
      }
      else{
        console.log("hi");
        return "black";
        
      }
    } )
    .style("opacity", (d) => d.data.magnitude < 6 ? "0" : "1");

          svg2.selectAll("rect") 
          .filter(function(d) { return d.depth === 1 || d.depth === 2; }) 
          .attr("fill", (d)=>{
            
          
              if (d.depth === 0) {
                return "white"; // Root category color
            }if (d.depth === 1) {
                // Example: Change color based on specific category titles
                if (d.data.title === "NonFiction") {
                    return "lightblue";
                } else if (d.data.title === "Childrens books") {
                    return "#FFCCCC";
                } else if (d.data.title === "Romance") {
                  return "lightgreen";
                }
                else if (d.data.title === "Mystery") {
                  return "#C3B1E1";
                }else if (d.data.title === "Arts and Photography") {
                  return "#FFA07A";
                }else {
                    return "#7FDBFF"; // Default color for other categories
                }
            }if (d.depth === 2) {
              // Example: Change color based on specific category titles
              if (d.parent.data.title === 'NonFiction' ) {
                  return NFColorScale(d.data.magnitude);
              } else if (d.parent.data.title === "Childrens books") {
                  return CBColorScale(d.data.magnitude);
              } else if (d.parent.data.title === "Romance"){
                  return RColorScale(d.data.magnitude); // Default color for other categories
              }
              else if (d.parent.data.title === "Mystery") {
                return MColorScale(d.data.magnitude);
            } else if (d.parent.data.title === "Arts and Photography"){
                return APColorScale(d.data.magnitude); // Default color for other categories
            }
              else{
                return CIColorScale(d.data.magnitude);
              }
            }
            }
          );

          svg2.selectAll(".sub-label2")
          .style("opacity", (d) => d.data.magnitude < 5000 ? "0" : "1")
    .style("fill", (d) =>{
      if(d.data.title == "Baby Books"){
        return "black";
      }
      else{
        if(d.data.magnitude<11100){
          return "black";
        } 
        else{return "white";}
      }
    } );

    svg2.selectAll(".magnitude-label")
          .style("opacity", (d) => d.data.magnitude < 5000 ? "0" : "1")
    .style("fill", (d) =>{
      if(d.data.title == "Baby Books"){
        return "black";
      }
      else{
        if(d.data.magnitude<11100){
          return "black";
        } 
        else{return "white";}
      }
    } );
    //svg.append("text")
  
    
        
        if(index ===0){
          svg.selectAll("rect") 
          .filter(function(d) { return d.depth === 1 || d.depth === 2; }) 
          .attr("display", "block"); 
          svg.selectAll(".magnitude-label")
    .attr("display", "block"); 
    svg.selectAll(".sub-label")
    .attr("display", "block"); 
          imageSvg.style("visibility", "hidden");
        }
        if(index===1){
    svg.selectAll("rect")
    .filter(function(d) { return d.depth !=0; }) 
    .attr("display", "none"); 
    svg.selectAll(".magnitude-label")
    .attr("display", "none"); 
    svg.selectAll(".sub-label")
    .attr("display", "none"); 
    d3.selectAll("text") 
          .data(root.descendants())
          .filter(function(d) { return d.depth === 1; }) 
          .attr("display", "none");
          imageSvg.style("visibility", "hidden");

        }
        if(index ===2){
          svg.attr("visibility", "visible");
          svg.selectAll("rect") 
          .filter(function(d) { return d.depth === 1 || d.depth === 2; }) 
          .attr("display", "none"); 
          d3.selectAll("rect") 
          .filter(function(d) { return d.depth === 1; })
          .attr("display", "none");

        }
        if(index ===3){
          d3.selectAll("rect") 
          .filter(function(d) { return d.depth === 1; })
          .attr("display", "block"); 
          d3.selectAll("rect") 
          .data(root.descendants())
          .filter(function(d) { return d.depth === 2; }) 
          .attr("display", "none");
        }
        if(index ===4){
          d3.selectAll("rect") 
          .data(root.descendants())
          .filter(function(d) { return d.depth === 2; }) 
          .attr("display", "block"); 
          d3.selectAll("text") 
          .data(root.descendants())
          .filter(function(d) { return d.depth === 1; }) 
          .attr("display", "none");
        }
        if(index ===5){
          svg.selectAll("text") 
          .filter(function(d) { return d.depth === 1; }) 
          .attr("display", "block");
          svg.selectAll(".sub-label") 
          .attr("display", "none");
          svg.selectAll("rect")
          .filter(function(d) { return d.depth === 2; })
          .attr("display", "block");
          
        }
        if(index ===6){
          svg.selectAll(".sub-label") 
          .attr("display", "block");
          svg.selectAll(".magnitude-label") 
          .attr("display", "none");
          d3.selectAll("rect")
          .data(root.descendants())
          .filter(function(d) { return d.depth === 2; })
          .attr("display", "block");
        }
        if(index===7){
          d3.selectAll("rect")
          .filter(function(d) { return d.depth === 2; })
          .attr("display", "none");
          svg.selectAll(".sub-label") 
          .attr("display", "none");
        }
        if (index==8){
          svg.selectAll(".sub-label")
          .attr("display", "block");
          d3.selectAll("rect")
          .filter(function(d) { return d.depth === 2; })
          .attr("display", "block");
        }
        if(index ===9){
          d3.selectAll(".magnitude-label") 
          .attr("display", "none");

        const zoom = d3.zoom()
            .scaleExtent([1, 8]) // Example scale extent
            .on('zoom', (event) => {
                // Apply the zoom transform to the main group containing the treemap
                svg.attr('transform', event.transform);
            });

        // Initial zoom focus parameters
        const focusX = 100, focusY = 50, focusWidth = 300, focusHeight = 200;
        const scaleX = width / focusWidth;
        const scaleY = height / focusHeight;
        const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio
        const translateX = -focusX * scale + (width - focusWidth * scale) / 2;
        const translateY = -focusY * scale + (height - focusHeight * scale) / 2;
        const initialTransform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);

        // Apply the initial zoom
        svg.call(zoom.transform, initialTransform);
        
        }
        if(index ===10){
        d3.selectAll(".magnitude-label") 
          .attr("display", "block");
        }
        if(index ===11){
          d3.selectAll(".magnitude-label") 
          .style("visibility", "hidden");
          }
        if (index === 12) {
          svg.style("visibility", "hidden");
          svg2.style("visibility", "visible");
          svg2.selectAll(".magnitude-label2").style("visibility", "hidden");
      } else {
          svg.style("visibility", "visible");
          svg2.style("visibility", "hidden");
      }
      if (index === 13) {
        svg.style("visibility", "hidden");
        imageSvg.style("visibility", "visible");
      }
    }
    