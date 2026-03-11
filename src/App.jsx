import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Theme & Global Styles
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';

// Context & Translations
import { AuthProvider } from './context/AuthContext';
import './translations/i18n';

// Layout Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Valuation from './pages/Valuation';

/**
 * PLACEHOLDER COMPONENTS 
 * These will be replaced with full files in the next steps
 */
const Properties = () => (
  <div style={{ padding: '150px 8%', textAlign: 'center' }}>
    <h1 style={{ color: '#1F3A93', fontSize: '3rem' }}>Property Listings</h1>
    <p style={{ color: '#64748B', marginTop: '20px' }}>Explore the finest real estate in Rwanda.</p>
  </div>
);

const Login = () => (
  <div style={{ padding: '150px 8%', textAlign: 'center' }}>
    <h1 style={{ color: '#1F3A93', fontSize: '3rem' }}>Sign In</h1>
    <p style={{ color: '#64748B', marginTop: '20px' }}>Access your Kimelia Gira account.</p>
  </div>
);

const Register = () => (
  <div style={{ padding: '150px 8%', textAlign: 'center' }}>
    <h1 style={{ color: '#1F3A93', fontSize: '3rem' }}>Create Account</h1>
    <p style={{ color: '#64748B', marginTop: '20px' }}>Join the elite PropTech community in Rwanda.</p>
  </div>
);

const Dashboard = () => (
  <div style={{ padding: '150px 8%', textAlign: 'center' }}>
    <h1 style={{ color: '#1F3A93', fontSize: '3rem' }}>User Dashboard</h1>
    <p style={{ color: '#64748B', marginTop: '20px' }}>Manage your properties and inquiries.</p>
  </div>
);

/**
 * MAIN APP COMPONENT
 */
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* Reset CSS and apply global brand typography */}
        <GlobalStyle />
        
        <Router>
          {/* Navbar stays at the top of every page */}
          <Navbar />
          
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* AI Features */}
            <Route path="/valuation" element={<Valuation />} />
            
            {/* Property Discovery */}
            <Route path="/properties" element={<Properties />} />
            
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes (We will add the 'protect' logic soon) */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Fallback for 404 */}
            <Route path="*" element={
              <div style={{ padding: '200px 0', textAlign: 'center' }}>
                <h1>404 - Page Not Found</h1>
                <a href="/" style={{ color: '#FFD700', fontWeight: 'bold' }}>Return Home</a>
              </div>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;