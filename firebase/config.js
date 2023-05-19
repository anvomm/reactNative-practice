import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhkheJJ9C7eb3507TCKa3hyrFl0ZO3hLI",
  authDomain: "reactnative-app-c5a67.firebaseapp.com",
  projectId: "reactnative-app-c5a67",
  storageBucket: "reactnative-app-c5a67.appspot.com",
  messagingSenderId: "143136079208",
  appId: "1:143136079208:web:3b92df713a8ef06f19aadd",
  measurementId: "G-8N04W7BC9J"
}; //спрячу все переменные в следующей домашке на деплое

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;