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
        {/* // */}

        <div>
          <h3>Added Feeds</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {recentFeeds?.map((feed) => (
              <Feed feed={feed} />
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
                <div>{article.feed.title}</div>
                <div>{article.unread.value ? "unread" : "read"}</div>
                <Link to={"/article/" + article.articleId}>more...</Link>
              </div>
            ))}
          </div>
        </div>

        {/* // */}
      </div>
    </div>
  );
};
