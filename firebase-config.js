// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los que obtengas de tu consola de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Exportar las referencias a usar en otros archivos
  const db = firebase.firestore();
  const productsCollection = db.collection('products');