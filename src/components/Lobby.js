import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Lobby = ({startGame, isLobbyLeader}) => {
  const styles = {
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      margin: 20,
    },
    copy: {
      color: "white",
      borderRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
    textInput: {
      backgroundColor: "#cccccc",
      fontSize: 18,
      width: 450,
      border: "none",
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

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <input style={styles.textInput} ref={textAreaRef} value={window.location.href} readOnly />
        {document.queryCommandSupported("copy") && (
          <span>
            <Button style={styles.copy} onClick={copyToClipboard}>
              Copy Link
            </Button>
          </span>
        )}
      </form>

      <div style={styles.bottomButton}>
        {isLobbyLeader && <Button style={styles.root} onClick={startGame}>Start Game</Button>}
        <Button style={styles.root} component={Link} to={"/"}>
          Leave Lobby
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
