
const nCol = 5;
const nRow = 5;
const n2Col = 6;

const Nutrition = [
  "Calories",	"Cholesterol"	,"Sugar","Total_Carbs","Caffeine"
];

const country = [
"USA",
"Japan",
"Russia",
"South_Korea",
"UK"
]

const genre = [
  "Music",	"Films",	"Entertainment"	,"Education",	"Show"
]

const country2 = [
  "Africa",
"Asia",
"Australia",
"Europe",
"Oceania"
  ]
  
  const year = [
    "1990",	"2000",	"2010",	"2015",	"2020",	"2022"
  ]

const Coffee = [
  "Americano",
  "Latte",
  "Mocha",
  "Macchiato",
  "Cappuccino",
];
const factors_units = [
  " ",
  "mg,",
  "g,",
  "g.",
  "mg."
];



const values = [
  [3,
    70,
    110,
    100,
    50],
  [1,
    10,
    21,
    17,
    8],
  [0,
    9,
    17,
    15,
    7],
  [5,
    75,
    60,
    70,
    60],
  [175,
    75,
    85,
    75,
    75],
];

const values2 = [
  [241,
    15.9,
    10.6,
    109.59,
    35.6	],
  [17,
    210.6,
    10.8,
    98.325,
    45.3],
  [16.6,
    7.89,
    10.6,
    47.8,
    98.7],
  [16.2,
    10.8965,
    10.6,
    67.8,
    34.78],
  [71.34,
    1.908,
    10.6,
    90.6,
    90.623],
];
const values3 = [
  [255.8,
    106.4,
    22.3,
    98.5,
    14.7],
  [307.4,
    195.2,
    46.6,
100.2,
39.8],
  [358.6,
    281.9,
    52.1,
205.3,
60.5],
  [395.3,
    337.3,
    94.1,
285.2,
85.1],
  [434.1,
    389.2,
    67.7,
198.6,
78.6],
[449.3,
  411.8,
  91.9,
  230.2,
  50.4],
];


const data = []

for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    data.push({
      x: genre[x],
      y: country[y],
      //z: factors_units[y],
      value: values2[x][y]
    });
  }
}
const data2 = []

for (let x = 0; x < n2Col; x++) {
  for (let y = 0; y < nRow; y++) {
    data2.push({
      x: year[x],
      y: country2[y],
      //z: factors_units[y],
      value: values3[x][y]
    });
  }
}



const margin = { top: 50, right: 30, bottom: 30, left: 300 };
const width = 800 - margin.left - margin.right +20;
const height = 560 - margin.top - margin.bottom ;
const legendWidth = 300;
const legendHeight = 40;



const svg2 = d3.select("#legend-container")

        const allYGroups = [...new Set(data.map(d => d.y))];
        const allYGroups2 = [...new Set(data2.map(d => d.y))];
        const allXGroups = [...new Set(data.map(d => d.x))];
        const allXGroups2 = [...new Set(data2.map(d => d.x))];
        //const allXGroups2 = [data.map(d => d.z)];



        const svg = d3.select("#heatmap-container")
            .append("svg")
            .attr("width", width+330)
            .attr("height", height +290)
            .attr("id", "#heatmap-container")
            .attr("transform", `translate(${margin.left},${margin.top-80})`);
            svg.selectAll("*").remove(); 

        const xScale = d3.scaleBand()
            .domain(allXGroups)
            .range([0, width])
            .padding(0.1);
          
        const xScale2 = d3.scaleBand()
            .domain(allXGroups2)
            .range([0, width])
            .padding(0.1);
            
            
            // Use the new dataset to create the bandwidth scale
            /*const xScale2 = d3.scaleBand()
              .domain(factors_units) // Use the duplicated dataset
              .range([0, width])
              .padding(0.1);*/

        const yScale = d3.scaleBand()
            .domain(allYGroups)
            .range([height, 0])
            .padding(0.1);

            const yScale2 = d3.scaleBand()
            .domain(allYGroups2)
            .range([height, 0])
            .padding(0.1);


        var rangeLegend = [241,0];
        var rangeLegend2 = [434,0];

        const zScale = d3.scalePoint()
        .domain(rangeLegend)
        .range([0, width-60]);

        const zScale2 = d3.scalePoint()
        .domain(rangeLegend2)
        .range([0, width-60]);
