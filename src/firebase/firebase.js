import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFrVVpL9zjGafn6b75co2bYAb6n8ZBGgM",
  authDomain: "library-75244.firebaseapp.com",
  projectId: "library-75244",
  storageBucket: "library-75244.firebasestorage.app",
  messagingSenderId: "142581130364",
  appId: "1:142581130364:web:d139d96981637d032fd5f9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
