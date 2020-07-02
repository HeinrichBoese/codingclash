import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
// const Lobby = ({startGame, gameSessionID, players}) => {
  // const [gameID, setGameID] = useState("a0s8df9as8d7f");
  // const [players, setPlayers] = useState(["ich", "nr2", "nr3"]);
  // const { height, width } = useWindowDimensions();

  const useStyles = makeStyles((theme) => ({
    root: {
      // 
        // background: 'rgb(241,26,255)',
        // background:  "#2a2a2e",
        // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
        color: theme.palette.secondary.main,
        fontSize:'1em',
        fontWeight:'bold',
        height: 50,
        boxShadow: `0px 0px 20px 2px ${theme.palette.secondary.main}`,
      transition: 'box-shadow .3s',
      textShadow:`0px 0px 20px ${theme.palette.secondary.main}`,
      // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
      '&:hover': {
        boxShadow: `0px 0px 20px 10px ${theme.palette.secondary.main}` ,
      },
        // padding: "0 30px",
        // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
        width:200,
        margin:20,
        // border: '2px solid rgb(241,26,255)',
        border: `2px solid ${theme.palette.secondary.main}`
        // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    },
    copy: {
      color: theme.palette.secondary.main,
      borderRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      boxShadow: `0px 0px 20px 2px ${theme.palette.secondary.main}`,
      transition: 'box-shadow .3s',
      textShadow:`0px 0px 20px ${theme.palette.secondary.main}`,
      '&:hover': {
        boxShadow: `0px 0px 20px 10px ${theme.palette.secondary.main}`,
      },
      // backgroundColor: "#2a2a2e",
      border: `2px solid ${theme.palette.secondary.main}`,
      width:100,
      height:40
    },
    textInput: {
      // backgroundColor: "#2a2a2e",
      backgroundColor:theme.palette.background.default,
      color:theme.palette.secondary.main,
      border: `2px solid ${theme.palette.secondary.main}`,
      fontSize: 18,
      boxShadow: `0px 0px 20px 2px ${theme.palette.secondary.main}`,
      width: 450,
      // border: "none",
      borderRadius: 0,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    bottomButton: {
      display: "flex",
      justifyContent: "center",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      margin: 25
    },
    container: {
      // width:'calc(100% - 200px)',
      // marginLeft:'200px',
      // minWidth:'795px',
      // display: "flex",
      // justifyContent: "center",
      // // flexWrap:'wrap'
      // // height:'100vh',
      // // widht:'100vw'
    },
  }));


const Lobby = ({startGame, isLobbyLeader, leaveLobby}) => {

  const classes = useStyles();

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  // gameSessionID = '/'+gameSessionID
  // const sessionLink = window.location.href + gameSessionID;


  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <input className={classes.textInput} ref={textAreaRef} value={window.location.href} readOnly />
        {document.queryCommandSupported("copy") && (
          <span>
            <Button className={classes.copy} onClick={copyToClipboard}>
              Copy Link
            </Button>
          </span>
        )}
      </form>

      <div className={classes.bottomButton}>

        {/* // {isLobbyLeader && <Button className="illuminate" style={styles.root} onClick={startGame}>Start Game</Button>}
        // <Button className="illuminate" style={styles.root} component={Link} to={"/"}> */}

        {isLobbyLeader() && <Button className="illuminate" className={classes.root} onClick={startGame}>Start Game</Button>}
        <Button className="illuminate" onClick={leaveLobby} className={classes.root}>
          Leave Lobby
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
