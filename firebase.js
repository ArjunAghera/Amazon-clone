import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmDTm8Zvr1vZgqlClZop2Rd3v3ojSSWYk",
  authDomain: "clone-bacac.firebaseapp.com",
  projectId: "clone-bacac",
  storageBucket: "clone-bacac.appspot.com",
  messagingSenderId: "620368414025",
  appId: "1:620368414025:web:0a29e37691e23b2eb8c698",
  measurementId: "G-1SZXBZE057",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
