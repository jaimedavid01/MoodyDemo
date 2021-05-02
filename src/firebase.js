// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCT0kxJFVMfV02FxdtRSr44aJLIWS_X9sc",
  authDomain: "moodydemo-b85a3.firebaseapp.com",
  projectId: "moodydemo-b85a3",
  storageBucket: "moodydemo-b85a3.appspot.com",
  messagingSenderId: "22123657578",
  appId: "1:22123657578:web:d9bc0adc3084fe0ad98d13",
  measurementId: "G-KEDS96Q3KM"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;