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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
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

// Styled Components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
}));

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

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <RequiredField>Name*</RequiredField>
          <StyledTextField
            size="small"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <RequiredField>Email*</RequiredField>
          <StyledTextField
            size="small"
            fullWidth
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <RequiredField>Password*</RequiredField>
          <StyledTextField
            size="small"
            fullWidth
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledFormControl component="fieldset" error={!!errors.gender}>
            <RequiredField>Gender*</RequiredField>
            <RadioGroup row {...register('gender')}>
              <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
              <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
            </RadioGroup>
          </StyledFormControl>
        </Grid>

        <Grid item xs={12}>
          <RequiredField>Age*</RequiredField>
          <StyledTextField
            size="small"
            fullWidth
            type="number"
            {...register('age')}
            error={!!errors.age}
            helperText={errors.age?.message}
            InputProps={{ inputProps: { min: 1, max: 120 } }}
          />
        </Grid>

        <Grid item xs={12}>
          <SubmitButton
            type="submit"
            variant="contained"
            size="small"
            fullWidth
          >
            {editUser ? 'Update' : 'Submit'}
          </SubmitButton>
        </Grid>
      </Grid>
    </FormContainer>
  );
}