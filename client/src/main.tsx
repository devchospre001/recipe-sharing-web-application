import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./context/theme-provider.tsx";
import Router from "./routes/routes-config.tsx";
import AuthContextProvider from "./context/auth-provider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
