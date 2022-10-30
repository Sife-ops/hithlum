import { graphql } from "@hithlum/graphql/gql";
import { useMyFeedsQuery, Feed } from "@hithlum/graphql/urql";
import React, { useState, useEffect } from "react";

type UserContextType = {
  myFeeds: Feed[] | undefined;
};

const userContext = (): UserContextType => {
  const [myFeedsQueryState] = useMyFeedsQuery();
  const [myFeeds, setMyFeeds] = useState<Feed[]>();
  useEffect(() => {
    const { fetching, data } = myFeedsQueryState;
    if (!fetching && data) {
      setMyFeeds(data.myFeeds as Feed[]);
    }
  }, [myFeedsQueryState.data]);

  return {
    myFeeds,
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

const myFeeds = graphql(`
  query myFeeds {
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
