import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  container: {
    display:'flex',
    justifyContent:'center', 
    borderBottom:'2px solid #f547e1',
    fontSize:'1.5em', fontWeight:'bold', 
    color:'#00bef7', 
    height:60, 
    alignItems:'center',
    boxShadow: '0px 0px 20px 2px #f547e1',
    textShadow:'0px 0px 20px #00bef7'
  },
  checktrue: {
    display:'flex', 
    color:"#77ff73", 
    textShadow:'0px 0px 20px #77ff73',
    height: 60, 
    alignItems:'center',
    width:'100%',
    // borderBottom:'2px solid #00bef7', 
    justifyContent:'center'
  },
  checkfalse: {
    display:'flex',
    color:'#f05841', 
    textShadow:'0px 0px 20px #f05841',
    height: 60,
    alignItems:'center',
    // borderBottom:'2px solid #00bef7', 
    width:'100%',
    justifyContent:'center'
  },
  checkBox: {
    display:'flex', 
    justifyContent:'center', 
    verticalAlign:'middle', 
    alignItems:'center', 
    fontWeight:'bold'
  }
}))


const Output = ({testcases, testError, testPassed, testResults, testRunning, submitted}) => {
  const classes = useStyles();
  let testErr = null;
  if(testError) {
    testErr = testError[0]
  }
  return(
    <div >
    <div className={classes.container}>Output</div>
      {testcases.map((c,i) => {
          return(
            <div key = {i} className={classes.checkBox}>
              {testPassed[i] && !testRunning && submitted && !testErr? <div className={classes.checktrue}>Success</div> : null }
              {!testPassed[i] && !testRunning && submitted && !testErr?<div className={classes.checkfalse}>Failed: Expected {testResults[i]} to be {c.expected}</div> : null}
            </div>
          )
      })}
      <div>
      {testErr && <div><p style={{color:'#f05841', textShadow:'0px 0px 20px #f05841', fontSize:'1.5em', margin:15, display:'flex', justifyContent:'center'}}>Error: {testErr}</p></div>}
      </div>
      </div>
  )
}

export default Output;