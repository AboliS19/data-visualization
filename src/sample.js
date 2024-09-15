import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
// import body from './index.css';
import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';
import { HeatGraph } from './Heatmap/HeatMap';
import { HeatGraphTrends } from './Heatmap/HeatMapTrends';
import HeatmapAxes from './Heatmap/HeatmapAxes'; // Import the HeatmapAxes component
import ColorLegend from './Heatmap/ColorLegend'; // Import the HeatmapAxes component
import HeatMinMaxcells from './Heatmap/HeatMinMax'; // Adjust the import path if necessary
// import HeatMinMax from './HeatMinMax'; // Adjust the import path if necessary
import { heatmapData } from './Heatmap/heatmapData'; // Adjust the import path if necessary
import HighlightRow from './Heatmap/heatmapRow'; // Import the HighlightRow component
import HighlightColumn from './Heatmap/heatmapColumn'; // Import the HighlightColumn component
import HeatMapHighlightCell from './Heatmap/heatmapCell'; // Adjust the import path as needed
import HeatmapDatasetTable from './Heatmap/heatmapTable'; // Adjust the import path as needed
import { heatquizdata } from './Heatmap/heatQuizData';
import { HeatGraphQuiz } from './Heatmap/QuizHeatmap';
import quizColorLegend from './Heatmap/QuizcolorLegend';
import Treemap from './Treemap/Treemap'; // Import the Treemap component from its file
import { treemapData } from './Treemap/treemapdata';
import TreemapDatasetTable from './Treemap/treemapTable';
import OuterRectangle from './Treemap/OuterRectangle'; // Import the OuterRectangle component
import TreeDivideRectangle from './Treemap/TreeDivideRectangle';
import CategoryintoSubcateg from './Treemap/CategoryIntoSubcateg';
import Labelcategories from './Treemap/LabelCategories';
import LabelSubCategories from './Treemap/LabelSubCategories';
import ColoringCategories from './Treemap/ColoringCategories';
import ColoringSubCategories from './Treemap/ColoringSubCategories';
import Zoomin from './Treemap/ZoominCategory';
import AddDetails from './Treemap/AddDetails';
import { QuiztreemapData1 } from './Treemap/QuizTreeData1';
import QTreemap1 from './Treemap/QuizTreemap1';



// // Filter your data to include only top-level and second-level elements
// const filteredData = treemapData.map(item => ({
//   title: item.title,
//   children: item.children.map(child => ({ title: child.title }))
// }));

// Component to save responses to database

// Define the learnOptions array

class SaveData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participantNo: '',
      age: '',
    };
    
  };
// /////////////

 
 
  componentWillMount() {
    this.handleSaveData();
  }




  // Calls the REST API to save data
  handleSaveData() {
    const { steps } = this.props;
 
    
    // const participantNo = steps && steps.participantNo ? steps.participantNo : '';

    fetch('http://localhost:3000/savedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // participantNo: participantNo,
        // age: age.value
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }



  render() {
  //  return true;
  return null;
    
  }
}

SaveData.propTypes = {
  steps: PropTypes.object
};

SaveData.defaultProps = {
  steps: undefined
};



// Component to render steps for conversation
class CocoBot extends Component {

    state = {
      options: [
        { value: 'Axes', label: 'Axes', trigger: 'axes', disabled: false },
        { value: 'Color Legend', label: 'Color Legend', trigger: 'color-legend', disabled: false },
        { value: 'Highlight Min & Max Values', label: 'Highlight Min & Max Values', trigger: 'highlight-min-&-max-graph', disabled: false },
        { value: 'Highlight Row', label: 'Highlight Row', trigger: 'highlight-row', disabled: false },
        { value: 'Highlight Column', label: 'Highlight Column', trigger: 'highlight-column', disabled: false },
        { value: 'Highlight Cell', label: 'Highlight Cell', trigger: 'highlight-cell', disabled: false },
        { value: 'Heatmap Trends', label: 'Heatmap Trends', trigger: 'heatmap-trends', disabled: false },
        { value: 'Skip All', label: 'Skip All', trigger: 'skip-all', disabled: false }
      ]
    };
  
    handleOptionSelected = (option) => {
      const updatedOptions = this.state.options.map((opt) =>
        option.value === opt.value ? { ...opt, disabled: true } : opt
      );
      console.log('Current options state:', this.state.options); // Log current state
      console.log('Updated options state:', updatedOptions); // Log updated state

  
      this.setState({
        options: updatedOptions
      });
    };
  



