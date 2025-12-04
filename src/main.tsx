import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
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
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
