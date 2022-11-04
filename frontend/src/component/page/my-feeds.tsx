import * as style from "./common.css";
import { Feed } from "../feed";
import { useMyFeeds } from "./my-feeds-hook";
import { useUserContext } from "../../hook/user-context";

export const MyFeeds = () => {
  const page = useMyFeeds();
  const ctx = useUserContext();

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
