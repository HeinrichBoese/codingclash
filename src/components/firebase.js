import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD71wvcXEn4ZK8VRt_ji1RHd2MKJVGv2ug",
    authDomain: "coding-clash.firebaseapp.com",
    databaseURL: "https://coding-clash.firebaseio.com",
    projectId: "coding-clash",
    storageBucket: "coding-clash.appspot.com",
    messagingSenderId: "905332997539",
    appId: "1:905332997539:web:ed424ca0f6d6edadd22e16",
  };

firebase.initializeApp(firebaseConfig);

export default firebase;