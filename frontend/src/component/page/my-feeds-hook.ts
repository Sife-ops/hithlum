import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import { useAddFeedMutation, useSyncFeedMutation } from "@hithlum/graphql/urql";

export const useMyFeeds = () => {
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [addFeedMutationState, addFeedMutation] = useAddFeedMutation();
  const [__, syncFeedMutation] = useSyncFeedMutation();
  useEffect(() => {
    const { fetching, data } = addFeedMutationState;
    if (!fetching && data) {
      setTimeout(() => {
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

const addFeed = graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
    }
  }
`);

const syncFeed = graphql(`
  mutation syncFeed($feedId: String!) {
    feed(feedId: $feedId) {
      ...FeedPreviewFields
    }
  }
`);
