import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  StyledFormControl,
  StyledFormLabel,
  SubmitButton,
  ErrorText,
  RequiredField
} from './UserForm.styles';

// Enhanced validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    ),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[A-Z]/,
      'Password must contain at least one uppercase letter'
    ),
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
    <FormContainer component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormTitle variant="h6">User Form</FormTitle>

      <div className="form-field">
        <RequiredField>Name*</RequiredField>
        <StyledTextField
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red'
              }
            }
          }}
        />
      </div>

      <div className="form-field">
        <RequiredField>Email*</RequiredField>
        <StyledTextField
          fullWidth
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red'
              }
            }
          }}
        />
      </div>

      <div className="form-field">
        <RequiredField>Password*</RequiredField>
        <StyledTextField
          fullWidth
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>

      <StyledFormControl component="fieldset" error={!!errors.gender}>
        <RequiredField>Gender*</RequiredField>
        <RadioGroup row {...register('gender')}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        {errors.gender && (
          <ErrorText variant="caption">
            {errors.gender.message}
          </ErrorText>
        )}
      </StyledFormControl>

      <div className="form-field">
        <RequiredField>Age*</RequiredField>
        <StyledTextField
          fullWidth
          type="number"
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          InputProps={{ inputProps: { min: 1, max: 120 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'red'
              }
            }
          }}
        />
      </div>

      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {editUser ? 'Update' : 'Submit'}
      </SubmitButton>
    </FormContainer>
  );
}