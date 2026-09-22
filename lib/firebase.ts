import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDg8_oCuxeDsXB76eo853mBQifLEbQCUbU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "solar-calculator-1e961.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "solar-calculator-1e961",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "solar-calculator-1e961.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "105043481429",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:105043481429:web:7355a561e27972b2b095dc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-09TF2ZY38Z",
};

// Initialize Firebase (Singleton pattern for Next.js SSR / Fast Refresh)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export {
  app,
  auth,
  db,
  googleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
};
export type { ConfirmationResult };
