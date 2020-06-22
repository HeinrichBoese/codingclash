import React, { useState, useRef } from "react";

import Button from "@material-ui/core/Button";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

export default function CodeEditAndRun(props) {
  const [code, setCode] = useState(`//Your code goes here: \nconsole.log(5*5)`);
  const iframeRef = useRef(null);

  const calculate = () => {
      iframeRef.current.srcdoc = `
      <script>try {
        ${code}
      } catch(error) {
        parent.alert(error);
      }
      </script>`
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
      <iframe
        ref={iframeRef}
        title="hidden iframe"
        style={{ display: "none" }}
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
