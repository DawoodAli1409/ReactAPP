import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';

export default function UserTable({ users, onEdit, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2, fontWeight: 600 }}>
        User Records
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(user)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}