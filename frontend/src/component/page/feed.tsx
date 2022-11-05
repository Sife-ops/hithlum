import * as styleCommon from "../common.css";
import React from "react";
import defaultArtwork from "../../assets/default/artwork.svg";
import defaultAvatar from "../../assets/default/avatar.png";
import { Article } from "@hithlum/graphql/urql";
import { formatDistance } from "date-fns";
import { useFeed } from "./feed-hook";
import { useParams, Link } from "react-router-dom";

export const Feed = () => {
  const { feedId } = useParams();
  // todo: redirect if feedId undefined
  const page = useFeed(feedId!);

  if (page.feed) {
    const { feed } = page;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
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
          <h3>{feed.title || "untitled"}</h3>
          {feed.description && <div>Description: {feed.description}</div>}
          {feed.feedUrl && (
            <div>
              {/* todo: open in new tab */}
              Feed URL:{" "}
              <a href={feed.feedUrl} target="_blank">
                {feed.feedUrl}
              </a>
            </div>
          )}
          {feed.link && (
            <div>
              Link:{" "}
              <a href={feed.link} target="_blank">
                {feed.link}
              </a>
            </div>
          )}
          <button
            onClick={() => {
              const { feedId } = feed;
              if (feed.subscribed) page.unsubscribeMutation({ feedId });
              else page.subscribeMutation({ feedId });
            }}
          >
            {feed.subscribed ? "unsubscribe" : "subscribe"}
          </button>
        </div>
        <div>
          <h3>Added By</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={feed.addedByUser.avatarUrl || defaultAvatar}
              alt="avatar"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
              }}
            />
            <Link to={"/user/" + feed.addedByUser.userId}>
              {feed.addedByUser.username}
            </Link>
          </div>
        </div>
        <div>
          <h3>Articles</h3>
          <Articles articles={feed.articles || []} />
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

const Articles: React.FC<{ articles: Article[] }> = (p) => (
  <div className={styleCommon.list__container}>
    {p.articles.map((article) => {
      const unread = article.unread.value;
      return (
        <div
          key={article.articleId}
          className={
            unread
              ? styleCommon.list__item__unread
              : styleCommon.list__item__read
          }
        >
          <div>
            <Link to={"/article/" + article.articleId}>{article.title}</Link>
          </div>
          <div>{article.summary}</div>
          <div>
            {formatDistance(new Date(article.isoDate!), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      );
    })}
  </div>
);
