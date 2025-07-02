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
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  gender: yup.string().required('Gender is required'),
  age: yup.number().min(1, 'Age must be at least 1').max(120, 'Age must be less than 120').required('Age is required'),
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

  React.useEffect(() => {
    if (editUser) {
      reset(editUser);
    }
  }, [editUser, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!editUser) {
      reset();
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

      <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Name</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
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
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" error={!!errors.gender}>
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
    {...register('age', {
      valueAsNumber: true,
      required: "Age is required",
      min: {
        value: 1,
        message: "Age must be at least 1"
      },
      max: {
        value: 120,
        message: "Age must be at most 120"
      },
      validate: (value) => !isNaN(value) || "Please enter a valid number"
    })}
    error={!!errors.age}
    helperText={errors.age?.message}
    InputProps={{ 
      inputProps: { 
        min: 1, 
        max: 120,
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
            >
              {editUser ? 'UPDATE USER' : 'CREATE USER'}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormContainer>
    </Paper>
  );
}