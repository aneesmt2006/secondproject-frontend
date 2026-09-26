import { StrictMode } from "react";
import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true })
}

import App from "./App.tsx";
import "./index.css";
import "./theme/patient.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
const google_ID = import.meta.env.VITE_API_URL_GOOGLE_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={google_ID}>
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
