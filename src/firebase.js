import firebase from "firebase/compat/app";
import firestore from "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSFEErAlSFkjIUkP-s31nH93ZD2q5PFpM",
  authDomain: "whatsappclone-54e31.firebaseapp.com",
  projectId: "whatsappclone-54e31",
  storageBucket: "whatsappclone-54e31.appspot.com",
  messagingSenderId: "729899112898",
  appId: "1:729899112898:web:1d6b152342b70501d91e5b",
  measurementId: "G-1HE5SNHMVT",
};
// init firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// firebase auth google

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
