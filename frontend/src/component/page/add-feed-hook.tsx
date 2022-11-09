import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import { useAddFeedMutation, useSyncFeedMutation } from "@hithlum/graphql/urql";

export const useAddFeed = () => {
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [addFeedMutationState, addFeedMutation] = useAddFeedMutation();
  const [__, syncFeedMutation] = useSyncFeedMutation();
  useEffect(() => {
    const { fetching, data } = addFeedMutationState;
    if (!fetching && data) {
      setTimeout(() => {
        // todo: manual cache update: https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#manual-cache-updates
        syncFeedMutation({
          feedId: data.addFeed.feedId,
        });
      }, 2000);
    }
  }, [addFeedMutationState.data]);
  const addFeed = async () => {
    await addFeedMutation({ url: newFeedUrl });
    setNewFeedUrl("");
  };

  return {
    setNewFeedUrl,
    newFeedUrl,
    addFeed,
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
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
