import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

//connect to firebase in order to save pictures
const firebaseConfig = {
  apiKey: "AIzaSyAqGhnPfYj_6QNfBcgwCDo3HStRsqLm01s",
  authDomain: "ling-s-test-website.firebaseapp.com",
  projectId: "ling-s-test-website",
  storageBucket: "ling-s-test-website.appspot.com",
  messagingSenderId: "221377477995",
  appId: "1:221377477995:web:87e332aea0741e078ea02e",
  measurementId: "G-Q1YH58W4QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);