import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Typography,
  Avatar,
  Paper
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import {
  FormContainer,
  StyledTextField,
  StyledFormControl,
  SubmitButton,
  RequiredField
} from './UserForm.styles';

const schema = yup.object().shape({
  // ... (keep your existing validation schema)
});

export default function UserForm({ onSubmit, editUser }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editUser || {
      name: '',
      email: '',
      password: '',
      gender: '',
      age: ''
    }
  });

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Avatar sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        width: 56, 
        height: 56,
        mb: 2,
        mx: 'auto'
      }}>
        <PeopleIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
        {editUser ? 'Edit User Profile' : 'Create New User'}
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Form fields (keep your existing fields) */}
        </Grid>
      </form>
    </Paper>
  );
}