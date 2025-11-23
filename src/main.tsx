import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SearchProvider } from "./contexts/SearchContext";

const helmetContext = {};
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <LanguageProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>
);
