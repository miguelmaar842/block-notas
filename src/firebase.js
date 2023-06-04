import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKTB3diorv87X54cWDOo7cqGSdVfGWp8o",
  authDomain: "savenote-3ecb3.firebaseapp.com",
  projectId: "savenote-3ecb3",
  storageBucket: "savenote-3ecb3.appspot.com",
  messagingSenderId: "958064618875",
  appId: "1:958064618875:web:16424a3bc1107fea7ea1de"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };