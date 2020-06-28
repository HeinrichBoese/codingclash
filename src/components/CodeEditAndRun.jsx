import React, { useState, useRef, useEffect } from "react";

//import ChallengeDescription from "./ChallengeDescription";
//import TestResults from "./TestResults";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
import "codemirror/theme/shadowfox.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import TestResults from "./TestResults";
import Questiontable from "./Questiontable";
import ChallengeDescription from "./ChallengeDescription";
import Playerboard from "./Playerboard";
import UserGameMenu from "./UserGameMenu";
import Output from "../componentsunderconstruction/Output";
import Actions from "./Actions";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export default function CodeEditAndRun({ challenge, players }) {
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
    // <Container style={{ width:'100vw', height:'100vh'}}>
    <Box style = {{display:'flex', flexWrap:'wrap', width:'100vw', height:'100vh'}}>
     <UserGameMenu />
      <div style={{backgroundColor:'#2a2a2e', width:'35vw',height:'53vh', overflowY:'auto', margin: 8}}>
        <ChallengeDescription challenge={challenge}/>
      </div>
      <Box style={{ width:'40vw', height:'53vh', margin: 8 }}>
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

        {/* <span>
          Evaluation Result:{" "}
          {result ? JSON.stringify(result) : "no return value"}
        </span>
        <br />
        <span>
          Error: {error ? JSON.stringify(error) : "no errors thrown :)"}
        </span>
        <br /> */}

        {/* <Button
          onClick={runTests}
          disabled={testButtonDisabled}
          variant="contained"
          color="primary"
          style={{ float: "right" }}
        >
          Run Test Cases
        </Button>
        <Button
          onClick={evaluate}
          disabled={runButtonDisabled}
          variant="contained"
          color="primary"
          style={{  marginRight: 5, float: "right" }}
        >
          Evaluate
        </Button> */}
        {/* <br /> */}

        <iframe
          ref={iframeRef}
          title="hidden iframe"
          style={{ display: "none" }}
          sandbox="allow-scripts allow-same-origin"
        />
      </Box>
      <Box style={{display:'flex', justifyContent:'center', height:'37vh', margin: 8}}>
      <div>
        <Playerboard players={players}/>
      </div>
      <div>
         <Box style={{width:'26vw',height:'38vh', backgroundColor:'#252626', margin:8}}> 
        <Output testcases={challenge.testcases} testError={testErrors} testResults={testResults} submitted={submitted} testRunning={testRunning} testPassed={testPassed}/>
         </Box>
      </div>
      <div>
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
      </div>
      <Actions 
       runTests={runTests}
       evaluate={evaluate}
       runButtonDisabled={runButtonDisabled}
       testButtonDisabled={testButtonDisabled}/>
      </Box>
    </Box>
    // </Container>
  );
}
