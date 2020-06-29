import React, { useContext } from "react";
import firebase from "../firebase";

import { AuthContext } from "../Auth";




export default function PlayerProfile(props) {
    const { currentUser, userData } = useContext(AuthContext);


    return (
        <div>
            { currentUser && <Redirect to="/" />}

            
        </div>
    );
}