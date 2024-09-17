// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrected the typo here

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0O8IK73cMthwUpiVJantLkE8mBH5Ba04",
  authDomain: "ai-trip-planner-68d80.firebaseapp.com",
  projectId: "ai-trip-planner-68d80",
  storageBucket: "ai-trip-planner-68d80.appspot.com",
  messagingSenderId: "16155615325",
  appId: "1:16155615325:web:66260cf57594424a506db4",
  measurementId: "G-NJZF3VSL41"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initialize Firestore

