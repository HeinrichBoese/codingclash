import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

// const Lobby = ({startGame, gameSessionID, players}) => {
  // const [gameID, setGameID] = useState("a0s8df9as8d7f");
  // const [players, setPlayers] = useState(["ich", "nr2", "nr3"]);
  // const { height, width } = useWindowDimensions();

const Lobby = ({startGame, isLobbyLeader}) => {

  const styles = {
    root: {
      // 
        // background: 'rgb(241,26,255)',
        background:  "#2a2a2e",
        // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
        color: "#f547e1",
        fontSize:'1em',
        fontWeight:'bold',
        height: 50,
        // padding: "0 30px",
        // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
        width:200,
        margin:20,
        // border: '2px solid rgb(241,26,255)',
        border: '2px solid  #00bef7'
        // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
    },
    copy: {
      color: "#f547e1",
      borderRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: "#2a2a2e",
      border: '2px solid  #00bef7',
      width:100,
      height:40
    },
    textInput: {
      backgroundColor: "#2a2a2e",
      color:'#f547e1',
      border: '2px solid  #00bef7',
      fontSize: 18,
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
    },
    container: {
      alignItems: "center",
    },
  };

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  // gameSessionID = '/'+gameSessionID
  // const sessionLink = window.location.href + gameSessionID;


  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <input style={styles.textInput} ref={textAreaRef} value={window.location.href} readOnly />
        {document.queryCommandSupported("copy") && (
          <span>
            <Button className='illuminate' style={styles.copy} onClick={copyToClipboard}>
              Copy Link
            </Button>
          </span>
        )}
      </form>

      <div style={styles.bottomButton}>
        {isLobbyLeader && <Button className='illuminate' style={styles.root} onClick={startGame}>Start Game</Button>}
        <Button className='illuminate' style={styles.root} component={Link} to={"/"}>
          Leave Lobby
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
