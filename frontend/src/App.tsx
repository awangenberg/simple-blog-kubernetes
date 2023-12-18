import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
        const result = await getHealthCheck();
        console.log(result);
        setText(result);
    };

    fetchData();
  }, []);
  
  
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

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      console.log("url: " + baseUrl);
      const response =  await fetch(baseUrl + '/health-check');

      if(response.ok){
        return await response.json();
      }

    } catch (error) {
        console.error(error);
    }
  
};

export default App;
