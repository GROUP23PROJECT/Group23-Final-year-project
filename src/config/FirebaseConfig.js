
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  // apiKey: "AIzaSyBdLcrL6qel8rIsAEEDkSDqm2j5OjE8LM8",
  // authDomain: "ticket-reservation-demo.firebaseapp.com",
  // projectId: "ticket-reservation-demo",
  // storageBucket: "ticket-reservation-demo.appspot.com",
  // messagingSenderId: "518523835618",
  // appId: "1:518523835618:web:5ae98fbcc877fc79503abb",
  // measurementId: "G-TE0JEMXL5V"

  apiKey: "AIzaSyAjVcrtdq2IM7LoE06KJ6e9DgJKyWcqi1w",
  authDomain: "segnclassauth.firebaseapp.com",
  projectId: "segnclassauth",
  storageBucket: "segnclassauth.appspot.com",
  messagingSenderId: "1069159811060",
  appId: "1:1069159811060:web:38264e93dd5b7562105ba1",
  measurementId: "G-2Y7DSDK2DH"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);







// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAjVcrtdq2IM7LoE06KJ6e9DgJKyWcqi1w",
//   authDomain: "segnclassauth.firebaseapp.com",
//   projectId: "segnclassauth",
//   storageBucket: "segnclassauth.appspot.com",
//   messagingSenderId: "1069159811060",
//   appId: "1:1069159811060:web:38264e93dd5b7562105ba1",
//   measurementId: "G-2Y7DSDK2DH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);