import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';

export default function UserTable({ users, onEdit, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 1, 
      borderRadius: 3,
      width: '100%'
    }}>
      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 3
      }}>
        <PeopleIcon color="primary" /> User Directory
      </Typography>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px', // Reduced padding
                fontSize: '0.875rem' // Smaller font size
              }}>ID</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Image</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Name</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Email</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Gender</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Age</TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                padding: '8px 16px',
                fontSize: '0.875rem'
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ padding: '8px 16px' }}>{user.id}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  {user.imageUrl ? (
                    <Avatar alt={user.name} src={user.imageUrl} />
                  ) : (
                    <Box sx={{ width: 40, height: 40, bgcolor: 'grey.300', borderRadius: '50%' }} />
                  )}
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.name}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.email}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.gender}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.age}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => onEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
