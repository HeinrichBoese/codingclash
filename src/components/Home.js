//import firebase from "../firebase";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../App.css";

const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 60,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: 20,
  },
  buttons: {
    // background: 'rgb(241,26,255)',
    // background:  "#2a2a2e",
    // background: 'linear-gradient(20deg, rgba(241,26,255,1) 50%, rgba(30,250,255,1) 100%)', 
    color: "#f547e1",
   
    fontSize:'1em',
    fontWeight:'bold',
    height: '60px',
    // padding: "0 30px",
    // boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    width:'160px',
    margin:8,
    // border: '2px solid rgb(241,26,255)',
    border: '2px solid  #00bef7',
    boxShadow: '0px 0px 20px 2px #00bef7',
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: '0px 0px 20px 10px #00bef7'
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    // height:'100vh',
    // widht:'100vw'
  },
};

const Home = () => {
  return (
    <div className = 'lobbyCont' style={styles.container}>
      <Button  style={styles.buttons} component={Link} to={"/solo"}>
        Practice Solo
      </Button>
      <Button  style={styles.buttons} component={Link} to={"/game"}>
        Create Lobby
      </Button>
    </div>
  );
};

export default Home;
