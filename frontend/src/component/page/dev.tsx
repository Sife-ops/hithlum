import {
  useHelloQuery,
  useAddFeedMutation,
  useRecentFeedsQuery,
  Feed,
} from "@hithlum/graphql/urql";

import { useEffect, useState } from "react";

export const Dev = () => {
  const [feedUrl, setFeedUrl] = useState("");

  const [helloQueryState] = useHelloQuery();
  const [addFeedState, addFeed] = useAddFeedMutation();

  const [recentFeedsQueryState] = useRecentFeedsQuery();
  const [recentFeeds, setRecentFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    const { fetching, data } = helloQueryState;
    if (!fetching) {
      console.log(data);
    }
  }, [helloQueryState.data]);

  useEffect(() => {
    const { fetching, data } = addFeedState;
    if (!fetching) {
      console.log(data);
    }
  }, [addFeedState.data]);

  useEffect(() => {
    const { fetching, data } = recentFeedsQueryState;
    if (!fetching && data) {
      setRecentFeeds(data.recentFeeds as Feed[]);
    }
  }, [recentFeedsQueryState.data]);

  return (
    <div>
      <div>dev</div>

      <div>
        <h3>recent feeds</h3>
        {recentFeeds?.length > 0 && (
          <div>
            {recentFeeds.map((feed) => (
              <div>
                <div>title: {feed.title}</div>
                <div>description: {feed.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

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
