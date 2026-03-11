import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #F8FAFC;
    color: #0F172A;
    overflow-x: hidden; /* Fixes the white bar on the right */
    width: 100vw;
  }

  h1, h2, h3 {
    font-family: 'Poppins', sans-serif;
    letter-spacing: -1px; /* Modern architectural feel */
  }

  button {
    cursor: pointer;
    border: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;