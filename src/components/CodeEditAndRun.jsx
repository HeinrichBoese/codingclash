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

  const calculate = () => {
    const codeEscaped = encodeURIComponent(code);
    iframeRef.current.srcdoc = `
      <script>
      let webworker = new Worker('${window.location.origin}/webworker.js');
      let timecap = setTimeout(() => webworker.terminate(), 1000);
      webworker.postMessage(\`${codeEscaped}\`);
      webworker.onmessage = (e) => window.parent.postMessage(e.data);
      </script>`;
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
        onClick={calculate}
        variant="contained"
        color="primary"
        style={{ marginTop: 5, float: "right" }}
      >
        Run
      </Button>
      <br />
      <span>Result: {result && JSON.stringify(result)}</span>
      <br />
      <span>Error: {error && JSON.stringify(error)}</span>
      <iframe
        ref={iframeRef}
        title="hidden iframe"
        style={{ display: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
