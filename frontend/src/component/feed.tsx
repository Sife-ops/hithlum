import React from "react";
import { Feed as FeedType } from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export const Feed: React.FC<{ feed: FeedType }> = ({ feed }) => (
  <div
    key={feed.feedId}
    style={{
      border: `1px solid ${
        feed.latestArticle.unread.value ? "blue" : "purple"
      }`,
    }}
  >
    <div>
      <Link to={"/feed/" + feed.feedId}>{feed.title}</Link>
    </div>
    <div>
      <div>
        {feed.latestArticle.title}{" "}
        <Link to={"/article/" + feed.latestArticle.articleId}>Read...</Link>
      </div>
      <div>
        {formatDistance(new Date(feed.latestArticle.isoDate!), new Date(), {
          addSuffix: true,
        })}
      </div>
    </div>
  </div>
);
