import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Global DNA
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import './translations/i18n';

// Components
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Valuation from './pages/Valuation';
import Auth from './pages/Auth'; // Handles both Login and Register
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';

/**
 * LAYOUT ENGINE
 * Handles conditional visibility of components like Navbar
 */
const AppContent = () => {
  const location = useLocation();
  
  // Define routes where the main Navbar should be hidden
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      {/* mode="wait" ensures page exits before the next one enters */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/valuation" element={<Valuation />} />
          
          {/* AUTHENTICATION (Unified Page) */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          
          {/* PROPERTY DISCOVERY */}
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          
          {/* SECURE USER DASHBOARD */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<div style={{padding:'200px 0', textAlign:'center'}}><h1>404 | Page Not Found</h1></div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Show cinematic splash for exactly 3 seconds
    const timer = setTimeout(() => setIsInitializing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        
        {isInitializing ? (
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