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
// Dummy Pages for testing

const Login = () => <div style={{padding: '50px'}}><h1>Login Page</h1></div>;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;