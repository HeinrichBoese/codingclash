//import firebase from "../firebase";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
// import "../App.css";

const useStyles = makeStyles((theme) => ({
  head: {
    // marginTop:50,
    width:'100%',
    display:'flex',
    color: theme.palette.secondary.main,
    justifyContent:'center' 
  },
  pageheader: {
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`,
    fontSize: '3em'
  },
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 60,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: 20,
  },
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    // color: "#f547e1",
    color: theme.palette.secondary.main,


    fontSize: '1em',
    fontWeight: 'bold',
    height: 84,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width: 180,
    margin: 12,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main}, 0px 0px 20px 2px ${theme.palette.secondary.main}`,
    transition: 'box-shadow .3s',
    // textShadow:'0px 0px 20px #f547e1',
    // testShadow: '0px 0px 20px #00bef7',
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    '&:hover': {
      boxShadow: `inset 0px 0px 20px 10px ${theme.palette.secondary.main}, 0px 0px 20px 10px ${theme.palette.secondary.main}`,
    },
  },
  buttonDisabled: {
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color:  theme.palette.disabled.main,
    fontSize: '1em',
    fontWeight: 'bold',
    height: '84px',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width: '180px',
    margin: 12,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.disabled.main}`,
  },
  container: {
    width:'calc(100% - 200px)',
    marginLeft:'200px',
    minWidth:'795px',
    display: "flex",
    justifyContent: "center",
    flexWrap:'wrap'
    // height:'100vh',
    // widht:'100vw'
  },
}));

const Home = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const toolTip = "Please LogIn to create a Lobby";


  return (
    <div className={classes.container}>
      <div className={classes.head}>
      <h1 className={classes.pageheader}>Welcome to Coding Clash</h1>
      </div>
      
      <Button className={classes.buttons} component={Link} to={"/solo"}>
        Practice Solo
      </Button>
      {/* && !currentUser.isAnonymous FRAGE SOLL EIN ANONYMER USER EINE LOBBY AUFMACHEN KÖNNEN?*/}
      {currentUser ? <Button className={classes.buttons} component={Link} to={"/game"}> 
        Create Lobby
      </Button>
        :
        <Button className={classes.buttonDisabled} disabled={true} component={Link} to={"/game"}>
          Please LogIn or Sign Up to create a Lobby
      </Button>
      }
    </div>
  );
};

export default Home;
