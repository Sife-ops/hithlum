import React from "react";
import defaultArtwork from "../../assets/default/artwork.svg";
import { formatDistance } from "date-fns";
import { useFeed } from "./feed-hook";
import { useParams, Link } from "react-router-dom";
import { Article } from "@hithlum/graphql/urql";

export const Feed = () => {
  const { feedId } = useParams();
  // todo: redirect if feedId undefined
  const ctx = useFeed(feedId!);

  if (ctx.feed) {
    const { feed } = ctx;

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
          alt="missing imageUrl"
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
              if (feed.subscribed) ctx.unsubscribeMutation({ feedId });
              else ctx.subscribeMutation({ feedId });
            }}
          >
            {feed.subscribed ? "unsubscribe" : "subscribe"}
          </button>
        </div>
        <div>
          <h3>Articles</h3>
          <Articles articles={feed.articles} />
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

const Articles: React.FC<{ articles: Article[] }> = (p) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}
  >
    {p.articles.map((article) => {
      const color = article.unread.value ? "blue" : "purple";
      return (
        <div
          key={article.articleId}
          style={{
            border: `1px solid ${color}`,
          }}
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
