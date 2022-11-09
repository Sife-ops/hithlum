import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  useMyFeedsQuery,
  useUpdateFeedMutation,
  Feed,
} from "@hithlum/graphql/urql";

export const useMyFeeds = () => {
  const [myFeedsQueryState] = useMyFeedsQuery();
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  const [___, updateFeedMutation] = useUpdateFeedMutation();
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
        Promise.all(
          data.myFeeds.map(({ feedId }) => updateFeedMutation({ feedId }))
        );
        localStorage.setItem("my-feeds", Date.now().toString());
        setMyFeedsQueryInit(false);
      }
    }
  }, [myFeedsQueryState.data]);

  return {
    myFeeds,
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