/*
        const heatmapData = [
          { y: 'United States', x: 'Music', value: 241 },
          { y: 'United States', x: 'Film & Animation', value: 17 },
          { y: 'United States', x: 'Entertainment', value: 16.6 },
          { y: 'United States', x: 'Education', value: 16.2 },
          { y: 'United States', x: 'Shows', value: 71.34 },
          { y: 'Japan', x: 'Music', value: 15.9 },
  { y: 'Japan', x: 'Film & Animation', value: 210.6 },
  { y: 'Japan', x: 'Entertainment', value: 7.89 },
  { y: 'Japan', x: 'Education', value: 10.8965 },
  { y: 'Japan', x: 'Shows', value: 1.908 },
  { y: 'Russia', x: 'Music', value: 10.6 },
  { y: 'Russia', x: 'Film & Animation', value: 10.8 },
  { y: 'Russia', x: 'Entertainment', value: 10.6 },
  { y: 'Russia', x: 'Education', value: 10.6 },
  { y: 'Russia', x: 'Shows', value: 10.6 },
  { y: 'South Korea', x: 'Music', value: 109.59 },
  { y: 'South Korea', x: 'Film & Animation', value: 98.325 },
  { y: 'South Korea', x: 'Entertainment', value: 47.8 },
  { y: 'South Korea', x: 'Education', value: 67.8 },
  { y: 'South Korea', x: 'Shows', value: 90.6 },
  { y: 'United Kingdom', x: 'Music', value: 35.6 },
  { y: 'United Kingdom', x: 'Film & Animation', value: 45.3 },
  { y: 'United Kingdom', x: 'Entertainment', value: 98.7 },
  { y: 'United Kingdom', x: 'Education', value: 34.78 },
  { y: 'United Kingdom', x: 'Shows', value: 90.623 }
      ];

      function generateHeatmapTable() {
        const tableContainer = document.createElement('svg');
        tableContainer.setAttribute('id', 'heatmapTableContainer');
    
        const table = document.createElement('table');
        table.setAttribute('id', 'heatmapTable');
    
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Category', 'Music', 'Film & Animation', 'Entertainment', 'Education', 'Shows'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Create table body
        const tbody = document.createElement('tbody');
        heatmapData.forEach(data => {
            const row = document.createElement('tr');
            Object.values(data).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
    
        // Append table to the container
        tableContainer.appendChild(table);
    
        return tableContainer;
    }
    
    // Function to append HTML table into SVG
    function appendTableToSVG() {
        const svg = document.getElementById('#heatmap-container'); // Replace 'yourSVGElementId' with your SVG element's ID
        const tableContainer = generateHeatmapTable();
        const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreignObject.setAttribute('width', '100%');
        foreignObject.setAttribute('height', '100%');
        foreignObject.appendChild(tableContainer);
        svg.appendChild(foreignObject);
    }
    
    // Call the function to append HTML table into SVG
    appendTableToSVG();
*/
            
        const [min = 0, max = 0] = d3.extent(data.map((d) => d.value));
        const ColorLegend = ({ data }) => {
          const [min, max] = d3.extent(data.map((d) => d.value));}

        var colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateYlOrRd)
            .domain([min, max]);


            const [min2 = 0, max2 = 0] = d3.extent(data2.map((d) => d.value));
        const ColorLegend2 = ({ data2 }) => {
          const [min2, max2] = d3.extent(data2.map((d) => d.value));}

        var colorScale2 = d3
            .scaleSequential()
            .interpolator(d3.interpolateYlOrRd)
            .domain([min2, max2]);
            
            
            svg.append("image")
            .attr("xlink:href", "Table.jpeg") // Set the path to your image
            .attr("class", "dataset")
            .attr("x", 50)  // Set the x-coordinate of the top-left corner of the image
            .attr("y", 50)  // Set the y-coordinate of the top-left corner of the image
            .attr("width", 700)  // Set the width of the image
            .attr("height", 500); 
            /*const legend = svg
        .append("g")
        .attr(
          "transform",
          `translate(10, 10)`
        );

        legend
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', d => colorScale(d.value))
            .attr('x', (d, i) => xScale(d.x))
            .attr('width', xScale.bandwidth())
            .attr('height', 15)*/

        
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", (d, i) => "rect-" + i)
            .attr("x", d => xScale(d.x)+130)
            .attr("y", d => yScale(d.y)+50)
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .attr("fill", d => colorScale(d.value))
            .attr("class", "heatmap-tile")
            .attr("rx",5);

          svg.selectAll("rect2")
            .data(data2)
            .enter()
            .append("rect")
            .attr("id", (d, i) => "rect2-" + i)
            .attr("x", d => xScale2(d.x)+130)
            .attr("y", d => yScale2(d.y)+50)
            .attr("width", xScale2.bandwidth())
            .attr("height", yScale2.bandwidth())
            .attr("fill", d => colorScale2(d.value))
            .attr("class", "heatmap-tile2")
            .attr("rx",5);

        svg.selectAll("tileData")
            .data(data)
            .enter()
            .append("text")
            .attr("id", (d, i) => "text-" + i)
            .attr("x", d => xScale(d.x)+130 + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.y)+50 + yScale.bandwidth() / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "20px")
            .attr("class", "tileData")
            .style("fill", d => d.value > 110 ? "white" : "black")
            .text(d => Math.round(d.value));

