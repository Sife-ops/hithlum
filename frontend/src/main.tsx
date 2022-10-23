import React from "react";
import { Provider, createClient } from "urql";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./hook/auth-context";
import App from "./App";
import "./index.css";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
  fetchOptions: () => {
    const accessToken = localStorage.getItem("accessToken") || "";
    return {
      headers: {
        authorization: accessToken,
      },
    };
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);
