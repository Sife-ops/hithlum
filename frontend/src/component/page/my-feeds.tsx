import React from "react";
import { Feed as FeedType } from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useUserContext } from "../../hook/user-context";

export const MyFeeds = () => {
  const ctx = useUserContext();

  return (
    <div>
      <h1>My Feeds</h1>
      <h2>Add Feed</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ctx.addFeed();
        }}
      >
        <input
          value={ctx.newFeedUrl}
          onChange={(e) => ctx.setNewFeedUrl(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={async () => ctx.updateFeeds()}>update feeds</button>
        {ctx.updatingFeed && <div>{ctx.updatingFeed}</div>}
      </div>
      <h2>Feeds</h2>
      <Feeds feeds={ctx.myFeeds} />
    </div>
  );
};

export const Feeds: React.FC<{ feeds: FeedType[] | undefined }> = (p) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
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
      <div>
        <Link to={"/feed/" + p.feed.feedId}>{p.feed.title}</Link>
      </div>
      {p.feed.description && <div>{p.feed.description}</div>}
      <div>
        <div>
          {firstArticle.title}{" "}
          <Link to={"/article/" + firstArticle.articleId}>Read...</Link>
        </div>
        <div>
          {formatDistance(new Date(firstArticle.isoDate!), new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};
