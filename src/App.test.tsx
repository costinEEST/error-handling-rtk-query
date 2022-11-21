import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { render, screen } from "@testing-library/react";

import App from "./App";

import { api } from "./api";

test("renders submit button", () => {
  render(
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  );

  const button = screen.getByRole("button", {
    name: /send/i,
  });
  expect(button).toBeInTheDocument();
});
