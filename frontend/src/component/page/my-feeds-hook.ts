import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  useAddFeedMutation,
  useSyncFeedMutation,
  useMyFeedsQuery,
  useUpdateFeedMutation,
  Feed,
} from "@hithlum/graphql/urql";

export const useMyFeeds = () => {
  const [myFeedsQueryState] = useMyFeedsQuery();
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  const [myFeedsQueryInit, setMyFeedsQueryInit] = useState(true);
  useEffect(() => {
    const { fetching, data } = myFeedsQueryState;
    if (!fetching && data) {
      const desc = _.orderBy(
        data.myFeeds,
        [(feed) => feed.latestArticle?.isoDate],
        "desc"
      );
      setMyFeeds(desc as Feed[]);
      if (myFeedsQueryInit) {
        const lastUpdated = localStorage.getItem("my-feeds");
        if (lastUpdated) {
          const delta = Date.now() - parseInt(lastUpdated);
          console.log(delta);
          if (delta < 1000 * 60) return;
        }
        updateFeeds(data.myFeeds as Feed[]);
        localStorage.setItem("my-feeds", Date.now().toString());
        setMyFeedsQueryInit(false);
      }
    }
  }, [myFeedsQueryState.data]);

  const [___, updateFeedMutation] = useUpdateFeedMutation();
  const updateFeeds = (feeds?: Feed[]) => {
    let feeds_ = feeds;
    if (!feeds_) feeds_ = myFeeds;
    if (feeds_) {
      Promise.all(feeds_.map(({ feedId }) => updateFeedMutation({ feedId })));
    }
  };

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
    myFeeds,
    updateFeeds,
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

graphql(`
  mutation updateFeed($feedId: String!) {
    updateFeed(feedId: $feedId) {
      ...FeedPreviewFields
    }
  }
`);

graphql(`
  query myFeeds {
    myFeeds {
      ...FeedPreviewFields
    }
  }
`);
