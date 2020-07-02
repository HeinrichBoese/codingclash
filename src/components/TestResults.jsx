import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display:'flex',
    justifyContent:'center', 
    width:'100%',
    // borderBottom:'2px solid #f547e1',
    fontSize:'1.5em', fontWeight:'bold', 
    // color:'#00bef7', 
    color: theme.palette.secondary.main,
    height:60, 
    alignItems:'center',
    // boxShadow: 'inset 0px 0px 20px 2px #f547e1,0px 0px 20px 2px #f547e1',
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`,
    borderRadius:4
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
  },
  loading: {
    height:'calc(100% - 62px)'
  },
  loadingContainer: {
    height:'100%',
    width:'100%', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center'
  },
  normal: {
    color: theme.palette.secondary.main,
    textShadow: `0px 0px 20px ${theme.palette.secondary.main}`
  },
  correct: {
  color: '#57eb07',
  textShadow:'0px 0px 20px #57eb07'
  },
  incorrect: {
    color: 'red',
  textShadow:'red'
  }
}))


const TestResults = ({testcases, testResults, submitted, testError, testPassed, testRunning, evaluate, runButtonDisabled, runTests, testButtonDisabled}) => {
  const classes = useStyles();
  let switchClass = classes.normal;
  let exp = ''
  let testErr = '';
  if(testRunning) {
    return ( 
    <Box className={classes.loading}>
    <div className={classes.container}>Testcases</div><span className={classes.loadingContainer}><span><CircularProgress /></span> </span>
    </Box>
  )}
  return (
        <Box style={{width:'100%'}}>
          <div className={classes.container}>Testcases</div>
         {testcases.map((c, i) => {
          if (submitted && testPassed[i]) {
            switchClass = classes.correct;
          } else if (submitted && !testPassed[i]) {
            switchClass = classes.incorrect;
            exp = testResults[i]
            // testResult = testResults[i]
            if(testError[i] !== null) {
              testErr = testError[i]
            }
          }
          return (
            <Box
              key = {c.description}
              className = {switchClass}
              style={{
                display:'flex',
                height: 60,
                textAlign: "center",
                alignItems:'center',
                justifyContent:'center',
                verticalAlign:'middle',
                // color:,
                width:'100%',
                // textShadow:`0px 0px 20px ${divColor}`,
                borderRadius: 0,
                // borderBottom:'2px solid #f547e1',
                // boxShadow: '0px 0px 20px 2px #f547e1',
                
              }}
            > 
              <div style={{display:'flex',alignItems:'center' ,verticalAlign:'middle', justifyContent:'center', fontSize:'1em', fontWeight:'bold',width:'100%' }}>
                 {c.description}
              </div>
            </Box>
          );
        })}
        </Box>
  );
}

export default TestResults;