import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoloMode from "./components/SoloMode";
import Home from "./components/Home";
import GameMaster from "./components/GameMaster";
import Header from "./components/Header";
import Register from "./components/Register";
import { AuthProvider } from "./Auth";
import Login from "./components/Login";
import { InputForm } from "./components/inputForm";
import Lobby from "./components/Lobby";
import PlayerProfile from "./components/PlayerProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
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
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
