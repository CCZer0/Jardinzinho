// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlgEnc74cJ0zQYbwUgd1qjqJTRluT95cI",
  authDomain: "jardinzinho-25510.firebaseapp.com",
  projectId: "jardinzinho-25510",
  storageBucket: "jardinzinho-25510.firebasestorage.app",
  messagingSenderId: "234920826978",
  appId: "1:234920826978:web:d6eaa02b1bf00d0191993b",
  measurementId: "G-92Q1ZT7QXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);