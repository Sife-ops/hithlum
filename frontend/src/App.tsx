// import "./App.css";
// import { useAuthContext } from "./hook/auth-context";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./hook/user-context";

import { Article } from "./component/page/article";
import { Auth } from "./component/page/auth";
import { Dev } from "./component/page/dev";
import { Feed } from "./component/page/feed";
import { Home } from "./component/page/home";
import { MyFeeds } from "./component/page/my-feeds";
import { Navigation } from "./component/navigation";
import { PrivateRoutes } from "./component/private-routes";

function App() {
  // const auth = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <UserContextProvider>
                <Navigation />
                <PrivateRoutes errorTo="/error" />
              </UserContextProvider>
            </div>
          }
        >
          <Route path="/dev" element={<Dev />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-feeds" element={<MyFeeds />} />
          <Route path="/friends" element={<div>friends</div>} />
          <Route path="/feed/:feedId" element={<Feed />} />
          <Route path="/article/:articleId" element={<Article />} />
        </Route>
        <Route path="/auth" element={<Auth to="/home" />} />
        <Route path="/error" element={<div>Error</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
