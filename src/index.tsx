import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { api } from "./api";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
