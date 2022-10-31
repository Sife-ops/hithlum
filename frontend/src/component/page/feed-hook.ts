import {
  Feed as FeedType,
  useFeedQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "@hithlum/graphql/urql";

import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";

export const useFeed = (feedId: string) => {
  const [feedQueryState] = useFeedQuery({ variables: { feedId: feedId! } });
  const [feed, setFeed] = useState<FeedType>();

  const [_, subscribeMutation] = useSubscribeMutation();
  const [__, unsubscribeMutation] = useUnsubscribeMutation();

  useEffect(() => {
    const { fetching, data } = feedQueryState;
    if (!fetching && data) {
      setFeed(data.feed as FeedType);
    }
  }, [feedQueryState.data]);

  return {
    feed,
    subscribeMutation,
    unsubscribeMutation,
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const subscribe = graphql(`
  mutation subscribe($feedId: String!) {
    subscribe(feedId: $feedId) {
      subscribed
    }
  }
`);

const unsubscribe = graphql(`
  mutation unsubscribe($feedId: String!) {
    unsubscribe(feedId: $feedId) {
      subscribed
    }
  }
`);

const feed = graphql(`
  query feed($feedId: String!) {
    feed(feedId: $feedId) {
      feedId
      inputUrl

      image
      title
      description
      feedUrl
      link

      subscribed

      articles {
        ...ArticlePreviewFields
      }
    }
  }
`);
