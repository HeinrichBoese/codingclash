import React, { useState, useEffect } from "react";
import firebase, {db, functions} from "../firebase";
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
      const getRandomChallengeIDCloudFunction = functions.httpsCallable("getRandomChallengeID");
      getRandomChallengeIDCloudFunction()
      .then(challengeID => db.collection('challenges').doc(challengeID.data).get())
      .then(challengeDoc => setChallenge(challengeDoc.data()));
  }, []);

  return (
    <div style={styles.container}>
      {challenge ? <CodeEditAndRun challenge={challenge} multiplayer={false}/> : <div style={styles.loading}><CircularProgress /></div>}
    </div>
  );
}
