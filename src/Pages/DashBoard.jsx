import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserForm from '../Components/UserForm/UserForm';
import UserTable from '../Components/UserTable/UserTable';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { sendEmail } from '../services/emailService';
import { collection, getDocs } from 'firebase/firestore'; // Kept for initial fetch compatibility

export default function Dashboard({ showAlert }) {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const websiteUrl = "https://dawoodali1409.github.io/ReactAPP";
  const projectId = "internship-2025-465209";
  const databaseId = "dawood";
  const apiKey = "AIzaSyC3AaqtfxinnRjk7FfmBThxjAQv2m3YJbI"; // From firebaseConfig

  const fetchUsers = async (retries = 3) => {
    setLoading(true);
    for (let i = 0; i < retries; i++) {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/userdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const usersData = data.documents
          ? data.documents.map(doc => {
              const fields = doc.fields || {};
              return {
                id: doc.name?.split('/').pop() || '',
                name: fields.name?.stringValue || '',
                email: fields.email?.stringValue || '',
                gender: fields.gender?.stringValue || '',
                age: fields.age?.integerValue ? parseInt(fields.age.integerValue, 10) : null,
                imageUrl: fields.imageUrl?.stringValue || '',
              };
            })
          : [];
        setUsers(usersData);
        setLoading(false);
        break;
      } catch (error) {
        console.error(`Error fetching users (attempt ${i + 1}/${retries}):`, error);
        if (i === retries - 1) {
          showAlert('error', 'Failed to load users after multiple attempts');
          setLoading(false);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial data fetch with retries

    const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentUser, showAlert]);

  const handleSubmit = async (userData) => {
    try {
      let imageUrl = userData.imageUrl || '';

      if (userData.imageFile) {
        const file = userData.imageFile;
        const storageRef = ref(storage, `user_images/${file.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
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

      const token = await currentUser.getIdToken();
      const userDataToSave = {
        fields: {
          name: { stringValue: userData.name },
          email: { stringValue: userData.email },
          gender: { stringValue: userData.gender },
          age: { integerValue: userData.age },
          imageUrl: { stringValue: imageUrl },
        },
      };

      if (editUser) {
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/userdata/${editUser.id}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDataToSave),
          }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        showAlert('success', 'User updated successfully!');
      } else {
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/userdata?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDataToSave),
          }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const newUserId = result.name.split('/').pop();

        await sendEmail({
          to: userData.email,
          subject: 'Your Account Has Been Created',
          text: '', // Provide empty string to avoid undefined error
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #1a237e;">Welcome, ${userData.name}!</h1>
              <p>Your account has been created by an administrator.</p>
              
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Login Instructions:</strong></p>
                <p>Email: ${userData.email}</p>
                <p>Please set your password using the link below:</p>
              </div>

              <p style="margin-top: 20px; text-align: center;">
                <a href="${websiteUrl}/reset-password" 
                   style="background-color: #1a237e; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 4px; display: inline-block;">
                  Set Your Password
                </a>
              </p>

              <p style="font-size: 12px; color: #666; margin-top: 30px;">
                For security reasons, we recommend changing your password regularly.
                If you didn't request this account, please contact support immediately.
              </p>
            </div>
          `
        });

        showAlert('success', 'User added and welcome email sent!');
      }

      setEditUser(null);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error saving user:', error);
      showAlert('error', `Failed to save user: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/userdata/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      showAlert('success', 'User deleted successfully!');
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('error', `Failed to delete user: ${error.message}`);
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