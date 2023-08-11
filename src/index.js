import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

//importar para exportar mi json de datos
// import { getFirestore, collection, addDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY2Giu1wg0XnMEGLJ182gK0oThfh8Ct_g",
  authDomain: "wearethepoint-597b1.firebaseapp.com",
  projectId: "wearethepoint-597b1",
  storageBucket: "wearethepoint-597b1.appspot.com",
  messagingSenderId: "525766908773",
  appId: "1:525766908773:web:00a06bb1c369058099df8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

//iterar sobre los datos del mock para que me suba cada objeto a firestore
// categories.forEach((producto) => {
//   // addDoc ,collection,que llamo desde FireStore
//   // db variable que llama a getFireStore, "productos", que es el nombre de nuestra colección
//   addDoc(collection(db, 'categories'), producto)
//     .then((docRef) => {
//       console.log("Documento agregado con id", docRef.id);
//     })
//     .catch((error) => {
//       console.log("error al agregar el documento", error);
//     })
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