  render() {
    const { options } = this.state;
    const chatbotStyle = {
      height: '1000vh',  // Set the height to cover the entire viewport vertically
      overflowY: 'auto', // Optional: add a scrollbar if content exceeds the viewport height
      
    };
   
   

    // console.log('Options prop:', options); // Log options prop

    
    return (
    
      <ChatBot
      handleEnd={this.handleEnd}
        learnOptions={options}
        onSelectOption={this.handleOptionSelected}
     
        steps={[ 
          {
            id: '1',
            message:
              "Hello there! I'm Vizbot, designed to help you understand data visualizations.",
            trigger: '2'
          },
          // {
          //   id: '2',
          //   message: 'What is your Participant No: ?',
          //   trigger: 'number'
          // },
          // {
          //   id: 'name',
          //   user: true,
          //   trigger: '3'
          // },
          // {
          //   id: '3',
          //   message: 'Hi {previousValue}! How old are you?',
          //   trigger: 'age'
          // },
          // {
          //   id: 'number',
          //   user: true,
          //   trigger: '2-next',
          //   validator: value => {
          //     if (isNaN(value)) {
          //       return 'value must be a number';
          //     } else if (value < 0) {
          //       return 'value must be positive';
          //     } else if (value > 120) {
          //       return `${value}? Come on!`;
          //     }

          //     return true;
          //   }
          // },
          // {
          //   id: '4',
          //   message: 'Thanks for the info!',
          //   trigger: '5'
          // },
          {
            id: '2',
            message: " I can help you learn about Heatmaps & Treemaps today. Which graph do you want to learn about? ",
            trigger: 'graphs'
          },
          {
            id: 'graphs',
            options: [
              //{ value: 'Line Graph', label: 'Line Graph', trigger: 'line' },
              //{ value: 'Bar Graph', label: 'Bar Graph', trigger: 'bar' },
             // { value: 'Pie Graph', label: 'Pie Graph', trigger: 'pie' },
              { value: 'Heatmap', label: 'Heatmap', trigger: 'definition-heatmap' },
              { value: 'Treemap', label: 'Treemap', trigger: 'treemap-content-2' }
            ]
          },
          
          {
            id: 'definition-heatmap',
            message:"A heatmap is a graphical representation of data where values are depicted as colors on a matrix, allowing for easy visualization of patterns and trends.",
            trigger: 'display-dataset-table',
          },
          {
            id: 'display-dataset-table',
            message:"Welcome to our heatmap exploration! Let's begin by understanding the dataset we'll be working with. Our dataset comprises data pertaining to the average number of subscribers across various channel categories from different countries on YouTube.",
            trigger: 'after-text-table',
          },
          {id: 'after-text-table',
           component: <HeatmapDatasetTable data={heatmapData} />,
           trigger:'next-heatmap'
          },

          {
            id: 'next-heatmap',
            message :"Now, let's unveil the heatmap! This visual representation allows us to quickly grasp patterns and trends in our dataset. Take a moment to absorb the overall structure before we zoom in.",
            trigger:'next-continue heatmap',
            delay: 3000 

          },

          {
            id:'next-continue heatmap',
            options: [
            { value: 'Yes, please continue', label: 'Proceed', trigger: 'heat' },
          ]
          },

          //content added for heatmap
          //
          {
            id: 'heat',
            message:
              'Heat maps: A heatmap is like a colored grid where each cell represents a data point. The colors in each cell show the intensity of that data point – darker colors usually mean higher values, and lighter colors mean lower values. It is a quick way to visualize patterns and trends in data across different categories.',
            trigger: 'heat-example'
          },
          {
            id: 'heat-example',
            component: <HeatGraph data={heatmapData} />,
            trigger: 'learn-more-heat-aspect',
            delay: 3000 
            
          },
      
          // new code added 
          {
            id: 'learn-more-heat-aspect',
            message: 'Select what do you want to learn about Next ?',
            trigger: 'learn-options',
            delay: 3500
          },

          // {
          //   id: 'learn-options',
          //   options: [
          //     { value: 'Axes', label: 'Axes', trigger: 'display-axes',  disabled: selectedOptions.has('Axes')  },
          //     { value: 'Color Legend', label: 'Color Legend', trigger: 'display-legend',  disabled: selectedOptions.has('Color legend') },
          //     { value: 'Highlight Min & Max Values', label: 'Highlight Min & Max Values', trigger: 'highlight-min-max-graph',  disabled: selectedOptions.has('Highlight Min & Max Values') },
          //     { value: 'Highlight Row', label: 'Highlight Row', trigger: 'show-highlighted-row', disabled: selectedOptions.has('Highlight Row') },
          //     { value: 'Highlight Column', label: 'Highlight Column', trigger: 'show-highlighted-column',  disabled: selectedOptions.has('Highlight Column') },
          //     { value: 'Highlight Cell', label: 'Highlight Cell', trigger: 'show-highlighted-cell',  disabled: selectedOptions.has('Highlight Cell') },
          //     { value: 'Heatmap Trends', label: 'Heatmap Trends', trigger: 'heat-trends-example',  disabled: selectedOptions.has('Heatmap Trend') },
          //     { value: 'Skip All', label: 'Skip All', trigger: 'next-steps', disabled: false },
          //     { value: 'Repeat', label: 'Repeat', trigger: 'repeat-options', disabled: false }
          //   ],
          //   delay: 2000
          // },
          {
            id: 'learn-options',
            options: options
              .filter(option => !option.disabled)
              .map(option => ({
                value: option.value,
                label: option.label,
                trigger: option.value.toLowerCase().replace(/\s/g, '-'), // Convert value to trigger ID
              })),
            
          },
          
          

          // {
          //   id: 'repeat-options',
          //   options: [
          //     { value: 'Repeat', label: 'Repeat', trigger: 'repeat-options' },
          //     ...this.state.repeatOptions // Include options from the repeatOptions array
          //     // Add other options here as needed
          //   ]
          // },

          //new code added // Content added for axes
          {
            id: 'axes',
            component: <HeatmapAxes data={heatmapData} />,
            trigger: 'learn-more-axes',
            delay: 2000 
          },
          
          // {
          //   id: 'learn-more-axes',
          // message: "AXES: Before we dive into the details, let's familiarize ourselves with the axes. The X-axis which is the horizontal axis represents different Channel Types, while the Y-axis which is the vertical axis represents different Countries. Understanding these axes is crucial for interpreting the heatmap correctly.",      
          //  trigger: 'learn-more-heat-aspect'
          // },
          {
            id: 'learn-more-axes',
            component: (
              <div>
                AXES: Before we dive into the details, let's familiarize ourselves with the axes. The {' '}
                <span style={{ color: 'blue' }}>X-axis</span> which is the horizontal axis represents different Channel Types, while the{' '}
                <span style={{ color: 'red' }}>Y-axis</span> which is the vertical axis represents different Countries. Understanding these axes is crucial for interpreting the heatmap correctly.
              </div>
            ),
            trigger: 'learn-more-axes-2'
          },
         
          {
            id: 'learn-more-axes-2',
          message: "Additionally, we provide the units beneath the axes for our numerical values. It is a good practice to order the values on the axes either alphabetically or numerically. For datasets with larger values, we scale the values by a factor (in this case 100,000) to enhance their readability and to avoid cluttering the chart with excessive digits.",      
           trigger: 'learn-more-heat-aspect'
          },
          //content added for legend
          {
            id: 'color-legend',
            component: <ColorLegend/>,
            trigger: 'learn-more-legend',
            delay: 3000
          },

          {
            id: 'learn-more-legend',
            message: `The legend on the side of the heatmap explains the correlation between colors and values. Darker shades typically indicate higher values, while lighter shades represent lower values. `,
            trigger: 'learn-more-heat-aspect',
            delay: 1000 
          },
          {
            id: 'learn-more-legend-2',
            message: ` We have two main types of color legends - Discrete and Continuous.`,
            trigger:'learn-more-legend-3',
            delay: 1000 
          },
          //
          
          {
            id: 'learn-more-legend-3',
            message: ` Discrete Color Legends: Each category or interval of data is assigned a unique color, allowing for clear differentiation between distinct groups or ranges.`,
            trigger:'learn-more-legend-4',
            delay: 2000 
          },
          {
            id: 'learn-more-legend-4',
            message: ` Continuous Color Legends: Gradually transitions between colors to represent a range of data values, allowing for a smooth visualization of magnitude changes`,
            trigger:'learn-more-legend-5',
            delay: 2000 
          },
          {
            id: 'learn-more-legend-5',
            message:' We are using a continuous color legend for our heatmap.' ,    
            trigger:'learn-more-heat-aspect',
            delay: 2000 
          },
         
          

          {
            id: 'highlight-min-&-max-values',
            component: <HeatMinMaxcells data={heatmapData} />,
            trigger: 'learn-more-min-max',
            delay: 2000 
          },
         
          
          {
            id: 'learn-more-min-max',
            component: (
              <div>
                Here we can see that the United States {' '}
                <span style={{ color: 'red' }}>Music</span> has the most number of  subscribers on average and Japanese {' '}
                <span style={{ color: 'blue' }}>Show</span> channels have the lowest number of subscribers on average.
              </div>
            ),
            trigger: 'learn-more-heat-aspect'
          },
          

          {
            id: 'highlight-row',
            component: <HighlightRow data={heatmapData} rowIndex={3} />, // Index 1 represents the second row
            trigger: 'text-highlight-row',
            delay: 3000 
          },
          {
            id: 'text-highlight-row',
            message:"To focus on specific aspects, let's highlight a single row. Notice how South Korean music channels have the most subscribers and entertainment channels have the fewest subscribers. ",
            trigger: 'learn-more-heat-aspect'
          },

          {
            id: 'highlight-column',
            component: <HighlightColumn data={heatmapData} columnIndex={0} />, // Index 0 represents the first column
            trigger: 'text-highlight-column',
            delay: 2000 
          },
          {
            id: 'text-highlight-column',
            message:"Now, let's shift our attention to a single column. Observe how the Music channels from the United States have the highest number of subscribers and Russian music channels have the fewest.",
            trigger: 'learn-more-heat-aspect'
          },
          {
            id: 'highlight-cell',
            component: <HeatMapHighlightCell data={heatmapData} rowIndex={4} columnIndex={3} />, // Index 2 represents the third row, and index 0 represents the first column
            trigger: 'text-highlight-cell',
            delay: 3000 
          },
         
          {
            id: 'text-highlight-cell',
            message: "Zooming in even further, let's highlight a single cell. Observe how there are 34.78 million subscribers from the United Kingdom for Education channels. ",
            trigger: 'learn-more-heat-aspect'
          },
          
          {
            id: 'display-heatmap',
            message: 'Here is the updated heatmap:',
            trigger: 'show-heatmap'
          },
          {
            id: 'show-heatmap',
            component: <HeatGraph data={heatmapData} />, // Render the heatmap again
            trigger: 'learn-more-heat-aspect'
          },
                
          {
            id : 'heatmap-trends',
            message:" While we need to mention values inside the squares, let's remove the numerical values for now and focus on interpreting the heatmap purely based on colors. Notice specific trends such as Music channels in the United States are popular and Japanese Film and Animation channels are popular.",      
            trigger:'show-trends-heatmap'
          },
          {
            id: 'show-trends-heatmap',
            component: <HeatGraphTrends data={heatmapData} />, // Render the heatmap again
            trigger: 'learn-more-heat-aspect',
            delay:1000
          },
          {
            id:"conclusion-message",
            message:"In conclusion, our heatmap has provided us with a visual journey through our dataset. We've explored individual rows and columns, identified extremes, and uncovered trends. The heatmap is a powerful tool for data analysis and decision-making.",
            trigger: 'conclusion-message-two',
            delay: 3000 

          },

          {
            id:'conclusion-message-two',
            message:"Now, as we conclude, would you like to revisit or explore further?",
            trigger: 'skip-all',
            delay: 3000
          },

          {
            id:'skip-all',
            options: [
              { value:'Learn again', label:'Learn again', trigger:'learn-more-heat-aspect'},
              { value: 'Take a quiz', label: 'Take a quiz', trigger: 'quiz' },
              { value: 'Nothing for now', label: 'Nothing for now', trigger: 'end-message' }
            ]
          },
          ///
          {
            id: 'quiz',
            message: "Let’s now quickly check our understanding of Heatmaps! You'll be taking a quiz with 5 questions  in total.",
            trigger: 'before-graph-msg'
          },
          //based on the following heatmap,, answer the question that follows.. just chang english
          {
            id: 'before-graph-msg',
            message: "Based on the given heatmap, answer the question that follows..  ",
            trigger: 'display-heatmap-Q1'
          },

          {
            id:'display-heatmap-Q1',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-one',
            delay: 2000 
          },
        
          
          {
            id: 'ask-question-one',
            message: 'Q1. In which year did Australia have the smallest population compared to other years?',
            trigger: 'options-one',
            delay: 2000
          },
          {
            id: 'options-one',
            options: [
              { value: '1990', label: '1990', trigger: 'ask-question-two' },
              { value: '2000', label: '2000', trigger: 'ask-question-two' },
              { value: '2010', label: '2015', trigger: 'ask-question-two' },
              { value: '2015', label: '2020', trigger: 'ask-question-two' },
              { value: '2022', label: '2022', trigger: 'ask-question-two' }
             
            ],
          },
        
          // {
          //   id: 'before-graph-msg-2',
          //   message: "Moving onto the Q2 of 5, Based on the given heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q2'
          // },

          // {
          //   id:'display-heatmap-Q2',
          //   component: <HeatGraphQuiz data={heatquizdata} />,
          //   trigger: 'ask-question-two',
          //   delay: 1000 
          // },
          
          {
            id: 'ask-question-two',
            message: 'Q2. Which Continent shows an incline and then a steep decline in population over the years?',
            trigger: 'options-two',
            delay: 2000
          },
          {
            id: 'options-two',
            options: [
              { value: 'Asia', label: 'Asia', trigger: 'ask-question-three' },
              { value: 'Oceania', label: 'Oceania', trigger: 'ask-question-three' },
              { value: 'Europe', label: 'Europe', trigger: 'ask-question-three' },
              { value: 'Africa', label: 'Africa', trigger: 'ask-question-three' },
              { value: 'Australia', label: 'Africa', trigger: 'ask-question-three' }
            ]
          },
         
          
          // {
          //   id: 'before-graph-msg-3',
          //   message: "Moving onto the Q3 of 5, Based on the given heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q3'
          // },

          // {
          //   id:'display-heatmap-Q3',
          //   component: <HeatGraphQuiz data={heatquizdata} />,
          //   trigger: 'ask-question-three',
          //   delay: 1000 
          // },
          
          {
            id: 'ask-question-three',
            message: 'Q3. Which Continent had a larger population than Asia in 2010?',
            trigger: 'options-three',
            delay: 1000
          },
          {
            id: 'options-three',
            options: [
              { value: 'Africa', label: 'Africa', trigger: 'ask-question-four' },
              { value: 'Europe', label: 'Europe', trigger: 'ask-question-four' },
              { value: 'Oceania', label: 'Oceania', trigger: 'ask-question-four' },
              { value: 'Australia', label: 'Australia', trigger: 'ask-question-four' }
            ]
          },
  
          // {
          //   id: 'before-graph-msg-4',
          //   message: " Moving onto the Q4 of 5, Based on the given heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q4'
          // },

          // {
          //   id:'display-heatmap-Q4',
          //   component: <HeatGraphQuiz data={heatquizdata} />,
          //   trigger: 'ask-question-four',
          //   delay: 1000 
          // },
          // q4 and 5
          {
            id: 'ask-question-four',
            message: 'Q4. Which Continent’s population was the closest to that of Asia in 2015? Enter a text value.',
            trigger: 'user-input4',
            delay: 1000
          },
          {
            id: 'user-input4',
            user: true,
            trigger: 'ask-question-five'
          },
          // {
          //   id: 'verify-answer-four',
          //   message: (value) => {
          //     if (parseInt(value) === 43451666) {
          //       return true; // Go to the next question
          //     } else {
          //       return true;
          //     }
          //   },
          //   trigger: 'before-graph-msg-5', // Go to the next question
          //   delay: 2000
          // },

          
          // {
          //   id: 'before-graph-msg-5',
          //   message: "Moving onto the final question, based on the given heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q5'
          // },

          // {
          //   id:'display-heatmap-Q5',
          //   component: <HeatGraphQuiz data={heatquizdata} />,
          //   trigger: 'ask-question-five',
          //   delay: 1000 
          // },
          {
            id: 'ask-question-five',
            message: 'Q5. Amongst all continents, which continent had the lowest population in  2022?',
            trigger: 'user-input5',
            delay: 2000
          },
          {
            id: 'user-input5',
            user: true,
            trigger: 'end-message'
          },

       
         // --------------------TREEMAP------------------------
          //treemap-content
          // dataset-treemap
          {
            id: 'treemap-content-2',
            message: "A treemap shows a visual hierarchy where categories are represented by rectangles, and the size of each rectangle corresponds to the quantity or importance of that category. It's a simple and effective way to show proportions and relationships between different groups of data.",
            trigger: 'dataset-treemap'
          },
          {
            id:"dataset-treemap",
            message: "Let's embark on a journey to create a treemap using Google PlayStore App data from different categories. The dataset includes information on Google Playstore Apps and their category, rating, and downloads.",
            trigger:'display-treemap-table'
          },
          
          

          // display dataset in tabular form.. not done
          {
            id: 'display-treemap-table',
           // message:"<INSERT TABLE HERE>",
            component: <TreemapDatasetTable data={treemapData} />, // <HeatmapDatasetTable data={heatmapData} />,
            trigger: 'next-continue-treemap'
          },

          
          {id:'next-continue-treemap',
          options: [
            { value: 'Yes, please continue', label: 'Proceed', trigger: 'treemap-next' },
          ]
          },
          {
            id: 'treemap-next',
            message :"Now, let's unveil the treemap! Take a moment to absorb the overall structure before we zoom in.",
            trigger:'show-treemap-visual',
            delay: 3000 

          },
          // {
          //   id: 'treemap-content-2',
          //   message: "A treemap is like a visual hierarchy where categories are represented by rectangles, and the size of each rectangle corresponds to the quantity or importance of that category. It's a simple and effective way to show proportions and relationships between different groups of data.",
          //   trigger: 'learn-tree-options'
          // },
          {
            id: 'show-treemap-visual',
            component: <Treemap data={treemapData} />,
            trigger: 'learn-tree'
          },
   

          {
            id: 'learn-tree',
            message:"Select what do you want to learn about next? ",
            trigger: 'learn-tree-options'
          },
          
          {
            id: 'learn-tree-options',
            options: [
              // { value: "Visual ", label: "Visual ", trigger: 'show-treemap-visual' },
              { value: "Outer Rectangle", label: "Outer Rectangle", trigger: 'show-outer-rectangle' },
              { value: "Divide Rectangle", label: "Divide Rectangle", trigger: 'display-divide-rectangle' },
              { value: "Divide Category into Subcategory", label: "Divide Category into Subcategory", trigger: 'CategoryintoSubcateg' },
              { value: "Label Categories", label: "Label Categories", trigger: 'Label-Categories' },
              { value: "Label(sub-category)", label: "Label(sub-category)", trigger: 'Label-Sub-Categories' },
              { value: "Coloring Categories", label: " Coloring Categories", trigger: 'Coloring-Categories' },
              { value: "Coloring(sub-category)", label: "Coloring(sub-category)", trigger: 'Coloring-Sub-Categories' },
              { value: "Zoom In on a category", label: "Zoom In on a category", trigger: 'Zoom-in' },
              { value: "Add Details", label: "Add Details", trigger: 'Add-details' },
              { value: 'Skip All', label: 'Skip All', trigger: 'skip-all-tree' }

            ]
          },
          // {
          //   id: 'tree-step-2',
          //   options: [
          //     { value: 'Yes, please continue', label: 'Proceed', trigger: 'outer-rectangle' },
          //   ]
          // },
        
          // Outer rectangle
          {
            id: 'show-outer-rectangle',
            component: <OuterRectangle />,
            trigger: 'outer-rectangle'
          },
          {
            id: 'outer-rectangle',
            message: "Let's first draw a large rectangle. This rectangle serves as the outer boundary of our treemap, providing a canvas for the visual representation of our data.",
            trigger: 'learn-tree'
          },
          

          // Divide Rectangle
          {
            id: 'display-divide-rectangle',
            component: <TreeDivideRectangle data={treemapData} />, 
            trigger: 'divide-rectangle'
          },
          {
            id: 'divide-rectangle',
            message: "Let's now divide the outer rectangle into smaller rectangles based on the proportions of the Category values. The larger the Category, the larger the corresponding rectangle. This division reflects the hierarchy of our data.",
            trigger: 'learn-tree'
          },

          //divide category into subcategory
          {
            id:'CategoryintoSubcateg',
            component: <CategoryintoSubcateg data={treemapData} />,
            trigger: 'text-CategoryintoSubcateg'
          },

          {
            id: 'text-CategoryintoSubcateg',
            message: "Let's now divide the Category rectangles into smaller Sub rectangles based on the proportions of the Subcategory values. The larger the Subcategory, the larger the corresponding rectangle. This division reflects the proportion within each category. ",
            trigger: 'learn-tree'
          },

          //Label catgeories
          {
            id:'Label-Categories',
            component: <Labelcategories data={treemapData} />,
            trigger: 'text-Label-Categories'
          },
          {
            id: 'text-Label-Categories',
            message: "Now, let's label the rectangles with the names of Categories. Provide the title of the treemap at the top in a bigger font size. The category labels should have a smaller font size than that of the title and placed at the top of the corresponding rectangle. This step enhances the interpretability of the treemap.",
            trigger: 'learn-tree'
          },

          //Label subcatgeories
          {
            id:'Label-Sub-Categories',
            component: <LabelSubCategories data={treemapData} />,
            trigger: 'text-Label-Sub-Categories'
          },
          {
            id: 'text-Label-Sub-Categories',
            message: "Now, let's label the rectangles with the names of Subcategories. The sub-category labels should have a smaller font size than that of the category labels.  If the Subcategory is too small in size and the label does not fit in the rectangle, leave it unlabeled. This step enhances the interpretability of the treemap.",
            trigger: 'learn-tree'
          },

          //Coloring categories
          {
            id:'Coloring-Categories',
            component: <ColoringCategories data={treemapData} />,
            trigger: 'text-Coloring-Categories'
          },
          {
            id: 'text-Coloring-Categories',
            message: "Now let us bring the treemap to life by using distinct colors to fill each rectangle. Assign colors to represent different Categories. This visual element adds clarity and helps distinguish between the Categories.",
            trigger: 'learn-tree'
          },

          //Coloring Sub categories
          {
            id:'Coloring-Sub-Categories',
            component: <ColoringSubCategories data={treemapData} />,
            trigger: 'text-Coloring-Sub-Categories'
          },
         
          {
            id: 'text-Coloring-Sub-Categories',
            message: "Now let us use different shades of colors to fill each sub-category. Assign color shades based on the size of the sub-category. Lighter colors represent a smaller value and darker colors represent a bigger value. For the dark-shaded regions, use white text color. This visual element adds clarity and helps distinguish between the Sub-Categories.",
            trigger: 'learn-tree'
          },

          {
            id:'Zoom-in',
            component: <Zoomin data={treemapData} />,
            trigger: 'text-Zoom-in'
          },
          {
            id: 'text-Zoom-in',
            message: "Let's now zoom in on a specific category to explore it in detail. This allows for a closer examination of the variations within that particular category and its sub-categories.  ",
            trigger: 'learn-tree'
          },

          {
            id:'Add-details',
            component: <AddDetails data={treemapData} />,
            trigger: 'text-Add-details'
          },
          {
            id: 'text-Add-details',
            message: "Let us add the value for each subcategory – such as numerical values, percentages, or other annotations for ratings and downloads – as text in the middle of the rectangle. This supplementary information enriches the viewer's understanding of the dataset. Also, make sure to mention the unit (M = million in this example) if applicable.",
            trigger: 'learn-tree'
          },

          {
            id:'skip-all-tree',
            component: <Treemap data={treemapData} />,
            options: [
              { value:'Learn again', label:'Learn again', trigger:'learn-tree'},
              { value: 'Take a quiz', label: 'Take a quiz', trigger: 'treequiz' },
              { value: 'Nothing for now', label: 'Nothing for now', trigger: 'tend message' }
            ]
          },
          {
            id: 'treequiz',
            message: "Let’s now quickly check our understanding of Treemaps based on the following treemap. While we need to add details inside the categories, let's remove the details for now and focus on interpreting the treemap purely based on colors and sizes.",
            trigger: 'display-Treemap-Q1'
          },
       
          // {
          //   id: 'before-graph-msgtree',
          //   message: "Q1 of 5: Based on the given treemap, answer the question that follows..  ",
          //   trigger: 'display-Treemap-Q1'
          // },

          {
            id:'display-Treemap-Q1',
            component: <QTreemap1 data={QuiztreemapData1} />,
            trigger: 'task-question-one',
            delay: 2000 
          },
          
          
          {
            id: 'task-question-one',
            message: 'Q1. Which sub-genre had the highest revenue in the Mystery Genre?',
            trigger: 'toptions-one',
            delay: 2000
          },
          {
            id: 'toptions-one',
            options: [
              { value: 'Spy', label: 'Spy', trigger: 'task-question-two' },
              { value: 'True Crime', label: 'True Crime', trigger: 'task-question-two' },
              { value: 'Crime', label: 'Crime', trigger: 'task-question-two' },
            ],
          },
          
          
          // {
          //   id: 'tree-before-graph-msg-2',
          //   message: "Moving onto the Q2 of 5, Based on the given treemap, answer the question that follows..  ",
          //   trigger: 'display-treemap-Q2'
          // },

          // {
          //   id:'display-treemap-Q2',
          //   component: <QTreemap2 data={QuiztreemapData2} />,
          //   trigger: 'task-question-two',
          //   delay: 2000 
          // },
          
          {
            id: 'task-question-two',
            message: 'Q2. Which genre had the highest revenue overall?',
            trigger: 'toptions-two',
            delay: 3000
          },
          {
            id: 'toptions-two',
            options: [
              { value: 'Childrens Books', label: 'Childrens Books', trigger: 'task-question-three' },
              { value: 'Mystery', label: 'Mystery', trigger: 'task-question-three' },
              { value: 'Non Fiction', label: 'Non Fiction', trigger: 'task-question-three' },
              { value: 'Arts and Photography', label: 'Arts and Photography', trigger: 'task-question-three' }
            ]
          },
         
          
          // {
          //   id: 'tbefore-graph-msg-3',
          //   message: "Moving onto the Q3 of 5, Based on the given treemap, answer the question that follows..  ",
          //   trigger: 'display-treemap-Q3'
          // },

          // {
          //   id:'display-treemap-Q3',
          //   component: <QTreemap3 data={QuiztreemapData3} />,
          //   trigger: 'task-question-three',
          //   delay: 3000 
          // },
          
          {
            id: 'task-question-three',
            message: 'Q3. Which other non fiction sub-genre had more revenue than Fashion?',
            trigger: 'toptions-three',
            delay: 2000
          },
          {
            id: 'toptions-three',
            options: [
              { value: 'History', label: 'History', trigger: 'task-question-four' },
              { value: 'Sports', label: 'Sports', trigger: 'task-question-four' },
              { value: 'Home', label: 'Home', trigger: 'task-question-four' },
              { value: 'Fitness', label: 'Fitness', trigger: 'task-question-four' }
            ]
          },
         

          // {
          //   id: 'tbefore-graph-msg-4',
          //   message: " Moving onto the Q4 of 5, Based on the given treemap, answer the question that follows..  ",
          //   trigger: 'display-treemap-Q4'
          // },

          // {
          //   id:'display-treemap-Q4',
          //   component: <QTreemap4 data={QuiztreemapData4} />,
          //   trigger: 'task-question-four',
          //   delay: 2000 
          // },
          // q4 and 5
          {
            id: 'task-question-four',
            message: ' Q4. Which sub genre had the lowest revenue overall? Enter a text value:',
            trigger: 'tuser-input4',
            delay: 2000
          },
          {
            id: 'tuser-input4',
            user: true,
            trigger: 'task-question-five'
          },
   
          
          // {
          //   id: 'tbefore-graph-msg-5',
          //   message: "Moving onto the final question, based on the given treemap, answer the question that follows..  ",
          //   trigger: 'display-treemap-Q5'
          // },

          // {
          //   id:'display-treemap-Q5',
          //   component: <QTreemap5 data={QuiztreemapData5} />,
          //   trigger: 'task-question-five',
          //   delay: 2000 
          // },
          {
            id: 'task-question-five',
            message: 'Q3. What percentage is Fashion of the Non Fiction Genre?',
            trigger: 'toptions-five',
            delay: 2000
          },
          {
            id: 'toptions-five',
            options: [
              { value: '50', label: '50', trigger: 'tend message' },
              { value: '20', label: '20', trigger: 'tend message' },
              { value: '60', label: '35', trigger: 'tend message' },
              { value: '75', label: '75', trigger: 'tend message' }
            ],
          },
         

          {
            id:"tend message",
            message:'In Conclusion, Treemaps are powerful tools for visualizing hierarchical data. Enjoy exploring your data!',
            end: true
          },

   
        
        
          {
            id: 'update',
            message: 'Would you like to learn more about graphs?',
            trigger: 'update-question'
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: '2' },
              { value: 'no', label: 'No', trigger: 'end-message' }
            ]
          },
          {
            id: 'end-message',
            message: 'Great! If you ever want to revisit or explore more about heatmaps, feel free to reach out. Happy data visualizing!',
           end: true
          },
          {
            id: 'save-data',
            component: <SaveData />,
            end: true
          },
          
        ]}
      />
    );
  }
}

export default CocoBot;
