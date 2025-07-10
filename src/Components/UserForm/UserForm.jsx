import React, { useState } from 'react';
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
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '/src/firebase';

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
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', value => {
      if (!value.length) return true; // attachment is optional
      return value[0].size <= 2000000; // 2MB
    })
    .test('fileType', 'Unsupported File Format', value => {
      if (!value.length) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
    }),
});

export default function UserForm({ onSubmit, editUser }) {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editUser || {
      name: '',
      email: '',
      password: '',
      gender: '',
      age: undefined,
      image: null,
    }
  });

  React.useEffect(() => {
    if (editUser) {
      reset(editUser);
    }
  }, [editUser, reset]);

  const watchImage = watch('image');

  const handleFormSubmit = async (data) => {
    try {
      setUploading(true);
      let imageUrl = editUser?.imageUrl || null;

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const storageRef = ref(storage, `user_images/${file.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            null,
            (error) => {
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const userData = {
        ...data,
        imageUrl,
      };
      delete userData.image; // remove image file from data before sending

      await onSubmit(userData);
      if (!editUser) reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setUploading(false);
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
              inputProps={{
                autoComplete: 'off'
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
              inputProps={{
                autoComplete: 'off'
              }}
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
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
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

          <Grid item xs={12}>
            <RequiredField sx={{ mb: 0.5 }}>Profile Image</RequiredField>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
            />
            {errors.image && <FormHelperText error>{errors.image.message}</FormHelperText>}
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : (editUser ? 'UPDATE USER' : 'CREATE USER')}
            </SubmitButton>
          </Grid>
        </Grid>
      </FormContainer>
    </Paper>
  );
}
