import React, {useEffect, useState } from "react";
import firebase from './firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('AuthUser')));
   
    useEffect(() => {        
        firebase.auth().onAuthStateChanged(setCurrentUser);
        firebase.auth().onAuthStateChanged(
            authUser => {
              localStorage.setItem('AuthUser', JSON.stringify(authUser));
            },
            () => {
              localStorage.removeItem('AuthUser');
            },
          );    
    }, []);
    

    return (
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    );

};