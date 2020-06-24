import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import CodeEditAndRun from './components/CodeEditAndRun';
import Home from './components/Home';
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path='/' render={(props) => <Home {...props} />} />
      <Route exact path='/challenge' render={(props) => <CodeEditAndRun {...props} />} />
    </Router>

  );
}

export default App;


