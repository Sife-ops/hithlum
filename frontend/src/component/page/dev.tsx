import {
  Article,
  Feed,
  useAddFeedMutation,
  useHelloQuery,
  useRecentArticlesQuery,
  useRecentFeedsQuery,
} from "@hithlum/graphql/urql";

import { useEffect, useState } from "react";

export const Dev = () => {
  const [feedUrl, setFeedUrl] = useState("");

  const [helloQueryState] = useHelloQuery();
  const [addFeedState, addFeed] = useAddFeedMutation();

  const [recentFeedsQueryState] = useRecentFeedsQuery();
  const [recentFeeds, setRecentFeeds] = useState<Feed[]>([]);

  const [recentArticlesQueryState] = useRecentArticlesQuery();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);

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

  useEffect(() => {
    const { fetching, data } = recentArticlesQueryState;
    if (!fetching && data) {
      setRecentArticles(data.recentArticles as Article[]);
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
              <div key={feed.feedId}>
                <div>title: {feed.title}</div>
                <div>description: {feed.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>recent articles</h3>
        {recentArticles?.length > 0 && (
          <div>
            {(() => {
              const desc = recentArticles.sort((a, b) => {
                const aa = Date.parse(a.isoDate!);
                const bb = Date.parse(b.isoDate!);
                return bb - aa;
              });
              return desc.map((article) => (
                <div key={article.articleId}>
                  <div>title: {article.title}</div>
                  <div>isoDate: {article.isoDate}</div>
                </div>
              ));
            })()}
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
