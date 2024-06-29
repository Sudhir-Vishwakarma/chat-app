import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnRTuUFN7o84l4MO7dsWqi2XoHFwQZLPg",
  authDomain: "chat-app-5431d.firebaseapp.com",
  projectId: "chat-app-5431d",
  storageBucket: "chat-app-5431d.appspot.com",
  messagingSenderId: "514838501134",
  appId: "1:514838501134:web:d8ab2012be263d34e3e95f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);