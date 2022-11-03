import defaultAvatar from "../../assets/default/avatar.png";
import { Feed } from "../feed";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useUserQuery,
  User as UserType,
  useFollowMutation,
  useUnfollowMutation,
} from "@hithlum/graphql/urql";

const follow = graphql(`
  mutation follow($userId: String!) {
    follow(userId: $userId) {
      following
    }
  }
`);

const unfollow = graphql(`
  mutation unfollow($userId: String!) {
    unfollow(userId: $userId) {
      following
    }
  }
`);

const user = graphql(`
  query user($userId: String!) {
    user(userId: $userId) {
      userId
      username
      discriminator
      avatarUrl

      following

      feeds {
        ...FeedPreviewFields
      }
    }
  }
`);

export const User = () => {
  const { userId } = useParams();

  // todo: redirect if param undefined
  const [user, setUser] = useState<UserType>();
  const [userQueryState] = useUserQuery({ variables: { userId: userId! } });
  useEffect(() => {
    const { fetching, data } = userQueryState;
    if (!fetching && data) {
      setUser(data.user as UserType);
    }
  }, [userQueryState.data]);

  const [_, followMutation] = useFollowMutation();
  const [__, unfollowMutation] = useUnfollowMutation();

  if (user) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <img
          src={user.avatarUrl || defaultAvatar}
          alt="avatar"
          style={{
            width: "256px",
            height: "256px",
            borderRadius: "50%",
          }}
        />
        <div>
          <h3>
            {user.username}#{user.discriminator}
          </h3>
          <button
            onClick={() => {
              const { userId } = user;
              if (user.following) unfollowMutation({ userId });
              else followMutation({ userId });
            }}
          >
            {user.following ? "unfollow" : "follow"}
          </button>
        </div>
        <div>
          <h3>Subscriptions</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            {user.feeds.map((feed) => (
              <Feed
                feed={feed}
                article={feed.latestArticle}
                key={feed.feedId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};
