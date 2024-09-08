import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import Header from './components/Home/Header';


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
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to= "/login" />} />
        <Route path='/' element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
