import {
  Article,
  Feed,
  useRecentArticlesQuery,
  useRecentFeedsQuery,
} from "@hithlum/graphql/urql";

import _ from "lodash";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";

export const useHome = () => {
  const [recentFeedsQueryState] = useRecentFeedsQuery();
  const [recentFeeds, setRecentFeeds] = useState<Feed[]>();

  useEffect(() => {
    const { fetching, data } = recentFeedsQueryState;
    if (!fetching && data) {
      setRecentFeeds(data.recentFeeds as Feed[]);
    }
  }, [recentFeedsQueryState.data]);

  const [recentArticlesQueryState] = useRecentArticlesQuery();
  const [recentArticles, setRecentArticles] = useState<Article[]>();

  useEffect(() => {
    const { fetching, data } = recentArticlesQueryState;
    if (!fetching && data) {
      setRecentArticles(data.recentArticles as Article[]);
    }
  }, [recentArticlesQueryState.data]);

  return {
    recentFeeds,
    recentArticles,
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const recentFeeds = graphql(`
  query recentFeeds {
    recentFeeds {
      ...FeedPreviewFields
    }
  }
`);

const recentArticles = graphql(`
  query recentArticles {
    recentArticles {
      ...ArticlePreviewFields
      feed {
        feedId

        image
        title
      }
    }
  }
`);
