// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv7GjE4vJl8XcvaaKo3_UIaUfsvKZBftE",
  authDomain: "carrental-7deb3.firebaseapp.com",
  projectId: "carrental-7deb3",
  storageBucket: "carrental-7deb3.firebasestorage.app",
  messagingSenderId: "202458738413",
  appId: "1:202458738413:web:b8655ecfeef9365d69e6e4",
  measurementId: "G-47EDRHJEG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export authentication and database
export const auth = getAuth(app);
export const db = getFirestore(app);
