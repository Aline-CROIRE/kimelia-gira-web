import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100vw;
    overflow-x: hidden;
    background-color: #F1F5F9; /* Base slate background */
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #0F172A;
  }

  /* Headings: Space Grotesk */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.04em;
    font-weight: 700;
  }

  /* Global Interactive Typography */
  a, button, select, input {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }
`;