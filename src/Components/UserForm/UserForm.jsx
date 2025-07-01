import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Avatar,
  Paper
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
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
    <Paper 
      elevation={1} 
      sx={{ 
        p: 1,             // Reduced padding
        borderRadius: 2, 
        maxWidth: 380,      // Optional: control width
        margin: 'auto', 
        mt: 1,              // Reduced top margin
        mb: 1               // Reduced bottom margin
      }}
    >
      <Avatar sx={{
        bgcolor: 'primary.main',
        color: 'white',
        width: 40,
        height: 40,
        mb: 1,
        mx: 'auto'
      }}>
        <PeopleIcon fontSize="small" />
      </Avatar>

      <FormTitle variant="h6">
        {editUser ? 'Edit User Profile' : 'Create New User'}
      </FormTitle>

      <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RequiredField>Name</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField>Email</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <RequiredField>Password</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledFormControl component="fieldset" error={!!errors.gender}>
              <RequiredField component="legend">Gender</RequiredField>
              <RadioGroup row {...register('gender')}>
                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
              </RadioGroup>
            </StyledFormControl>
          </Grid>

          <Grid item xs={12}>
            <RequiredField>Age</RequiredField>
            <StyledTextField
              fullWidth
              size="small"
              type="number"
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <SubmitButton type="submit" variant="contained" fullWidth>
              {editUser ? 'Update Profile' : 'Create User'}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormContainer>
    </Paper>
  );
}
