import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import CodeEditAndRun from './components/CodeEditAndRun';
import Home from './components/Home';
import Header from "./components/Header";
import Register from "./components/Register";
import { AuthProvider } from './Auth';
import Login from './components/Login';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Route exact path='/challenge/yourself' render={(props) => <CodeEditAndRun {...props} />} />
        <Route exact path="/register"> <Register /></Route> 
        <Route exact path="/login"> <Login /></Route> 
      </Router>
    </AuthProvider>
  );
}

export default App;


