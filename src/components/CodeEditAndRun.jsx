import React, { useState, useRef, useEffect  } from "react";

//import ChallengeDescription from "./ChallengeDescription";
//import TestResults from "./TestResults";

import Button from "@material-ui/core/Button";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import TestResults from "./TestResults";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export default function CodeEditAndRun({ challenge }) {
  const [code, setCode] = useState(
    (challenge && challenge.template.replace(/\\n/g, "\n")) || ""
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [testResults, setTestResults] = useState([]);
  const [testErrors, setTestErrors] = useState([]);
  const [testPassed, setTestPassed] = useState([]);


  const [submitted, setSubmitted] = useState(false)

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
      result.push("" + testResults[i] == test.expected);
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
    taskWebWorker(code, "evaluate");
  };

  const runTests = () => {
    setTestResults([]);
    setTestErrors([]);
    setTestPassed([]);
    setSubmitted(true)
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
    }, 1000);
    
  };
console.log(testResults,challenge)
  return (
    <div style={{ width: 800 }}>
      <CodeMirror
        value={code}
        options={{
          mode: "javascript",
          theme: "material",
          tabSize: 2,
          lineNumbers: true,
          screenReaderLabel: "code editor",
        }}
        onBeforeChange={(editor, data, value) => setCode(value)}
      />
      <Button
        onClick={runTests}
        variant="contained"
        color="primary"
        style={{ margin: 5, float: "right" }}
      >
        Run Test Cases
      </Button>
      <Button
        onClick={evaluate}
        variant="contained"
        color="primary"
        style={{ margin: 5, float: "right" }}
      >
        Evaluate
      </Button>
      <br />

      <span>Result: {result && JSON.stringify(result)}</span>
      <br />
      <span>Error: {error && JSON.stringify(error)}</span>
      <br />
      <span>
        Test Cases: {challenge.testcases && JSON.stringify(challenge.testcases)}
      </span>
      <br />
      <span>Test Results: {testResults && JSON.stringify(testResults)}</span>
      <br />
      <span>Test Errors: {testErrors && JSON.stringify(testErrors)}</span>
      <br />
      <span>Test Passed: {testPassed && JSON.stringify(testPassed)}</span>

      <iframe
        ref={iframeRef}
        title="hidden iframe"
        style={{ display: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
      <TestResults testcases={challenge.testcases} testResults={testResults} submitted={submitted}/>
    </div>
  );
}
