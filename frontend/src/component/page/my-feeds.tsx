import { Feed } from "../feed";
import { useMyFeedsHook } from "./my-feeds-hook";

export const MyFeeds = () => {
  const myFeeds = useMyFeedsHook();

  return (
    <div>
      <h1>My Feeds</h1>
      <h2>Add Feed</h2>
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
        {myFeeds.updatingFeed && <div>{myFeeds.updatingFeed}</div>}
      </div>

      <h2>Feeds</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        {myFeeds.myFeeds?.map((feed) => (
          <Feed feed={feed} />
        ))}
      </div>
    </div>
  );
};
