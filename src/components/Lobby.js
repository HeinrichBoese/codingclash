import React, { useState } from 'react';
import Playertable from './Playertable';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


const Lobby = () => {
    const [players, setPlayers] = useState([
        '?', '?', '?', '?', '?', '?', '?', '?'
    ])

    const styles = {
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            margin: 20
        },
    };

    return (
        <div>
            {/* game mode goes here  */}
            {/* timer goes here */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                    css={{ maxWidth: 500, justifyContent: 'center' }}
                >
                    <Playertable players={players} />
                </Box>
            </div>
            <div>
                <Button style={styles.root}>Start Game</Button>
                <Button style={styles.root}>Leave Lobby</Button>
            </div>
        </div>
    )

}






export default Lobby;
