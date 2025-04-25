// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl_SQbrB2uNpQnY4rm091HIje6Ydbmcvg",
  authDomain: "customer-review-bf1da.firebaseapp.com",
  projectId: "customer-review-bf1da",
  storageBucket: "customer-review-bf1da.firebasestorage.app",
  messagingSenderId: "979990420927",
  appId: "1:979990420927:web:5e2455256b7b86cfab150a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
