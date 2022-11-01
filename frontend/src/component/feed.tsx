import React from "react";
import {
  Article as ArticleType,
  Feed as FeedType,
} from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export const Feed: React.FC<{ feed: FeedType; article: ArticleType }> = ({
  feed,
  article,
}) => (
  <div
    key={feed.feedId}
    style={{
      border: `1px solid ${article.unread.value ? "blue" : "purple"}`,
    }}
  >
    <div>
      <Link to={"/feed/" + feed.feedId}>{feed.title}</Link>
    </div>
    <div>
      <div>
        {article.title}{" "}
        <Link to={"/article/" + article.articleId}>Read...</Link>
      </div>
      <div>
        {formatDistance(new Date(article.isoDate!), new Date(), {
          addSuffix: true,
        })}
      </div>
    </div>
  </div>
);
