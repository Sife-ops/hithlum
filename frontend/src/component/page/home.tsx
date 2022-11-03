import { Feed } from "../feed";
import { useHome } from "./home-hook";

export const Home = () => {
  const { recentArticles, recentFeeds } = useHome();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Feeds</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <div>
          <h3>Recently Added</h3>
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
                article={feed.latestArticle || undefined}
                key={feed.feedId}
              />
            ))}
          </div>
        </div>

        <div>
          <h3>Recently Updated</h3>
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
