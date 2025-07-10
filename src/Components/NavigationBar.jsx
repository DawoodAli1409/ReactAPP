
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext'  // Remove .jsx extension
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';

function NavigationBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/ReactAPP/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/ReactAPP/')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate('/ReactAPP/login')}>
          Login
        </Button>
        <Button color="inherit" onClick={() => navigate('/ReactAPP/register')}>
          Register
        </Button>
        {currentUser && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
