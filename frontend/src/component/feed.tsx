import React from "react";
import defaultArtwork from "../assets/default/artwork.svg";
import {
  Article as ArticleType,
  Feed as FeedType,
} from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import * as style from "./feed.css";

export const Feed: React.FC<{ feed: FeedType; article?: ArticleType }> = ({
  feed,
  article,
}) => {
  return (
    <div
      className={
        article?.unread.value
          ? style.feedPreview__container__unread
          : style.feedPreview__container__read
      }
    >
      <img
        src={feed.image || defaultArtwork}
        alt="artwork"
        className={style.feedPreview__artwork}
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
};
