import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoloMode from "./components/SoloMode";
import Home from "./components/Home";
import GameMaster from "./components/GameMaster";
import Register from "./components/Register";
import { AuthProvider } from "./Auth";
import Login from "./components/Login";
import { InputForm } from "./components/inputForm";
import PlayerProfile from "./componentsunderconstruction/PlayerProfile";
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <AuthProvider>
      <Router >
      <div style={{ display: "flex" }}>
        <div style={{width: '100vw',}}>
        <Sidebar />
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:id?">
            <GameMaster />
          </Route>
          <Route exact path="/solo">
            <SoloMode />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/PlayerProfile">
            <PlayerProfile />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/inputForm">
            <InputForm />
          </Route>
          <Route >
            <Home />
          </Route>
        </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
