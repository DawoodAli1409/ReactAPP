import React, { useState } from 'react';
import { Grid, CssBaseline } from '@mui/material';
import Alert from './Components/Alert/Alert.jsx';
import UserForm from "./Components/UserForm/UserForm.jsx";
import UserTable from "./Components/UserTable/UserTable.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: ''
  });

  const handleSubmit = (data) => {
    if (editUser) {
      setUsers(users.map(user => user.id === editUser.id ? { ...data, id: user.id } : user));
      setAlert({ open: true, severity: 'success', message: 'User updated successfully!' });
    } else {
      setUsers([...users, { ...data, id: users.length + 1 }]);
      setAlert({ open: true, severity: 'success', message: 'User added successfully!' });
    }
    setEditUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setAlert({ open: true, severity: 'success', message: 'User deleted successfully!' });
  };

  return (
    <>
      <CssBaseline />
      <Grid container spacing={3} sx={{ p: 3, maxWidth: 1400, margin: '0 auto' }}>
        <Grid item xs={12} md={6}>
          <UserForm onSubmit={handleSubmit} editUser={editUser} />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserTable users={users} onEdit={setEditUser} onDelete={handleDelete} />
        </Grid>
      </Grid>
      <Alert 
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={() => setAlert({...alert, open: false})}
      />
    </>
  );
}

export default App;