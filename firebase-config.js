// Importar y configurar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjZWHSipApN4kC3mLYzUSAhM8METCr-kM",
    authDomain: "lr-textiles.firebaseapp.com",
    projectId: "lr-textiles",
    storageBucket: "lr-textiles.firebasestorage.app",
    messagingSenderId: "961739289163",
    appId: "1:961739289163:web:d1df774301512d351fd3ce",
    measurementId: "G-70NVHRNXJX"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Inicializar Firestore
  const db = firebase.firestore();
  