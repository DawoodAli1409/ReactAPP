// src/firestoreService.js
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Add user
export const addUser = async (userData) => {
  const docRef = await addDoc(collection(db, "users"), {
    ...userData,
    imageUrl: userData.imageUrl || null,
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, ...userData };
};

// Update user
export const updateUser = async (id, userData) => {
  await updateDoc(doc(db, "users", id), {
    ...userData,
    imageUrl: userData.imageUrl || null,
    updatedAt: serverTimestamp()
  });
};

// Delete user
export const deleteUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

// Listen to users in real time
export const subscribeToUsers = (callback, errorCallback) => {
  return onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(users);
    },
    errorCallback
  );
};
