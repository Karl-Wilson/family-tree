// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCSW2kYxgrHCUBGK6n1f_oSfU5A5lrUd5Y",
  authDomain: "family-tree-99361.firebaseapp.com",
  projectId: "family-tree-99361",
  storageBucket: "family-tree-99361.appspot.com",
  messagingSenderId: "887301009953",
  appId: "1:887301009953:web:46dbd6611330cb64826960",
  measurementId: "G-HVW4KQ77TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;