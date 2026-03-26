// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhKheDz58a6bOmu3vXDtmRa2ny72chiEs",
  authDomain: "barnote-1cb21.firebaseapp.com",
  projectId: "barnote-1cb21",
  storageBucket: "barnote-1cb21.firebasestorage.app",
  messagingSenderId: "302228309723",
  appId: "1:302228309723:web:0551a709e9ece55d82eefe",
  measurementId: "G-TG2F8Z8QR8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
