import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBkZVft4O-EIuIkj04r1EABb1xbT9r1xP8",
  authDomain: "store-c5eca.firebaseapp.com",
  projectId: "store-c5eca",
  storageBucket: "store-c5eca.appspot.com",
  messagingSenderId: "145069792652",
  appId: "1:145069792652:web:41ee94809f439828fa8aa9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);