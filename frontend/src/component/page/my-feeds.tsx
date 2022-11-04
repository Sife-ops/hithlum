import * as style from "./my-feeds.css";
import { Feed } from "../feed";
import { useMyFeeds } from "./my-feeds-hook";

export const MyFeeds = () => {
  const myFeeds = useMyFeeds();

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
              myFeeds.addFeed();
            }}
          >
            <input
              value={myFeeds.newFeedUrl}
              onChange={(e) => myFeeds.setNewFeedUrl(e.target.value)}
            />
            <button type="submit">save</button>
          </form>
          <div>
            <button onClick={async () => myFeeds.updateFeeds()}>
              update feeds
            </button>
          </div>
        </div>
        {myFeeds.updatingFeed && <div>{myFeeds.updatingFeed}</div>}
      </div>

      <div className={style.myFeeds__container}>
        {myFeeds.myFeeds?.map((feed) => (
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
