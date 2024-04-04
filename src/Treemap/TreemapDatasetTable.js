import React from 'react';

// Define the HeatmapDatasetTable component
const TreemapDatasetTable = () => {
  // Define column headers
  const columnHeaders = ['Name', 'Category', 'Rating', 'Number of Ratings', 'Downloads'];

  // Static data for the table
  const data = [
    ['Udemy - Online Courses', 'EDUCATION', 4.5, 99020, '18M'],
    ['HomeWork', 'EDUCATION', 4.3, 16195, '5.2M'],
    ['Khan Academy', 'EDUCATION', 4.6, 85375, '21M'],
    ['edX - Online Courses by Harvard, MIT & more', 'EDUCATION', 4.6, 32380, '10M'],
    ['PayPal', 'FINANCE', 4.3, 659741, '47M'],
    ['U.S. Bank', 'FINANCE', 4.1, 70782, '50M'],
    ['TrueMoney Wallet', 'FINANCE', 4.4, 199684, '18M'],
    ['Amazon for Tablets', 'SHOPPING', 4, 141613, '22M'],
    ['Walmart', 'SHOPPING', 4.4, 441473, 'Varies with device'],
    ['Target - now with Cartwheel', 'SHOPPING', 4.1, 68406, '24M']
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
          {/* Map through data to render */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Map through each cell in the row */}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default TreemapDatasetTable;
