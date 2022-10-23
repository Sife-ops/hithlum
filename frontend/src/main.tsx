import React from "react";
import { Provider, createClient } from "urql";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <App />
  </Provider>
  // </React.StrictMode>
);
