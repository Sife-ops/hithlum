import "./navigation.css";
import defaultAvatar from "../assets/default/avatar.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hook/user-context";

export const Navigation = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          gap: "2rem",
          paddingLeft: 0,
        }}
      >
        {/* <button onClick={() => auth.signOut()}>sign out</button> */}
        {import.meta.env.MODE === "local" && (
          <li>
            <Link to={"/dev"}>Dev</Link>
          </li>
        )}
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
      <Self />
    </div>
  );
};

const Self = () => {
  const { self } = useUserContext();

  if (self) {
    return (
      <div className="dropdown">
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
