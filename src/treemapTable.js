// Import React
import React from 'react';
import { treemapData } from './treemapdata'; // Importing the treemap data

// Define the TreemapDatasetTable component
const TreemapDatasetTable = ({data}) => {
  // Define column headers
  const columnHeaders = [
    'Category',
    'Rating',
    'Size',
  ];

  // Create an array to flatten the treemap data for easy table rendering
  const flattenedData = [];
  treemapData.forEach(category => {
    category.children.forEach(item => {
      flattenedData.push({
        // category: category.title,
        title: item.title,
        score: item.score,
        magnitude: item.magnitude
      });
    });
  });

  

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
          {/* Map through flattened data to render table rows */}
          {flattenedData.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.category}</td> */}
              <td>{item.title}</td>
              <td>{item.score}</td>
              <td>{item.magnitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default TreemapDatasetTable;
