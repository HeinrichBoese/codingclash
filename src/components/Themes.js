import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     violet: {
//         backgroundColor:'yellow',
//         height:100
//     },
//     black: {
//         backgroundColor:'green',
//         height:100
//     }
//   }))
  


export default function Themes({Themesarray, setTheme}) {
    // const classes  = useStyles()
  return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'60%', height:'80%',flexWrap:'wrap'}}>
    <h2  style={{color:'white'}}>Choose your favourite Theme</h2>
    <div style={{overflowY:'auto',width:'100%',height:'60%', flexWrap:'wrap'}}>
        
        {Themesarray.map((Theme,i) => {

            return (
                <Button key={i} onClick={() => setTheme(Theme.theme)} style={{color:Theme.theme.palette.secondary.main, backgroundColor:Theme.theme.palette.background.default, border: `2px solid ${Theme.theme.palette.primary.main}`, width:'100%', height:100,marginBottom:10, fontWeight:'bold', fontSize:'1.5em' }}>Code Clash</Button>
            )
        })}
    </div>
    </div>
  );
}
