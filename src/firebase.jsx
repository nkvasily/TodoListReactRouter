// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDataBase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPfoQMjZDLXui34HveGulz3G5AZqwzLlw",
  authDomain: "todolist-c2738.firebaseapp.com",
  projectId: "todolist-c2738",
  storageBucket: "todolist-c2738.firebasestorage.app",
  messagingSenderId: "535049883452",
  appId: "1:535049883452:web:35e7730a1e95f37042d839",
  databaseURL: 'https://todolist-c2738-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDataBase(app);

