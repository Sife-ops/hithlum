import { Feed } from "../feed";
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
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              marginBottom: "1rem",
            }}
          >
            Added Feeds
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
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
          <h3
            style={{
              marginBottom: "1rem",
            }}
          >
            New Articles
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
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
