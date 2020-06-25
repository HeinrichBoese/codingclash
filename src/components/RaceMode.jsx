import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import CodeEditAndRun from "./CodeEditAndRun";
import CircularProgress from '@material-ui/core/CircularProgress';
import Lobby from "./Lobby";
const getRandomChallenge = async () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("challenges");
  const snapshot = await collectionRef.get();
  const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
  return snapshot.docs[randomIndex].data();
};


    const styles = {
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
    };
  
export default function RaceMode(props) {

  const [challenge, setChallenge] = useState(null);
  const [initializer, setInitializer] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if(initializer) {
    getRandomChallenge().then(res => setChallenge(res));
  }}, []);
//   style = {{paddingTop: height/3.5}}
  return (
    <div style = {styles.container}>
        {started ? <CodeEditAndRun challenge={challenge} /> : <div><Lobby initializer = {initializer}/></div>}
        {/* {challenge ? <CodeEditAndRun challenge={challenge} /> : <div style = {styles.loading}><CircularProgress /></div>} */}
    </div>
  );
}



