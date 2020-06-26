import React from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Output from "../componentsunderconstruction/Output";



const TestResults = ({testcases, testResults, submitted, testError, testPassed, testRunning}) => {
  let divColor = "white";
  let scroll = testcases.length > 5 ? "scroll" : "none";
  let exp = ''
  // let output = '';
  // let testcase = '';
  // let testResult = '';
  let testErr = '';
  return (
    <div>
      <Container
        style={{ backgroundColor: "#5c5d5e", height: 320,width:800  }}
      >
        <Box style={{display:'flex', width:800}}>
        <Box style = {{width:450, height:300}}>
          <div style={{display:'flex', justifyContent:'center', overflowY: scroll}}>Testcases</div>
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
                width: 430,
                height: 50,
                textAlign: "center",
                alignItems:'center',
                justifyContent:'center',
                verticalAlign:'middle',
                color:divColor,
                backgroundColor: 'grey',
                borderRadius: 0,
                borderBottom: '2px solid black',
              }}
            > 
              <div style={{display:'flex',alignItems:'center' ,verticalAlign:'middle', justifyContent:'center' }}>
                {testRunning ? <CircularProgress /> : c.description }
              </div>
            </Box>
          );
        })}
        </Box>
        <Box style={{width:300,height:300, backgroundColor:'grey'}}>
        <Output testcases={testcases} testErr={testErr} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed}/>
        </Box>
        </Box> 
      </Container>
    </div>
  );
}

export default TestResults;