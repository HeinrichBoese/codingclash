import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import CodeEditAndRun from "./CodeEditAndRun";

const getRandomChallenge = async () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("challenges");
  const snapshot = await collectionRef.get();
  const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
  return snapshot.docs[randomIndex].data();
};

export default function SoloMode(props) {
  const [challenge, setChallenge] = useState(null);
  useEffect(() => setChallenge(getRandomChallenge()), []);

  return (
    <div>
      <CodeEditAndRun challenge={challenge} />
    </div>
  );
}
