import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
// import PersonIcon from "@material-ui/icons/Person";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import images from "./images";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    overflow:'hidden',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    width:160
  },
  playertable: {
    display: "flex",
    flexWrap:'wrap',
    minHeight:'113px',
    width:'96%',
    borderRadius: 4,
    // backgroundColor: 'linear-gradient(90deg, rgba(23,0,45,1) 60%, rgba(73,1,69,1) 100%)',
    // marginLeft: '15px',
    // marginRight: '15px',
    justifyContent: "center",
    overflowX: 'auto',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.primary.main}, 0px 0px 20px 2px ${theme.palette.primary.main}`,
  },
}));

const sortPlayerTable = (t) => {
  t.sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return +1;
    if (a.finished && b.finished) {
      if (a.finishTime < b.finishTime) return -1;
      if (a.finishTime > b.finishTime) return +1;
    }
    return 0;
  });
  return null;
};

const Playertable = ({ gamesessionPlayers, playerData }) => {
  const classes = useStyles();
  // ZIP ARRAYS INTO ONE:
  const playerTable = gamesessionPlayers.map((p, i) => ({
    ...p,
    ...playerData[i],
  }));
  sortPlayerTable(playerTable);

  return (
    // <div>
    // <Box style={{display:"inline-flex"}} >
    //   {playerNames.map((playerName) => (
    //     <Box p={1} css={{ textAlign: "center" }} key={playerName}>
    // <div>
    <Box className={classes.playertable}>
      <Box display="inline-flex">
        {playerTable.map((playerData) => (
          <Box p={1} css={{ textAlign: "center" }} key={playerData.userID}>
            <Paper className={classes.paper}>
              <img
                src={images[playerData.playerImage] || images.anonym}
                height={50}
                alt="my Face"
              />
              <br />
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                {playerData.playerName || 'Anonym'}
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
      </Box>
    // </div>
  );
};

export default Playertable;
