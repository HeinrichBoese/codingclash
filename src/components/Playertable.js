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

const Playertable = ({ players }) => {
  const classes = useStyles();

  return (
    <Box display="inline-flex">
      {players.map((player) => (
        <Box p={1} css={{ textAlign: "center" }} key={player}>
          <Paper className={classes.paper}>
            <PersonIcon style={{ fontSize: 50 }} />
            <br />
            <span style={{ fontWeight: "bold", fontSize: 20 }}>{player}</span>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default Playertable;
