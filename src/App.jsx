import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Fixed import path
import Dashboard from './Pages/DashBoard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CustomAlert from './Components/Alert/Alert';
import { Container } from '@mui/material';
import NavigationBar from './Components/NavigationBar';  // Ensure correct path

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
      <BrowserRouter>
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
            
            {/* Protected Routes (Example) */}
          
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ProtectedRoute component (define if needed)
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();  // Ensure useAuth is imported from correct path
  return currentUser ? children : <Navigate to="/ReactAPP/login" />;
}

export default App;