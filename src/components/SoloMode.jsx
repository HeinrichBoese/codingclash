import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import CodeEditAndRun from "./CodeEditAndRun";
import CircularProgress from '@material-ui/core/CircularProgress';

const pad = window.innerHeight / 2
const styles = {
  loading: {
    paddingTop: pad
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'100%'
  }
};

export default function SoloMode() {
  const [challenge, setChallenge] = useState(null);
  
  useEffect(() => {
      const getRandomChallengeIDCloudFunction = firebase.functions().httpsCallable("getRandomChallengeID");
      getRandomChallengeIDCloudFunction()
      .then(challengeID => firebase.firestore().collection('challenges').doc(challengeID.data).get())
      .then(challengeDoc => setChallenge(challengeDoc.data()));
  }, []);

  return (
    <div style={styles.container}>
      {challenge ? <CodeEditAndRun challenge={challenge} multiplayer={false}/> : <div style={styles.loading}><CircularProgress /></div>}
    </div>
  );
}
