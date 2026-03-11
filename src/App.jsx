import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/Theme';
import { GlobalStyle } from './theme/GlobalStyles';
import './translations/i18n';

// Simple Page Components for testing
const Home = () => <h1>Home Page - Welcome to Kimelia Gira</h1>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;