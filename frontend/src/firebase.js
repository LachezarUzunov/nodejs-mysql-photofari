import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYSSxEAg7LCle3bbQhhoPQsgBSZ2CI-ic",
  authDomain: "photofari.firebaseapp.com",
  projectId: "photofari",
  storageBucket: "photofari.appspot.com",
  messagingSenderId: "684105636296",
  appId: "1:684105636296:web:d4012abc2f838f5bea08fd",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
