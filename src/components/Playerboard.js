import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 160,
    width: "auto",
  },
}));

const Playerboard = ({ players }) => {
//   const classes = useStyles();
return (
<Box style = {{width:'25vw', height:'38vh', backgroundColor:'#2a2a2e', overflowY:'auto', margin: 8}}>
          <div style={{display:'flex', justifyContent:'center', borderBottom: '2px solid #00bef7', fontSize:'1.5em', fontWeight:'bold', color:'#00bef7'}}>Player</div>
         {players.map((player, i) => {
          return (
            <Box
              key = {player}
              style={{
                display:'flex',
                // width: 430,
                height: 50,
                textAlign: "center",
                alignItems:'center',
                justifyContent:'center',
                verticalAlign:'middle',
                color:'#f547e1',
                borderRadius: 0,
                borderBottom: '2px solid black',
                marginBottom:3,
                borderBottom: '2px solid #00bef7',
                fontWeight:'bold'
              }}
            > 
              <div style={{display:'flex',alignItems:'center' ,verticalAlign:'middle', justifyContent:'center' }}>
                {player}
              </div>
            </Box>
          );
        })}
        </Box>
)
};

export default Playerboard;
