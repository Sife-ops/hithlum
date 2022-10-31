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
      const desc = _.reverse(
        _.sortBy(data.recentFeeds, [(e) => Date.parse(e.createdAt_isoDate)])
      );
      setRecentFeeds(desc as Feed[]);
    }
  }, [recentFeedsQueryState.data]);

  const [recentArticlesQueryState] = useRecentArticlesQuery();
  const [recentArticles, setRecentArticles] = useState<Article[]>();

  useEffect(() => {
    const { fetching, data } = recentArticlesQueryState;
    if (!fetching && data) {
      const desc = _.reverse(
        _.sortBy(data.recentArticles, [(e) => Date.parse(e.isoDate!)])
      );
      setRecentArticles(desc as Article[]);
    }
  }, [recentArticlesQueryState.data]);

  return {
    recentFeeds,
    recentArticles,
  };
};

const recentFeeds = graphql(`
  query recentFeeds {
    recentFeeds {
      feedId
      inputUrl
      private
      createdAt_isoDate

      feedUrl
      image
      title
      description
      link
    }
  }
`);

const recentArticles = graphql(`
  query recentArticles {
    recentArticles {
      articleId
      feedId

      categories
      content
      contentSnippet
      creator
      guid
      isoDate
      link
      pubDate
      summary
      title

      feed {
        feedId
        inputUrl
        private
        createdAt_isoDate

        feedUrl
        image
        title
        description
        link
      }

      unread {
        value
      }
    }
  }
`);
