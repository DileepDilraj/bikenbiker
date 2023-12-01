// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArSgCC3Qq4SVvX4M4zOMAXku5E7jeEuDs",
  authDomain: "bikenbiker.firebaseapp.com",
  projectId: "bikenbiker",
  storageBucket: "bikenbiker.appspot.com",
  messagingSenderId: "490640206327",
  appId: "1:490640206327:web:4a9de82beef5cb8947a6f2",
  measurementId: "G-5SLQ13Z6GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
