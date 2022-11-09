import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./hook/user-context";
import { useUserContext } from "./hook/user-context";

import { AddFeed } from "./component/page/add-feed";
import { Article } from "./component/page/article";
import { Auth } from "./component/page/auth";
import { Dev } from "./component/page/dev";
import { Feed } from "./component/page/feed";
import { Friends } from "./component/page/friends";
import { Home } from "./component/page/home";
import { MyFeeds } from "./component/page/my-feeds";
import { Navigation } from "./component/navigation";
import { PrivateRoutes } from "./component/private-routes";
import { User } from "./component/page/user";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserContextProvider>
              <Navigation />
              <Spacer />
              <PrivateRoutes />
            </UserContextProvider>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/my-feeds" element={<MyFeeds />} />
          <Route path="/add-feed" element={<AddFeed />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/feed/:feedId" element={<Feed />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
        {import.meta.env.DEV && <Route path="/dev" element={<Dev />} />}
        <Route path="/auth" element={<Auth to="/home" />} />
        <Route path="/error" element={<div>404</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

const Spacer = () => {
  const { showMenu, showUserMenu } = useUserContext();

  return (
    <div
      style={
        showMenu || showUserMenu
          ? {
              height: "112px",
            }
          : {
              height: "64px",
            }
      }
    />
  );
};
