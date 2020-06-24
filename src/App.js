import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoloMode from "./components/SoloMode";
import RaceMode from "./components/RaceMode";
import ClassroomMode from "./components/ClassroomMode";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/solo">
          <SoloMode />
        </Route>
        <Route exact path="/race">
          <RaceMode />
        </Route>
        <Route exact path="/classroom">
          <ClassroomMode />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
