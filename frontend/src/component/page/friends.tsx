import * as styleCommon from "../common.css";
import { FriendQuery } from "../friend";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";
import { useFriendsQuery } from "@hithlum/graphql/urql";

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
          <div className={styleCommon.list__container}>
            {friends.map((userId) => (
              <FriendQuery userId={userId} key={userId} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // todo: skeleton
  return null;
};

graphql(`
  query friends {
    friends
  }
`);

graphql(`
  query friend($userId: String!) {
    user(userId: $userId) {
      ...UserPreviewFields
    }
  }
`);
