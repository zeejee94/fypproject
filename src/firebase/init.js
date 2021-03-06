import * as firebase from "firebase";


const config = {
  apiKey: "AIzaSyA7TrcWuwT_aA47eWV6CDusXgYfrEt5eUU",
  authDomain: "fpy-dev.firebaseapp.com",
  databaseURL: "https://fpy-dev.firebaseio.com",
  projectId: "fpy-dev",
  storageBucket: "fpy-dev.appspot.com",
  messagingSenderId: "371598464406"
  };
firebase.initializeApp(config);
export const databaseRef = firebase.database().ref();
export const timeRef = firebase.database.ServerValue.TIMESTAMP;
export const userRef = databaseRef.child("users");
export const brochureRef = databaseRef.child("brochures");
export const productRef = databaseRef.child("products");
export const authRef = firebase.auth();

export const storage = firebase.storage().ref();

//tesing is good