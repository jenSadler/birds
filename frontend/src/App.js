import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(res => setMessage(res.message))
      .catch(console.error);
  }, [setMessage]);

  const [birdData, setBirdData] = useState();
  
  useEffect(() => {
    fetch("https://api.ebird.org/v2/data/obs/KZ/recent", { 
      headers: {'x-ebirdapitoken': '1p6hq3g62rlm'}})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setBirdData(data[0].comName);
    })
    .catch((error) => {
      setBirdData(error);
    });
  }, [setBirdData]);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message || "Loading..."}</p>

        <p>{birdData || "Loading..."}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

export default App;
