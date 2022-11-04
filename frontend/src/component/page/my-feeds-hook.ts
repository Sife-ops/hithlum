import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  Feed,
  useAddFeedMutation,
  useMyFeedsQuery,
  useUpdateFeedMutation,
  useSyncFeedMutation,
} from "@hithlum/graphql/urql";

export const useMyFeeds = () => {
  const [myFeedsQueryState] = useMyFeedsQuery();
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  useEffect(() => {
    const { fetching, data } = myFeedsQueryState;
    if (!fetching && data) {
      const desc = _.orderBy(
        data.myFeeds,
        [(feed) => feed.latestArticle?.isoDate],
        "desc"
      );
      setMyFeeds(desc as Feed[]);
    }
  }, [myFeedsQueryState.data]);

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

  const [___, updateFeedMutation] = useUpdateFeedMutation();
  const [updatingFeed, setUpdatingFeed] = useState<string>();
  const updateFeeds = async () => {
    if (myFeeds) {
      for (const { feedId, title } of myFeeds) {
        setUpdatingFeed(title || "untitled feed");
        await updateFeedMutation({ feedId });
      }
      setUpdatingFeed("done!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdatingFeed(undefined);
    }
  };

  return {
    myFeeds,
    updateFeeds,
    setNewFeedUrl,
    newFeedUrl,
    updatingFeed,
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

const updateFeed = graphql(`
  mutation updateFeed($feedId: String!) {
    updateFeed(feedId: $feedId) {
      ...FeedPreviewFields
    }
  }
`);

const myFeeds = graphql(`
  query myFeeds {
    myFeeds {
      ...FeedPreviewFields
    }
  }
`);
