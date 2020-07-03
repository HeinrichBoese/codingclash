import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
// import "../App.css";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display:'flex', 
    justifyContent:'space-around', 
    alignContent:'center', 
    flexWrap:'wrap', 
    width:'100%',
    // [theme.breakpoints.down('sm')]:{
    //   display:'flex', 
    //   justifyContent:'space-between', 
    //   alignContent:'center', 
    //   flexWrap:'wrap', 
    //   width:'100%',
    // }
  },
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: theme.palette.secondary.main,
   
    fontSize:'.8em',
    fontWeight:'bold',
    height: '40px',
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`,
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'100px',
    margin:8,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main}, 0px 0px 20px 2px ${theme.palette.secondary.main}`,
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: `inset 0px 0px 20px 10px ${theme.palette.secondary.main}, 0px 0px 20px 10px ${theme.palette.secondary.main}`
    },
    // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    // [theme.breakpoints.down('md')]: {
    // color: "#f547e1",
    // fontSize:'.8em',
    // fontWeight:'bold',
    // height: '40px',
    // // padding: "0 30px",
    // // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    // width:'100px',
    // margin:8,
    // textShadow:'0px 0px 20px #f547e1',
    // // border: '2px solid rgb(241,26,255)',
    // border: '2px solid  #00bef7',
    // '&:hover': {
    //   boxShadow: '0px 0px 20px 10px #00bef7'
    // }
    //  },
    //  [theme.breakpoints.down('sm')]:{
    //   color: "#f547e1",
    //   fontSize:'.8em',
    //   fontWeight:'bold',
    //   height: '40px',
    //   textShadow:'0px 0px 20px #f547e1',
    //   // padding: "0 30px",
    //   // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    //   width:'52px',
    //   margin:8,
    //   // border: '2px solid rgb(241,26,255)',
    //   border: '2px solid  #00bef7',
    //   '&:hover': {
    //     boxShadow: '0px 0px 20px 10px #00bef7'
    //   }
    // }
},
seconds: {
  color: theme.palette.secondary.main,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  height:60,
  fontSize:'1.5em'

},
buttonDisabled: {
  // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: theme.palette.disabled.main,
    fontSize:'.8em',
    fontWeight:'bold',
    height: '40px',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'100px',
    margin:8,
    // border: '2px solid rgb(241,26,255)',
    border: `2px solid ${theme.palette.disabled.main}`,
    // [theme.breakpoints.down('md')]: {
    //   color: "#adadad",
    //   fontSize:'.8em',
    //   fontWeight:'bold',
    //   height: '40px',
    //   // padding: "0 30px",
    //   // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    //   width:'100px',
    //   margin:8,
    //   // border: '2px solid rgb(241,26,255)',
    //   border: '2px solid  #adadad',
    // },
    // [theme.breakpoints.down('sm')]:{
    //   color: "#f547e1",
    //   fontSize:'.8em',
    //   fontWeight:'bold',
    //   height: '40px',
    //   // padding: "0 30px",
    //   // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    //   width:'52px',
    //   margin:8,
    //   // border: '2px solid rgb(241,26,255)',
    //   border: '2px solid  #adadad',  
    // }
}
}))
export default function Actions({evaluate, runTests, testButtonDisabled, runButtonDisabled, submit, allChecksDone, secondsLeft, multiplayer}) {
  const classes = useStyles();

    return(

          <div className={classes.buttonContainer}>
         {allChecksDone && multiplayer && 
         <Button
          onClick={submit}
          className={classes.buttons}
        >
          Submit
        </Button>
        }
        {!allChecksDone && multiplayer &&
          <Button
          disabled={true}
          className={classes.buttonDisabled}
        >
          Submit
          </Button>
           
        }
         {multiplayer && <span className={classes.seconds}><p> {secondsLeft}s</p></span>}
         {testButtonDisabled ?  
         <Button
         disabled={true}
          onClick={runTests}
          className={classes.buttonDisabled}
          > 
          Test
          </Button>
          :
          <Button
          onClick={runTests}
          className={classes.buttons}
        >
          Test
        </Button>}
        
        {/* <Button
          onClick={evaluate}
          disabled={runButtonDisabled}
          className={classes.buttons}
        >
          Run
        </Button> */}
        </div>
      )
}