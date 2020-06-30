import React, {useContext} from "react";
import firebase from "../firebase";
import { AuthContext } from "../Auth";
import { useParams, useHistory } from "react-router-dom";
import GameMaster from "./GameMaster";











export default function AuthChecker(props) {
    const { currentUser } = useContext(AuthContext);
    let history = useHistory();
    const gameID = useParams().id;

    console.log(gameID);
    if(!currentUser){
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        alert(error.code + error.message);

        // ...
      })
    }

    return (
<div>
 {currentUser && <GameMaster />}
 </div>
    )
}