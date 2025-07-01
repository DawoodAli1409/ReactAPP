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
  // ... (keep your existing validation schema)
});

export default function UserForm({ onSubmit, editUser }) {
  // ... (keep your existing form logic)

  return (
    <Paper elevation={3} sx={{ 
      p: 2,
      borderRadius: 2,
      width: '100%',
      maxWidth: 500,
      margin: '0 auto'
    }}>
      <FormTitle variant="h6" sx={{ mb: 1.5 }}>
        {editUser ? 'Edit User Profile' : 'Create New User'}
      </FormTitle>

      <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1.5}>
          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Gender Field */}
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

          {/* Age Field */}
          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Age</RequiredField>
            <StyledTextField
              fullWidth
              size="medium"
              type="number"
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>

          {/* Submit Button */}
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