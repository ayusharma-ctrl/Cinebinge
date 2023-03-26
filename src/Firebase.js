// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsZzYTm383XXMSBtniLO8RENsXbFUkcyQ",
  authDomain: "fakenetflix-359c7.firebaseapp.com",
  projectId: "fakenetflix-359c7",
  storageBucket: "fakenetflix-359c7.appspot.com",
  messagingSenderId: "56527185322",
  appId: "1:56527185322:web:ab1ab14fdcc0e7c1aff7d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);