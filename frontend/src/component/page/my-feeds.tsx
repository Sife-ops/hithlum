import * as style from "./common.css";
import { Feed } from "../feed";
import { useEffect } from "react";
import { useMyFeeds } from "./my-feeds-hook";
import { useUserContext } from "../../hook/user-context";

export const MyFeeds = () => {
  const page = useMyFeeds();
  const ctx = useUserContext();

  useEffect(() => {
    // todo: duplicated in feed-hook
    const lastUpdated = localStorage.getItem("my-feeds");
    if (lastUpdated) {
      const delta = Date.now() - parseInt(lastUpdated);
      console.log(delta);
      if (delta < 60000) return;
    }
    ctx.updateFeeds();
    localStorage.setItem("my-feeds", Date.now().toString());
  }, []);

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
        <h3>Add Feed</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              page.addFeed();
            }}
          >
            <input
              value={page.newFeedUrl}
              onChange={(e) => page.setNewFeedUrl(e.target.value)}
            />
            <button type="submit">save</button>
          </form>
          <div>
            <button onClick={async () => ctx.updateFeeds()}>
              update feeds
            </button>
          </div>
        </div>
      </div>

      <div className={style.list__container}>
        {ctx.myFeeds?.map((feed) => (
          <Feed
            feed={feed}
            article={feed.latestArticle || undefined}
            key={feed.feedId}
          />
        ))}
      </div>
    </div>
  );
};
