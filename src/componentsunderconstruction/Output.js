import React, { useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


//import CheckBoxIcon from "@material-ui/icons/CheckBox";
const Output = ({testcases, testErr, testPassed, testResults, testRunning, submitted}) => {
  let divColor = "white";

  return(
    <div>
    <div style={{display:'flex',justifyContent:'center', backgroundColor:"#5c5d5e"}}>Output</div>
      {testcases.map((c,i) => {
          return(
            <div style={{display:'flex', justifyContent:'center', verticalAlign:'middle', alignItems:'center'}}>
              {testPassed[i] && !testRunning && submitted && !testErr? <div style={{display:'flex', color:"#77ff73", height: 50, alignItems:'center'}}>Success</div> : null }
              {!testPassed[i] && !testRunning && submitted && !testErr?<div style={{display:'flex',color:'red', height: 50,alignItems:'center'}}>Failed: Expected {testResults[i]} to be {c.expected}</div> : null}
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