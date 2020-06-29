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
import "../App.css";

const styles = {
  buttons: {
      // background: 'rgb(241,26,255)',
      background:  "#2a2a2e",
      // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
      color: "#f547e1",
      fontSize:'1em',
      fontWeight:'bold',
      height: 84,
      // padding: "0 30px",
      // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
      width:144,
      margin:8,
      // border: '2px solid rgb(241,26,255)',
      border: '2px solid  #00bef7'
      // boxShadow: "0px 0px 20px 5px rgb(241,26,255)",
  },
}
//import CheckBoxIcon from "@material-ui/icons/CheckBox";
const Sidebar = ({playerName}) => {
  return(
    <div style={{height:'100vh', borderRight:'2px solid #00bef7', width:'160px'}}>
      <Card style={{height:130}}>
        <CardMedia style={{height:100}} image={bild}/>
        {/* <CardContent> */}
          <p style={{ display:'flex', justifyContent:'center', color:'green', margin:1}}>{playerName}</p>
        {/* </CardContent> */}
      </Card>
      <Button className = 'illuminate' style={styles.buttons}>Test</Button>
      </div>
  )
}

export default Sidebar;