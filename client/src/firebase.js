// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD08fVmY7SEJbUsngvlxjoYASuVvoGv2TY",
  authDomain: "rentease-e35dc.firebaseapp.com",
  projectId: "rentease-e35dc",
  storageBucket: "rentease-e35dc.appspot.com",
  messagingSenderId: "1036711844290",
  appId: "1:1036711844290:web:978f26ad646623bf1f5e5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
