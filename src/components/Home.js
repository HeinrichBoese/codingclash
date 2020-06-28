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
  container: {
    display: "flex",
    justifyContent: "center",
    height:'100vh',
    widht:'100vw'
  },
  root2: {
    background: 'rgb(66,5,137)',
    background: 'linear-gradient(69deg, rgba(66,5,137,1) 10%, rgba(251,47,130,1) 100%)',
    color: "white",
    height: 60,
    padding: "0 30px",
    // boxShadow: "0px 0px 0px 0px rgba(251,47,130,1)",
    margin: 20,
  },
  root3: {
    background: 'rgb(241,26,255)',
    background: 'linear-gradient(69deg, rgba(241,26,255,1) 26%, rgba(30,250,255,1) 100%)', 
    color: "white",
    height: 60,
    padding: "0 30px",
    boxShadow: "0 0px 5px 0px rgba(255, 105, 135, .3)",
    margin: 20,
  },
};

const Home = () => {
  return (
    <div style={styles.container}>
      <Button  style={styles.root} component={Link} to={"/game"}>
        Start Lobby
      </Button>
      <Button style={styles.root2} className ='illuminate'>
        test1
      </Button>
      <Button style={styles.root3} >
        test2
      </Button>

    </div>
  );
};

export default Home;
