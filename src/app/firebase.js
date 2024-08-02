// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// config parameters
const firebaseConfig = {
  apiKey: "AIzaSyBbATWRPG95goNkLXDfYyYIwTELz4EVszk",
  authDomain: "inventory-management-app-35775.firebaseapp.com",
  projectId: "inventory-management-app-35775",
  storageBucket: "inventory-management-app-35775.appspot.com",
  messagingSenderId: "279832107589",
  appId: "1:279832107589:web:39f9c8aa23687d8a7e212c",
  measurementId: "G-NFPZZQHVHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };