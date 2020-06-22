import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Header isLoggedIn = {loggedIn}/>
  );
}

export default App;
