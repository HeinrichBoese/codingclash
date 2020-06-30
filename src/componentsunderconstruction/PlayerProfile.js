import React, { useContext } from "react";
import firebase from "../firebase";
import { useHistory, Redirect } from "react-router-dom";

import { AuthContext } from "../Auth";




export default function PlayerProfile(props) {
    const { currentUser, userData } = useContext(AuthContext);


    return (
        <div>
            { !currentUser && <Redirect to="/" />}
            {/* Bild */}
            {/* Level  */}
            {/* Profilname */}
            {/* Background */}

            
        </div>
    );
}