import React, { useContext }from 'react'
import { AuthContext } from "../Auth";
import { Redirect } from "react-router-dom";

export default function AuthChecker() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            
        </div>
    )
}
