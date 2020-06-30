import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
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
    height: 60, 
    alignItems:'center',
    width:'100%',
    borderBottom:'2px solid #00bef7', 
    justifyContent:'center'
  },
  checkfalse: {
    display:'flex',
    color:'red', 
    height: 60,
    alignItems:'center',
    borderBottom:'2px solid #00bef7', 
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


const TestResults = ({testcases, testResults, submitted, testError, testPassed, testRunning, evaluate, runButtonDisabled, runTests, testButtonDisabled}) => {
  const classes = useStyles();
  let divColor = '#00bef7';
  let exp = ''
  let testErr = '';
  return (
        <Box >
          <div className={classes.container}>Testcases</div>
         {testcases.map((c, i) => {
          if (submitted && testPassed[i]) {
            divColor = "#77ff73";
          } else if (submitted && !testPassed[i]) {
            divColor = '#f05841';
            exp = testResults[i]
            // testResult = testResults[i]
            if(testError[i] !== null) {
              testErr = testError[i]
            }
          }
          return (
            <Box
              key = {c.description}
              style={{
                display:'flex',
                height: 60,
                textAlign: "center",
                alignItems:'center',
                justifyContent:'center',
                verticalAlign:'middle',
                color:divColor,
                textShadow:`0px 0px 20px ${divColor}`,
                borderRadius: 0,
                // borderBottom:'2px solid #f547e1',
                // boxShadow: '0px 0px 20px 2px #f547e1',
                
              }}
            > 
              <div style={{display:'flex',alignItems:'center' ,verticalAlign:'middle', justifyContent:'center', fontSize:'1em', fontWeight:'bold' }}>
                {testRunning ? <CircularProgress /> : c.description }
              </div>
            </Box>
          );
        })}
        </Box>
  );
}

export default TestResults;