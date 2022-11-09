import * as style from "../common.css";
import { FeedPreview } from "../feed-preview";
import { useMyFeeds } from "./my-feeds-hook";
import { useUserContext } from "../../hook/user-context";
import { useNavigate } from "react-router-dom";

export const MyFeeds = () => {
  const nav = useNavigate();
  const { self } = useUserContext();
  const page = useMyFeeds();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>My Feeds</h1>
      <div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => nav("/add-feed")}>Add Feed</button>
          {self?.roles.includes("update-feeds-button") && (
            <div>
              <button
                onClick={() => {
                  // page.updateFeeds()
                }}
              >
                update feeds
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={style.list__container}>
        {page.myFeeds?.map((feed) => (
          <FeedPreview
            feed={feed}
            article={feed.latestArticle || undefined}
            key={feed.feedId}
          />
        ))}
      </div>
    </div>
  );
};
