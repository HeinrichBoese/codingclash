import React from 'react';

export default function UserGameMenu({secondsLeft}) {
  let col = '#00bef7'
  if(secondsLeft <= 10) {
    col = '#f05841'
  }
    return(
        <div style={{backgroundColor:'#2a2a2e',width:'20vw', height:'53vh', margin: 8, marginLeft:16}}>
          <span style={{color:'#00bef7'}}>Seconds left: <span style={{color:col}}>{secondsLeft}</span></span>
        </div>
      )
}