import React from 'react';
import Sample from './sample';
import './App.css';


function App() {

const style = {
  width: "100%",
  margin: "0 auto",
  marginTop: 100,
  maxWidth: 880, // Set the maximum width
  marginLeft: "auto", // Center the chatbot
  marginRight: "auto" // Center the chatbot
};
return (
<div className="App">
<div style={style}>
<Sample />
</div>
</div>
);
}

export default App;


