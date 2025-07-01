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
  Chip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <PeopleIcon color="primary" /> User Directory
      </Typography>
      <TableContainer>
        <Table>
          {/* Table content (keep your existing table structure) */}
        </Table>
      </TableContainer>
    </Paper>
  );
}