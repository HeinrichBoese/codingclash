import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import Lobby from "./Lobby";
import CodeEditAndRun from "./CodeEditAndRun";
import GameSummary from "./GameSummary";

const GameMaster = () => {
  const db = firebase.firestore();
  const gameID = useParams().id;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [gamesession, setGamesession] = useState(null);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const setupSubscription = () => {
      db.collection("gamesessions")
      .doc(gameID)
      .onSnapshot((doc) => setGamesession(doc.data()));
    }
    gameID && setupSubscription();
  }, [gameID]);

  useEffect(() => {
      const fetchChallenge = async () => {
        const challengeDoc = await gamesession.challenge.get();
        setChallenge( challengeDoc.data());
      }
      gamesession && fetchChallenge();
  }, [gamesession])

  const startGame = () => {
      setGamesession((prev)=>({...prev, gameState: 'INGAME'}));
  }

  const getRandomChallengeRef = async () => {
    const collectionRef = db.collection("challenges");
    //TODO: THIS DOES NOT SCALE WELL, AS IT GETS ALL CHALLENGES FROM THE DATABASE EVERY TIME,
    //SO ONCE WE HAVE 100+ CHALLENGES, WE NEED TO GET A RANDOM ONE VIA AUTOID COMPARE TRICK
    //OR CUSTOM BACKEND ENDPOINT!
    const snapshot = await collectionRef.get();
    const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
    return snapshot.docs[randomIndex].ref;
  };

  const createNewGameSession = async () => {
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

  return <div>
      GameMaster here. Buckle up!
      <button onClick={startGame}>GO</button>
      {(gamesession && gamesession.gameState === 'LOBBY') && <Lobby />}
      {(gamesession && gamesession.gameState === 'INGAME') && <CodeEditAndRun challenge={challenge} />}
      {(gamesession && gamesession.gameState === 'FINISHED') && <GameSummary />}
  </div>;
};

export default GameMaster;