const fontSize =16;

            svg.selectAll(".x-label")
    .data(allXGroups)
    .enter()
    .append("text")
    .attr("class", "x-label")
    .attr("x", (name, i) => xScale(name) + 130 + xScale.bandwidth() / 2)
    .attr("y", height + 70) // Fixed y position for all labels
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging") // Align text to top
    .attr("font-size", fontSize)
    .selectAll("tspan")
    .data(name => name.split(" ")) // Split text into words
    .enter()
    .append("tspan")
    .attr("x", (name, i) => xScale(name) + 130 + xScale.bandwidth() / 2)
    .attr("dy", (d, i) => i === 1 ? fontSize : 0) // Move the second word down by font size
    .text(d => d);


            svg.selectAll(".x-label2")
    .data(allXGroups2)
    .enter()
    .append("text")
    .attr("class", "x-label2")
    .attr("x", (name, i) => xScale2(name) + 130 + xScale2.bandwidth() / 2)
    .attr("y", height + 70) // Fixed y position for all labels
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging") // Align text to top
    .attr("font-size", 16)
    .selectAll("tspan")
    .data(name => name.split(" ")) // Split text into words
    .enter()
    .append("tspan")
    .attr("x", (name, i) => xScale2(name) + 130 + xScale2.bandwidth() / 2)
    .attr("dy", (d, i) => i === 1 ? 16 : 0) // Move the second word down by font size
    .text(d => d);



            svg.selectAll(".y-label")
                .data(allYGroups)
                .enter()
                .append("text")
                .attr("id", name => name)
                .attr("class", "y-label")
                .attr("x", 125)
                .attr("y", name => yScale(name)+50 + yScale.bandwidth() / 2)
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "start")
                .attr("font-size", "15")
                .text(name => name);



                svg.selectAll(".y-label2")
                .data(allYGroups2)
                .enter()
                .append("text")
                .attr("id", name => name)
                .attr("class", "y-label2")
                .attr("x", 125)
                .attr("y", name => yScale2(name)+50 + yScale2.bandwidth() / 2)
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "start")
                .attr("font-size", "15")
                .text(name => name);

                
            svg.selectAll(".y-label-main")
            .data(allYGroups)
                .enter()
                .append("text")
                .attr("class", "y-label-main")
                //.style("writing-mode", "vertical-rl")
                //.style("text-orientation" ,"upright")
                .attr("x", 10)
                .attr("y", height/2 - 180 )
                .attr("font-size", "21")
                //.attr("transform", "rotate(-90)")
                .attr("font-weight", "bold")
                //.text("BEVERAGE");
                .text("COUNTRIES");
                
                svg.selectAll(".x-label-main")
                .data(allYGroups)
                .enter()
                .append("text")
                .attr("class", "x-label-main")
                .attr("x", width/2+170)
                .attr("y", height +120)
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "start")
                .attr("font-size", "25")
                .attr("font-weight", "bold")
                //.attr("transform", "rotate(-90)")
                //.text("NUTRITIONS");
                .text("COUNTRIES");
                
                svg.append("text")
    .attr('x',width/2-75 )
    .attr('y',30)
    .attr("font-size", "40")
    .attr("font-weight", "bold")
    .attr("class", "title")
    //.text("Coffee Nutrition Values");
    .text("YouTube Viewership");

    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "myGradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

      svg.append("rect")
    .attr("class", "x-axis")
    .attr("width",525)
    .attr("height", 5)
    .attr("transform", "translate(105," + 520 +  ")")
    .attr("class", "coloraxis")
    .style("fill", "blue");

