import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  h2: {
    color:theme.palette.secondary.main, 
    fontSize:'1.8em',
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`
  },
  h3: {
    color:theme.palette.secondary.main, 
    fontSize:'1.7em',
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`
  },
  paragraph: {
    color: theme.palette.secondary.main, 
    fontSize:'1.5em',
    textShadow:`0px 0px 20px ${theme.palette.secondary.main}`
  }
}))

export default function ChallengeDescription({challenge}) {
  const classes = useStyles()
    return(
        <div>
          <div style={{margin:15}}>
          <h2 className={classes.h2}>{challenge.title}</h2>
          <h3 className={classes.h3}>Task</h3>
          <p className={classes.paragraph}>{challenge.description}</p>
          </div>
          <div style={{margin:15}}>
            <h3 className={classes.h3}>Example</h3>
            <p className={classes.paragraph}>{challenge.example}</p>
          </div>
        </div>
      )
}