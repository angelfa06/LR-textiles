import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjZWHSipApN4kC3mLYzUSAhM8METCr-kM",
  authDomain: "lr-textiles.firebaseapp.com",
  projectId: "lr-textiles",
  storageBucket: "lr-textiles.appspot.com",
  messagingSenderId: "961739289163",
  appId: "1:961739289163:web:9d20ced5cdde63981fd3ce",
  measurementId: "G-RMCXBZH2JS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
