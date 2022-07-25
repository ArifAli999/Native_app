import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAK8xoRWX8o77u5jAMkdYElq114KFnEIyk",
    authDomain: "native-afda4.firebaseapp.com",
    projectId: "native-afda4",
    storageBucket: "native-afda4.appspot.com",
    messagingSenderId: "1011880272704",
    appId: "1:1011880272704:web:3d5f1e96b8f516aa4450a5",
    measurementId: "G-EQ4NS1CXZ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();
