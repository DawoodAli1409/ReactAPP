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
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

export default function Login({ showAlert }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data) => {
    console.log('Login data:', data);
    showAlert('success', 'Login successful!', '/ReactAPP/');
  };

  return (
    <Box className="auth-container">
      <Paper className="auth-card" elevation={3}>
        <Typography variant="h3" className="auth-title">
          Welcome Back
        </Typography>
        
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Sign in to access your account
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
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
            sx={{ mb: 1 }}
          />
          
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Link to="/ReactAPP/forgot-password" className="auth-link" style={{ fontSize: '0.9rem' }}>
              Forgot password?
            </Link>
          </Box>
          
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
            Sign In
          </Button>
          
          <Divider className="auth-divider">OR</Divider>
          
          <Typography className="auth-footer">
            Don't have an account?
            <Link to="/ReactAPP/register" className="auth-link">
              Create one
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}