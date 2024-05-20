// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6PILKuQC60mAK-0GO0ymFgciG9t3aRoo",
  authDomain: "chat-me-a49ee.firebaseapp.com",
  projectId: "chat-me-a49ee",
  storageBucket: "chat-me-a49ee.appspot.com",
  messagingSenderId: "887290360288",
  appId: "1:887290360288:web:7c855251c63b8c40d87b85",
  measurementId: "G-6XWRY4LX13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
