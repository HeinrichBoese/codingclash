import React, { useContext } from "react";
import firebase from "../firebase";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
// import "../App.css";
import images from "./images";
import medals from "./medals"
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, IconButton } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  spancolor:{
    color: theme.palette.secondary.main,
  },
  card: {
    height: 200,
    background: 'transparent !important',
    color: theme.palette.secondary.main,
    width: "100%",
    textShadow: '0px 0px 5px #00bef7',
    fontSize: '.8em',
    boxSizing:'border-box',
    fontWeight: 'bold',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px ${theme.palette.primary.main}`,
    backgroundColor: '#F5F5F5',
    //  [theme.breakpoints.down('sm')]: {
    //   height: '100%',
    //   background: 'transparent !important',
    //   color: theme.palette.secondary.main,
    //   width: "200px",
    //   textShadow: '0px 0px 5px #00bef7',
    //   fontSize: '.8em',
    //   boxSizing:'border-box',
    //   fontWeight: 'bold',
    //   border: `2px solid ${theme.palette.primary.main}`,
    //   boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px ${theme.palette.primary.main}`,
    //   backgroundColor: '#F5F5F5',
    //  }
  },
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: theme.palette.secondary.main,
    textShadow: `0px 0px 5px ${theme.palette.secondary.main}`,
    fontSize: '.8em',
    fontWeight: 'bold',
    height: 60,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width: '150px',
    margin: 8,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
    transition: 'box-shadow .3s',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    '&:hover': {
      boxShadow: `inset 0px 0px 20px 8px ${theme.palette.secondary.main},0px 0px 20px 8px ${theme.palette.secondary.main}`,
    },
    // [theme.breakpoints.down('sm')]: {
    //   color: "#f547e1",
    //   fontSize:'.8em',
    //   fontWeight:'bold',
    //   height: '45px',
    //   textShadow:'0px 0px 5px #f547e1',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    // width:'100px',
    // margin:8,
    // border: '2px solid rgb(241,26,255)',
    // border: '2px solid  #00bef7',

    // },
  },
  buttonsDisabled: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: theme.palette.disabled.main,
    // textShadow: '0px 0px 5px #00bef7',
    fontSize: '.8em',
    fontWeight: 'bold',
    height: 60,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width: '150px',
    margin: 8,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.disabled.main}`,
    // boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
    transition: 'box-shadow .3s',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    // '&:hover': {
    //   boxShadow: `inset 0px 0px 20px 8px ${theme.palette.secondary.main},0px 0px 20px 8px ${theme.palette.secondary.main}`,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   color: "#f547e1",
    //   fontSize:'.8em',
    //   fontWeight:'bold',
    //   height: '45px',
    //   textShadow:'0px 0px 5px #f547e1',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    // width:'100px',
    // margin:8,
    // border: '2px solid rgb(241,26,255)',
    // border: '2px solid  #00bef7',

    // },
  },
  sidebar: {
    background: 'rgb(9,25,115)',
    background: 'linear-gradient(90deg, rgba(9,25,115,1) 20%, rgba(20,22,46,1) 85%)',
    height: '100vh',
    borderRight: `2px solid ${theme.palette.primary.main}`,
    overflowY: 'auto',
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px ${theme.palette.primary.main}`,
    width: '200px',
    position: 'fixed',

    // display:'flex',
    // flexWrap:'wrap',
    // justifyContent: 'center',

    display: 'grid',
    justifyItems: 'center',
    gridTemplateRows: '220px 100px 100px 100px 100px 100px auto'

    // [theme.breakpoints.down('sm')]: {
    //   width:'100%',
    //   height:200,
    //   display:'flex',
    //   flexWrap:'none',
    //   borderBottom:'2px solid #00bef7',
    //   position: 'static'
    //  },


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
  cardname:{
    color: theme.palette.secondary.main,
    fontSize:'1em'
  }
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
      <Card className={classes.card}>

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
            : userData && <span style={{fontSize:'1.5em'}}>{userData.playerName}</span>}
          subheader={userCheck()
            ? <span className={classes.spancolor}>No XP, no cookies</span>
            : userData && <span className={classes.cardname}>Level: {userData.playerLevel}</span>}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img style={{ height: 80 }}
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

      {userCheck() ? <Button
        component={Link}
        to={"/InputForm"}
        disabled={true}
        className={classes.buttonsDisabled}>Inputform</Button>
        :
        <Button
        component={Link}
        to={"/InputForm"}
        disabled={false}
        className={classes.buttons}>Inputform</Button>
      }

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

      {/* <Button className={classes.buttons}>Instructions</Button> */}

      <Button className={classes.buttons} component={Link} to={'/themes'}>Theme</Button>

    </div>
  )
}

export default withRouter(Sidebar);