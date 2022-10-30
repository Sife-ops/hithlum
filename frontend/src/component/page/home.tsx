import * as style from "./home.css";
import { useHome } from "./home-hook";

export const Home = () => {
  const { recentArticles, recentFeeds } = useHome();
  return (
    <div>
      <h1>Recent</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        {/* // */}

        <div>
          <h3>Added Feeds</h3>
          <div>
            {recentFeeds?.map((feed) => (
              <div key={feed.feedId} className={style.addedFeeds}>
                <div>{feed.title}</div>
                {feed.description && <div>{feed.description}</div>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>New Articles</h3>
          <div>
            {recentArticles?.map((article) => (
              <div
                key={article.articleId}
                style={{
                  border: "1px solid purple",
                }}
              >
                <div>{article.title}</div>
                <div>{article.isoDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* // */}
      </div>
    </div>
  );
};
