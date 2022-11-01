import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
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
  );
};
