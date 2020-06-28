import React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Output from "../componentsunderconstruction/Output";
import Button from "@material-ui/core/Button";


const TestResults = ({testcases, testResults, submitted, testError, testPassed, testRunning, evaluate, runButtonDisabled, runTests, testButtonDisabled}) => {
  let divColor = '#f547e1';
  // let scroll = testcases.length > 5 ? "scroll" : "none";
  let exp = ''
  // let output = '';
  // let testcase = '';
  // let testResult = '';
  let testErr = '';
  return (
    <div style={{ backgroundColor: "#2a2a2e", height:'38vh',width:'21vw', margin: 8  }}>
      {/* <Container
        style={{ backgroundColor: "#5c5d5e", height:'45vh',width:'74vw'  }}
      > */}
        <Box style={{display:'flex', width:'30vw', height:'38vh'}}>
        {/* <Box style={{width:'20vw',height:'38vh', backgroundColor:'#252626', marginRight:8}}> */}
        {/* <Output testcases={testcases} testErr={testErr} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed}/> */}
        {/* </Box> */}
        <Box style = {{width:'20vw', height:'38vh',marginLeft:8, marginRight:8}}>
          <div style={{display:'flex', justifyContent:'center', overflowY: 'auto', borderBottom: '2px solid #00bef7',fontSize:'1.5em', fontWeight:'bold', color:'#00bef7'}}>Testcases</div>
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
                // width: 430,
                height: 50,
                textAlign: "center",
                alignItems:'center',
                justifyContent:'center',
                verticalAlign:'middle',
                color:divColor,
                // backgroundColor: 'grey',
                borderRadius: 0,
                borderBottom: '2px solid #00bef7',
               
              }}
            > 
              <div style={{display:'flex',alignItems:'center' ,verticalAlign:'middle', justifyContent:'center', fontSize:'1em', fontWeight:'bold' }}>
                {testRunning ? <CircularProgress /> : c.description }
              </div>
            </Box>
          );
        })}
        </Box>
        {/* <div style={{width:'50vw'}}>
          <div style={{marginLeft:8}}>
        <Button
          onClick={runTests}
          disabled={testButtonDisabled}
          variant="contained"
          color="primary"
          style={{width:'20vw', float:'right'}}
        >
          Submit
        </Button>
        </div>
        <div>
        <Button
          onClick={runTests}
          disabled={testButtonDisabled}
          variant="contained"
          color="primary"
          style={{ float: "right" }}
        >
          Run Test Cases
        </Button>
        </div>
        <div>
        <Button
          onClick={evaluate}
          disabled={runButtonDisabled}
          variant="contained"
          color="primary"
          style={{ float: "right" }}
        >
          Evaluate
        </Button>
        </div>
      </div>*/}
        </Box> 
      {/* </Container>  */}
    </div> 
  );
}

export default TestResults;