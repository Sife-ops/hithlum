import "./navigation.css";
import defaultAvatar from "../assets/default/avatar.png";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import { useUserContext } from "../hook/user-context";

export const Navigation = () => {
  const { setShowMenu, showMenu } = useUserContext();
  const [isDesktop] = useMediaQuery("(min-width: 481px)");

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        left: "0",
        right: "0",
        backgroundColor: "rgba(32, 178, 171, 0.76)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "48px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            paddingLeft: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            src={logo}
            style={{
              width: "32px",
              height: "32px",
            }}
            onClick={() => {
              if (!isDesktop) setShowMenu((s) => !s);
            }}
          />
          {isDesktop && (
            <ul
              style={{
                display: "flex",
                listStyleType: "none",
                gap: "2rem",
                paddingLeft: "1rem",
              }}
            >
              {/* <button onClick={() => auth.signOut()}>sign out</button> */}
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
          )}
        </div>
        <Self />
      </div>
      {showMenu && !isDesktop && (
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyleType: "none",
            paddingLeft: "1rem",
            margin: "0",
            height: "48px",
            alignItems: "center",
          }}
        >
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
      )}
    </div>
  );
};

const Self = () => {
  const { self } = useUserContext();

  if (self) {
    return (
      <div
        className="dropdown"
        style={{
          paddingRight: "1rem",
        }}
      >
        {/* <button class="dropbtn">Dropdown</button> */}
        <img
          // className="dropbtn"
          src={self.avatarUrl || defaultAvatar}
          alt="avatar"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
          }}
        />
        <div className="dropdown-content">
          {/* todo: variable url */}
          <a href="https://registrar-preprod.goettsch.xyz/sign-in?serviceId=account">
            Account
          </a>
          <a href="#">Settings</a>
          <a href="https://registrar-preprod.goettsch.xyz/sign-in?serviceId=feedshare">
            Sign Out
          </a>
        </div>
      </div>
    );
  }

  return null;
};
