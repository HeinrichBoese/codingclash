import React, { useState, useRef } from 'react';
import Playertable from './Playertable';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useWindowDimensions from '../componentsunderconstruction/getWindowDimensions'
import { Link } from 'react-router-dom'

const Lobby = ({ initializer, setStarted }) => {
  const [players, setPlayers] = useState([
    'daniel', 'daniel meinnameistlänger', 'daniel', 'daniel meinnameistlänger'
  ])
  const [sessionkey, setSessionKey] = useState('')
  const [opponent, setOpponent] = useState(false)
  const { height, width } = useWindowDimensions();
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
    copy: {
      color: 'white',
      borderRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    textInput: {
      fontSize: 18,
      width:200,
      border: 'none',
      borderRadius: 0,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    bottomButton: {
      display: 'flex',
      justifyContent: 'center'
    },
    form: {
      display: 'flex',
      justifyContent: 'center'
    },
    container: {
      alignItems: 'center'
    }
  };

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };
  const sessionLink = window.location.href + '/' + sessionkey
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <input
          style={styles.textInput}
          ref={textAreaRef}
          value={sessionLink}
        />
        {
          document.queryCommandSupported('copy') &&
          <span>
            <Button style={styles.copy} onClick={copyToClipboard}>Copy Link</Button>
          </span>
        }
      </form>
      <div>
        <div style={styles.bottomButton}>
          <Box
            display="flex"
            flexWrap="wrap"
            p={1}
            m={1}
            css={{ maxWidth: width, justifyContent: 'center' }}
          >
            <Playertable players={players} />
          </Box>
        </div>
      </div>
      <div style={styles.bottomButton}>
        {initializer && players.length > 1 ? <Button style={styles.root} onClick={() => { setStarted(true) }}>Start Game</Button> : null}
        <Button style={styles.root} component={Link} to={'/'}>Leave Lobby</Button>
      </div>
    </div>
  )
}

export default Lobby;