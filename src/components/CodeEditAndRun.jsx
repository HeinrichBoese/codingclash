import React, { useState, useRef, useEffect } from "react";

import Button from "@material-ui/core/Button";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export default function CodeEditAndRun(props) {
  const [code, setCode] = useState('');

  const [result, setResult] = useState(null);
  const iframeRef = useRef(null);

  const handleMessage = (msg) => {
    msg.data.source === "iframe" && setResult(msg.data.payload);
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const calculate = () => {
    iframeRef.current.srcdoc = `
      <script>
      let webworker = new Worker('webworker.js');
      let timecap = setTimeout(() => webworker.terminate(), 1000);
      webworker.postMessage(\`${code}\`);
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
      <span>Result: {JSON.stringify(result)}</span>
      <iframe
        ref={iframeRef}
        title="hidden iframe"
        style={{ display: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
