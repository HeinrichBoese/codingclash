//import firebase from "../firebase";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
  },
};

const Home = () => {
  return (
    <div style={styles.container}>
      <Button style={styles.root} component={Link} to={"/solo"}>
        Challenge yourself
      </Button>
      <Button style={styles.root} component={Link} to={"/race"}>
        Challenge a friend
      </Button>
      <Button style={styles.root} component={Link} to={"/classroom"}>
        Challenge your Class
      </Button>
    </div>
  );
};

export default Home;
