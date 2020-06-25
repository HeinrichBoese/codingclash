import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        height: 160,
        width: 'auto'
    },
}
)
);

const Playertable = ({ players }) => {
    const classes = useStyles();
 

console.log(players)
    return (
        players.map(player => {
            return (

                <Box p={1} css={{ width: 200, height:200}}>
                    <Paper className={classes.paper} ><PersonIcon></PersonIcon><br/>
                    {player==='?'?'waiting for player': player}
                    </Paper>
                </Box>

            )
        }
        )
    )
}

export default Playertable;

