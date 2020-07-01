import React, { useContext } from "react";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
import Card from "@material-ui/core/Card";

import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";
import images from "./images";
import medals from "./medals"
import { CardHeader, IconButton } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: "#f547e1",
    textShadow: '0px 0px 20px #f547e1',
    fontSize: '.8em',
    fontWeight: 'bold',
    height: 84,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width: 130,
    margin: 12,
    // border: '2px solid rgb(241,26,255)',
    border: '2px solid  #00bef7',
    boxShadow: '0px 0px 20px 2px #00bef7',
    transition: 'box-shadow .3s',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    '&:hover': {
      boxShadow: '0px 0px 20px 10px #00bef7',
    },
    [theme.breakpoints.down('sm')]: {
      color: "#f547e1",
      fontSize: '.8em',
      fontWeight: 'bold',
      height: '45px',
      textShadow: '0px 0px 20px #f547e1',
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width: '100px',
      margin: 8,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #00bef7',

    },
  },
  sidebar: {
    height: '100vh',
    borderRight: '2px solid #00bef7',
    boxShadow: '0px 0px 20px 2px #00bef7',
    width: '160px',
    position: 'fixed',
    // zIndex: 1,
    // top: 0,
    // left: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 112.4,
      display: 'flex',
      borderBottom: '2px solid #00bef7',
      position: 'static'
    },

    // fontSize: '.8em',
    // fontWeight: 'bold',
    // height: 84,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    // width: 130,
    // margin: 12,
    // border: '2px solid rgb(241,26,255)',
    // border: '2px solid  #00bef7',
    // boxShadow: '0px 0px 20px 2px #00bef7',
    // transition: 'box-shadow .5s',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    //   '&:hover': {
    //     boxShadow: '0px 0px 20px 10px #00bef7',
    //   }
    // },
    // sidebar: {    
    //   height: '100vh',
    //   borderRight: '2px solid #00bef7',
    //   width: '160px',
    //   [theme.breakpoints.down('md')]: {
    //     width: '100vw',
    //     height: 100,
    //     display: 'flex'
    //   },

  },
}))
const Sidebar = () => {
  const { currentUser, userData } = useContext(AuthContext);
  const classes = useStyles();

  const userCheck = () => {
    if (!currentUser) {
      return true
    } else if (currentUser.isAnonymous) {
      return true
    } else {
      return false
    }
  };


  return (
    <div className={classes.sidebar}>
      <Card style={{ height: 200, width: 160 }}>
        <CardHeader
          avatar={
            <img style={{ width: 50, height: 50 }}
              src={userCheck()
                ? images.anonym
                : userData && images[userData.playerImage]}
              alt="Pic? o.O" />

          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title={userCheck()
            ? "Anonym"
            : userData && userData.playerName}
          subheader={userCheck()
            ? "No XP, no cookies"
            : userData && `Level: ${userData.playerLevel}`}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img style={{ height: 100 }}
            src={userCheck()
              ? medals.M0
              : userData && medals['M' + Math.floor(userData.playerLevel)]}
            alt="Medal? o.O" />
        </div>
        {/* <CardContent> */}

        {/* </CardContent> */}
      </Card>
      <Button
        component={Link}
        to={"/"}
        className={classes.buttons}>Home</Button>

      {currentUser && (<Button
        component={Link}
        to={"/InputForm"}
        className={classes.buttons}>Inputform</Button>)}

      {currentUser && !currentUser.isAnonymous && (<Button
        component={Link}
        to={"/"}
        onClick={() => firebase.auth().signOut()}
        className={classes.buttons}>Log Out</Button>)}

      {userCheck() && <Button
        component={Link}
        to={"/login"}
        className={classes.buttons}>Log In</Button>}

      {userCheck() && (<Button
        component={Link}
        to={"/register"}
        className={classes.buttons}>Sign Up</Button>)}
{/* 
      <Button className={classes.buttons}>Instructions</Button>

      <Button className={classes.buttons}>Hodor</Button> */}
    </div>
  )
}

export default withRouter(Sidebar);