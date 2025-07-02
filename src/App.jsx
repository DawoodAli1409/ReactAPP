import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Alert from '@/Components/Alert/Alert';
import Dashboard from './Pages/DashBoard';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'male', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'female', age: 25 }
  ]);
  const [editUser, setEditUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Handle initial load for both with and without trailing slash
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      navigate('/', { replace: true });
    }
  }, [navigate, location]);

  const showAlert = (severity, message, redirectTo) => {
    setAlert({
      open: true,
      severity,
      message
    });
    if (redirectTo) {
      setTimeout(() => navigate(redirectTo), 2000);
    }
  };

  const handleSubmit = (data) => {
    if (editUser) {
      setUsers(users.map(user => user.id === editUser.id ? { ...data, id: user.id } : user));
      showAlert('success', 'User updated successfully!');
    } else {
      setUsers([...users, { ...data, id: users.length + 1 }]);
      showAlert('success', 'User added successfully!');
    }
    setEditUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    showAlert('success', 'User deleted successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Navigation Links */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        mb: 3,
        '& a': {
          textDecoration: 'none',
          color: 'primary.main',
          fontWeight: 'medium',
          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }}>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Box>

      {/* Global Alert */}
      <Alert 
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={() => setAlert({...alert, open: false})}
      />

      <Routes>
        <Route path="/" element={
          <Dashboard
            users={users}
            onEdit={setEditUser}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
            editUser={editUser}
          />
        } />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/register" element={<Register showAlert={showAlert} />} />
      </Routes>
    </div>
  );
}

export default App;