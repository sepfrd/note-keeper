import { AuthProvider } from "@/providers/AuthProvider.tsx";
import { LoadingProvider } from "@/providers/LoadingProvider.tsx";
import { ToastProvider } from "@/providers/ToastProvider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
);
