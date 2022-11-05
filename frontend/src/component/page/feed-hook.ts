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
  const [feedQueryInit, setFeedQueryInit] = useState(true);
  const [___, updateFeedMutation] = useUpdateFeedMutation();
  useEffect(() => {
    const { fetching, data } = feedQueryState;
    if (!fetching && data) {
      setFeed(data.feed as FeedType);
      if (feedQueryInit) {
        updateFeedMutation({ feedId: data.feed.feedId });
        setFeedQueryInit(false);
      }
    }
  }, [feedQueryState.data]);

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

graphql(`
  mutation subscribe($feedId: String!) {
    subscribe(feedId: $feedId) {
      subscribed
    }
  }
`);

graphql(`
  mutation unsubscribe($feedId: String!) {
    unsubscribe(feedId: $feedId) {
      subscribed
    }
  }
`);

graphql(`
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
