import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoloMode from "./components/SoloMode";
import RaceMode from "./components/RaceMode";
import ClassroomMode from "./components/ClassroomMode";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import { AuthProvider } from './Auth';
import Login from './components/Login';
import { InputForm } from "./components/inputForm";


function App() {
  return (
<AuthProvider>
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
        <Route exact path="/login">
          <Login />
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
