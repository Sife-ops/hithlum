import {
  Article,
  Feed,
  useRecentArticlesQuery,
  useRecentFeedsQuery,
} from "@hithlum/graphql/urql";

import { useEffect, useState } from "react";

export const useHome = () => {
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

  return {
    recentFeeds,
    recentArticles,
  };
};
