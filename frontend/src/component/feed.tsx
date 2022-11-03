import React from "react";
import defaultArtwork from "../assets/default/artwork.svg";
import {
  Article as ArticleType,
  Feed as FeedType,
} from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export const Feed: React.FC<{ feed: FeedType; article?: ArticleType }> = ({
  feed,
  article,
}) => (
  <div
    style={{
      border: `1px solid ${article?.unread.value ? "blue" : "purple"}`,
      display: "flex",
    }}
  >
    <img
      src={feed.image || defaultArtwork}
      alt="artwork"
      style={{
        width: "128px",
        height: "auto",
      }}
    />
    <div>
      <div>
        <Link to={"/feed/" + feed.feedId}>{feed.title}</Link>
      </div>
      {article && (
        <>
          <div>
            {article.title}{" "}
            <Link to={"/article/" + article.articleId}>Read...</Link>
          </div>
          {article.isoDate && (
            <div>
              {formatDistance(new Date(article.isoDate), new Date(), {
                addSuffix: true,
              })}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
