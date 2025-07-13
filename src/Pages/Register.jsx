import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { sendEmail } from '../services/emailService';
import { addUser } from '../firestoreService';

export default function Register({ showAlert }) {
  const navigate = useNavigate();
  const websiteUrl = "https://dawoodali1409.github.io/ReactAPP";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    age: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password should be at least 6 characters';
    if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) newErrors.age = 'Age must be a number between 1 and 120';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await addUser({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        age: formData.age,
        imageUrl: null
      });

      const emailData = {
        to: formData.email,
        subject: "Your Account Has Been Created",
        text: "Welcome to Firebase"
      };
      console.log('Sending welcome email with data:', emailData);
      const emailSent = await sendEmail(emailData);
      console.log('Email sent result:', emailSent);
      if (!emailSent) {
        throw new Error('Failed to send welcome email.');
      }

      showAlert('success', 'Registration successful! Welcome email sent.');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      console.error('Registration error full:', error);
      console.error('Registration error code:', error.code);
      console.error('Registration error message:', error.message);

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          if (error.message.includes('Failed to send welcome email')) {
            errorMessage = 'Registration successful, but welcome email failed to send.';
          }
      }

      showAlert('error', errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#1a237e' }}>Create Account</h1>
      <form onSubmit={onSubmit} noValidate>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: errors.name ? '1px solid red' : '1px solid #ccc' }}
            autoComplete="off"
          />
          {errors.name && <div style={{ color: 'red', fontSize: '14px' }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: errors.email ? '1px solid red' : '1px solid #ccc' }}
            autoComplete="off"
          />
          {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: errors.password ? '1px solid red' : '1px solid #ccc' }}
            autoComplete="off"
          />
          {errors.password && <div style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="passwordConfirm" style={{ fontWeight: 'bold' }}>Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: errors.passwordConfirm ? '1px solid red' : '1px solid #ccc' }}
            autoComplete="off"
          />
          {errors.passwordConfirm && <div style={{ color: 'red', fontSize: '14px' }}>{errors.passwordConfirm}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Gender</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            /> Male
          </label>{' '}
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            /> Female
          </label>
          {errors.gender && <div style={{ color: 'red', fontSize: '14px' }}>{errors.gender}</div>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="age" style={{ fontWeight: 'bold' }}>Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: errors.age ? '1px solid red' : '1px solid #ccc' }}
            autoComplete="off"
          />
          {errors.age && <div style={{ color: 'red', fontSize: '14px' }}>{errors.age}</div>}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#1a237e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <a
          href="/login"
          style={{ color: '#1a237e', fontWeight: 'bold' }}
        >
          Login here
        </a>
      </p>
    </div>
  );
}