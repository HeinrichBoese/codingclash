import React from 'react';

export default function ChallengeDescription({challenge}) {
    return(
        <div>
          <div style={{margin:15}}>
          <h2 style={{color:'#00bef7',fontSize:'1.8em'}}>{challenge.title}</h2>
          <h3 style={{color:'#00bef7',fontSize:'1.7em'}}>Task:</h3>
          <p style={{color:'#f547e1', fontSize:'1.5em'}}>{challenge.description}</p>
          </div>
          <div style={{margin:15}}>
            <h3 style={{color:'#00bef7',fontSize:'1.7em'}}>Example</h3>
            <p style={{color:'#f547e1',fontSize:'1.5em'}}>{challenge.example}</p>
          </div>
        </div>
      )
}