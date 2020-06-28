import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import Box from "@material-ui/core/Box";
import Playertable from "./Playertable";
import Lobby from "./Lobby";
import CodeEditAndRun from "./CodeEditAndRun";
import GameSummary from "./GameSummary";

const GameMaster = () => {
  const db = firebase.firestore();
  const gameID = useParams().id;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  //TODO: FILL WITH PLAYERNICKS
  const [players, setPlayers] = useState(["Rambo"]);
  const [gamesession, setGamesession] = useState(null);
  const [challenge, setChallenge] = useState(null);

  // const [gameSessionID, setGameSessionID] = useState("a0s8df9as8d7f");
  // const [players, setPlayers] = useState(["ich", "nr2", "nr3"]);

  const [secondsLeft, setSecondsLeft] = useState(null);
  const TIMELIMIT = 100;


  useEffect(() => {
    const setupSubscription = () => {
      db.collection("gamesessions")
        .doc(gameID)
        .onSnapshot((doc) => setGamesession(doc.data()));
    };
    gameID && setupSubscription();
  }, [gameID]);

  useEffect(() => {
    const fetchChallenge = async () => {
      const challengeDoc = await gamesession.challenge.get();
      setChallenge(challengeDoc.data());
    };
    gamesession && fetchChallenge();
  }, [gamesession]);

  useEffect(() => {
    if (gamesession && gamesession.gameState === "INGAME") {
      const countdown = () => {
        const secondsPassed = Math.floor(
          (Date.now() - gamesession.startTime.toDate()) / 1000
        );
        TIMELIMIT - secondsPassed >= 0
          ? setSecondsLeft(TIMELIMIT - secondsPassed)
          : finishGame();
      };
      const interval = setInterval(() => countdown(), 1000);
      return () => clearInterval(interval);
    }
  }, [gamesession]);

  const startGame = () => {
    db.collection("gamesessions").doc(gameID).update({
      gameState: "INGAME",
      startTime: firebase.firestore.Timestamp.now(),
    });
  };

  const finishGame = () => {
    db.collection("gamesessions").doc(gameID).update({ gameState: "FINISHED" });
  };

  const isLobbyLeader = () => {
    if (gamesession && gamesession.players[0].userID === currentUser.uid) {
      return true;
    } else {
      return false;
    }
  };

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
    const challengeRef = await getRandomChallengeRef();
    const docRef = db.collection("gamesessions").doc();
    docRef.set({
      gameState: "LOBBY",
      players: [{ userID: currentUser.uid, finished: false }],
      challenge: challengeRef,
    });
    history.push("/game/" + docRef.id);
  };

  !gameID && currentUser && createNewGameSession();

  // return <div>
  //     {(gamesession && gamesession.gameState === 'LOBBY') && <Lobby startGame={startGame} gameSessionID={gameSessionID} players={players}/>}
  //     {((gamesession && gamesession.gameState === 'INGAME') && challenge) && <CodeEditAndRun challenge={challenge} players={players}/>}
  //     {(gamesession && gamesession.gameState === 'FINISHED') && <GameSummary />}
  // </div>;

  
  return (
    gamesession &&  (
      <div style={{width:'100vw', height: '100vh'}}>
        {gamesession.gameState !== "INGAME" && (<Box display="flex" css={{ justifyContent: "center" }}>
          <Playertable players={players} />
        </Box>
        )}
        {gamesession.gameState === "LOBBY" && (
          <Lobby startGame={startGame} isLobbyLeader={isLobbyLeader} />
        )}

        {gamesession.gameState === "INGAME" && challenge && (
          <div>
            {/* <span>SECONDS LEFT: {secondsLeft}</span> */}
            <CodeEditAndRun challenge={challenge} players={players} secondsLeft={secondsLeft}/>
          </div>
        )}

        {gamesession.gameState === "FINISHED" && <GameSummary />}
      </div>
    )
  );

};

export default GameMaster;