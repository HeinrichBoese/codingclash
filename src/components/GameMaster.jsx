import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import Box from "@material-ui/core/Box";
import Playertable from "./Playertable";
import Lobby from "./Lobby";
import CodeEditAndRun from "./CodeEditAndRun";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100vw - 160px)",
    marginLeft: "160px",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      marginLeft: 0,
    },
  },
  gameContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  // playertable: {
  //   display: "flex",
  //   justifyContent: "center",
  //   borderBottom: "2px solid #00bef7",
  // },
}));

const GameMaster = () => {
  const classes = useStyles();
  const db = firebase.firestore();
  const gameID = useParams().id;
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [playerData, setPlayerData] = useState([]);

  // GAME STATE FROM SUBSCRIPTION - NEVER UPDATE GAMESTATE LOCALLY!
  const [gamesession, setGamesession] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [challengeLoaded, setChallengeLoaded] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const TIMELIMIT = 100;

  useEffect(() => {
    let unsubscribe = () => null;
    const setupSubscription = () => {
      unsubscribe = db
        .collection("gamesessions")
        .doc(gameID)
        .onSnapshot((doc) => setGamesession(doc.data()));
    };
    gameID && setupSubscription();
    return () => unsubscribe();
  }, [gameID]);

  // LOAD CURRENT CHALLENGE
  useEffect(() => {
    const fetchChallenge = async () => {
      const challengeDoc = await gamesession.challenge.get();
      setChallenge(challengeDoc.data());
      setChallengeLoaded(true);
    };
    gamesession && !challengeLoaded && fetchChallenge();
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
    gamesession && gamesession.gameState !== "FINISHED" && addPlayer();
  }, [gamesession]);

  // LOAD ADDITIONAL PLAYER DATA FOR PLAYERTABLE
  useEffect(() => {
    const fetchPlayerData = async () => {
      const playerData = [];
      for (let player of gamesession.players) {
        const userDoc = await db.collection("User").doc(player.userID).get();
        const playerDataPoint = userDoc.data();
        playerData.push(playerDataPoint);
      }
      setPlayerData(playerData);
    };
    gamesession &&
      playerData.length !== gamesession.players.length &&
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

  const leaveLobby = () => {
    const newPlayers = gamesession.players.filter(
      (player) => player.userID !== currentUser.uid
    );
    db.collection("gamesessions").doc(gameID).update({ players: newPlayers });
    history.push("/");
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
    const myself = gamesession.players.find(
      (player) => player.userID === currentUser.uid
    );
    return myself.finished;
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

  if (!gamesession) {
    return null;
  } else {
    return (
      gamesession && (
        <div>
              <Playertable
                gamesessionPlayers={gamesession.players}
                playerData={playerData}
              />
            {gamesession.gameState === "LOBBY" && (
                <Lobby startGame={startGame} isLobbyLeader={isLobbyLeader} leaveLobby={leaveLobby}/>
            )}
            {gamesession.gameState === "INGAME" &&
              !checkSelfFinished() &&
              challenge && (
                // <div style={{ margtinLeft: "160px" }}>
                  <CodeEditAndRun
                    challenge={challenge}
                    secondsLeft={secondsLeft}
                    submit={submit}
                  />
                // </div>
              )}
         </div>
      )
    );
  }
};

export default GameMaster;
