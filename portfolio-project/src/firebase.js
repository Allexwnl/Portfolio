// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCa_F41nX0tgZ6M5xy66Y4Ikpvzcx91QfM",
  authDomain: "portfolio-alexander-zoet.firebaseapp.com",
  projectId: "portfolio-alexander-zoet",
  storageBucket: "portfolio-alexander-zoet.firebasestorage.app",
  messagingSenderId: "384778378985",
  appId: "1:384778378985:web:71fad7a60e4c84a4a89a78",
  measurementId: "G-M7WE1TDRB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
