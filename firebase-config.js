// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjZWHSipApN4kC3mLYzUSAhM8METCr-kM",
  authDomain: "lr-textiles.firebaseapp.com",
  projectId: "lr-textiles",
  storageBucket: "lr-textiles.firebasestorage.app",
  messagingSenderId: "961739289163",
  appId: "1:961739289163:web:9d20ced5cdde63981fd3ce",
  measurementId: "G-RMCXBZH2JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Conectar con Firestore
const db = firebase.firestore();
