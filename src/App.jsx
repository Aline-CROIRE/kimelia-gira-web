import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import './translations/i18n';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Valuation from './pages/Valuation';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/valuation" element={<Valuation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<div style={{padding:'150px 8%'}}><h1>Listings coming soon</h1></div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;