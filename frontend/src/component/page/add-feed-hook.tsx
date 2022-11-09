import _ from "lodash";
import { useState } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  Feed,
  useAddFeedMutation,
  useSyncFeedMutation,
} from "@hithlum/graphql/urql";

export const useAddFeed = () => {
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [___, addFeedMutation] = useAddFeedMutation();
  const [feed, setFeed] = useState<Feed>();
  const [error, setError] = useState<string>();
  const [__, syncFeedMutation] = useSyncFeedMutation();

  const addFeed = async () => {
    const res = await addFeedMutation({ url: newFeedUrl });
    const { data, error } = res;
    if (error) {
      setFeed(undefined);
      console.log(error.message);
      if (error.message.includes("already subscribed")) {
        setError("Already subscribed!");
      } else {
        setError("Try again!");
      }
    } else if (data) {
      setError(undefined);
      setNewFeedUrl("");
      setFeed(data.addFeed as Feed);
      setTimeout(() => {
        // todo: manual cache update: https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#manual-cache-updates
        syncFeedMutation({
          feedId: data.addFeed.feedId,
        });
      }, 3000);
    }
  };

  return {
    setNewFeedUrl,
    newFeedUrl,
    addFeed,
    feed,
    error,
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
      image
      title
      description
    }
  }
`);

graphql(`
  mutation syncFeed($feedId: String!) {
    feed(feedId: $feedId) {
      ...FeedPreviewFields
    }
  }
`);
