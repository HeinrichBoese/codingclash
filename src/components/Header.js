import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ActionsIcon from '@material-ui/icons/Menu';
import Help from './Help';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


 const Header = ({isLoggedIn}) => {
  const classes = useStyles();
  if(isLoggedIn) {
    return (
        <div className={classes.root}>
          <AppBar position="static" >
            <Toolbar>
              {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>  
              </Typography>
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
  }
  else {
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
            <Typography variant="h6"> 
            Code Clash
              </Typography>
              <Help />
              <Button color="inherit">Highscore</Button>
              <Typography variant="h6" className={classes.title}> 
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
  }

}

export default Header;