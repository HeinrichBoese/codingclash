import React, { useContext } from "react";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

import PersonIcon from "@material-ui/icons/Person";
import images from "./images";
const useStyles = makeStyles((theme) => ({
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: "#f547e1",

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
    transition: 'box-shadow .5s',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    '&:hover': {
      boxShadow: '0px 0px 20px 10px #00bef7',
    }
  },
  sidebar: {    
    height: '100vh',
    borderRight: '2px solid #00bef7',
    width: '160px',
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      height: 100,
      display: 'flex'
    },
  },
}))
//import CheckBoxIcon from "@material-ui/icons/CheckBox";
const Sidebar = () => {
  const { currentUser, userData } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <Card style={{ height: 110, width: 160 }}>
        <CardMedia style={{ height: 100, width: 100 }} image={userData ? images[userData.playerImage]: PersonIcon } />
        {/* image={PersonIcon}  */}
        
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

      {currentUser && (<Button
        component={Link}
        to={"/"}
        onClick={() => firebase.auth().signOut()}
        className={classes.buttons}>Log Out</Button>)}

      {!currentUser && (<Button
        component={Link}
        to={"/login"}
        className={classes.buttons}>Log In</Button>)}

      {!currentUser && (<Button
        component={Link}
        to={"/register"}
        className={classes.buttons}>Sign Up</Button>)}

      <Button className={classes.buttons}>Instructions</Button>

      <Button className={classes.buttons}>Hodor</Button>
    </div>
  )
}

export default withRouter(Sidebar);