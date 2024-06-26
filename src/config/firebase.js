import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN || process.env.VITE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PROJECT_ID || process.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET || process.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGE_ID || process.env.VITE_MESSAGE_ID;
const appId = import.meta.env.VITE_APP_ID;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
