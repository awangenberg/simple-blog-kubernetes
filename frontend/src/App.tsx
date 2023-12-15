import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const text = getHealthCheck()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           {text}
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

const getHealthCheck = ()  => {
  fetch("http://127.0.0.1:5000/health-check")
    .then((response) => {
        return response.json();
    })

    return "ASD"; 
};

export default App;
