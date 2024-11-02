
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAacnmvNzXqlpluNsWbMl0-hl24mcCswNs",
  authDomain: "fir-authentication-7ecbd.firebaseapp.com",
  projectId: "fir-authentication-7ecbd",
  storageBucket: "fir-authentication-7ecbd.appspot.com",
  messagingSenderId: "815909958340",
  appId: "1:815909958340:web:643e7bb7277f3bbf11cf91",
  measurementId: "G-TCZQMRZNHT"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
