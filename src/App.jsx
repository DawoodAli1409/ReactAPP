// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './Pages/DashBoard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CustomAlert from './Components/Alert/Alert';
import { Container } from '@mui/material';
import NavigationBar from './Components/NavigationBar';
import { useAuth } from './context/AuthContext';

function App() {
  const [alert, setAlert] = React.useState({ 
    open: false, 
    severity: 'info', 
    message: '' 
  });

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CustomAlert 
          open={alert.open} 
          severity={alert.severity} 
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
        <NavigationBar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/ReactAPP/" element={<Dashboard showAlert={showAlert} />} />
            <Route path="/ReactAPP/login" element={<Login showAlert={showAlert} />} />
            <Route path="/ReactAPP/register" element={<Register showAlert={showAlert} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/ReactAPP/login" />;
}

export default App;
