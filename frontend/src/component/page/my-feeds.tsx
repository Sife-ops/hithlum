import React from "react";
import { Feed as FeedType, useAddFeedMutation } from "@hithlum/graphql/urql";
import { graphql } from "@hithlum/graphql/gql";
import { useState } from "react";
import { useUserContext } from "../../hook/user-context";
import { Link } from "react-router-dom";

export const MyFeeds = () => {
  const [feedUrl, setFeedUrl] = useState("");
  const [_, addFeed] = useAddFeedMutation();
  const { myFeeds } = useUserContext();

  return (
    <div>
      <h1>My Feeds</h1>
      <h2>Add Feed</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFeed({ url: feedUrl }).then((e) => {
            console.log("error", e.error);
          });
        }}
      >
        <input value={feedUrl} onChange={(e) => setFeedUrl(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <h2>Feeds</h2>
      <MyFeedsList feeds={myFeeds} />
    </div>
  );
};

export const MyFeedsList: React.FC<{ feeds: FeedType[] | undefined }> = (p) => {
  return (
    <div>
      {p.feeds?.map((feed) => (
        <Feed feed={feed} key={feed.feedId} />
      ))}
    </div>
  );
};

export const Feed: React.FC<{ feed: FeedType }> = (p) => {
  const firstArticle = p.feed.articles[0];
  return (
    <div>
      <div>{p.feed.title}</div>
      {p.feed.description && <div>{p.feed.description}</div>}
      <div>
        <div>{firstArticle.title}</div>
        <div>{firstArticle.isoDate}</div>
      </div>
      <Link to={"/feed/" + p.feed.feedId}>more...</Link>
    </div>
  );
};

const addFeed = graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
    }
  }
`);
