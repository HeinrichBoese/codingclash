import firebase from './firebase';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

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

const getChallenge = () => {
    const db = firebase.firestore();
    const docRef = db.collection("challenges").doc("1Qn45l95U57HRj5aoOF8");
    docRef.get().then((doc) => console.log(doc.data()));
  }

const Home = () => {
    const [gameMode, setGamemode] = useState(false)


    const clickHandle = (mode) => {
        getChallenge();
        switch (mode) {
            case 'yourself':
                setGamemode('yourself');
                return
            case 'friend':
                setGamemode('friend');
                return    
            case 'class':
                setGamemode('class');
                return        
        }
    }

    switch (gameMode) {
        case 'yourself':
            return <Redirect to = '/challange/yourself' />;
        case 'friend':
            return <Redirect to = '/challange/friend' />;;    
        case 'class':
           return <Redirect to = '/challange/class' />;        
    }
    return (
        <div style={styles.container}>
            <Button style={styles.root} onClick={() => clickHandle('yourself')}>Challenge yourself</Button>
            <Button style={styles.root} onClick={() => clickHandle('friend')}>Challenge a friend</Button>
            <Button style={styles.root} onClick={() => clickHandle('class')}>Challenge your Class</Button>
        </div>
    )
}

export default Home;
