import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import pwdsReducer from "../store/pwds-slice";
import { InitialState } from "../store/interfaces";

export function createTestStore(preloadedState?: Partial<InitialState>) {
  return configureStore({
    reducer: { pwds: pwdsReducer },
    preloadedState: preloadedState
      ? {
          pwds: {
            component: "generator",
            history: false,
            pwds: [],
            ...preloadedState,
          },
        }
      : undefined,
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: { preloadedState?: Partial<InitialState> } & Omit<
    RenderOptions,
    "wrapper"
  > = {}
) {
  const store = createTestStore(preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
