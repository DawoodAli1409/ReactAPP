import React, { useState } from 'react';
import { Container } from '@mui/material';
import UserForm from './Components/UserForm/UserForm';
import UserTable from './Components/UserTable/UserTable';

export default function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dawood Ali Khan',
      email: 'alidawood1409@gmail.com',
      password: 'Password123', // Added password field
      gender: 'Male',
      age: 4
    }
  ]);
  const [editUser, setEditUser] = useState(null);

  const handleSubmit = (userData) => {
    if (editUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editUser.id ? { ...userData, id: user.id } : user
      ));
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newUser]);
    }
    setEditUser(null); // Reset edit mode after submission
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <UserForm 
        onSubmit={handleSubmit} 
        editUser={editUser} 
        key={editUser ? editUser.id : 'create'} // Important for resetting form
      />
      <UserTable 
        users={users} 
        onEdit={setEditUser} 
        onDelete={handleDelete} 
      />
    </Container>
  );
}