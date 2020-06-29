import React from 'react';

export default function ChallengeDescription({challenge}) {
    return(
        <div>
          <div>
          <h2 style={{color:'#00bef7'}}>{challenge.title}</h2>
          <h3 style={{color:'#00bef7'}}>Task:</h3>
          <p style={{color:'#f547e1'}}>{challenge.description}</p>
          </div>
          <div>
            <h3 style={{color:'#00bef7'}}>Example</h3>
            <p style={{color:'#f547e1'}}>{challenge.example}</p>
          </div>
        </div>
      )
}