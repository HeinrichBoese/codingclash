import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display:'flex', 
    justifyContent:'space-around', 
    alignContent:'center', 
    flexWrap:'wrap', 
    width:'100%',
    [theme.breakpoints.down('sm')]:{
      display:'flex', 
      justifyContent:'space-between', 
      alignContent:'center', 
      flexWrap:'wrap', 
      width:'100%',
    }
  },
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: "#f547e1",
   
    fontSize:'.8em',
    fontWeight:'bold',
    height: '40px',
    textShadow:'0px 0px 20px #f547e1',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'100px',
    margin:8,
    // border: '2px solid rgb(241,26,255)',
    border: '2px solid  #00bef7',
    boxShadow: '0px 0px 20px 2px #00bef7',
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: '0px 0px 20px 10px #00bef7'
    },
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    [theme.breakpoints.down('md')]: {
    color: "#f547e1",
    fontSize:'.8em',
    fontWeight:'bold',
    height: '40px',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'100px',
    margin:8,
    textShadow:'0px 0px 20px #f547e1',
    // border: '2px solid rgb(241,26,255)',
    border: '2px solid  #00bef7',
    '&:hover': {
      boxShadow: '0px 0px 20px 10px #00bef7'
    }
     },
     [theme.breakpoints.down('sm')]:{
      color: "#f547e1",
      fontSize:'.8em',
      fontWeight:'bold',
      height: '40px',
      textShadow:'0px 0px 20px #f547e1',
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width:'52px',
      margin:8,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #00bef7',
      '&:hover': {
        boxShadow: '0px 0px 20px 10px #00bef7'
      }
    }
},
buttonDisabled: {
  // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: "#adadad !important ",
    fontSize:'.8em',
    fontWeight:'bold',
    height: '40px',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'100px',
    margin:8,
    // border: '2px solid rgb(241,26,255)',
    border: '2px solid  #adadad',
    [theme.breakpoints.down('md')]: {
      color: "#adadad",
      fontSize:'.8em',
      fontWeight:'bold',
      height: '40px',
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width:'100px',
      margin:8,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #adadad',
    },
    [theme.breakpoints.down('sm')]:{
      color: "#f547e1",
      fontSize:'.8em',
      fontWeight:'bold',
      height: '40px',
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width:'52px',
      margin:8,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #adadad',  
    }
}
}))
export default function Actions({evaluate, runTests, testButtonDisabled, runButtonDisabled, submit, allChecksDone}) {
  const classes = useStyles();
    return(

          <div className={classes.buttonContainer}>
         {allChecksDone ? 
         <Button
          onClick={submit}
          className={classes.buttons}
        >
          Submit
        </Button>
        : 
        <Button
        disabled={true}
        className={classes.buttonDisabled}
      >
        Submit
        </Button>
         }   
         {testButtonDisabled ?  
         <Button
         disabled={true}
          onClick={runTests}
          className={classes.buttonDisabled}
          > 
          Run
          </Button>
          :
          <Button
          onClick={runTests}
          className={classes.buttons}
        >
          Run
        </Button>}
        <Button
          onClick={evaluate}
          disabled={runButtonDisabled}
          className={classes.buttons}
        >
          Test
        </Button>
        </div>
      )
}