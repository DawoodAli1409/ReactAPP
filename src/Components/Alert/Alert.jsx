import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Create the Alert component using forwardRef
const AlertComponent = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Main Alert wrapper component
export default function CustomAlert({ open, severity, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <AlertComponent 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        {message}
      </AlertComponent>
    </Snackbar>
  );
}