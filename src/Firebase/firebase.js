import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0qPp2B1WHXGIKQE1clP7rbXHcFPq57D8",
  authDomain: "login-auth-fyp.firebaseapp.com",
  projectId: "login-auth-fyp",
  storageBucket: "login-auth-fyp.appspot.com",
  messagingSenderId: "854848169088",
  appId: "1:854848169088:web:cfcb03859562095c13f265"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, auth, app, db, collection, setDoc, getDoc, addDoc, getFirestore, getDocs, updateDoc, doc };