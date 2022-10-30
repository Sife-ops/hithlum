import _ from "lodash";
import React, { useState, useEffect } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  useMyFeedsMutation,
  Feed,
  useUpdateFeedMutation,
  useAddFeedMutation,
} from "@hithlum/graphql/urql";

type UserContextType = {
  myFeeds: Feed[] | undefined;
  updateFeeds: () => void;
  updatingFeed: string | undefined;
  setNewFeedUrl: React.Dispatch<React.SetStateAction<string>>;
  addFeed: () => void;
  newFeedUrl: string;
};

const userContext = (): UserContextType => {
  const [myFeedsMutationState, myFeedsMutation] = useMyFeedsMutation();
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  useEffect(() => {
    myFeedsMutation({});
  }, []);
  useEffect(() => {
    const { fetching, data } = myFeedsMutationState;
    if (!fetching && data) {
      const desc = _.orderBy(
        data.myFeeds,
        [(feed) => feed.articles[0].isoDate],
        "desc"
      );
      setMyFeeds(desc as Feed[]);
    }
  }, [myFeedsMutationState.data]);

  const [___, addFeedMutation] = useAddFeedMutation();
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const addFeed = async () => {
    await addFeedMutation({ url: newFeedUrl });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // todo: don't use this syntax
    await myFeedsMutation({});
  };

  const [__, updateFeedmutation] = useUpdateFeedMutation();
  const [updatingFeed, setUpdatingFeed] = useState<string>();
  const updateFeeds = async () => {
    if (myFeeds) {
      for (const { feedId, title } of myFeeds) {
        setUpdatingFeed(title || "untitled feed");
        await updateFeedmutation({ feedId });
      }
      setUpdatingFeed("done!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await myFeedsMutation({});
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
      feedId
      inputUrl
      createdAt_isoDate

      feedUrl
      imageUrl
      title
      description
      link

      articles {
        articleId
        feedId

        categories
        content
        contentSnippet
        creator
        guid
        isoDate
        link
        pubDate
        summary
        title

        unread {
          value
        }
      }
    }
  }
`);
