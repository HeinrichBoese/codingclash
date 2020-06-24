import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import CodeEditAndRun from './components/CodeEditAndRun';
import Home from './components/Home';



function App() {
  return (
    <Router>
      <Route exact path='/' render={(props) => <Home {...props} />} />
      <Route exact path='/challenge' render={(props) => <CodeEditAndRun {...props} />} />
    </Router>

  );
}

export default App;


