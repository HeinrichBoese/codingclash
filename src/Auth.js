import React, { useEffect, useState } from "react";
import firebase from './firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('AuthUser')));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = firebase.auth().onAuthStateChanged(
      authUser => {
        setCurrentUser(authUser);
        if (authUser) {
          sessionStorage.setItem('AuthUser', JSON.stringify(authUser))
        } else {
          sessionStorage.removeItem('AuthUser');
          setUserData(null);
        };
      },
      // Error handling
      () => {
        sessionStorage.removeItem('AuthUser');
        setUserData(null);
      },
    );
    return () => unsubscribe();
  }, []); // DO NOT, I REAPEAT, DO NOT LISTEN TO WARNING ABOUT MISSING DEPENDENCY
  // ADDING USERDATA AS DEPENDENCY WILL TRIGGER INFINITE LOOP AND HIGH BILLING
  // THANK YOU VERY MUCH

  useEffect(() => {
    const db = firebase.firestore();
    if (currentUser) {
      return db.collection('User').doc(currentUser.uid).onSnapshot((snapshot) => {
        setUserData(snapshot.data())
      })
    }
  }, [currentUser])


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