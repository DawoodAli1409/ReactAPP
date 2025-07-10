import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Divider } from '@mui/material';
import UserForm from '../Components/UserForm/UserForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Register({ showAlert }) {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 1. Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log('✅ User registered:', user.uid);

      // 2. Save user data to Firestore (including imageUrl)
      // Assuming you have a function addUser in firestoreService.js
      // Import and call it here
      // For now, just log the data
      console.log('User data to save:', data);

      showAlert('success', 'Registration successful!');
      navigate('/ReactAPP/');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
      }
      console.error('❌ Firebase error:', error.message);
      showAlert('error', errorMessage);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      p: 2
    }}>
      <Paper elevation={3} sx={{
        p: 4,
        width: '100%',
        maxWidth: 500
      }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
          Create Account
        </Typography>

        <UserForm onSubmit={onSubmit} />

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <a href="/ReactAPP/login" style={{ textDecoration: 'none', color: '#1a237e', fontWeight: 'bold' }}>
            Login here
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
