import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGubeBpNTl68eXUsC-KDltmTF9Dx0XIZw",
  authDomain: "third-task-77fb3.firebaseapp.com",
  projectId: "third-task-77fb3",
  storageBucket: "third-task-77fb3.firebasestorage.app",
  messagingSenderId: "956691176835",
  appId: "1:956691176835:web:828ef6a72e6c2887a32ab6",
  measurementId: "G-1SY2DT7W6M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);