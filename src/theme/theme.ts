import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* max(MIN, min(VAL, MAX)) */
    /* font-size: clamp(1rem, 2vw, 3rem); */
  }
  
  html {
      box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 20px;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
  }
`;

export const theme: DefaultTheme = {
  brand: {
    primary: {
      text: "#525252",
      background: "#fff",
    },
    secondary: {
      text: "#1EA4CE",
      background: "#fff",
    },
    accent: {
      text: "#fff",
      background: "#1EA4CE",
    },
  },
};
