import React, { useEffect, useState } from "react";
import firebase from './firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('AuthUser')));
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = firebase.auth().onAuthStateChanged(
      authUser => {
        setCurrentUser(authUser);
        if (authUser) {
          sessionStorage.setItem('AuthUser', JSON.stringify(authUser));
        }
        if ((authUser && !userData) || (authUser && userData.email !== authUser.email)) {
          db.collection('User').doc(authUser.uid).get().then((doc) => {
            setUserData(doc.data());
            sessionStorage.setItem('UserData', JSON.stringify(doc.data()))
          })
        }
      },
      // Error handling
      () => {
        sessionStorage.removeItem('AuthUser');
        sessionStorage.removeItem('UserData');
      },
    );
    return () => unsubscribe();
  }, []); // DO NOT, I REAPEAT, DO NOT LISTEN TO WARNING ABOUT MISSING DEPENDENCY
  // ADDING USERDATA AS DEPENDENCY WILL TRIGGER INFINITE LOOP AND HIGH BILLING
  // THANK YOU VERY MUCH


  return (
    <AuthContext.Provider
      value={{
        currentUser, userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};