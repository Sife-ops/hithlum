import * as style from "./common.css";
import defaultAvatar from "../../assets/default/avatar.png";
import { Link } from "react-router-dom";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";
import { useFriendsQuery, useFriendQuery, User } from "@hithlum/graphql/urql";

const friends = graphql(`
  query friends {
    friends
  }
`);

const userPreviewFields = graphql(`
  fragment UserPreviewFields on User {
    userId
    username
    discriminator
    avatarUrl
  }
`);

const friend = graphql(`
  query friend($userId: String!) {
    user(userId: $userId) {
      ...UserPreviewFields
    }
  }
`);

export const Friends = () => {
  const [friends, setFriends] = useState<string[]>();
  const [friendsQueryState] = useFriendsQuery({
    requestPolicy: "network-only",
  });
  useEffect(() => {
    const { fetching, data } = friendsQueryState;
    if (!fetching && data) {
      setFriends(data.friends);
    }
  }, [friendsQueryState.data]);

  if (friends) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h1>Friends</h1>
        <div>
          <div className={style.list__container}>
            {friends.map((friend) => {
              console.log(friend);
              return <Friend friend={friend} key={friend} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

const Friend: React.FC<{ friend: string }> = (p) => {
  const [friend, setFriend] = useState<User>();
  const [friendQueryState] = useFriendQuery({
    variables: { userId: p.friend },
  });
  useEffect(() => {
    const { fetching, data } = friendQueryState;
    if (!fetching && data) {
      setFriend(data.user as User);
    }
  }, [friendQueryState.data]);

  if (friend) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img
          src={friend.avatarUrl || defaultAvatar}
          alt="avatar"
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "50%",
          }}
        />
        <h3>
          <Link to={"/user/" + friend.userId}>
            {friend.username}#{friend.discriminator}
          </Link>
        </h3>
      </div>
    );
  }

  return <div>loading...</div>;
};
