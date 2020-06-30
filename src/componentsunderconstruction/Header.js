import React, { useContext } from "react";
import firebase from "../firebase";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { grey } from "@material-ui/core/colors";
import { AuthContext } from "../Auth";
import { Box } from "@material-ui/core";
import images from "../components/images";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
    backgroundColor: grey[50],
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const { currentUser, userData } = useContext(AuthContext);

  let game = true;
  if (window.location.pathname.includes('game')) {
    game = false
  }

  return (
    <div>
      {game &&
        <div className={classes.root}>
          <Toolbar /> {/*SPACE KEEPER SO CONTENT DOES NOT SLIDE UNDER MENU BAR */}
          <AppBar >
            <Toolbar>
              <Button
                component={Link}
                to={"/"}
                startIcon={<HomeIcon />}
                edge="start"
                variant="contained"
                className={classes.button}
              >
                Home
          </Button>
              {currentUser && (
                <Button
                  component={Link}
                  to={"/InputForm"}
                  startIcon={<CreateIcon />}
                  edge="start"
                  variant="contained"
                  className={classes.button}
                >
                  New
                </Button>
              )}
              <Typography variant="h6" className={classes.title}>
                Hallo {currentUser ? !currentUser.displayName ? currentUser.email : currentUser.displayName : "Gast"}! Willkommen bei Code
            Clash
          </Typography>

              {currentUser && (
                <Button
                  component={Link}
                  to={"/"}
                  className={classes.button}
                  startIcon={<LockIcon />}
                  variant="contained"
                  onClick={() => firebase.auth().signOut()}
                >
                  LOG OUT
                </Button>
              )}
              {currentUser && (
                <Box
                  component={Link}
                  to={"/Playerprofile"}>
                  <img
                    src={userData && images[userData.playerImage]}
                    height={35} alt="my Head" />
                </Box>
              )}
              {!currentUser && (
                <Button
                  component={Link}
                  to={"/login"}
                  className={classes.button}
                  startIcon={<LockOpenIcon />}
                  variant="contained"
                >
                  LOG IN
                </Button>
              )}
              {!currentUser && (
                <Button
                  component={Link}
                  to={"/register"}
                  className={classes.button}
                  startIcon={<AssignmentIcon />}
                  variant="contained"
                >
                  SIGN UP
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
      }
    </div>
  );
}

export default withRouter(ButtonAppBar);
