// // Import React
// import React from 'react';
// import Heatmaptable from './Heatmaptable.png'; // Import the image file

// // Define the HeatmapDatasetTable component
// const HeatmapDatasetTable = () => {
//   return (
//     <div>
//       {/* Render the image */}
//       <img src={Heatmaptable} alt="Heatmap" />
//     </div>
//   );
// };

// // Export the component
// export default HeatmapDatasetTable;




// Import React
import React from 'react';

// Define the HeatmapDatasetTable component
const HeatmapDatasetTable = () => {
  // Define column headers
  const columnHeaders = [
    'Category',
    'Music',
    'Film & Animation',
    'Entertainment',
    'Education',
    'Shows'
  ];

  // Define row headers
  const rowHeaders = [
    'United States',
    'Japan',
    'Russia',
    'South Korea',
    'United Kingdom'
  ];

  // Static heatmap data
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

  return (
    <div>
      {/* Apply CSS styles for the table */}
      <style>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2; /* Light gray background for headers */
          }
          th:first-child,
          td:first-child {
            background-color: #d3d3d3; /* Dark gray background for first column */
          }
        `}
      </style>
      {/* Render the table */}
      <table>
        <thead>
          <tr>
            {/* Map through column headers to render */}
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through row headers to render */}
          {rowHeaders.map((rowHeader, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowHeader}</td>
              {/* Map through column headers starting from the second column */}
              {columnHeaders.slice(1).map((columnHeader, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {/* Find the corresponding value from heatmapData */}
                  {heatmapData.find(
                    item => item.y === rowHeader && item.x === columnHeader
                  )?.value.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default HeatmapDatasetTable;
