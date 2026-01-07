// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- ESTA LINHA FALTAVA!

const firebaseConfig = {
  apiKey: "AIzaSyBlgEnc74cJ0zQYbwUgd1qjqJTRluT95cI",
  authDomain: "jardinzinho-25510.firebaseapp.com",
  projectId: "jardinzinho-25510",
  storageBucket: "jardinzinho-25510.firebasestorage.app",
  messagingSenderId: "234920826978",
  appId: "1:234920826978:web:d6eaa02b1bf00d0191993b",
  measurementId: "G-92Q1ZT7QXZ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Banco de Dados
export const db = getFirestore(app);