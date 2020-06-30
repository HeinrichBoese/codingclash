import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import Box from "@material-ui/core/Box";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
import "codemirror/theme/shadowfox.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import TestResults from "./TestResults";
import ChallengeDescription from "./ChallengeDescription";
import Output from "./Output";
import Actions from "./Actions";
import { makeStyles } from "@material-ui/core/styles";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
const equal = require("fast-deep-equal/es6");

const useStyles = makeStyles((theme) => ({
  root: {
      display:'flex', 
      flexWrap:'wrap', 
      width: `100%`,
      height: 'calc(100vh - 123px)',
      justifyContent:'center',
      alignContent: 'center',
      [theme.breakpoints.down('md')]: {
       display:'block',
       width:'100%',
      },
      [theme.breakpoints.down('sm')]: {
        display:'block',
        width:'100%',
       },

  },
  codeMirrContainer: {

    width:'60%', 
    height:'95%', 
    marginBottom:0,
    display:'flex',
    flexWrap:'wrap',
    boxSizing:'border-box',
    [theme.breakpoints.down('md')]: {
    width:'100%',
    height:'100%', 
    overflowY:'auto', 
    border:'2px solid #f547e1',
    borderRight:'none',
    borderTop:'none',
    borderBottom: 'none',
    boxSizing:'border-box',
     },
     [theme.breakpoints.down('sm')]: {
      width:'100%',
      height:'100%', 
      overflowY:'auto', 
      border:'none',
      boxSizing:'border-box',
       },
  },
  challengeDescContainer: {
    width:'36%',
    height:'95%', 
    overflowY:'auto', 
    border:'2px solid #f547e1',
    borderRight:'none',
    boxSizing:'border-box',
    boxShadow: '0px 0px 20px 2px #f547e1',
    [theme.breakpoints.down('md')]: {
    width:'100%',
    height:'95%', 
    overflowY:'auto', 
    borderBottom: 'none',
    boxSizing:'border-box',
    boxShadow: '0px 0px 20px 2px #f547e1'
     },
  },
  outputContainer: {
    width:'55% ',
    height:'calc(50% - 60px)',
    margin:0,
    border:'2px solid #f547e1',
    borderLeft: 'none',
    overflowY: 'auto',
    boxSizing:'border-box',
    boxShadow: '0px 0px 20px 2px #f547e1',
  },
  testResultsContainer: {
    width:'45%',
    height:'calc(50% - 60px)',
    margin:0,
    border:'2px solid #f547e1',
    overflowY: 'auto',
    boxSizing:'border-box',
    boxShadow: '0px 0px 20px 2px #f547e1',
  },
  actionsContainer:{
    display:'flex',  
    width:'100%',
    height:'60px',
    margin: 0, 
    justifyContent:'center',
    border:'2px solid #f547e1',
    borderTop:'none',
    borderBottom: 'none',
    boxSizing:'border-box',
    boxShadow: '0px 0px 20px 2px #f547e1',
  },
}));

export default function CodeEditAndRun({
  challenge,
  players,
  secondsLeft,
  submit,
}) {
  const classes = useStyles();
  const [code, setCode] = useState("");

  const [runButtonDisabled, setRunButtonDisabled] = useState(false);
  const [testButtonDisabled, setTestButtonDisabled] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [testResults, setTestResults] = useState([]);
  const [testErrors, setTestErrors] = useState([]);
  const [testPassed, setTestPassed] = useState([]);
  const [allChecksDone, setAllChecksDone] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [testRunning, setTestRunning] = useState(false);

  const iframeRef = useRef(null);

  useEffect(() => {
    setCode((challenge && challenge.template.replace(/\\n/g, "\n")) || "");
  }, [challenge]);

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
    const checkTestResults = () => {
      const result = [];
      for (const [i, test] of challenge.testcases.entries()) {
        result.push(equal(testResults[i], JSON.parse(test.expected)));
      }
      setTestPassed(result);
      let done = true;
      for (const t of result) {
        if (t === false) {
          done = false;
        }
      }
      if (done) {
        setAllChecksDone(true);
      }
    };
    testResults && checkTestResults();
  }, [testResults, challenge]);

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
    // <div style={{ marginLeft: "160px" }}>
    <div style={{width:'calc(100vw-170)', height:'calc(100vh-123)'}}>
    <Box className = {classes.root}>
      <Box className={classes.challengeDescContainer}>
        <ChallengeDescription challenge={challenge}/>
      </Box>
      <Box className={classes.codeMirrContainer}>
        <Box style={{width:'100%', height:'50%'}}>
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
     <Box className={classes.testResultsContainer}>
        <TestResults
          testcases={challenge.testcases}
          testResults={testResults}
          testError={testErrors}
          testPassed={testPassed}
          testRunning={testRunning}
          submitted={submitted}
        />
      </Box>
         <Box className={classes.outputContainer}> 
        <Output testcases={challenge.testcases} testError={testErrors} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed}/>
         </Box>
        </Box>
      </Box>
    </div>
    /* </div> */
  );
}
