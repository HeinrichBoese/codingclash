import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import Box from "@material-ui/core/Box";
import Playertable from "./Playertable";
import Lobby from "./Lobby";
import CodeEditAndRun from "./CodeEditAndRun";
import { Typography } from "@material-ui/core";

const GameMaster = () => {
  const db = firebase.firestore();
  const gameID = useParams().id;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [playerTableData, setPlayerTableData] = useState([]);

  // GAME STATE FROM SUBSCRIPTION - NEVER UPDATE GAMESTATE LOCALLY!
  const [gamesession, setGamesession] = useState(null);
  const [challenge, setChallenge] = useState(null);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const TIMELIMIT = 100;

  useEffect(() => {
    const setupSubscription = () => {
      db.collection("gamesessions")
        .doc(gameID)
        .onSnapshot((doc) => setGamesession(doc.data()));
    };
    gameID && setupSubscription();
  }, [gameID]);

  // LOAD CURRENT CHALLENGE
  useEffect(() => {
    const fetchChallenge = async () => {
      const challengeDoc = await gamesession.challenge.get();
      setChallenge(challengeDoc.data());
    };
    gamesession && fetchChallenge();
  }, [gamesession]);

  // ADD PLAYER TO PLAYER LIST IF HE JOINED BY LINK
  useEffect(() => {
    const addPlayer = () => {
      const uids = [];
      gamesession.players.forEach((player) => uids.push(player.userID));
      if (!uids.includes(currentUser.uid)) {
        const newPlayers = [
          ...gamesession.players,
          { userID: currentUser.uid, finished: false },
        ];
        db.collection("gamesessions")
          .doc(gameID)
          .update({ players: newPlayers });
      }
    };
    gamesession && addPlayer();
  }, [gamesession]);

  // LOAD PLAYER NAMES
  useEffect(() => {
    const fetchPlayerData = async () => {
      const playerData = [];
      for (let player of gamesession.players) {
        const userDoc = await db.collection("User").doc(player.userID).get();
        const PlayerDataPoint = userDoc.data();
        playerData.push({ ...PlayerDataPoint, ...player });
      }
      setPlayerTableData(playerData);
    };
    gamesession &&
      playerTableData.length !== gamesession.players.length &&
      fetchPlayerData();
  }, [gamesession]);

  // GAME TIMER
  useEffect(() => {
    const startCountdown = () => {
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
    };
    gamesession && gamesession.gameState === "INGAME" && startCountdown();
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

  const submit = () => {
    // CodeEditAndRun component checks if all test cases pass before allowing submit
    const players = [...gamesession.players];
    const currentPlayerIndex = players.findIndex(
      (player) => player.userID === currentUser.uid
    );
    players[currentPlayerIndex].finished = true;
    players[currentPlayerIndex].finishTime = firebase.firestore.Timestamp.now();
    const docRef = db.collection("gamesessions").doc(gameID);
    docRef.update({ players });
    if (players.every((player) => player.finished)) {
      docRef.update({ gameState: "FINISHED" });
    }
  };

  const checkSelfFinished = () => {
    const myself = gamesession.players.find(player => player.userID === currentUser.uid);
    return myself.finished;
  }

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

  return (
    gamesession && (
      <div className="lobbyCont">
        <Box display="flex" css={{ justifyContent: "center" }}>
          <Playertable playerTableData={playerTableData} />
        </Box>

        {gamesession.gameState === "LOBBY" && (
          <Lobby startGame={startGame} isLobbyLeader={isLobbyLeader} />
        )}

        {gamesession.gameState === "INGAME" && !checkSelfFinished() && challenge && (
          <div>
            <CodeEditAndRun
              challenge={challenge}
              secondsLeft={secondsLeft}
              submit={submit}
              secondsLeft={secondsLeft}
            />
          </div>
        )}

        {gamesession.gameState === "FINISHED" && (
          <Box display="flex" css={{ justifyContent: "center" }}>
            <Typography style={{ color: "white", fontSize: 22 }}>
              Game ended.
            </Typography>
          </Box>
        )}
      </div>
    )
  );
};

export default GameMaster;
