import "./App.css";
import { Auth } from "./component/page/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dev } from "./component/page/dev";
import { PrivateRoutes } from "./component/private-routes";
import { useAuthContext } from "./hook/auth-context";

function App() {
  const auth = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {/* <button onClick={() => auth.signOut()}>sign out</button> */}
              <PrivateRoutes errorTo="/error" />
            </div>
          }
        >
          <Route path="/dev" element={<Dev />} />
        </Route>
        <Route path="/auth" element={<Auth to="/dev" />} />
        <Route path="/error" element={<div>Error</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
