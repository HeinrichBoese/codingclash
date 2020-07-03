import React, { useState, useRef, useEffect } from "react";
// import "../App.css";
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
import equal from "fast-deep-equal/es6";
// const equal = require("fast-deep-equal/es6");
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");



const useStyles = makeStyles((theme) => ({
  codeMirr: {
    height: '50%',
    width: '100%',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main}, 0px 0px 20px 2px ${theme.palette.primary.main}`,
    borderRadius:4
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `100%`,
    minWidth:'840px',
    height: 'calc(100vh - 123px)',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '500px',
    // [theme.breakpoints.down('md')]: {
    //   // height: 'calc(100vh - 123px)',
    //   // display: 'block',
    //   // flexWrap: 'wrap',
    //   // marginTop:123,
    //   width:'100%',
    // },
    // // [theme.breakpoints.down('sm')]: {
    // //   height: 'calc(100vh - 123px)',
    // //   display:'block',
    // //   width:'100%',
    // //  },

  },
  codeMirrContainer: {

    width: '60%',
    height: '95%',
    marginBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    minHeight: '455px',
    // [theme.breakpoints.down('md')]: {
    // width:'96%',
    // height:'455px', 
    // overflowY:'auto', 
    // border:'2px solid #f547e1',
    // borderRight:'none',
    // borderTop:'none',
    // borderBottom: 'none',
    // boxSizing:'border-box',
    //  },
    //  [theme.breakpoints.down('sm')]: {
    //   width:'96%',
    //   height:'100%', 
    //   overflowY:'auto', 
    //   border:'none',
    //   boxSizing:'border-box',

    //    },
  },
  challengeDescContainer: {
    width: '36%',
    height: '95%',
    overflowY: 'auto',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRight: 'none',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px 2px ${theme.palette.primary.main}`,
    minHeight: '455px',
    borderRadius: 4,
    // [theme.breakpoints.down('md')]: {
    // width:'96%',
    // height:'455px', 
    // overflowY:'auto', 
    // borderBottom: 'none',
    // boxSizing:'border-box',
    // boxShadow: '0px 0px 20px 2px #f547e1',

    //  },
  },
  outputContainer: {
    width: '55% ',
    height: 'calc(50% - 60px)',
    margin: 0,
    border: `2px solid ${theme.palette.primary.main}`,
    borderLeft: 'none',
    overflowY: 'auto',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px 2px ${theme.palette.primary.main}`,
    borderRadius: 4

  },
  testResultsContainer: {
    width: '45%',
    height: 'calc(50% - 60px)',
    margin: 0,
    border: `2px solid ${theme.palette.primary.main}`,
    overflowY: 'auto',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px 2px ${theme.palette.primary.main}`,
    borderRadius: 4

  },
  actionsContainer: {
    display: 'flex',
    width: '100%',
    height: '60px',
    margin: 0,
    justifyContent: 'center',
    border: `2px solid ${theme.palette.primary.main}`,
    borderTop: 'none',
    borderBottom: 'none',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main},0px 0px 20px 2px ${theme.palette.primary.main}`,
    borderRadius: 4
  },
}));

export default function CodeEditAndRun({
  challenge,
  players,
  secondsLeft,
  submit,
  multiplayer
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
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <Box className={classes.root}>
        <Box className={classes.challengeDescContainer}>
          <ChallengeDescription challenge={challenge} />
        </Box>
        <Box className={classes.codeMirrContainer}>
          <Box className={classes.codeMirr}>
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
              secondsLeft={secondsLeft}
              multiplayer={multiplayer}
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
            <Output testcases={challenge.testcases} testError={testErrors} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed} />
          </Box>
        </Box>
      </Box>
    </div>
    /* </div> */
  );
}
