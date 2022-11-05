import {
  Feed as FeedType,
  useFeedQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useUpdateFeedMutation,
} from "@hithlum/graphql/urql";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";

export const useFeed = (feedId: string) => {
  const [feedQueryState] = useFeedQuery({ variables: { feedId: feedId! } });
  const [feed, setFeed] = useState<FeedType>();
  const [feedLoaded, setFeedLoaded] = useState(false);
  useEffect(() => {
    const { fetching, data } = feedQueryState;
    if (!fetching && data) {
      setFeed(data.feed as FeedType);
      if (!feedLoaded) {
        setFeedLoaded(true);
      }
    }
  }, [feedQueryState.data]);

  const [___, updateFeedMutation] = useUpdateFeedMutation();
  useEffect(() => {
    if (feedLoaded && feed) {
      // todo: duplicated in my-feeds
      const key = `feed-${feed.feedId}`;
      const lastUpdated = localStorage.getItem(key);
      if (lastUpdated) {
        const delta = Date.now() - parseInt(lastUpdated);
        console.log(delta);
        if (delta < 60000) return;
      }
      updateFeedMutation({ feedId: feed.feedId });
      localStorage.setItem(key, Date.now().toString());
    }
  }, [feedLoaded]);

  const [_, subscribeMutation] = useSubscribeMutation();
  const [__, unsubscribeMutation] = useUnsubscribeMutation();

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

      addedByUser {
        userId
        username
        discriminator
        avatarUrl
      }

      articles {
        ...ArticlePreviewFields
      }
    }
  }
`);
