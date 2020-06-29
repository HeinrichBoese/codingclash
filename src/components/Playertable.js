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
  },
}));

const Playertable = ({ playerNames }) => {
  const classes = useStyles();

  return (
    <Box display="inline-flex">
      {playerNames.map((playerName) => (
        <Box p={1} css={{ textAlign: "center" }} key={playerName}>
          <Paper className={classes.paper}>
            <PersonIcon style={{ fontSize: 50 }} />
            <br />
            <span style={{ fontWeight: "bold", fontSize: 20 }}>{playerName}</span>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default Playertable;
