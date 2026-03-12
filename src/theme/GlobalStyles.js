import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #F8FAFC;
    color: #1A1A1A;
    overflow-x: hidden; /* Prevents horizontal scrolling */
    width: 100vw;
  }

  /* Smooth scrolling for the whole page */
  html {
    scroll-behavior: smooth;
  }
`;