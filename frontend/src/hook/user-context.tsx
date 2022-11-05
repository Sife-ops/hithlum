import React, { useEffect, useState } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  Feed,
  useMyFeedsQuery,
  useUpdateFeedMutation,
} from "@hithlum/graphql/urql";
import _ from "lodash";

type UserContextType = {
  myFeeds: Feed[] | undefined;
  updateFeeds: () => Promise<void>;
  updatingFeed: string | undefined;
};

const userContext = (): UserContextType => {
  const [myFeedsQueryState] = useMyFeedsQuery({
    requestPolicy: "network-only", // todo: not needed?
  });
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

  const [___, updateFeedMutation] = useUpdateFeedMutation();
  const [updatingFeed, setUpdatingFeed] = useState<string>();
  const updateFeeds = async () => {
    if (myFeeds) {
      setUpdatingFeed("Updating...");
      await Promise.all(
        myFeeds.map(({ feedId }) => updateFeedMutation({ feedId }))
      );
      setUpdatingFeed("done!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUpdatingFeed(undefined);
    }
  };

  useEffect(() => {
    const autoUpdate = setInterval(() => {
      updateFeeds();
    }, 1000 * 60 * 30); // todo: configurable in settings
    return () => clearInterval(autoUpdate);
  });

  return {
    myFeeds,
    updateFeeds,
    updatingFeed,
  };
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const context = userContext();

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
