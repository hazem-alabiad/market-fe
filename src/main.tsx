import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import { App } from "./components/App";
import { persistor, store } from "./redux/store";
import { GlobalStyle, theme } from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <IntlProvider locale="en">
            <GlobalStyle />
            <App />
          </IntlProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
