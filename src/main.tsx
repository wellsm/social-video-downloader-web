import "@/app/css/globals.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import "@/app/languages/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
