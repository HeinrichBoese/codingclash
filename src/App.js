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
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100vw - 160px)",
    marginLeft: "160px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      marginLeft: 0,
    },
  },
  gameContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
}));



function App() {
  const classes = useStyles();
  return (
    <AuthProvider>
      <Router >
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:id?">
            <div className={classes.gameContainer}> 
              <Box className={classes.root}>
                <GameMaster />
              </Box>
            </div>
          </Route>
          <Route exact path="/solo">
          <div className={classes.gameContainer}> 
            <Box className={classes.root}>
              <SoloMode />
            </Box>
          </div>
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
        {/* </div> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
