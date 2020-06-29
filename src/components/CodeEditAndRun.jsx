import React, { useState, useRef, useEffect } from "react";
import "../App.css";
//import ChallengeDescription from "./ChallengeDescription";
//import TestResults from "./TestResults";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
import useWindowDimensions from '../componentsunderconstruction/getWindowDimensions'
import "codemirror/theme/shadowfox.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import TestResults from "./TestResults";
import Questiontable from "./Questiontable";
import ChallengeDescription from "./ChallengeDescription";
import Playerboard from "./Playerboard";
import UserGameMenu from "./UserGameMenu";
import Output from "../componentsunderconstruction/Output";
import Actions from "./Actions";
import Sidebar from "./Sidebar";
import { makeStyles } from '@material-ui/core/styles';
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'block',
    // width:'100vw', 
    // height:'100vh',
    // display:'flex', 
    // flexWrap:'wrap', 
    // [theme.breakpoints.up('sm')]: {
      display:'flex', 
      flexWrap:'wrap', 
      width: `calc(100vw - 170px)`,
      height: 'calc(100vh - 122px)',
    // },
  },
  codeMirrContainer: {
    width:'55%', 
    height:'95%', 
    margin: 8,
    display:'flex',
    flexWrap:'wrap'
  },
  challengeDescContainer: {
    backgroundColor:'#2a2a2e', 
    width:'40%',
    height:'95%', 
    overflowY:'auto', 
    margin: 8
  },
  outputContainer: {
    width:'45%',
    height:'43.5%', 
    backgroundColor:'#252626',
    margin:8,
    marginLeft:0,
    marginRight:0
  },
  testResultsContainer: {
    width:'37%',
    height:'43.5%', 
    margin:8,
    marginLeft:0,
    marginRight:0,
    backgroundColor:'grey'
  },
  actionsContainer:{
    display:'flex', 
    flexWrap:'wrap', 
    width:'18%',
    height:'43.5%',
    margin: 8, 
    marginRight:0,
    marginLeft:0,
    justifyContent:'center',
    backgroundColor:'grey'
  }
}));


export default function CodeEditAndRun({ challenge, players, secondsLeft, submit}) {

  const classes = useStyles();
  const [code, setCode] = useState(
    (challenge && challenge.template.replace(/\\n/g, "\n")) || ""
  );

  const [runButtonDisabled, setRunButtonDisabled] = useState(false);
  const [testButtonDisabled, setTestButtonDisabled] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [testResults, setTestResults] = useState([]);
  const [testErrors, setTestErrors] = useState([]);
  const [testPassed, setTestPassed] = useState([]);
  const [allChecksDone, setAllChecksDone] = useState(false)

  const [submitted, setSubmitted] = useState(false);
  const [testRunning, setTestRunning] = useState(false);

  const iframeRef = useRef(null);

  const handleMessage = (msg) => {
    if (msg.data.source === "iframe") {
      if (msg.data.caller === "evaluate") {
        setResult(msg.data.payload);
        setError(msg.data.errortext);
      }
      if (msg.data.caller === "runTests") {
        setTestResults((prev) => [...prev, msg.data.payload]);
        setTestErrors((prev) => [...prev, msg.data.errortext]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const result = [];
    for (const [i, test] of challenge.testcases.entries()) {
      result.push("" + testResults[i] === test.expected);
    }
    setTestPassed(result);
    let done = true
      for (const t of result) {
        if(t === false) {
          done = false
        }
      }
      if(done) {
    setAllChecksDone(true)  
      }    
  }, [testResults]);

  const taskWebWorker = (codeToRun, callerIdentifier) => {
    iframeRef.current.srcdoc = `
      <script>
      let webworker = new Worker('${window.location.origin}/webworker.js');
      let timecap = setTimeout(() => webworker.terminate(), 1000);
      webworker.postMessage(\`${encodeURIComponent(codeToRun)}\`);
      webworker.onmessage = (e) => window.parent.postMessage({...e.data, caller: '${callerIdentifier}'});
      </script>`;
  };

  const evaluate = () => {
    setRunButtonDisabled(true);
    setTimeout(() => setRunButtonDisabled(false), 1000);
    taskWebWorker(code, "evaluate");
  };

  const runTests = () => {
    setTestButtonDisabled(true);
    setSubmitted(false);
    setTestRunning(true);
    setTimeout(() => {
      setTestButtonDisabled(false);
      setTestRunning(false);
      setSubmitted(true);
    }, challenge.testcases.length * 1000);
    // testHandle()
    setTestResults([]);
    setTestErrors([]);
    setTestPassed([]);
    function* genFunc() {
      for (let item of challenge.testcases) {
        yield item;
      }
    }
    let genObj = genFunc();

    const interval = setInterval(() => {
      let val = genObj.next();
      if (val.done) {
        clearInterval(interval);
      } else {
        let codeToRun = code + "\n" + val.value.test.replace(/\\n/g, "\n");
        taskWebWorker(codeToRun, "runTests");
      }
    }, 900);
  };


  return (
    <div style={{width:'calc(100vw-170)', height:'calc(100vh-123)'}}>
    <Box className = {classes.root}>
      <Box className={classes.challengeDescContainer}>
        <ChallengeDescription challenge={challenge}/>
      </Box>
      <Box className={classes.codeMirrContainer}>
        <Box style={{width:'100%', height:'55%'}}>
        <CodeMirror
          value={code}
          options={{
            mode: "javascript",
            theme: "shadowfox",
            tabSize: 2,
            lineNumbers: true,
            screenReaderLabel: "code editor",
          }}
          onBeforeChange={(editor, data, value) => setCode(value)}
        />
        <iframe
          ref={iframeRef}
          title="hidden iframe"
          style={{ display: "none" }}
          sandbox="allow-scripts allow-same-origin"
        />
     </Box>
      <Box className={classes.testResultsContainer}>
        <TestResults
          testcases={challenge.testcases}
          testResults={testResults}
          testError={testErrors}
          testPassed={testPassed}
          testRunning={testRunning}
          submitted={submitted}
          // runTests={runTests}
          // evaluate={evaluate}
          // runButtonDisabled={runButtonDisabled}
          // testButtonDisabled={testButtonDisabled}
        />
      </Box>
         <Box className={classes.outputContainer}> 
        <Output testcases={challenge.testcases} testError={testErrors} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed}/>
         </Box>
      <Box className={classes.actionsContainer}>
      <Actions 
       runTests={runTests}
       evaluate={evaluate}
       runButtonDisabled={runButtonDisabled}
       testButtonDisabled={testButtonDisabled}
       submit={submit}
       allChecksDone={allChecksDone}
       />
       </Box>
      </Box>
    </Box>
    </div>
  );
}
