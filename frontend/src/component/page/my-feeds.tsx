import React from "react";
import { Feed as FeedType } from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useMyFeedsHook } from "./my-feeds-hook";

export const MyFeeds = () => {
  const myFeeds = useMyFeedsHook();

  return (
    <div>
      <h1>My Feeds</h1>
      <h2>Add Feed</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          myFeeds.addFeed();
        }}
      >
        <input
          value={myFeeds.newFeedUrl}
          onChange={(e) => myFeeds.setNewFeedUrl(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={async () => myFeeds.updateFeeds()}>
          update feeds
        </button>
        {myFeeds.updatingFeed && <div>{myFeeds.updatingFeed}</div>}
      </div>
      <h2>Feeds</h2>
      <Feeds feeds={myFeeds.myFeeds} />
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
      {p.feeds?.map(({ latestArticle, feedId, title }) => (
        <div>
          <div>
            <Link to={"/feed/" + feedId}>{title}</Link>
          </div>
          <div>
            <div>{latestArticle.title}</div>
            {latestArticle.summary && <div>{latestArticle.summary}</div>}
            <Link to={"/article/" + latestArticle.articleId}>Read...</Link>
            <div>
              {formatDistance(new Date(latestArticle.isoDate!), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
