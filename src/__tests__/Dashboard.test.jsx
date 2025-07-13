import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Pages/DashBoard';
import * as firestoreService from '../firestoreService';
import * as emailService from '../services/emailService';
import { AuthContext } from '../context/AuthContext';

// Mock firestoreService methods
jest.mock('../firestoreService');
jest.mock('../services/emailService');

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com', gender: 'female', age: 25, imageUrl: '' },
  { id: '2', name: 'Bob', email: 'bob@example.com', gender: 'male', age: 30, imageUrl: '' },
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    firestoreService.getUserdata.mockResolvedValue(mockUsers);
    firestoreService.addUser.mockResolvedValue({});
    firestoreService.updateUser.mockResolvedValue({});
    firestoreService.deleteUser.mockResolvedValue({});
    emailService.sendEmail.mockResolvedValue({});
  });

  test('renders user table with fetched users', async () => {
    render(
      <AuthContext.Provider value={{ currentUser: { uid: 'admin', getIdToken: jest.fn().mockResolvedValue('token') } }}>
        <Dashboard showAlert={jest.fn()} />
      </AuthContext.Provider>
    );

    // Wait for users to be loaded
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  test('adds a new user and sends email', async () => {
    const showAlert = jest.fn();

    render(
      <AuthContext.Provider value={{ currentUser: { uid: 'admin', getIdToken: jest.fn().mockResolvedValue('token') } }}>
        <Dashboard showAlert={showAlert} />
      </AuthContext.Provider>
    );

    // Simulate form submission
    const newUser = {
      name: 'Charlie',
      email: 'charlie@example.com',
      gender: 'male',
      age: 28,
      imageFile: null,
    };

    await firestoreService.addUser(newUser);
    await emailService.sendEmail({
      to: newUser.email,
      subject: expect.any(String),
      html: expect.any(String),
    });

    expect(showAlert).toHaveBeenCalledWith('success', 'User added and welcome email sent!');
  });

  test('updates an existing user', async () => {
    const showAlert = jest.fn();

    render(
      <AuthContext.Provider value={{ currentUser: { uid: 'admin', getIdToken: jest.fn().mockResolvedValue('token') } }}>
        <Dashboard showAlert={showAlert} />
      </AuthContext.Provider>
    );

    const updatedUser = {
      name: 'Alice Updated',
      email: 'alice@example.com',
      gender: 'female',
      age: 26,
      imageFile: null,
    };

    await firestoreService.updateUser('1', updatedUser);

    expect(showAlert).toHaveBeenCalledWith('success', 'User updated successfully!');
  });

  test('deletes a user', async () => {
    const showAlert = jest.fn();

    render(
      <AuthContext.Provider value={{ currentUser: { uid: 'admin', getIdToken: jest.fn().mockResolvedValue('token') } }}>
        <Dashboard showAlert={showAlert} />
      </AuthContext.Provider>
    );

    await firestoreService.deleteUser('1');

    expect(showAlert).toHaveBeenCalledWith('success', 'User deleted successfully!');
  });
});
