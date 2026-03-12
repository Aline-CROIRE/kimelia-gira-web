import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #F1F5F9; /* Matte Slate - Mid-range brightness */
    color: #0F172A;
    overflow-x: hidden;
    width: 100vw;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.03em; /* Sharp, geometric spacing */
    font-weight: 700;
  }

  button, select, input {
    font-family: 'Inter', sans-serif;
  }

  /* Target specific UI labels to use Space Grotesk for a tech look */
  .tech-label {
    font-family: 'Space Grotesk', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;