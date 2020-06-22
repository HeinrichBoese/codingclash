import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import CodeEditAndRun from './components/CodeEditAndRun';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (

   

    <div className="App">
       <Header isLoggedIn = {loggedIn}/>
      <CodeEditAndRun />
    </div>
  );
}

export default App;
