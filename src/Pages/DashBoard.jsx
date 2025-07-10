import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserForm from '../Components/UserForm/UserForm';
import UserTable from '../Components/UserTable/UserTable';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Dashboard({ showAlert }) {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Listen to Firestore updates
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const subscribe = () => {
      return onSnapshot(
        collection(db, 'users'),
        (snapshot) => {
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(usersData);
          retryCount = 0; // reset on success
        },
        (error) => {
          console.error('Error fetching users:', error);
          showAlert('error', 'Failed to load users');

          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying Firestore subscription (${retryCount}/${maxRetries})...`);
            setTimeout(() => {
              subscribe();
            }, 2000 * retryCount);
          }
        }
      );
    };

    const unsubscribe = subscribe();

    return () => unsubscribe && unsubscribe();
  }, [showAlert]);

  const handleSubmit = async (userData) => {
    try {
      let imageUrl = userData.imageUrl || '';

      // Upload new image if provided
      if (userData.imageFile) {
        const imgRef = ref(storage, `Dawood/${Date.now()}_${userData.imageFile.name}`);
        const uploadTask = uploadBytesResumable(imgRef, userData.imageFile);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            reject,
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const userDataToSave = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        gender: userData.gender,
        age: userData.age,
        imageUrl: imageUrl,
        updatedAt: serverTimestamp()
      };

      if (editUser) {
        await updateDoc(doc(db, 'users', editUser.id), userDataToSave);
        showAlert('success', 'User updated successfully!');
      } else {
        await addDoc(collection(db, 'users'), {
          ...userDataToSave,
          createdBy: currentUser?.uid || 'admin',
          createdAt: serverTimestamp()
        });
        showAlert('success', 'User added successfully!');
      }

      setEditUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      showAlert('error', 'Failed to save user: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      showAlert('success', 'User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('error', 'Failed to delete user: ' + error.message);
    }
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={5}>
        <UserForm onSubmit={handleSubmit} editUser={editUser} />
      </Grid>
      <Grid item xs={12} md={7}>
        <UserTable
          users={users}
          onEdit={setEditUser}
          onDelete={handleDelete}
          loading={false} // Force no loading
        />
      </Grid>
    </Grid>
  );
}
