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
  Person as PersonIcon,
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

export default function Register({ showAlert }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      showAlert('success', 'Registration successful!');
      navigate('/ReactAPP/'); // Redirect to dashboard after successful registration
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      switch(error.code) {
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
          Create Account
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          
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
          
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <Divider sx={{ my: 2 }}>OR</Divider>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link 
              to="/ReactAPP/login" 
              style={{ 
                textDecoration: 'none',
                color: '#1a237e',
                fontWeight: 'bold'
              }}
            >
              Login here
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}