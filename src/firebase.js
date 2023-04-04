// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUUjZKmLSweW1xY7izRV78asUIP1n3hNs",
  authDomain: "blockchain-f0893.firebaseapp.com",
  databaseURL: "https://blockchain-f0893-default-rtdb.firebaseio.com",
  projectId: "blockchain-f0893",
  storageBucket: "blockchain-f0893.appspot.com",
  messagingSenderId: "342405634460",
  appId: "1:342405634460:web:412b1d7bf834c1d3be9059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
