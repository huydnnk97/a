
import { initializeApp } from "firebase/app";

import {getFirestore, doc, getDoc , setDoc} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDqX7OBqntERxQcZNrXfniORScrD6rwrP0",
  authDomain: "task71-3ab09.firebaseapp.com",
  projectId: "task71-3ab09",
  storageBucket: "task71-3ab09.appspot.com",
  messagingSenderId: "135721050011",
  appId: "1:135721050011:web:746c0b36d004d4b70b0b3e",
  measurementId: "G-QVGQSC5HK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;


  const userDocRef = doc(db, 'users', userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);


  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating ', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signinAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}