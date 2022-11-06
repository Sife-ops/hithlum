import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./hook/auth-context";
import { authExchange } from "@urql/exchange-auth";
import { authConfig } from "./auth-config";
import {
  Provider,
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange(authConfig),
    fetchExchange,
  ],
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