// Append Y axis
svg.append("rect")
.attr("width",5)
.attr("height", 525)
.attr("transform", "translate(138," + 40 +  ")")
.attr("class", "coloraxis")
.style("fill", "red");
      

    // Add color stops using interpolateYlOrRd function
    gradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", d3.interpolateYlOrRd(0));
      gradient.append("stop")
      .attr("offset", "25%")
      .style("stop-color", d3.interpolateYlOrRd(0.25));
      gradient.append("stop")
      .attr("offset", "50%")
      .style("stop-color", d3.interpolateYlOrRd(0.5));
      gradient.append("stop")
      .attr("offset", "75%")
      .style("stop-color", d3.interpolateYlOrRd(0.75));

    gradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", d3.interpolateYlOrRd(1));
      
    svg.append("ax")
      .attr("width", 5)
      .attr("height", height-50)
      .attr("x",width+300)
      .attr('y',80)
      .attr("fill", "Blue");
    // Apply the gradient to a rectangle
    svg.append("rect")
      .attr("width", 20)
      .attr("height", height-50)
      .attr("x",width+200)
      .attr('y',80)
      .attr("class", "legend")
      .attr("fill", "url(#myGradient)");


    svg
    .append("g")
    .attr("id","Legend")
    .attr("x",width + 190)
    .attr("y",height)
    .attr("transform", `translate(710,${height -400})`)
    .attr("class", "legend")
    .call(d3.axisRight(zScale))
    .selectAll("text") // Select all text elements
    .attr("font-size", "16px");

    svg
  .append("g")
  .attr("id","quizLegend")
  .attr("x", width + 190)
  .attr("y", height)
  .attr("transform", `translate(710,${height - 400})`)
  .attr("class", "legend")
  .call(d3.axisRight(zScale2)) // Change zScale to zScale2 here
  .selectAll("text") // Select all text elements
  .attr("font-size", "16px"); // Change font size (optional)

    /*svg.append("text")
    .attr('x',width + 260)
    .attr('y',height/2-30)
    .style("writing-mode", "vertical-rl")
    .style("text-orientation" ,"upright")
    .attr("font-size", "20")
    .attr("class", "legend")
    .attr("font-weight", "bold")
    .text("LEGEND");*/
    svg.selectAll(".coloraxis").attr("visibility", "hidden");


