import React from 'react';
import Button from "@material-ui/core/Button";
import "../App.css";
export default function Actions({evaluate, runTests, testButtonDisabled, runButtonDisabled}) {
    const styles = {
        buttons: {
            // background: 'rgb(241,26,255)',
            background:  "#2a2a2e",
            // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
            color: "#f547e1",
            fontSize:'1em',
            fontWeight:'bold',
            height: '8vh',
            // padding: "0 30px",
            // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
            width:'18vw',
            margin:8,
            // border: '2px solid rgb(241,26,255)',
            border: '2px solid  #00bef7'
            // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
        }
    }
    return(
       <div style={{display:'flex', flexWrap:'wrap', width:'22vw', height: '38vh',margin: 8, backgroundColor: "#2a2a2e", justifyContent:'center'}}>
           <div style={{width:'22vw',fontSize:'1.5em', fontWeight:'bold', color:'#00bef7'}}>Actions</div>
          <div>
        <Button
          onClick={runTests}
          disabled={testButtonDisabled}
          style={styles.buttons}
          className='illuminate'
        >
          Submit
        </Button>
        </div>
        <div>
        <Button
          onClick={runTests}
          disabled={testButtonDisabled}
          style={styles.buttons}
          className='illuminate'
        >
          Run Test Cases
        </Button>
        </div>
        <div>
        <Button
          onClick={evaluate}
          disabled={runButtonDisabled}
          style={styles.buttons}
          className='illuminate'
        >
          Evaluate
        </Button>
        </div>
      </div>
      )
}