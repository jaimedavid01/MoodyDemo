// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyA3nYabVjc4fTbO0C0OBRqltkJkrhDwIdk",
    authDomain: "moody-bfd57.firebaseapp.com",
    projectId: "moody-bfd57",
    storageBucket: "moody-bfd57.appspot.com",
    messagingSenderId: "837399005684",
    appId: "1:837399005684:web:7964a82d178e921810d1a1",
    measurementId: "G-01KFT1FFBC"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;