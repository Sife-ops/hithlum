import "./App.css";
import { Auth } from "./component/page/auth";
import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
              <ul>
                <li>
                  <Link to={"/dev"}>Dev</Link>
                </li>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li>
                  <Link to={"/my-feeds"}>My Feeds</Link>
                </li>
                <li>
                  <Link to={"/friends"}>Friends</Link>
                </li>
              </ul>
              <PrivateRoutes errorTo="/error" />
            </div>
          }
        >
          <Route path="/dev" element={<Dev />} />
          <Route path="/home" element={<div>home</div>} />
          <Route path="/my-feeds" element={<div>my-feeds</div>} />
          <Route path="/friends" element={<div>friends</div>} />
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
