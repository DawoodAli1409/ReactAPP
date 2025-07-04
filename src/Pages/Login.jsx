import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

export default function Login({ showAlert }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      showAlert('success', 'Login successful!');
      navigate('/ReactAPP/'); // Redirect to dashboard after successful login
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      switch(error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Account temporarily locked.';
          break;
      }
      showAlert('error', errorMessage);
    } finally {
      setIsSubmitting(false);
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
          Login
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#303f9f'
              }
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
          
          <Divider sx={{ my: 2 }}>OR</Divider>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link 
              to="/ReactAPP/register" 
              style={{ 
                textDecoration: 'none',
                color: '#1a237e',
                fontWeight: 'bold'
              }}
            >
              Register here
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}