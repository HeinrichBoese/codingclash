import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import CodeEditAndRun from "./CodeEditAndRun";
import CircularProgress from '@material-ui/core/CircularProgress';
const getRandomChallenge = async () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("challenges");
  const snapshot = await collectionRef.get();
  const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
  return snapshot.docs[randomIndex].data();
};

const pad = window.innerHeight / 2
const styles = {
  loading: {
    paddingTop: pad
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default function SoloMode(props) {
  const [challenge, setChallenge] = useState(null);
  useEffect(() => {
    getRandomChallenge().then((res) => setChallenge(res));
  }, []);

  return (
    <div style={styles.container}>
      {challenge ? <CodeEditAndRun challenge={challenge} /> : <div style={styles.loading}><CircularProgress /></div>}
    </div>
  );
}
