// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";




const firebaseConfig = {

  apiKey: "AIzaSyCSW2kYxgrHCUBGK6n1f_oSfU5A5lrUd5Y",

  authDomain: "family-tree-99361.firebaseapp.com",

  projectId: "family-tree-99361",

  storageBucket: "family-tree-99361.appspot.com",

  messagingSenderId: "887301009953",

  appId: "1:887301009953:web:2271eda1790e5502826960",

  measurementId: "G-3WYLWPXNC7"

}


//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

// export default !firebase.apps.length 
//   ? firebase.initializeApp(firebaseConfig).firestore()
//   : firebase.firestore();