import React from 'react';
import { Grid } from '@mui/material';
import UserForm from '../Components/UserForm/UserForm';
import UserTable from '../Components/UserTable/UserTable';

export default function Dashboard({ users, onEdit, onDelete, onSubmit, editUser }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <UserForm onSubmit={onSubmit} editUser={editUser} />
      </Grid>
      <Grid item xs={12} md={7}>
        <UserTable 
          users={users} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </Grid>
    </Grid>
  );
}