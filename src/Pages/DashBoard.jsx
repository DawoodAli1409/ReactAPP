import React from 'react';
import { Grid } from '@mui/material';
import UserForm from '../Components/UserForm/UserForm';
import UserTable from '../Components/UserTable/UserTable';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Dashboard({ showAlert }) {
  const { currentUser } = useAuth();
  const [users, setUsers] = React.useState([]);
  const [editUser, setEditUser] = React.useState(null);

  React.useEffect(() => {
    const usersRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (userData) => {
    try {
      if (editUser) {
        await updateDoc(doc(db, 'users', editUser.id), userData);
        showAlert('success', 'User updated successfully!');
      } else {
        await addDoc(collection(db, 'users'), {
          ...userData,
          createdBy: currentUser.uid,
          createdAt: new Date()
        });
        showAlert('success', 'User created successfully!');
      }
      setEditUser(null);
    } catch (error) {
      showAlert('error', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      showAlert('success', 'User deleted successfully!');
    } catch (error) {
      showAlert('error', error.message);
    }
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={5}>
        <UserForm 
          onSubmit={handleSubmit} 
          editUser={editUser} 
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <UserTable 
          users={users} 
          onEdit={setEditUser} 
          onDelete={handleDelete} 
        />
      </Grid>
    </Grid>
  );
}