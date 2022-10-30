import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <ul>
      {/* <button onClick={() => auth.signOut()}>sign out</button> */}
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
  );
};
