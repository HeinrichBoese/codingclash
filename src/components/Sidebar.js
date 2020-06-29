import React, { useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import bild from "../logo.svg"
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";
const useStyles = makeStyles((theme) => ({
  buttons: {
      // background: 'rgb(241,26,255)',
      // background:  "#2a2a2e",
      // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
      color: "#f547e1",

      fontSize:'.8em',
      fontWeight:'bold',
      height: 84,
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width:130,
      margin:12,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #00bef7',
      boxShadow: '0px 0px 20px 2px #00bef7',
      transition: 'box-shadow .5s',
      // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
      '&:hover': {
        boxShadow: '0px 0px 20px 10px #00bef7',
      }
  },
  sidebar: {
    height:'100vh',   
    borderRight:'2px solid #00bef7', 
    width:'160px',
    [theme.breakpoints.down('md')]: {
      width:'100vw',
      height:100,
      display:'flex'
     },
  },
}))
//import CheckBoxIcon from "@material-ui/icons/CheckBox";
const Sidebar = ({playerData}) => {
  const classes = useStyles();
  return(
    <div className={classes.sidebar}>
      <Card style={{height:110, width:160}}>
        <CardMedia style={{height:90}} image={bild}/>
        {/* <CardContent> */}
          
        {/* </CardContent> */}
      </Card>
      <Button className = {classes.buttons}>Home</Button>
      <Button className = {classes.buttons}>Usermenu</Button>
      <Button className = {classes.buttons}>Instructions</Button>
      </div>
  )
}

export default Sidebar;