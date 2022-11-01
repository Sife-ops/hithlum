import _ from "lodash";
import { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  Feed,
  useAddFeedMutation,
  useMyFeedsMutation,
  useUpdateFeedMutation,
} from "@hithlum/graphql/urql";

export const useMyFeeds = () => {
  const myFeedsMutation = useMyFeedsMutation();
  const [myFeedsMutationState, myFeedsMutationFn] = myFeedsMutation;
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  useEffect(() => {
    myFeedsMutationFn({});
  }, []);
  useEffect(() => {
    const { fetching, data } = myFeedsMutationState;
    if (!fetching && data) {
      const desc = _.orderBy(
        data.myFeeds,
        [(feed) => feed.latestArticle.isoDate],
        "desc"
      );
      setMyFeeds(desc as Feed[]);
    }
  }, [myFeedsMutationState.data]);

  const [__, addFeedMutation] = useAddFeedMutation();
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const addFeed = async () => {
    await addFeedMutation({ url: newFeedUrl });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // todo: don't use this syntax
    await myFeedsMutationFn({});
  };

  const [___, updateFeedmutation] = useUpdateFeedMutation();
  const [updatingFeed, setUpdatingFeed] = useState<string>();
  const updateFeeds = async () => {
    if (myFeeds) {
      for (const { feedId, title } of myFeeds) {
        setUpdatingFeed(title || "untitled feed");
        await updateFeedmutation({ feedId });
      }
      setUpdatingFeed("done!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await myFeedsMutationFn({});
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
    myFeedsMutation,
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

const updateFeed = graphql(`
  mutation updateFeed($feedId: String!) {
    updateFeed(feedId: $feedId)
  }
`);

const myFeeds = graphql(`
  mutation myFeeds {
    myFeeds {
      ...FeedPreviewFields
    }
  }
`);
