import * as styleCommon from "../common.css";
import * as styleFeed from "./feed.css";
import React, { useState } from "react";
import defaultArtwork from "../../assets/default/artwork.svg";
import {
  Feed as FeedType,
  useChangeArtworkMutation,
} from "@hithlum/graphql/urql";
import { graphql } from "@hithlum/graphql/gql";
import { useFeed } from "./feed-hook";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../../hook/user-context";
import { ArticlePreview } from "../article-preview";
import { Friend } from "../friend";

export const Feed = () => {
  // todo: redirect if feedId undefined
  const { feedId } = useParams();
  const page = useFeed(feedId!);

  if (!page.feed) {
    return <FeedSkeleton />;
  }

  const { feed } = page;
  return (
    <div className={styleCommon.page}>
      <ChangeArtwork feed={feed} />
      <div className={styleFeed.feed__details__container}>
        <img
          src={feed.image || defaultArtwork}
          alt="artwork"
          className={styleFeed.feed__details__artwork}
        />
        <div style={{ flexGrow: "1" }}>
          <h3>{feed.title || "Untitled"}</h3>
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
          <Friend friend={feed.addedByUser} />
        </div>
      </div>

      <div>
        <h3>Articles</h3>
        <div className={styleCommon.list__container}>
          {feed.articles.map((article) => (
            <ArticlePreview article={article} key={article.articleId} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeedSkeleton = () => (
  <div className={styleCommon.page}>
    <div className={styleFeed.feed__details__container}>
      <div
        className={styleFeed.feed__details__artwork}
        style={{
          backgroundColor: "lightgray",
        }}
      />
      <div style={{ flexGrow: "1" }}>
        <div
          style={{
            marginBottom: ".5rem",
            backgroundColor: "lightgray",
            height: "1rem",
          }}
        />
        <div
          style={{
            backgroundColor: "lightgray",
            height: "1rem",
          }}
        />
        <div
          style={{
            marginTop: ".5rem",
            backgroundColor: "lightgray",
            height: "1rem",
          }}
        />
      </div>
    </div>

    <div>
      <h3>Articles</h3>
      <div className={styleCommon.list__container}>
        {[...Array(10).keys()].map((feed) => (
          <div
            key={feed}
            style={{
              height: "5.725rem",
              backgroundColor: "rgb(240, 240, 240)",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const ChangeArtwork: React.FC<{ feed: FeedType }> = (p) => {
  const { self } = useUserContext();
  const [artwork, setArtwork] = useState("");
  const [_, changeArtworkMutation] = useChangeArtworkMutation();

  if (self && self.roles.includes("change-artwork")) {
    return (
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
              changeArtworkMutation({ artwork, feedId: p.feed.feedId });
            }
          }}
        >
          change artwork
        </button>
      </div>
    );
  }

  return null;
};

graphql(`
  mutation changeArtwork($feedId: String!, $artwork: String!) {
    changeArtwork(feedId: $feedId, artwork: $artwork)
  }
`);
