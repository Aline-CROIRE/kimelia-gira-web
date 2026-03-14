import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Theme & Global Setup
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import './translations/i18n';

// Core Components
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Valuation from './pages/Valuation';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';

/**
 * LAYOUT WRAPPER
 * Controls visibility of Global Elements (Navbar)
 */
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* AnimatePresence allows for smooth page transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          
          {/* SECURE DASHBOARD ROUTE */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<div style={{padding:'200px 0', textAlign:'center'}}><h1>404 Not Found</h1></div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the masterpiece splash for 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {loading ? (
          <SplashScreen />
        ) : (
          <Router>
            <AppContent />
          </Router>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;