function updateHeatmap(index) {
  var svg = d3.select("#heatmap-container");
  //var svg2 = d3.select('#legend-container');
  //svg2.select("#legend-container").attr("visibility", "visible");
  //Legend();
  console.log(data);
  svg.selectAll(".legend").attr("visibility", (d)=>{
    if(index==0 || index>=3){
      return "visible";
    }
    else if(index==1){
      return "hidden";
    }
  });

  svg.selectAll(".x-label").attr("visibility", (d)=>{
    if(index>=10 ){
      console.log(index);
      return "hidden";
    }
    else{
      return "visible";
    }
  });
  svg.selectAll(".x-label2").attr("visibility", (d)=>{
    if(index==11 ){
      console.log(index);
      return "visible";
    }
    else{
      return "hidden";
    }
  });
  svg.selectAll(".y-label2").attr("visibility", (d)=>{
    if(index==11 ){
      console.log("index");
      return "visible";
    }
    else{
      return "hidden";
    }
  });
  svg.selectAll(".y-label").attr("visibility", (d)=>{
    if(index>=10 ){
      console.log(index);
      return "hidden";
    }
    else{
      return "visible";
    }
  });

  svg.selectAll(".tileData")
  .attr("visibility", (d)=>{
    if(index==11 || index ===8 ){
      console.log(index);
      return "hidden";
    }
    else{
      return "visible";
    }
  })
  .style("fill", (d) => {
    if(  index == 5 ) {
      if(d.value < 240){
        console.log('black');
        return "black";
      }
      
      else{
        return "white";
      }
    } 
      else if (d.value>110){
        if(index%2!=0 || index>7 || index==0){
          return "white";
        }
        else{
          return "black"
        }
        
      }
  }
    
    );
    svg.selectAll(".heatmap-tile2")
    .attr("visibility",(d)=>{
      if(index==11 ){
      console.log(index);
      return "visible";
    }
    else{
      return "hidden";
    }
  });

  svg.selectAll(".x-label-main")
  .attr("visibility",(d)=>{
    if(index!=10 ){
    console.log(index);
    return "visible";
  }
  else{
    return "hidden";
  }
})
  .text((d)=>{
    if(index==11){
      return "YEAR";
    }
    else{
      return "GENRE";
    }
  });
    
  svg.selectAll(".y-label-main")
  .attr("visibility",(d)=>{
    if(index!=10 ){
    console.log(index);
    return "visible";
  }
  else{
    return "hidden";
  }
});

svg.selectAll(".title").attr("visibility",(d)=>{
  if(index!=10 ){
  console.log(index);
  return "visible";
}
else{
  return "hidden";
}
}).text((d)=>{
  if(index==11){
    return "Population";
  }
  else{
    return "YouTube Viewership";
  }
})
.attr('x',(d)=>{
  if(index==11){
    return width/2+40;
  }
  else{
    return width/2-75;
  }
});

svg.selectAll(".legend")
.call((d)=>{
  if(index==11){
    return d3.axisRight(zScale2);
  }
  else{
    return d3.axisRight(zScale);
  }
});
  
  
  // Calculate the maximum allowed depth based on the index
      if (index === 0)
      {
        //svg.selectAll(".x-label2").attr("visibility", "visible");
        //svg.selectAll(".x-label").attr("visibility", "visible");
        //svg.selectAll(".y-label").attr("visibility", "visible");
        svg.selectAll(".tileData").attr("visibility", "visible")
        svg.selectAll("#quizLegend").attr("visibility", "hidden");
        svg.selectAll(".coloraxis").attr("visibility", "hidden");
        //svg.selectAll("text").attr("visibility", "visible");
        //svg.selectAll("text2").attr("visibility", "visible");
        svg.selectAll(".heatmap-tile")
        .transition()
    .duration(1000)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.select(".dataset").attr("visibility", "hidden") ;
        
      } 
      else if(index=== 1)
      {
        svg.select(".dataset").attr("visibility", "hidden") ;
        svg.selectAll("#quizLegend").attr("visibility", "hidden");
        svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    
    .on("end", function() {
      
      d3.select(this).attr("visibility", "visible") ;
   
    });
    svg.selectAll(".coloraxis").attr("visibility", "visible");
        //svg.selectAll(".legend").attr("visibility", "hidden");
        //svg.selectAll("text").attr("visibility", "hidden");
        d3.selectAll(".tileData").attr("visibility", "hidden") ;
        svg.selectAll(".x-label").attr("visibility", "visible");
        svg.selectAll(".y-label").attr("visibility", "visible");
        svg.selectAll(".x-label-main").attr("visibility", "visible");
        svg.selectAll(".y-label-main").attr("visibility", "visible");
        //svg.selectAll("title").attr("visibility", "visible");
        
      }
        else if(index === 2) 
        {
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", "white")
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.selectAll(".coloraxis").attr("visibility", "hidden");
        //svg.selectAll(".legend").attr("visibility", "visible");
        //svg.selectAll(".tick").attr("visibility", "visible");
        //svg.selectAll("text").attr("visibility", "visible");
        svg.selectAll(".tileData").attr("visibility", "visible")
        //svg.selectAll(".x-label").attr("visibility", "visible");
        //svg.selectAll(".y-label").attr("visibility", "visible");
        svg.selectAll("#quizLegend").attr("visibility", "hidden");
        
        }
        else if(index === 3 ) 
        {
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
  
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          //svg.selectAll(".legend").attr("visibility", "visible");
          svg.selectAll(".heatmap-tile").attr("visibility", "visible").attr("fill",d => colorScale(d.value)).style("filter", "none");
          svg.selectAll("#quizLegend").attr("visibility", "hidden");
        }
        else if(index === 4 ) 
        {
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", "white")
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });

    svg.select('#rect-3').transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.select('#rect-8').transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.select('#rect-13').transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.select('#rect-18').transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.select('#rect-23').transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.selectAll("#quizLegend").attr("visibility", "hidden");
          
        }
        else if(index === 5 ) 
        {
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .style("fill", "white")
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
          //svg.select('#rect-17').transition().duration(1000).attr("visibility", "visible").attr("fill",d => colorScale(d.value));
          
          svg.select('#rect-0').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-1').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-2').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-3').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-4').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.selectAll("#quizLegend").attr("visibility", "hidden");
          
        }
        else if(index === 6 ) 
        {
          svg.selectAll(".coloraxis").attr("visibility", "hidden");
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("fill", "white")
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    
          svg.select('#rect-0').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", "white")
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-1').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", "white")
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-3').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", "white")
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-19').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          svg.select('#rect-4').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", "white")
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          
        
          svg.select('#rect-21').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "none");
          svg.select('#rect-0').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "none");
          /*svg.select('#rect-17').transition()
          .duration(1000)
          .style("opacity", 0)
          .style("fill", d => colorScale(d.value))
          .style("opacity", 1)
          .on("end", function() {
            d3.selectAll(this).attr("visibility", "visible") ;
          });
          */
          svg.selectAll("#quizLegend").attr("visibility", "hidden");
        }
        else if(index === 7 ) 
        {
          svg.selectAll(".coloraxis").attr("visibility", "hidden");
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          //svg.selectAll(".heatmap-tile").attr("visibility", "visible").attr("fill","white");
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(500)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
          svg.select('#rect-21').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "blue").attr("stroke-width", 6);
          svg.select('#rect-0').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "red").attr("stroke-width", 6);
          svg.selectAll("#quizLegend").attr("visibility", "hidden");
        }
        else if(index === 8 ) 
        {
          svg.selectAll(".coloraxis").attr("visibility", "hidden");
          //svg.selectAll(".x-label").attr("visibility", "visible");
        //svg.selectAll(".y-label").attr("visibility", "visible");
        //svg.selectAll(".tileData").attr("visibility", "visible")
        svg.selectAll(".legend").attr("visibility", "visible");
        //svg.selectAll("text").attr("visibility", "visible");
        svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
        svg2.select("#legend-container").attr("visibility", "visible");
        svg.select('#rect-21').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "none");
          svg.select('#rect-0').attr("visibility", "visible").attr("fill",d => colorScale(d.value)).attr("stroke", "none");
          svg.selectAll("#quizLegend").attr("visibility", "hidden");
        }
        else if(index === 9 ) 
        {
          svg.selectAll(".coloraxis").attr("visibility", "hidden");
          //svg.selectAll(".y-label").attr("visibility", "visible");
          //svg.selectAll(".x-label").attr("visibility", "visible");
          //svg.selectAll("text").attr("visibility", "visible");
          svg.selectAll(".legend").attr("visibility", "visible");
          svg.selectAll(".heatmap-tile")
    .transition()
    .duration(1000)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 1)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "visible") ;
    });
    svg.selectAll("#quizLegend").attr("visibility", "hidden");
        }
        else if(index===10){
          //svg.selectAll(".x-label").attr("visibility", "hidden");
        //svg.selectAll(".y-label").attr("visibility", "hidden");
        svg.selectAll(".tileData").attr("visibility", "hidden")
        svg.selectAll(".legend").attr("visibility", "hidden");
        svg.selectAll(".coloraxis").attr("visibility", "hidden");
        //svg.selectAll("text").attr("visibility", "hidden");
        svg.selectAll(".heatmap-tile")
    .transition()
    .duration(100)
    .style("fill", d => colorScale(d.value))
    .style("opacity", 0)
    .on("end", function() {
      d3.selectAll(this).attr("visibility", "hidden") ;
    });
    svg.select(".dataset").attr("visibility", "visible") ;
        
        
        }
        else if(index===11){
          svg.selectAll("#Legend").attr("visibility", "hidden");
          svg.selectAll("#quizLegend").attr("visibility", "visible");
          svg.selectAll(".heatmap-tile").attr("visibility", "hidden") ;
        }
}