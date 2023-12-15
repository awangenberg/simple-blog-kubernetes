import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState(null);
  
  getHealthCheck().then(result => {
    console.log(result);
    setText(result);
  }).catch(error => {
    console.error(error);
  });
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           {JSON.stringify(text)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const getHealthCheck = async () => {
    try {
      const response =  await fetch('http://127.0.0.1:5000/health-check');

      if(response.ok){
        return await response.json();
      }

    } catch (error) {
      console.error(error);
    }
  
};

export default App;
