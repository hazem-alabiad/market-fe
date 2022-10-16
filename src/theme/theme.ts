import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
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
    background-color: ${({ theme }) => theme.colors.gray90};
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

  colors: {
    gray90: "#F7F6F9",
    blueGray: "#697488",
  },

  text: {
    h1: {
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "26px",
    },
  },

  letterSpacing: {
    "0.25": {
      letterSpacing: "0.25px",
    },
  },
};
