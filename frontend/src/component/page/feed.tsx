import * as style from "../common.css";
import React, { useState } from "react";
import defaultArtwork from "../../assets/default/artwork.svg";
import defaultAvatar from "../../assets/default/avatar.png";
import { Article, useChangeArtworkMutation } from "@hithlum/graphql/urql";
import { formatDistance } from "date-fns";
import { graphql } from "@hithlum/graphql/gql";
import { useFeed } from "./feed-hook";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../../hook/user-context";

export const Feed = () => {
  const { feedId } = useParams();
  const { self } = useUserContext();
  const [artwork, setArtwork] = useState("");
  const [_, changeArtworkMutation] = useChangeArtworkMutation();
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
        {self?.roles.includes("change-artwork") && (
          <div>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files !== null) {
                  const file = files[0];
                  // setSize(file.size);
                  let reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.onload = () => {
                    const { result } = reader;
                    if (result && typeof result === "string") {
                      setArtwork(result);
                    }
                  };

                  reader.onerror = (error) => {
                    console.log("Error: ", error);
                  };
                }
              }}
            />
            <button
              onClick={() => {
                if (artwork) {
                  changeArtworkMutation({ artwork, feedId: feed.feedId });
                }
              }}
            >
              change artwork
            </button>
          </div>
        )}
        <div>
          <h3>{feed.title || "untitled"}</h3>
          {feed.description && <div>Description: {feed.description}</div>}
          {feed.feedUrl && (
            <div>
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
          <div className={style.list__container}>
            {feed.articles.map((article) => (
              <ArticlePreview article={article} key={article.articleId} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

const ArticlePreview: React.FC<{ article: Article }> = ({ article }) => {
  const unread = article.unread.value;
  return (
    <div
      key={article.articleId}
      className={
        unread //
          ? style.list__item__unread
          : style.list__item__read
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
};

graphql(`
  mutation changeArtwork($feedId: String!, $artwork: String!) {
    changeArtwork(feedId: $feedId, artwork: $artwork)
  }
`);
