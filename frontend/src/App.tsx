import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import UserManagement from './components/Home/PageVolunteerAdopter';
import Adopciones from './components/Home/PageAdopcion';
import { useEffect, useState } from 'react';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { Box } from '@mantine/core';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ocupa todo el alto de la pantalla
      }}
    >
      <Router>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <Box style={{ flex: 1, padding: '20px' }}> 
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" />} />
            <Route path="/register" element={<Register />} />
            <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to= "/login" />} />
            <Route path='/volunteer' element={isAuthenticated ? <UserManagement userType="1" title="Gestión de Voluntarios" /> : <Navigate to= "/login" />} />
            <Route path='/adopter' element={isAuthenticated ? <UserManagement userType="2" title="Gestión de Adoptantes" /> : <Navigate to= "/login" />} />
            <Route path='/adopciones' element={isAuthenticated ? <Adopciones /> : <Navigate to= "/login" />} />
            <Route path='/' element={<Navigate to="/login" />} />
          </Routes>
        </Box>

        <Footer />
      </Router>
    </Box>
  );
}

export default App;
