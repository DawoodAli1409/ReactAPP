import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Paper
} from '@mui/material';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  StyledFormControl,
  SubmitButton,
  RequiredField
} from './UserForm.styles';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  gender: yup.string().required('Gender is required'),
  age: yup.number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required')
    .max(120, 'Age must be less than 120')
});

export default function UserForm({ onSubmit, editUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editUser || {
      name: '',
      email: '',
      password: '',
      gender: '',
      age: ''
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!editUser) {
      reset();
    }
  };

  return (
    <Paper elevation={2} sx={{ 
      p: 1.5,
      borderRadius: 2,
      width: '100%',
      maxWidth: 400,
      margin: '0 auto'
    }}>
      <FormTitle variant="subtitle1" sx={{ mb: 1.5 }}>
        {editUser ? 'Edit User Profile' : 'Create New User'}
      </FormTitle>

      <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Name</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              margin="none"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Email</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              margin="none"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Password</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              margin="none"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledFormControl component="fieldset" error={!!errors.gender}>
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
            </StyledFormControl>
          </Grid>

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Age</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              margin="none"
              type="number"
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <SubmitButton 
              type="submit" 
              variant="contained" 
              fullWidth
              size="small"
            >
              {editUser ? 'UPDATE' : 'CREATE USER'}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormContainer>
    </Paper>
  );
}