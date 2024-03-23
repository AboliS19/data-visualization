import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
// import body from './index.css';
import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';
import { HeatGraph } from './Heatmap/HeatMap';
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
import TreemapVisual from './Treemap/AddDetails';
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
      height: '100vh',  // Set the height to cover the entire viewport vertically
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
              "Hello there! I'm Cocobot, designed to help you understand graphs.",
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
              { value: 'Heatmap', label: 'Heatmap', trigger: 'display-dataset-table' },
              { value: 'Treemap', label: 'Treemap', trigger: 'dataset-treemap' }
            ]
          },
          
          
          {
            id: 'display-dataset-table',
            message:"Let's begin by understanding the dataset we'll be working with. Our data includes information on Countries and their average subscribers (in millions) for different channel types.",
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
                <span style={{ color: 'red' }}>X-axis</span> which is the horizontal axis represents different Channel Types, while the{' '}
                <span style={{ color: 'blue' }}>Y-axis</span> which is the vertical axis represents different Countries. Understanding these axes is crucial for interpreting the heatmap correctly.
              </div>
            ),
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
            message: `COLOR LEGEND: Our heatmap uses a color scale to represent values. 
            The legend below explains the correlation between colors and values. 
            Darker shades typically indicate higher values, while lighter shades represent lower nutrition values.`,
            trigger: 'learn-more-legend-2',
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
                Here we can see that the United States has the most number of{' '}
                <span style={{ color: 'red' }}>Music</span> channel subscribers and Japan has the least number of{' '}
                <span style={{ color: 'blue' }}>Show</span> channel subscribers.
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
            message:"To focus on specific aspects, let's highlight a single row. Notice how South Korea has most subscribers for music channels and least subscribers for entertainment channels.  ",
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
            message:"Now, let's shift our attention to a single column. Observe how the most subscribers for Music channels are from the United States and least subscribers are from Russia. ",
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
            message:"Notice specific trends such as Music is a popular genre in the United States whereas Film and Animation is popular in Japan.",      
            trigger:'show-trends-heatmap'
          },
          {
            id: 'show-trends-heatmap',
            component: <HeatGraph data={heatmapData} />, // Render the heatmap again
            trigger: 'conclusion-message',
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
            message: "Q1 of 5: Based on the given heatmap,, answer the question that follows..  ",
            trigger: 'display-heatmap-Q1'
          },

          {
            id:'display-heatmap-Q1',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-one',
            delay: 2000 
          },
          // {
          //   id: 'learn-more-read-options',
          //   options: [
          //     { value: 'yes', label: 'Yes', trigger: 'read-heatmap' },
          //     { value: 'no', label: 'No', trigger: 'update' }
          //   ]
          // },
          // {
          //   id: 'read-heatmap',
          //   message: 'Sure! In this heatmap, each cell represents a combination of a company and a stock. The color indicates the value for that combination. Let me demonstrate with an example:',
          //   trigger: 'explain-heatmap-example'
          // },
          // {
          //   id: 'explain-heatmap-example',
          //   message: 'For the company "TechCorp" and stock "Stock A", the value is 100.00. The color represents the intensity of this value.',
          //   trigger: 'ask-question-techcorp'
          // },
          
          {
            id: 'ask-question-one',
            message: 'Q1. In which year did Oceania have the highest population compared to other years?',
            trigger: 'options-one',
            delay: 2000
          },
          {
            id: 'options-one',
            options: [
              { value: '1990', label: '1990', trigger: 'before-graph-msg-2' },
              { value: '2000', label: '2000', trigger: 'before-graph-msg-2' },
              { value: '2015', label: '2015', trigger: 'before-graph-msg-2' },
              { value: '2020', label: '2020', trigger: 'before-graph-msg-2' }
             
            ],
          },
          // {
          //   id: 'correct-one',
          //   message: "That's correct!",
          //   trigger: 'before-graph-msg-2'
          // },
          // {
          //   id: 'incorrect-one',
          //   message: 'Oops! That\'s incorrect.',
          //   trigger: 'before-graph-msg-2',
          //   delay: 1000
          // },
          // {
          //   id: 'wrong-graph-msg-1',
          //   message: "Let's try again: In which year did Oceania have the highest population compared to other years?",
          //   trigger: 'options-one'
          // },
          
          {
            id: 'before-graph-msg-2',
            message: "Moving onto the Q2 of 5, Based on the given heatmap,, answer the question that follows..  ",
            trigger: 'display-heatmap-Q2'
          },

          {
            id:'display-heatmap-Q2',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-two',
            delay: 1000 
          },
          
          {
            id: 'ask-question-two',
            message: 'Q2. Which Continent had a gradual decline in population over the years?',
            trigger: 'options-two',
            delay: 2000
          },
          {
            id: 'options-two',
            options: [
              { value: 'Asia', label: 'Asia', trigger: 'before-graph-msg-3' },
              { value: 'Oceania', label: 'Oceania', trigger: 'before-graph-msg-3' },
              { value: 'Europe', label: 'Europe', trigger: 'before-graph-msg-3' },
              { value: 'Africa', label: 'Africa', trigger: 'before-graph-msg-3' }
            ]
          },
          // {
          //   id: 'correct-two',
          //   message: "That's correct!",
          //   trigger: 'before-graph-msg-3'
          // },
          // {
          //   id: 'incorrect-two',
          //   message: 'Oops! That\'s incorrect.',
          //   trigger: 'before-graph-msg-3',
          //   delay: 1000
          // },
          // {
          //   id: 'wrong-graph-msg-2',
          //   message: "Let's try again: Which Continent had a gradual decline in population over the years?",
          //   trigger: 'options-two'
          // },
          
          {
            id: 'before-graph-msg-3',
            message: "Moving onto the Q3 of 5, Based on the given heatmap, answer the question that follows..  ",
            trigger: 'display-heatmap-Q3'
          },

          {
            id:'display-heatmap-Q3',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-three',
            delay: 1000 
          },
          
          {
            id: 'ask-question-three',
            message: 'Q3. Which Continent had a higher population than Asia in 2010?',
            trigger: 'options-three',
            delay: 1000
          },
          {
            id: 'options-three',
            options: [
              { value: 'Africa', label: 'Africa', trigger: 'before-graph-msg-4' },
              { value: 'Europe', label: 'Europe', trigger: 'before-graph-msg-4' },
              { value: 'Oceania', label: 'Oceania', trigger: 'before-graph-msg-4' },
              { value: 'Australia', label: 'Australia', trigger: 'before-graph-msg-4' }
            ]
          },
          // {
          //   id: 'correct-three',
          //   message: "That's correct!",
          //   trigger: 'before-graph-msg-4'
          // },
          // {
          //   id: 'incorrect-three',
          //   message: 'Oops! That\'s incorrect.',
          //   trigger: 'before-graph-msg-4',
          //   delay: 1000
          // },
          // {
          //   id: 'wrong-graph-msg-3',
          //   message: "Let's try again: Which Continent had a higher population than Asia in 2010?",
          //   trigger: 'options-three'
          // },

          {
            id: 'before-graph-msg-4',
            message: " Moving onto the Q4 of 5, Based on the given heatmap, answer the question that follows..  ",
            trigger: 'display-heatmap-Q4'
          },

          {
            id:'display-heatmap-Q4',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-four',
            delay: 1000 
          },
          // q4 and 5
          {
            id: 'ask-question-four',
            message: ' Q4. How much Population did Africa have in 2020? Enter a numeric value:',
            trigger: 'user-input4',
            delay: 1000
          },
          {
            id: 'user-input4',
            user: true,
            validator: (value) => {
              if (isNaN(value)) {
                return 'Value should be a number only';
              } else {
                return true;
              }
            },
            trigger: 'before-graph-msg-5'
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

          
          {
            id: 'before-graph-msg-5',
            message: "Moving onto the final question, based on the given heatmap, answer the question that follows..  ",
            trigger: 'display-heatmap-Q5'
          },

          {
            id:'display-heatmap-Q5',
            component: <HeatGraphQuiz data={heatquizdata} />,
            trigger: 'ask-question-five',
            delay: 1000 
          },
          {
            id: 'ask-question-five',
            message: '5. In which year did Australia have the least Population?',
            trigger: 'user-input5',
            delay: 2000
          },
          {
            id: 'user-input5',
            user: true,
            validator: (value) => {
              if (isNaN(value)) {
                return 'Value should be a number only';
              } else {
                return true;
              }
            },
            trigger: 'end-message'
          },

          // {
          //   id: 'options-five',
          //   options: [
          //     { value: '1990', label: '1990', trigger: 'end-message' },
          //     { value: '2000', label: '2000', trigger: 'end-message' },
          //     { value: '2010', label: '2010', trigger: 'end-message' },
          //     { value: '2020', label: '2020', trigger: 'end-message' }
          //   ],
          //   delay: 2000
          // },
          // {
          //   id: 'correct-five',
          //   message: 'That\'s correct!',
          //   trigger: 'before-graph-msg-5'
          // },
          // {
          //   id: 'incorrect-five',
          //   message: 'Oops! That\'s incorrect.',
          //   trigger: 'end-message'
          // },
          // {
          //   id: 'before-graph-msg-5',
          //   message: "Moving onto the next question...",
          //   trigger: 'display-heatmap-Q5',
          //   delay: 2000
          // },
      
          
          // Similar blocks for other user input questions
          

          //COFFEE QUESTIONS
          // {
          //   id: 'ask-question-one',
          //   message: ' Q1. Which of the following beverage has a low calorie count?',
          //   trigger: 'options-one',
          //   delay: 2000
          // },
          
          // {
          //   id: 'options-one',
          //   options: [
          //     { value: 'Americano ', label: 'Americano', trigger: 'correct-one' },
          //     { value: 'Latte', label: 'Latte', trigger: 'incorrect-one' },
          //     { value: 'Mocha', label: 'Mocha', trigger: 'incorrect-one' },
          //     { value: 'Cappuccino', label: 'Cappucino', trigger: 'incorrect-one' }
          //   ],
          //   trigger:'heat-example',
          //   delay: 2000
          // },
        
          // {
          //   id: 'correct-one',
          //   message: 'That\'s correct!',
          //     //Americano has the lowest calorie count of 3 , whereas Latte has 70 caloris, Mocha has 110 calories & Cappuccino has 50 calories.  Good Job! ',
          //   trigger: 'before-graph-msg-2'
          // },
          // {
          //   id: 'incorrect-one',
          //   message: 'Oops! That\'s incorrect. Please try again.',
          //   trigger: 'wrong-graph-msg-1',
          //   delay: 1000
          // },
          // {
          //   id: 'wrong-graph-msg-1',
          //   message: "Let's try again: Based on the following heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q1'
          // },

          // // q 2
          // {
          //   id: 'before-graph-msg-2',
          //   message: "Great! Now let's move onto the  question 2 that follows after the graph..  ",
          //   trigger: 'display-heatmap-Q2'
          // },

          // {
          //   id:'display-heatmap-Q2',
          //   component: <HeatGraph data={heatmapData} />,
          //   trigger: 'ask-question-two',
          //   delay: 2000 
          // },
          // {
          //   id: 'ask-question-two',
          //   message: ' Q2. Which Nutritional Value is the highest for Cappucino?',
          //   trigger: 'options-two',
          //   delay: 2000
          // },
          // {
          //   id: 'options-two',
          //   options: [
          //     { value: 'Calories ', label: 'Calories', trigger: 'incorrect-two' },
          //     { value: 'Caffeine', label: 'Caffeine', trigger: 'incorrect-two' },
          //     { value: 'Sugar', label: 'Sugar', trigger: 'incorrect-two' },
          //     { value: 'Carbs', label: 'Carbs', trigger: 'correct-two' }
          //   ],
          //   trigger:'heat-example',
          //   delay: 2000
          // },
        
          // {
          //   id: 'correct-two',
          //   message: 'That\'s correct! ',
          //     //Amongst all nutritional values in Cappucino, Carbs is the highest at 60 g.  ',
          //   trigger: 'before-graph-msg-3'
          // },
          // {
          //   id: 'incorrect-two',
          //   message: 'Oops! That\'s incorrect. Please try again.',
          //   trigger: 'wrong-graph-msg-2',
          //   delay: 1000
          // },

          // {
          //   id: 'wrong-graph-msg-2',
          //   message: "Let's try again: Based on the following heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q2'
          // },
          // //

          // // q3
          // {
          //   id: 'before-graph-msg-3',
          //   message: "Awesome! Moving onto question 3 that follows after the graph..  ",
          //   trigger: 'display-heatmap-Q3',
          //   delay:2000
          // },

          // {
          //   id:'display-heatmap-Q3',
          //   component: <HeatGraph data={heatmapData} />,
          //   trigger: 'ask-question-three',
          //   delay: 2000 
          // },
          // {
          //   id: 'ask-question-three',
          //   message: ' Q3. Which drink has more Carbohydrates than a Macchiato?',
          //   trigger: 'options-three',
          //   delay: 2000
          // },
          // {
          //   id: 'options-three',
          //   options: [
          //     { value: 'Latte', label: 'Latte', trigger: 'correct-three' },
          //     { value: 'Americano ', label: 'Americano', trigger: 'incorrect-three' },
          //     { value: 'Mocha', label: 'Mocha', trigger: 'incorrect-three' },
          //     { value: 'Cappuccino', label: 'Cappucino', trigger: 'incorrect-three' }
          //   ],
          //   trigger:'heat-example',
          //   delay: 2000
          // },
        
          // {
          //   id: 'correct-three',
          //   message: 'That\'s correct! ',
          //     //Latte has the more carbohydrates (75g) than Macchiato , whereas all the others have lower carbohydartes: Amerciano (5 g), Mocha (60 g) & Cappuccino (60g).  ',
          //   trigger: 'before-graph-msg-4'
          //   // tirgger:'end-message'
          // },
          // {
          //   id: 'incorrect-three',
          //   message: 'Oops! That\'s incorrect. Please try again.',
          //   trigger: 'wrong-graph-msg-3',
          //   delay: 1000
          // },
          // {
          //   id: 'wrong-graph-msg-3',
          //   message: "Let's try again: Based on the following heatmap, answer the question that follows..  ",
          //   trigger: 'display-heatmap-Q3'
          // },

          // // q4 
          
          // {
          //   id: 'before-graph-msg-4',
          //   message: "Cool! Let's move onto the last question for this quiz..  ",
          //   trigger: 'display-heatmap-Q4',
          //   delay:2000
          // },

          // {
          //   id:'display-heatmap-Q4',
          //   component: <HeatGraph data={heatmapData} />,
          //   trigger: 'ask-question-four',
          //   delay: 2000 
          // },
          //   {
          //     id: 'ask-question-four',
          //     message: ' Q4. How much caffeine content ( in "mg") does a Mocha Coffee have? Enter a numeric value:',
          //     trigger: 'check-answer',
          //     delay: 2000

          //   },
          //   // {
          //   //   id:'checkpoint-1',
          //   //   trigger:'heat-example-lastQ',
          //   // },

          //   // {
          //   //   id: 'heat-example-lastQ',
          //   //   component: <HeatGraph data={heatmapData} />,
          //   //   trigger: 'check-answer',
          //   //   delay: 3000 
              
          //   // },

          //   {
          //     id: 'check-answer',
          //     user: true,
          //   //   validator: (value) => {
          //   //     // Convert the user's response to lowercase for case-insensitive comparison
          //   //     const response = value.trim();
          //   //     // Check if the response is '85'
          //   //     if (response === '85') {
          //   //       return 'correct-response'; // Go to the correct-response step
          //   //     } else {
          //   //       return 'incorrect-response'; // Go to the incorrect-response step
          //   //     }
          //   //   },
          //   // },
          //   validator: (value) => { // Validator function to validate user input
            
          //     if (isNaN(value)) { // Check if the input is not a number
          //       return 'Value should be a number only';
          //     }
          //     else {
          //       if(value != 85) { 
          //       return 'Oops! That\'s incorrect. Please try again';
          //     }
          //     //trigger: 'incorrect-reponmse',
          //   }
          //     return true; // Return true if input is valid
          //   },
          //   trigger: 'correct-response', // Trigger next step after validation
          // },
        

          //   {
          //     id: 'correct-response',
          //     message: 'That\'s correct! Mocha Coffee indeed has 85mg of caffeine content.',
          //     trigger: 'end-message',
          //     delay: 3000

          //   },
          //   {
          //     id: 'incorrect-response',
          //     message: 'Oops! That\'s incorrect. Please enter a numeric value only.',
          //     trigger: 'ask-question-four' // Repeat the question if the response is incorrect
          //   },
            
         // --------------------TREEMAP------------------------
          //treemap-content
          // dataset-treemap
          {
            id:"dataset-treemap",
            message: "Let's embark on a journey to create a treemap using Google PlayStore App data from different categories. The dataset includes information on Google Playstore Apps and their category, rating and size.  ",
            trigger:'display-treemap-table'
          },
          
          

          // display dataset in tabular form.. not done
          {
            id: 'display-treemap-table',
            message:"<INSERT TABLE HERE>",
            // component: <TreemapDatasetTable data={treemapData} />, // <HeatmapDatasetTable data={heatmapData} />,
            trigger: 'next-continue-treemap'
          },

          
          {id:'next-continue-treemap',
          options: [
            { value: 'Yes, please continue', label: 'Proceed', trigger: 'show-treemap-visual' },
          ]
          },

          {
            id: 'show-treemap-visual',
            component: <Treemap data={treemapData} />,
            trigger: 'treemap-content-2'
          },
          {
            id: 'treemap-content-2',
            message: "A treemap is like a visual hierarchy where categories are represented by rectangles, and the size of each rectangle corresponds to the quantity or importance of that category. It's a simple and effective way to show proportions and relationships between different groups of data.",
            trigger: 'learn-tree-options'
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
            message: "Let's now divide the Category rectangles into smaller Sub rectangles based on the proportions of the Category values. The larger the Category, the larger the corresponding rectangle. This division reflects the hierarchy of our data. ",
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
            message: "Now, let's label the rectangles with the names of Categories. The category labels should have lesser font size than that of the title. This step enhances the interpretability of the treemap.",
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
            message: " Now, let's label the rectangles with the names of Sub-Categories. If a rectangle is divided, provide labels for each subcategory. The sub-category labels should have lesser font size than that of the category labels.  If the Subcategory is small in size avoid labeling in case the label does not fit in the rectangle. This step enhances the interpretability of the treemap. ",
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
            message: " Now let us bring the treemap to life by using distinct colors to fill each rectangle. Assign colors to represent different Categories. This visual element adds clarity and helps distinguish between the Categories.",
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
            message: " Now let us use distinct colors to fill each sub-category. Assign color hues based on size of the sub-category. Lighter colors represent smaller size and darker color represents bigger size. This visual element adds clarity and helps distinguish between the Sub-Categories.",
            trigger: 'learn-tree'
          },

          {
            id:'Zoom-in',
            component: <Zoomin data={treemapData} />,
            trigger: 'text-Zoom-in'
          },
          {
            id: 'text-Zoom-in',
            message: "Lets now zoom in on a specific category to explore it in detail. This allows for a closer examination of the variations within that particular category and its sub-categories. ",
            trigger: 'learn-tree'
          },

          {
            id:'Add-details',
            component: <AddDetails data={treemapData} />,
            trigger: 'text-Add-details'
          },
          {
            id: 'text-Add-details',
            message: "Let us add details such as numerical values, percentages, or other annotations for ratings and sizes within the rectangles. This supplementary information enriches the viewer's understanding of the dataset.",
            trigger: 'learn-tree'
          },

          {
            id:'skip-all-tree',
            component: <Treemap data={treemapData} />,
            trigger: 'skip-all-tree-text'
          },
          {
            id:"skip-all-tree-text",
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
