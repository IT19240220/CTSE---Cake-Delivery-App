import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAgTtUAefnEbZQbLKFEoHgPbzCl4jU6wmc",
  authDomain: "assignment-01-90f98.firebaseapp.com",
  projectId: "assignment-01-90f98",
  storageBucket: "assignment-01-90f98.appspot.com",
  messagingSenderId: "552591855502",
  appId: "1:552591855502:web:0e6d1a3c48e082406e1edf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)