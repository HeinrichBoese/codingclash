import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import CodeEditAndRun from './components/CodeEditAndRun';
import Lobby from './components/Lobby';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (

    <div className="App">
        {/* <Header isLoggedIn = {loggedIn}/> */}
      {/* <CodeEditAndRun />  */}
      {/* <Lobby /> */}
    </div>
   
  );
}

export default App;
