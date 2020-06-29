import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Playertable = ({ playerTableData }) => {
  const classes = useStyles();

  return (

    // <div>
    // <Box style={{display:"inline-flex"}} >
    //   {playerNames.map((playerName) => (
    //     <Box p={1} css={{ textAlign: "center" }} key={playerName}>
    <div>

    <Box display="inline-flex">
      {playerTableData.map((playerData) => (
        <Box p={1} css={{ textAlign: "center" }} key={playerData.userID}>

          <Paper className={classes.paper}>
            <PersonIcon style={{ fontSize: 50 }} />
            <br />
            <span style={{ fontWeight: "bold", fontSize: 20 }}>
              {playerData.playerName}
            </span>
            <br />
            {playerData.finished && (
              <span
                style={{
                  color: "lightgreen",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckBoxIcon />
                {" " + playerData.finishTime.toDate().toLocaleTimeString()}
              </span>
            )}
          </Paper>
        </Box>
      ))}
    </Box>
    </div>
  );
};

export default Playertable;
