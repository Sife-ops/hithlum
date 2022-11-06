import "./navigation.css";
import defaultAvatar from "../assets/default/avatar.png";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useUserContext } from "../hook/user-context";

export const Navigation = () => {
  const { setShowMenu, showMenu, self, setShowUserMenu, showUserMenu } =
    useUserContext();

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
              setShowMenu();
            }}
          />
        </div>
        {self && (
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
              onClick={() => {
                setShowUserMenu();
              }}
            />
          </div>
        )}
      </div>
      {showMenu && (
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
      {showUserMenu && (
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyleType: "none",
            paddingRight: "1rem",
            margin: "0",
            height: "48px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <li>
            <a
              href={
                import.meta.env.VITE_REGISTRAR_URL +
                "/sign-in?serviceId=account"
              }
            >
              Account
            </a>
          </li>
          {/* <li>
            <a href="#">Settings</a>
          </li> */}
          <li>
            <a
              href={
                import.meta.env.VITE_REGISTRAR_URL +
                "/sign-in?serviceId=feedshare"
              }
            >
              Sign Out
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};
