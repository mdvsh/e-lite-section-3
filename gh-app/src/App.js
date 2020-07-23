import React from 'react';
import './App.css';
import Main from './Main.js'

function Title() {
  return (
    <h2 style={{ fontSize: "2.2rem", textAlign: "center", margin: "30px 0" }}>
    ReactJS + GithubAPI Example
    </h2>    
  );
}

function SubTitle() {
  return (
    <h3 style={{ fontSize: "1.8rem", textAlign: "center", color: "#888888" }}>
    WebDev Week 3: Exercise 2
    </h3>    
  );
}

function App() {
  return (
    <div className="container">
      <div className="header">
        <Title />
        <SubTitle />
      </div>
      <Main />
    </div>
  )
}

export default App;
