import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onSubmit = (data) => {
    console.log('Registration data:', data);
    showAlert('success', 'Registration successful!', '/ReactAPP/login');
  };

  return (
    <Box className="auth-container">
      <Paper className="auth-card" elevation={3}>
        <Typography variant="h3" className="auth-title">
          Create Account
        </Typography>
        
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Join us today and get started
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            className="auth-field"
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
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            className="auth-field"
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
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            className="auth-field"
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
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            className="auth-field"
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
            sx={{ mb: 3 }}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            className="auth-button"
            sx={{
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#303f9f'
              }
            }}
          >
            Create Account
          </Button>
          
          <Divider className="auth-divider">OR</Divider>
          
          <Typography className="auth-footer">
            Already have an account?
            <Link to="/ReactAPP/login" className="auth-link">
              Sign in
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}