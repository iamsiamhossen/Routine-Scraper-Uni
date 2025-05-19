import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, setDoc, serverTimestamp,getDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoxm4Nla1b-mLQykdqi8nD4XTOXKwfpA4",
  authDomain: "routine-scraper.firebaseapp.com",
  projectId: "routine-scraper",
  storageBucket: "routine-scraper.firebasestorage.app",
  messagingSenderId: "219668786086",
  appId: "1:219668786086:web:a331a3410bb8444bd3bd67",
  measurementId: "G-5FQYCZW6MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { 
  auth,
  db,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  doc, 
  setDoc, 
  serverTimestamp,
  getDoc,
  onAuthStateChanged,
  storage

};
