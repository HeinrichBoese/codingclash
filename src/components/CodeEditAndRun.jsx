import React, { useState, useRef, useEffect } from "react";
//import { AuthContext } from "../Auth";

//import ChallengeDescription from "./ChallengeDescription";
//import TestResults from "./TestResults";

import Button from "@material-ui/core/Button";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export default function CodeEditAndRun({ challenge }) {
  const [code, setCode] = useState(
    (challenge && challenge.template.replace(/\\n/g, "\n")) || ""
  );
  const [result, setResult] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [error, setError] = useState(null);
  //const {currentUser} = useContext(AuthContext);
  const iframeRef = useRef(null);

  const handleMessage = (msg) => {
    if (msg.data.source === "iframe") {
      setResult(msg.data.payload);
      setError(msg.data.errortext);
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const evaluate = () => {
    const codeEscaped = encodeURIComponent(code);
    iframeRef.current.srcdoc = `
      <script>
      let webworker = new Worker('${window.location.origin}/webworker.js');
      let timecap = setTimeout(() => webworker.terminate(), 1000);
      webworker.postMessage(\`${codeEscaped}\`);
      webworker.onmessage = (e) => window.parent.postMessage(e.data);
      </script>`;
  };

  const runTests = () => {
    setTestResults([]);
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
        console.log(val.value);
        //WORKER CALL GOES HERE
        const passed = true;
        setTestResults((prev) =>[...prev, passed]);
      }
    }, 1000);
  };

  return (
    <div style={{ width: 500, height: 300 }}>
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
      <span>Test Cases: {challenge.testcases && JSON.stringify(challenge.testcases)}</span>
      <br />
      <span>Test Results: {testResults && JSON.stringify(testResults)}</span>
      <iframe
        ref={iframeRef}
        title="hidden iframe"
        style={{ display: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
