import * as style from "./home.css";
import { Feed } from "../feed";
import { Link } from "react-router-dom";
import { useHome } from "./home-hook";

export const Home = () => {
  const { recentArticles, recentFeeds } = useHome();
  return (
    <div>
      <h1>Recent</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <h3>Added Feeds</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {recentFeeds?.map((feed) => (
              <Feed
                feed={feed}
                article={feed.latestArticle}
                key={feed.feedId}
              />
            ))}
          </div>
        </div>

        <div>
          <h3>New Articles</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {recentArticles?.map((article) => (
              <Feed
                feed={article.feed}
                article={article}
                key={article.articleId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
