import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import CodeEditAndRun from "./CodeEditAndRun";

const getRandomChallenge = async () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("challenges");
  //TODO: THIS DOES NOT SCALE WELL, AS IT GETS ALL CHALLENGES FROM THE DATABASE EVERY TIME,
  //SO ONCE WE HAVE 100+ CHALLENGES, WE NEED TO GET A RANDOM ONE VIA AUTOID COMPARE TRICK
  //OR CUSTOM BACKEND ENDPOINT!
  const snapshot = await collectionRef.get();
  const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
  return snapshot.docs[randomIndex].data();
};

export default function SoloMode(props) {
  const [challenge, setChallenge] = useState(null);
  useEffect(() => {
    getRandomChallenge().then((res) => setChallenge(res));
  }, []);

  return (
    <div>
      {challenge ? <CodeEditAndRun challenge={challenge} /> : "loading..."}
    </div>
  );
}
