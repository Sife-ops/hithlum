import * as styleFriend from "./friend.css";
import defaultAvatar from "../assets/default/avatar.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFriendQuery, User } from "@hithlum/graphql/urql";

export const FriendQuery: React.FC<{ userId: string }> = (p) => {
  const [friend, setFriend] = useState<User>();
  const [friendQueryState] = useFriendQuery({
    variables: { userId: p.userId },
  });

  useEffect(() => {
    const { fetching, data } = friendQueryState;
    if (!fetching && data) {
      setFriend(data.user as User);
    }
  }, [friendQueryState.data]);

  if (friend) {
    return <Friend friend={friend} />;
  }

  // todo: skeleton
  return null;
};

export const Friend: React.FC<{ friend: User }> = ({ friend }) => (
  <div className={styleFriend.container}>
    <img
      src={friend.avatarUrl || defaultAvatar}
      alt="avatar"
      className={styleFriend.avatar}
    />
    <Link to={"/user/" + friend.userId}>
      {friend.username}#{friend.discriminator}
    </Link>
  </div>
);
