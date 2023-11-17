// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { updateEmail, sendEmailVerification, getIdToken  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYD-fdLYZJSnqIoyLVmOGewlyGEPeemng",
  authDomain: "lasencinasboutique.firebaseapp.com",
  projectId: "lasencinasboutique",
  storageBucket: "lasencinasboutique.appspot.com",
  messagingSenderId: "510608269705",
  appId: "1:510608269705:web:e80af1feaa7e1fd75c8158",
  measurementId: "G-LL4WYHVP76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app); 
export { updateEmail, sendEmailVerification, getIdToken  };
