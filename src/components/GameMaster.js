import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";

const GameMaster = () => {
  const gameID = useParams().id;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const getRandomChallengeRef = async () => {
    const db = firebase.firestore();
    const collectionRef = db.collection("challenges");
    //TODO: THIS DOES NOT SCALE WELL, AS IT GETS ALL CHALLENGES FROM THE DATABASE EVERY TIME,
    //SO ONCE WE HAVE 100+ CHALLENGES, WE NEED TO GET A RANDOM ONE VIA AUTOID COMPARE TRICK
    //OR CUSTOM BACKEND ENDPOINT!
    const snapshot = await collectionRef.get();
    const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
    return snapshot.docs[randomIndex].ref;
  };

  const createNewGameSession = async () => {
    const db = firebase.firestore();
    const userRef = db.collection("User").doc(currentUser.uid);
    const challengeRef = await getRandomChallengeRef();
    const docRef = db.collection("gamesessions").doc();
    docRef.set({
      gameState: "LOBBY",
      players: [{ user: userRef, finished: false }],
      challenge: challengeRef,
    });
    history.push("/game/" + docRef.id);
  };

  !gameID && currentUser && createNewGameSession();

  return (
    <div>
      {gameID} <br />
      {currentUser && currentUser.uid}
    </div>
  );
};

export default GameMaster;
