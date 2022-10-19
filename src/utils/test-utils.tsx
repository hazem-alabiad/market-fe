import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { afterEach } from "vitest";

import { AppStore, RootState } from "../redux/store";
import { serverApi } from "../services/serverApi";
import { theme } from "../theme/theme";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

afterEach(() => {
  cleanup();
});

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // @ts-ignore
    preloadedState = {},
    // automatically create a store instance if no store was passed in
    // @ts-ignore
    store = configureStore({
      reducer: {
        [serverApi.reducerPath]: serverApi.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </IntlProvider>
  );

  // return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
