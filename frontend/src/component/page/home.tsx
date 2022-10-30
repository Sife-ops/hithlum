import {
  Article,
  Feed,
  useAddFeedMutation,
  useHelloQuery,
  useRecentArticlesQuery,
  useRecentFeedsQuery,
} from "@hithlum/graphql/urql";

import * as style from "./home.css";
import { useEffect, useState } from "react";

export const Home = () => {
  const [recentFeedsQueryState] = useRecentFeedsQuery();
  const [recentFeeds, setRecentFeeds] = useState<Feed[]>();

  const [recentArticlesQueryState] = useRecentArticlesQuery();
  const [recentArticles, setRecentArticles] = useState<Article[]>();

  useEffect(() => {
    const { fetching, data } = recentFeedsQueryState;
    if (!fetching && data) {
      let desc = data.recentFeeds;
      desc.sort((a, b) => {
        const aa = Date.parse(a.createdAt_isoDate);
        const bb = Date.parse(b.createdAt_isoDate);
        return bb - aa;
      });
      setRecentFeeds(desc as Feed[]);
    }
  }, [recentFeedsQueryState.data]);

  useEffect(() => {
    const { fetching, data } = recentArticlesQueryState;
    if (!fetching && data) {
      let desc = data.recentArticles;
      desc.sort((a, b) => {
        const aa = Date.parse(a.isoDate!);
        const bb = Date.parse(b.isoDate!);
        return bb - aa;
      });
      setRecentArticles(desc as Article[]);
    }
  }, [recentArticlesQueryState.data]);

  return (
    <div>
      <h1>Recent</h1>
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
    </div>
  );
};
