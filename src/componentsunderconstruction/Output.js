import React, { useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


//import CheckBoxIcon from "@material-ui/icons/CheckBox";
const Output = ({testcases, testError, testPassed, testResults, testRunning, submitted}) => {
  let divColor = "white";
  let testErr = null;
  if(testError) {
    testErr = testError[0]
  }
  return(
    <div >
    <div style={{display:'flex',justifyContent:'center', borderBottom:'2px solid #00bef7',fontSize:'1.5em', fontWeight:'bold', color:'#00bef7' }}>Output</div>
      {testcases.map((c,i) => {
          return(
            <div key = {i} style={{display:'flex', justifyContent:'center', verticalAlign:'middle', alignItems:'center', fontWeight:'bold',}}>
              {testPassed[i] && !testRunning && submitted && !testErr? <div style={{display:'flex', color:"#77ff73", height: 60, alignItems:'center',width:'100%',borderBottom:'2px solid #00bef7', justifyContent:'center'}}>Success</div> : null }
              {!testPassed[i] && !testRunning && submitted && !testErr?<div style={{display:'flex',color:'red', height: 60,alignItems:'center',borderBottom:'2px solid #00bef7', width:'100%',justifyContent:'center'}}>Failed: Expected {testResults[i]} to be {c.expected}</div> : null}
            </div>
          )
      })}
      <div style={{borderLeft:'18px solid #e80c0c', borderRight:'18px solid #e80c0c'}}>
      {testErr && <div style={{backgroundColor:'#d4b2b2', height: 50,}}><p style={{color:'#b80000', margin:0,}}>Error: {testErr}</p></div>}
      </div>
      </div>
  )
}

export default Output;