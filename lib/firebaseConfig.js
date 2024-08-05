// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQFRPX2n7i-FffhHROn5BXpc5d5JlEt9A",
  authDomain: "inventory-management-a422f.firebaseapp.com",
  projectId: "inventory-management-a422f",
  storageBucket: "inventory-management-a422f.appspot.com",
  messagingSenderId: "230133293866",
  appId: "1:230133293866:web:75d21e2f01fc5e6ec73453",
  measurementId: "G-W82474FF3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
