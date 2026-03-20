import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Global Configuration
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import './translations/i18n';

// Core UI Components
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Page Components
import Home from './pages/Home';
import Valuation from './pages/Valuation';
import Auth from './pages/Auth'; 
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import AdminDashboard from './pages/AdminDashboard';

/**
 * APP CONTENT WRAPPER
 * Controls the visibility of global UI elements like the Navbar.
 */
const AppContent = () => {
  const location = useLocation();
  
  // High-End Logic: Hide Navbar on Auth pages (Login/Register) for maximum focus
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Show Navbar only if we are not on an Auth page */}
      {!isAuthPage && <Navbar />}
      
      {/* AnimatePresence allows for cinematic page-to-page fade transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Discovery Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/valuation" element={<Valuation />} />
          
          {/* Unified Authentication (Login & Register) */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          
          {/* Secure User Portfolio Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/list-property" 
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            } 
          />

          {/* Secure Admin Control Center */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Global 404 Fallback */}
          <Route path="*" element={
            <div style={{ padding: '200px 8%', textAlign: 'center', background: '#F1F5F9', minHeight: '100vh' }}>
              <h1 style={{ fontFamily: 'Space Grotesk', color: '#1F3A93', fontSize: '3rem' }}>404</h1>
              <p style={{ color: '#64748B', fontWeight: 600 }}>The sanctuary you are looking for does not exist.</p>
              <a href="/" style={{ color: '#3B5BDB', fontWeight: 800, marginTop: '20px', display: 'inline-block' }}>RETURN HOME</a>
            </div>
          } />
          
        </Routes>
      </AnimatePresence>
    </>
  );
};

/**
 * MAIN APP ENTRY POINT
 */
function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Show cinematic splash for exactly 3 seconds to establish the elite brand
    const timer = setTimeout(() => setIsInitializing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* Inject Master CSS Reset and Pro Typography */}
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