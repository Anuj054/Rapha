// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm9Mi8uW90gsB5JsAAcJztOA_v9uKBlOM",
  authDomain: "social-app-17919.firebaseapp.com",
  projectId: "social-app-17919",
  storageBucket: "social-app-17919.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "128615797611",
  appId: "1:128615797611:web:56c3e7a98b4c8a172df22e",
  measurementId: "G-H55E4R986L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firebase Storage
export const storage = getStorage(app);
