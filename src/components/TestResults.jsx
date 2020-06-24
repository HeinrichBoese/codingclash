import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
//import CheckBoxIcon from "@material-ui/icons/CheckBox";
export default function TestResults({ testcases, notChecked, checks }) {
  let divColor = "grey";
  let scroll = testcases.length > 5 ? "scroll" : "none";
  return (
    <div>
      <h2>TestResults</h2>
      <Container
        style={{ backgroundColor: "#5c5d5e", height: 300, overflowY: scroll }}
      >
        {testcases.map((c, i) => {
          if (!notChecked && checks[i]) {
            divColor = "#0cf03a";
          } else if (!notChecked && !checks[i]) {
            divColor = "#f00000";
          }
          return (
            <Paper
              style={{
                width: 430,
                height: 50,
                textAlign: "center",
                backgroundColor: divColor,
                borderRadius: 0,
              }}
            >
              <div style={{ paddingTop: 12, marginTop: 8 }}>
                {c.description}
              </div>
            </Paper>
          );
        })}
      </Container>
    </div>
  );
}
