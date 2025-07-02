import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
  FormControl,
  FormHelperText
} from '@mui/material';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  SubmitButton,
  RequiredField
} from './UserForm.styles';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  gender: yup.string().required('Please select a gender'),
  age: yup.number()
    .typeError('Age must be a number')
    .integer('Age must be a whole number')
    .positive('Age must be positive')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age cannot exceed 120')
    .required('Age is required'),
});

export default function UserForm({ onSubmit, editUser }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editUser || {
      name: '',
      email: '',
      password: '',
      gender: '',
      age: undefined // Changed from empty string to undefined for number field
    }
  });

  React.useEffect(() => {
    if (editUser) {
      reset(editUser);
    }
  }, [editUser, reset]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (!editUser) {
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 2,
      borderRadius: 2,
      width: '100%',
      maxWidth: 400,
      margin: '0 0 0 auto'
    }}>
      <FormTitle variant="h6" sx={{ mb: 1.5 }}>
        {editUser ? 'Edit User Profile' : 'Create New User'}
      </FormTitle>

      <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Name</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Email</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
              inputProps={{
                autoComplete: 'new-email'
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Password</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
              inputProps={{
                autoComplete: editUser ? 'new-password' : 'current-password'
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" error={!!errors.gender} disabled={isSubmitting}>
              <RequiredField component="legend" sx={{ mb: 0.5 }}>Gender</RequiredField>
              <RadioGroup row {...register('gender')}>
                <FormControlLabel 
                  value="male" 
                  control={<Radio size="small" />} 
                  label="Male" 
                  sx={{ mr: 2 }}
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio size="small" />} 
                  label="Female" 
                />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Age</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              type="number"
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
              disabled={isSubmitting}
              InputProps={{ 
                inputProps: { 
                  min: 1, 
                  max: 120,
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                } 
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <SubmitButton 
              type="submit" 
              variant="contained" 
              fullWidth
              size="medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (editUser ? 'UPDATE USER' : 'CREATE USER')}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormContainer>
    </Paper>
  );
}