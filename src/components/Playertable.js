import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import images from "./images";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Playertable = ({ gamesessionPlayers, playerData }) => {
  const classes = useStyles();
  // ZIP ARRAYS INTO ONE:
  const playerTable = gamesessionPlayers.map((p, i) => ({...p, ...playerData[i]}));

  return (
    <Box display="inline-flex">
      {playerTable.map((playerData) => (
        <Box p={1} css={{ textAlign: "center" }} key={playerData.userID}>
          <Paper className={classes.paper}>
            <img src={images[playerData.playerImage]} height={35} alt="my image" />
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
  );
};

export default Playertable;
