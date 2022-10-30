import { useAddFeedMutation } from "@hithlum/graphql/urql";
import { useState } from "react";

export const MyFeeds = () => {
  const [feedUrl, setFeedUrl] = useState("");

  const [_, addFeed] = useAddFeedMutation();

  return (
    <div>
      <h1>My Feeds</h1>
      <h2>Add Feed</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFeed({ url: feedUrl }).then((e) => {
            console.log("error", e.error);
          });
        }}
      >
        <input value={feedUrl} onChange={(e) => setFeedUrl(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
