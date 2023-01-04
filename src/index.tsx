import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./router";
import { ThemeProvider } from "@emotion/react";
import { TemaPadrao } from "./themes/temaPadrao";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={TemaPadrao}>
    <AppRoutes />
  </ThemeProvider>
);
