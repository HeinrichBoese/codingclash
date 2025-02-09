import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoloMode from "./components/SoloMode";
import Home from "./components/Home";
import Register from "./components/Register";
import { AuthProvider } from "./Auth";
import Login from "./components/Login";
import { InputForm } from "./components/inputForm";
import PlayerProfile from "./componentsunderconstruction/PlayerProfile";
import Sidebar from "./components/Sidebar"
import AuthChecker from "./components/AuthChecker";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Themes from './components/Themes'


const violet = createMuiTheme({
  palette: {
    background: {
      default: '#14162e',
    },
    primary: {
      main: '#f547e1',
     
    },
    secondary: {
      main: '#00bef7'
    },
    disabled: {
      main: '#039ea6 !important'
    }
  }

});

const black = createMuiTheme({
  palette: {
    background: {
      default: '#14162e '
    },
    primary: {
      main: '#07fa44'
    },
    secondary: {
      main: '#ffffff',
    },
    disabled: {
      main: '#888a87 !important'
    }
  }

})

const lightblue = createMuiTheme({
  palette: {
    background: {
      default: '#14162e ',
    },
    primary: {
      main: '#fad016',
    },
    secondary: {
      main: '#c107eb',
    },
    disabled: {
      main: '#3b2a7d !important'
    }
  }

})
const useStyles = makeStyles((theme) => ({
  '@global' : {
    '.CodeMirror': {
      height: '100% !important',
      fontSize:'1.5em !important',
      width:'100',
      backgroundColor: 'transparent !important',
      /* border:2px solid #f547e1 !important; */
      boxSizing: 'border-box',
      /* box-shadow: inset 0px 0px 20px 2px #f547e1, 0px 0px 20px 2px #f547e1 ; */
      borderRadius:'4px'  
  },
  
  '.CodeMirror-gutters': {
      backgroundColor: 'transparent !important',
      border: 'transparent !important'
     
  },
  
  '.CodeMirror-linenumber': {
      color:'#f547e1 !important'
  },
  
  
  '.react-codemirror2': {
      height:'100%',
      width:'100%'
  },
  
  
  },
  root: {
    width: "calc(100vw - 200px)",
    marginLeft: "200px",
    height: '100vh',
    minHeight: '600px',
    // [theme.breakpoints.down("md")]: {
    //   width: "calc(100% - 200px)",
    //   marginLeft: "200px",
    //   height: '100vh',
    //   minHeight: '600px',
    // },
    // [theme.breakpoints.down("sm")]: {
    //   width: "100vw",
    //   marginLeft: 0,
    // },
  },
  gameContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    // [theme.breakpoints.down("md")]: {
    //   display: "flex",
    //   flexWrap: "wrap",
    //   width:'100%',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // [theme.breakpoints.down("sm")]: {
    //   width:'100%',
    //   display: "flex",
    //   flexWrap: "wrap",
    // },
  },
}));

function App() {
  const [selectedtheme, setTheme] = useState(violet);
  const classes = useStyles();
  const themesarray = [{ theme: violet }, { theme: black }, { theme: lightblue }]
  return (
    <ThemeProvider theme={selectedtheme}>
      <CssBaseline />
      <AuthProvider>
        <Router >
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/game/:id?">
              <Box className={classes.root}>
                <div className={classes.gameContainer}>
                  <AuthChecker />
                </div>
              </Box>
            </Route>
            <Route exact path="/solo">
              <Box className={classes.root}>
                <div className={classes.gameContainer}>
                  <SoloMode />
                </div>
              </Box>
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
            <Route exact path='/themes'>
              <Box className={classes.root}>
                <div className={classes.gameContainer}>
                  <Themes Themesarray={themesarray} setTheme={setTheme} />
                </div>
              </Box>
            </Route>
            <Route >
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
