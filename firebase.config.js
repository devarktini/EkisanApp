import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCpjiGCC4mz8CPYglB17eR_drLHmSHqxYQ",
  authDomain: "kisaandarshan-test.firebaseapp.com",
  databaseURL: "https://kisaandarshan-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kisaandarshan-test",
  storageBucket: "kisaandarshan-test.appspot.com",
  messagingSenderId: "109364081834",
  appId: "1:109364081834:web:81b45f841bb7e360bb8cd3",
  measurementId: "G-J1088K5VP1",
  // appId: "1:109364081834:android:4d5b6456a72b1781bb8cd3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
