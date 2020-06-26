import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";

const GameMaster = () => {
  const gameID = useParams().id;
  const history = useHistory();

  const createNewGameSession = async () => {
    const db = firebase.firestore();
    const docRef = db.collection("gamesessions").doc();
    docRef.set({
      gameState: "LOBBY",
      players: [{ user: 'placeholder', finished: false }],
      challenge: 'placeholder',
    });
    history.push("/game/" + docRef.id);
  };

  !gameID && createNewGameSession();

  return <div>{gameID}</div>;
};

export default GameMaster;
