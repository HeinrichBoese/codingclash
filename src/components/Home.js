import firebase from './firebase';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SoloMode from './SoloMode';
import RaceMode from './RaceMode';
import ClassroomMode from './ClassroomMode';

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 60,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: 20
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
};

// JUST EXAMPLE CODE SHOWING HOW TO GET DATA FROM DATABASE
// NEEDS TO ME MOVED INTO GAMEMODE COMPONENTS
const getChallenge = () => {
    const db = firebase.firestore();
    const docRef = db.collection("challenges").doc("1Qn45l95U57HRj5aoOF8");
    docRef.get().then((doc) => console.log(doc.data()));
  }
// -------------------------------------------------------

const Home = () => {

    return (
        <div style={styles.container}>
            <Button style={styles.root} component={Link} to={"/challenge/yourself"}>Challenge yourself</Button>
            <Button style={styles.root} component={Link} to={"/challenge/friend"}>Challenge a friend</Button>
            <Button style={styles.root} component={Link} to={"/challenge/class"}>Challenge your Class</Button>
        </div>
    )
}

export default Home;
